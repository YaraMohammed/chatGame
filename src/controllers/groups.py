from pymongo import MongoClient
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

            client.chatGame.users.update({
                "_id": username
            }, {
                "$push": {
                    'groups': username+"/"+msg
                }
            })

    def joinGroup(username,jmsg):
            client = MongoClient()

            user = client.chatGame.users.find_one({
                "_id": username
            })

            if user is not None:
                print(username)
            else:
                return

            if jmsg not in user['groups']:
                client.chatGame.users.update({
                    "_id": username
                }, {
                    "$push": {
                        'groups': jmsg
                    }
                })
            else:
                pass

    def leaveGroup(username,lmsg):
            client = MongoClient()

            user = client.chatGame.users.find_one({
                "_id": username
            })

            if user is not None:
                print(username)
            else:
                return

            print(lmsg)
            if lmsg in user['groups']:

                client.chatGame.users.update({
                    "_id": username
                }, {
                    "$pull": {
                        'groups': lmsg
                    }
                })
            else:
                pass

    def listGroups(self):
        client = MongoClient()

        grps = client.chatGame.chatRooms.find({},{"_id":"true"})
        for grp in grps:
            chat_Rooms.append(grp)
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