from tornado import websocket
import json
from pymongo import MongoClient
from jose import jwt

chat_rooms = {}


class WSHandler(websocket.WebSocketHandler):
    username = ''
    room = ''

    def open(self):
        print('WebSocket Opened!')

    def on_message(self, msg):
        # TODO: check malformed json
        msg = json.loads(msg)

        # TODO: check integrity between `type` and other message keys
        if msg['type'] == 'authenticate':
            # TODO: handle jwt signature error
            token = jwt.decode(msg['token'], 'secret', algorithms=['HS256'])
            self.username = token['username']

        elif msg['type'] == 'setRoom':
            # TODO: check if chat room exists in db
            if msg['room'] not in chat_rooms:
                chat_rooms[msg['room']] = {self}
            else:
                chat_rooms[msg['room']].add(self)

            print(chat_rooms)

            if self.room != '':
                chat_rooms[self.room].discard(self)

            self.room = msg['room']

            client = MongoClient()
            room = client.chatGame.chatRooms.find_one({
            "_id": self.room
            })

            history = {'type':'chatHistory','room':self.room, 'msgs':room['msg']}
            self.write_message(json.dumps(history))

    def on_close(self):
        if self.room != '':
            chat_rooms[self.room].discard(self)

        print(chat_rooms)

        print('WebSocket Closed!')
