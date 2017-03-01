from tornado import websocket
import json
from pymongo import MongoClient
from jose import jwt
from jose.exceptions import JOSEError

chat_rooms = {}


class WSHandler(websocket.WebSocketHandler):
    username = ''
    room = ''

    def open(self):
        print('WebSocket Opened!')

    def on_message(self, msg):
        try:
            msg = json.loads(msg)

            if type(msg) is not dict:
                raise ValueError()
        except ValueError:
            print("Error JSON ValueError")
            self.close()
            return

        try:
            if msg['type'] == 'authenticate':
                try:
                    token = jwt.decode(
                        msg['token'],
                        'secret',
                        algorithms=['HS256']
                    )
                except JOSEError:
                    self.username = ''
                else:
                    self.username = token['username']

                self.write_message({
                    'type': 'authResponse',
                    'user': self.username
                })
            elif msg['type'] == 'setRoom':
                client = MongoClient()

                # TODO: run mongo query async
                room_obj = client.chatGame.chatRooms.find_one({
                    "_id": msg['room']
                })

                if room_obj is None:
                    print("Error Room not Found")
                    self.close()
                    return

                if msg['room'] not in chat_rooms:
                    chat_rooms[msg['room']] = {self}
                else:
                    chat_rooms[msg['room']].add(self)

                print(chat_rooms)

                if self.room != '':
                    chat_rooms[self.room].discard(self)

                self.room = msg['room']

                history = {
                    'type': 'chatHistory',
                    'room': self.room,
                    'msgs': room_obj['msg']
                }

                self.write_message(history)
            elif msg['type'] == 'sendMsg':
                obj = {
                    'type': 'message',
                    'data': msg['data'],
                    'name': self.username
                }

                # TODO check self.room is set (not null)
                # FIXME: db_obj assigned but not used
                db_obj = {
                    'type': 'message',
                    'data': msg['data'],
                    'name': self.username,
                    'room': self.room
                }

                client = MongoClient()

                # FIXME: msg_add assigned but not used
                msg_add = client.chatGame.chatRooms.update({
                    "_id": self.room
                }, {
                    "$push": {
                        'msg': {self.username: msg['data']}
                    }
                })

                for conn in chat_rooms[self.room]:
                    conn.write_message(obj)
        except KeyError:
            print("Error KeyError")
            self.close()

    def on_close(self):
        if self.room != '':
            chat_rooms[self.room].discard(self)

        print(chat_rooms)

        print('WebSocket Closed!')
