from pymongo import MongoClient
from bson import *
from tornado import websocket
users = []
own_Friends = []

class FriendHandler(websocket.WebSocketHandler):
    def addFriend(username,amsg):
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
            if amsg not in user['friends']:
                client.chatGame.users.update({
                    "_id": username
                }, {
                    "$push": {
                        'friends': amsg
                    }
                })
            else:
                # print(group+"\n")
                pass

    def removeFriend(username,rmsg):
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
            if rmsg in user['friends']:

                client.chatGame.users.update({
                    "_id": username
                }, {
                    "$pull": {
                        'friends': rmsg
                    }
                })
            else:
                # print(group+"\n")
                pass

    def listUsers(self):
        client = MongoClient()
        # usrs = client.chatGame.users.find({"state":"on"},{"_id":"true"})
        usrs = client.chatGame.users.find({},{"_id":"true"})
        for user in usrs:
            users.append(user['_id']) 
        obj = {'type':'usersList' , 'list':users} 
        self.write_message(obj)   
        users.clear()


    def listFriends(self,username):
        client = MongoClient()

        user = client.chatGame.users.find_one({
            "_id": username
        })
        print(username)
        if user is not None:
            for friend in user['friends']:
                own_Friends.append(friend)
            print(own_Friends)
            fObj = {"type":"listOwnFriend","fList":own_Friends}
            self.write_message(fObj)
            own_Friends.clear()
        else: 
            pass
