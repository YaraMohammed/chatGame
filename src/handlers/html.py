from tornado import web
from pymongo import MongoClient


class MainHandler(web.RequestHandler):
    def get(self):
        self.write("Working")


class SignUpHandler(web.RequestHandler):
    def post(self):
        username = self.get_body_argument("username")
        firstName = self.get_body_argument("firstName")
        password = self.get_body_argument("password")
        self.write(str(username))

        # TODO: check /[a-z][a-z0-9]{5}/
        # TODO: check pass strength and hash it

        client = MongoClient()
        client.chatGame.users.insert_one({
            "_id": username,
            "name": firstName,
            "password": password,
            "groups": [],
            "friends": []
        })


class SignInHandler(web.RequestHandler):
    def post(self):
        username = self.get_body_argument("username")
        password = self.get_body_argument("password")

        client = MongoClient()
        user = client.chatGame.users.find_one({
            "_id": username,
            "password": password
        })

        if user is not None:
            # TODO: set token cookie
            self.write(username)
        else:
            return

        for friend in user['friends']:
                self.write('<br>'+friend)
