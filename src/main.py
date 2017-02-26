#!/usr/bin/env python3

from tornado import web, ioloop
from handlers.html import MainHandler, SignUpHandler, SignInHandler
from handlers.ws import WSHandler

app = web.Application([
    (r'/', MainHandler),
    (r'/ws', WSHandler),
    (r'/signup', SignUpHandler),
    (r'/signin', SignInHandler),
], static_path='static', debug=True)

app.listen(8888)
ioloop.IOLoop.current().start()
