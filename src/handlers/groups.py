from pymongo import MongoClient

class GroupHandler():
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
