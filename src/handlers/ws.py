from tornado import websocket
import json
from pymongo import MongoClient
from jose import jwt
from jose.exceptions import JOSEError
from controllers.groups import GroupHandler
from controllers.friends import FriendHandler

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
            self.write_error('badRequest')
            self.close()
            return

        try:
            # authentication
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
                    client = MongoClient()

                    user_cnt = client.chatGame.users.count({
                        '_id': token['username']
                    })

                    if user_cnt != 1:
                        self.username = ''
                    else:
                        self.username = token['username']

                self.write_message({
                    'type': 'authResponse',
                    'user': self.username
                })

            # heartbeat message
            elif msg['type'] == 'hb':
                self.write_message({
                    'type': 'hb'
                })

            # do not accept other types for non-authorized users
            elif self.username == '':
                self.write_error('notAuthorized')

            elif msg['type'] == 'listGroups':
                GroupHandler.listGroups(self)

            elif msg['type'] == 'listUsers':
                FriendHandler.listUsers(self)

            elif msg['type'] == 'listGroup':
                GroupHandler.listGroup(self,self.username)

            elif msg['type'] == 'listFriends':
                FriendHandler.listFriends(self,self.username)

            # set current chat room
            elif msg['type'] == 'setRoom':
                # check room type
                print(msg)
                s = msg['room'].split('-')

                client = MongoClient()

                if len(s) == 2 and self.username in s and s[0] < s[1]:
                    # direct chat
                    # check if other user exists
                    u2 = s[1] if self.username == s[0] else s[0]

                    user_cnt = client.chatGame.users.count({
                        '_id': u2
                    })

                    if user_cnt != 1:
                        self.write_error('roomNotFound')
                        return

                    # load room object
                    room_obj = client.chatGame.chatRooms.find_one({
                        '_id': msg['room']
                    })

                    if room_obj is None:
                        room_obj = {
                            '_id': msg['room'],
                            'msg': []
                        }

                        client.chatGame.chatRooms.insert_one(room_obj)

                elif len(msg['room'].split('/')) == 2:
                    # group chat
                    # check if group is joined
                    user_obj = client.chatGame.users.find_one({
                        '_id': self.username
                    })

                    if user_obj is None:
                        self.write_error('notAuthorized')
                        self.username = ''
                        return

                    if msg['room'] not in user_obj['groups']:
                        self.write_error('roomNotJoined')
                        return

                    # check if group exists
                    # TODO: run mongo query async
                    room_cnt = client.chatGame.chatRooms.count({
                        "_id": msg['room']
                    })

                    if room_cnt != 1:
                        self.write_error('roomNotFound')
                        return

                else:
                    # wrong room name
                    self.write_error('roomNotFound')
                    return

                if msg['room'] not in chat_rooms:
                    chat_rooms[msg['room']] = {self}
                else:
                    chat_rooms[msg['room']].add(self)

                if self.room != '':
                    chat_rooms[self.room].discard(self)

                print(chat_rooms)

                self.room = msg['room']

                room_obj = client.chatGame.chatRooms.find_one({
                        "_id": msg['room']
                    })

                history = {
                    'type': 'chatHistory',
                    'room': self.room,
                    'msgs': room_obj['msg']
                }

                self.write_message(history)

            # send message to the current room
            elif msg['type'] == 'sendMsg':
                if self.room == '':
                    self.write_error('roomNotSet')
                    return

                db_obj = {
                    'type': 'message',
                    'data': msg['data'],
                    'name': self.username,
                    'room': self.room
                }

                client = MongoClient()

                client.chatGame.chatRooms.update({
                    "_id": self.room
                }, {
                    "$push": {
                        'msg': {self.username: msg['data']}
                    }
                })

                for conn in chat_rooms[self.room]:
                    conn.write_message(db_obj)


            elif msg['type'] == 'createGroup':
                GroupHandler.createGroup(self.username,msg["gRoom"])

            elif msg['type'] == 'joinGroup':
                GroupHandler.joinGroup(self.username,msg["jGRoom"])

            elif msg['type'] == 'leaveGroup':
                GroupHandler.leaveGroup(self.username,msg["lGRoom"])

            elif msg['type'] == 'addFriend':
                FriendHandler.addFriend(self.username,msg["aFriend"])

            elif msg['type'] == 'acceptFriend':
                FriendHandler.acceptFriend(self.username,msg["acFriend"])

            elif msg['type'] == 'denyFriend':
                FriendHandler.acceptFriend(self.username,msg["dFriend"])

            elif msg['type'] == 'removeFriend':
                FriendHandler.removeFriend(self.username,msg["rFriend"])

            # inform user about wrong request type
            else:
                self.write_error('badRequestType')




        except KeyError:
            self.write_error('keyError')
            self.close()



    def on_close(self):
        client = MongoClient()
        client.chatGame.users.update({
                "_id": self.username
            }, {
                "$set":{"state": "off"}
            })
        if self.room != '':
            chat_rooms[self.room].discard(self)



        print(chat_rooms)

        print('WebSocket Closed!')

    def write_error(self, msg):
        self.write_message({
            'type': 'error',
            'msg': msg
        })
