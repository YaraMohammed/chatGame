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
                token = jwt.decode(msg['token'], 'secret', algorithms=['HS256'])
                self.username = token['username']

            elif msg['type'] == 'setRoom':
                # TODO: run mongo query async
                client = MongoClient()
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

                history = {'type':'chatHistory','room':self.room, 'msgs':room_obj['msg']}
                self.write_message(json.dumps(history))

            elif msg['type'] == 'sendMsg':
                obj = {'type':'message','data':msg['data'],'name':self.username}
                #TODO check self.room is set (not null)
                dbObj = {'type':'message','data':msg['data'],'name':self.username,'room':self.room}
                client = MongoClient()
                msgAdd = client.chatGame.chatRooms.update({"_id": self.room},{"$push":{'msg':{self.username:msg['data']}}})
                for conn in chat_rooms[self.room]:
                    conn.write_message(json.dumps(obj))

        except KeyError:
            print("Error KeyError")
            self.close()
        except JOSEError:
            print("Error JWTError")
            self.close()

    def on_close(self):
        if self.room != '':
            chat_rooms[self.room].discard(self)

        print(chat_rooms)

        print('WebSocket Closed!')
