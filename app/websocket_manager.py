from collections.abc import MutableSet

from fastapi import WebSocket


class ConnectionManager:
    def __init__(self):
        self.active_connections: MutableSet[WebSocket] = set()

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.add(websocket)

    async def disconnect(self, websocket: WebSocket):
        self.active_connections.discard(websocket)

    async def broadcast(self, message: dict):
        for connection in list(self.active_connections):
            await connection.send_json(message)


connection_manager = ConnectionManager()
