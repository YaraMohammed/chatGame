from pymongo import MongoClient

class FriendHandler():
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
