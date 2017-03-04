from tornado import web
from pymongo import MongoClient
from jose import jwt
from jose.exceptions import JOSEError


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
        self.render("../static/homePage.html")


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
            try:
                token = jwt.encode(
                    {'username': username},
                    'secret',
                    algorithm='HS256'
                )
            except JOSEError:
                pass
            else:
                self.set_cookie('token', token)

                client = MongoClient()
                client.chatGame.users.update({
                    "_id": username
                }, {
                    "$set": {"state": "on"}
                })
            finally:
                self.redirect("/static/homePage.html")
        else:
            return

        for friend in user['friends']:
                self.write('<br>'+friend)
