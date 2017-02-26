from tornado import websocket
from jose import jwt

chat_rooms = {}


class WSHandler(websocket.WebSocketHandler):
    def open(self):
        print('WebSocket Opened!')

    def on_message(self, msg):
        self.write_message('u said ' + msg)

    def on_close(self):
        print('WebSocket Closed!')
