# OBS Control Panel

## Introduction

OBS Control Panel is a dynamic website that leverages a range of technologies to provide remote control over OBS Studio. It uses PHP for server-side logic and handling requests, HTML and CSS for structuring and styling the frontend, JavaScript for dynamic actions and client-side logic, and Python scripts to support backend tasks. The integration with OBS WebSocket enables the remote control of OBS Studio. Users can input an athlete's name and a unique athlete ID, using the 'Save Filename' button to automatically format the filename of the next recorded video. The Start/Stop Recording buttons on the website allow users to remotely control OBS Studio's recording features, and a status box indicates the actions taking place in real-time.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Documentation](#documentation)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)
- [License](#license)

## Installation

1. Ensure that OBS Studio 30.0.2 and OBS WebSocket 4.x are installed on your system.
2. Clone the repository or download the project files to your local machine.
3. Use the provided Dockerfile to build and run the container, which sets up the necessary environment.

   ```bash
   docker build -t obs-control-panel .
   docker run -p 80:80 obs-control-panel
   ```

## Usage

1. Open OBS Studio
2. Open the OBS Control Panel in a web browser.
3. Input the athlete's name and unique ID in the provided fields.
4. Use the 'Save Filename' button to set the filename for the next recording.
5. Control the recording in OBS Studio using the 'Start Recording' and 'Stop Recording' buttons.
6. Monitor the status box for updates on actions being performed.

## Features

- Remote control of OBS Studio's recording features.
- Dynamic filename setting for recordings based on athlete's name and ID.
- Real-time status updates on actions being performed.

#### start_recording.py
This Python script is responsible for starting the recording in OBS Studio via a WebSocket connection. Key functionalities include:

- **WebSocket Connection**: 
  ```python
  ws = websocket.create_connection("ws://localhost:PORT")
  ```
  
- **Authentification**:
  ```python
  ws.send(json.dumps({"request-type": "GetAuthRequired", "message-id": "1"}))
  response = ws.recv()
  password = "PASSWORD"
  salt = response['d']['authentication']['salt']
  challenge = response['d']['authentication']['challenge']
  ```

- **Filename Formatting and Start Recording**:
  ```python
  timestamp_format = datetime.datetime.now().strftime("%Y-%m-%d %H-%M-%S")
  formatted_filename = f"{filename}_{timestamp_format}"
  ws.send(json.dumps({"request-type": "StartRecording", "message-id": "4"}))
  ```

### stop_recording.py
This script complements `start_recording.py` by stopping the recording in OBS Studio:

- **WebSocket Connection**:
  ```python
  ws = websocket.create_connection("ws://localhost:PORT")

- **Authentification**:
  ```python
  if auth_response['authRequired']:
      password = "PASSWORD"
      # ... authentication logic ...
  ```

- **Stop Recording**:
  ```python
  ws.send(json.dumps({"request-type": "StopRecording", "message-id": "3"}))
  ```

## Dependencies

- PHP 8.2.12
- Apache (as part of the PHP Docker image)
- OBS Studio 30.0.2
- OBS WebSocket 4.x
- Python for running backend scripts

## Configuration

- Ensure the WebSocket server details in `start_recording.py` and `stop_recording.py` are configured correctly to match your OBS WebSocket settings.
- Update the Dockerfile if necessary to match your deployment environment.