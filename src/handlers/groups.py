from pymongo import MongoClient
from bson import *
from tornado import websocket

chat_Rooms = []
own_Groups = []

class GroupHandler(websocket.WebSocketHandler):
    def createGroup(username,msg):
            client = MongoClient()
            client.chatGame.chatRooms.insert_one({
                "_id": username+"/"+msg,
                "msg":[]
            })
            # bmsg = JSON.parse(msg)

            client.chatGame.users.update({
                "_id": username
            }, {
                "$push": {
                    'groups': msg
                }
            })

    def joinGroup(username,jmsg):
            client = MongoClient()

            user = client.chatGame.users.find_one({
                "_id": username
            })

            if user is not None:
                # TODO: set token cookie
                print(username)
            else:
                return

            # for group in user['groups']:
            if jmsg not in user['groups']:
                client.chatGame.users.update({
                    "_id": username
                }, {
                    "$push": {
                        'groups': jmsg
                    }
                })
            else:
                # print(group+"\n")
                pass

    def leaveGroup(username,lmsg):
            client = MongoClient()

            user = client.chatGame.users.find_one({
                "_id": username
            })

            if user is not None:
                # TODO: set token cookie
                print(username)
            else:
                return

            print(lmsg)
            # for group in user['groups']:
            if lmsg in user['groups']:

                client.chatGame.users.update({
                    "_id": username
                }, {
                    "$pull": {
                        'groups': lmsg
                    }
                })
            else:
                # print(group+"\n")
                pass

    def listGroups(self):
        client = MongoClient()

        grps = client.chatGame.chatRooms.find({},{"_id":"true"})
        for grp in grps:
            s = grp['_id'].split('/')
            if len(s) == 2:
                chat_Rooms.append(s[1])
        print(chat_Rooms) 
        obj = {'type':'groupList' , 'list':chat_Rooms} 
        self.write_message(obj)   
        chat_Rooms.clear()

    
    def listGroup(self,username):
        client = MongoClient()

        user = client.chatGame.users.find_one({
            "_id": username
        })
        print(username)
        if user is not None:
            for group in user['groups']:
                own_Groups.append(group)
            print(own_Groups)
            gObj = {"type":"listOwnGroup","gList":own_Groups}
            self.write_message(gObj)
            own_Groups.clear()
        else: 
            pass