from pymongo import MongoClient

class GroupHandler():
    def createGroup(username,msg):
            client = MongoClient()
            client.chatGame.chatRooms.insert_one({
                "_id": username+"/"+msg,
                "msg":[]
            })
