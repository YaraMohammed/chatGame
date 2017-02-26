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

        client = MongoClient()
        client.chatGame.users.insert_one({
            "_id": username,
            "name": firstName,
            "password": password,
            "groups": [],
            "friends": []
        })
