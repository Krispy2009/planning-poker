from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.websockets import WebSocket, WebSocketDisconnect
from typing import List

app = FastAPI()

# Serve static files for the frontend
app.mount("/", StaticFiles(directory="frontend/build"), name="static")

# Keep track of connected clients and their vote values
clients = {}
votes = {}

# WebSocket route for connecting to the planning poker session
@app.websocket("/ws/{session_id}")
async def connect_to_session(websocket: WebSocket, session_id: str):
    await websocket.accept()

    # Register the client with the session
    if session_id not in clients:
        clients[session_id] = []
    clients[session_id].append(websocket)

    # Wait for messages from the client
    try:
        while True:
            message = await websocket.receive_json()

            # Set the client's vote for the session
            if "vote" in message:
                votes[websocket] = message["vote"]
                await broadcast_votes(session_id)

    except WebSocketDisconnect:
        clients[session_id].remove(websocket)

        # If no more clients are connected, remove the session
        if not clients[session_id]:
            del clients[session_id]
            del votes[websocket]


# Helper function to broadcast vote values to all connected clients
async def broadcast_votes(session_id: str):
    vote_values = [vote for vote in votes.values() if vote is not None]

    # If all clients have voted, send the results
    if len(vote_values) == len(clients[session_id]):
        await broadcast(session_id, {"votes": vote_values})


# Helper function to broadcast a message to all connected clients in a session
async def broadcast(session_id: str, message: dict):
    for client in clients[session_id]:
        await client.send_json(message)
