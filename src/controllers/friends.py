from pymongo import MongoClient
from bson import *
from tornado import websocket

class FriendHandler(websocket.WebSocketHandler):
    def addFriend(me,friend):
        if me == friend:
            return

        client = MongoClient()

        friend_obj = client.chatGame.users.find_one({
            "_id": friend
        })

        if friend_obj is None:
            return

        print(friend_obj)

        if me not in friend_obj['friendReqs']:
            client.chatGame.users.update({
                "_id": friend
            }, {
                "$push": {
                    'friendReqs': me
                }
            })

    def acceptFriend(me,friend):
        if me == friend:
            return

        client = MongoClient()

        friend_obj = client.chatGame.users.find_one({
            "_id": friend
        })

        me_obj = client.chatGame.users.find_one({
            "_id": me
        })

        if friend_obj is None:
            return

        print(friend_obj)

        if friend in me_obj['friendReqs']:
            client.chatGame.users.update({
                "_id": me
            }, {
                "$pull": {
                    'friendReqs': friend
                }
            })

            if me not in friend_obj['friends']:
                client.chatGame.users.update({
                    "_id": friend
                }, {
                    "$push": {
                        'friends': me
                    }
                })

            if friend not in me_obj['friends']:
                client.chatGame.users.update({
                    "_id": me
                }, {
                    "$push": {
                        'friends': friend
                    }
                })

    def denyFriend(me,friend):
        if me == friend:
            return

        client = MongoClient()

        client.chatGame.users.update({
            "_id": me
        }, {
            "$pull": {
                'friendReqs': friend
            }
        })

    def removeFriend(me,friend):
        if me == friend:
            return

        client = MongoClient()

        friend_obj = client.chatGame.users.find_one({
            "_id": friend
        })

        if friend_obj is None:
            return

        print(friend_obj)

        client.chatGame.users.update({
            "_id": me
        }, {
            "$pull": {
                'friends': friend
            }
        })

        client.chatGame.users.update({
            "_id": friend
        }, {
            "$pull": {
                'friends': me
            }
        })

    def listUsers(self):
        users = []
        client = MongoClient()
        # usrs = client.chatGame.users.find({"state":"on"},{"_id":"true"})
        usrs = client.chatGame.users.find({},{"_id":"true"})
        for user in usrs:
            users.append(user['_id'])
        obj = {'type':'usersList' , 'list':users}
        self.write_message(obj)

    def listFriends(self,me):
        own_Friends = []
        client = MongoClient()

        user = client.chatGame.users.find_one({
            "_id": me
        })
        print(me)
        if user is not None:
            for friend in user['friends']:
                own_Friends.append(friend)
            print(own_Friends)
            fObj = {"type":"listOwnFriend","fList":own_Friends}
            self.write_message(fObj)
        else:
            pass

    def listFriendReqs(self,me):
        own_FriendReqs = []
        client = MongoClient()

        user = client.chatGame.users.find_one({
            "_id": me
        })
        print(me)
        if user is not None:
            for friend in user['friendReqs']:
                own_FriendReqs.append(friend)
            print(own_FriendReqs)
            fObj = {"type":"listFriendReqs","fList":own_FriendReqs}
            self.write_message(fObj)
        else:
            pass
