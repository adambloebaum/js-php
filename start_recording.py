import websocket
import json
import sys
import datetime
import hashlib
import base64

def start_obs_recording(filename):
    try:
        # Establish connection to OBS WebSocket
        ws = websocket.create_connection("ws://localhost:PORT")

        # Request authentication challenge
        ws.send(json.dumps({"request-type": "GetAuthRequired", "message-id": "1"}))
        response = ws.recv()
        if response:
            response = json.loads(response)

            # Authenticate if required
            if response.get('d', {}).get('authentication', {}).get('challenge'):
                password = "PASSWORD"
                salt = response['d']['authentication']['salt']
                challenge = response['d']['authentication']['challenge']
                hashed_password = hashlib.sha256((salt + password).encode('utf-8')).hexdigest()
                combined = challenge + hashed_password
                secret = base64.b64encode(hashlib.sha256(combined.encode('utf-8')).hexdigest().encode('utf-8')).decode('utf-8')

                ws.send(json.dumps({
                    "request-type": "Authenticate",
                    "auth": secret,
                    "message-id": "2"
                }))
                auth_response = ws.recv()
                if auth_response:
                    auth_response = json.loads(auth_response)
                    if auth_response['status'] != 'ok':
                        print("Authentication failed:", auth_response)
                        return
                    else:
                        print("Authentication successful.")
                else:
                    print("No response received for authentication.")
                    return
        else:
            print("No response received for authentication challenge.")
            return

        # Set filename formatting
        timestamp_format = datetime.datetime.now().strftime("%Y-%m-%d %H-%M-%S")
        formatted_filename = f"{filename}_{timestamp_format}"
        ws.send(json.dumps({
            "request-type": "SetFilenameFormatting",
            "filename-formatting": formatted_filename,
            "message-id": "3"
        }))
        formatting_response = ws.recv()
        if formatting_response:
            print("Filename formatting response:", json.loads(formatting_response))
        else:
            print("No response for filename formatting.")

        # Start recording
        ws.send(json.dumps({"request-type": "StartRecording", "message-id": "4"}))
        start_response = ws.recv()
        if start_response:
            print("Start recording response:", json.loads(start_response))
        else:
            print("No response or non-JSON response received for starting recording.")

    except Exception as e:
        print("An error occurred:", e)
    finally:
        # Close the WebSocket connection
        if 'ws' in locals():
            ws.close()

def main():
    if len(sys.argv) > 1:
        filename = sys.argv[1]
        start_obs_recording(filename)
    else:
        print("No filename provided.")
        return

if __name__ == "__main__":
    main()
