#!/usr/bin/env python3

from tornado import web, ioloop
from handlers.main import MainHandler

app = web.Application([
    (r'/', MainHandler)
], static_path='static', debug=True)

app.listen(8888)
ioloop.IOLoop.current().start()
