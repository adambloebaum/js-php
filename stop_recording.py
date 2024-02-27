import websocket
import json
import hashlib
import base64

def stop_obs_recording():
    ws = websocket.create_connection("ws://localhost:PORT")

    # Check if authentication is required
    ws.send(json.dumps({"request-type": "GetAuthRequired", "message-id": "1"}))
    auth_response = json.loads(ws.recv())

    if auth_response['authRequired']:
        password = "PASSWORD"
        salt = auth_response['salt']
        challenge = auth_response['challenge']

        # Generate the secret
        hashed_password = hashlib.sha256(password.encode('utf-8')).hexdigest()
        combined = salt + hashed_password
        hashed_combined = hashlib.sha256(combined.encode('utf-8')).hexdigest()
        secret = base64.b64encode(hashlib.sha256((challenge + hashed_combined).encode('utf-8')).hexdigest().encode('utf-8')).decode('utf-8')
        
        # Authenticate
        ws.send(json.dumps({
            "request-type": "Authenticate",
            "auth": secret,
            "message-id": "2"
        }))
        auth_status = json.loads(ws.recv())
        if 'status' in auth_status and auth_status['status'] != 'ok':
            print("Authentication failed:", auth_status)
            ws.close()
            return

    # Stop recording
    ws.send(json.dumps({
        "request-type": "StopRecording",
        "message-id": "3"
    }))

    ws.close()

if __name__ == "__main__":
    stop_obs_recording()
