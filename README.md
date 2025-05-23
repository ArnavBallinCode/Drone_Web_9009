# 🚀 Drone_Web_9009  
**An advanced telemetry and monitoring system for real-time MAVLink data visualization and drone calibration.**  

## 🔥 Overview  
Drone_Web_9009 is the next-generation web-based **UAV telemetry dashboard**, developed over the earlier [Drone_Web_Interface_909](https://github.com/ArnavBallinCode/Drone_Web_Interface_909). It is designed for real-time data visualization and calibration from drones using **MAVLink**. The system integrates with **Jetson and Pixhawk** and now features:  
- **3D Data Visualization** 📊  
- **Full TypeScript & React-based UI** 🎨  
- **Real-time MAVLink telemetry processing** ⏳  
- **Mission Planner-style calibration via WebSocket** 🛰️  
- **Optimized for both mobile and desktop** 💻📱  

> **Note:** This project (9009) is a direct evolution of the previous [909 version](https://github.com/ArnavBallinCode/Drone_Web_Interface_909), with enhanced calibration, improved architecture, and more robust real-time features.

---

## 🔄 **Project Evolution: From Basic Web UI to 9009**  

### 🌟 **Previous Versions**  
- **Drone_Web_Interface_909:** Modern TypeScript/React/3D telemetry dashboard ([View Here](https://github.com/ArnavBallinCode/Drone_Web_Interface_909))
- **IROC_WEB_INTERFACE:** Original UI (HTML, CSS, JS) ([View Here](https://github.com/ArnavBallinCode/IROC_WEB_INTERFACE))
- **ISRO_IROC_Web:** Backend scripts (Python + MAVLink) ([View Here](https://github.com/ArnavBallinCode/ISRO_IROC_Web))
- **ISRO_IROC_Webinterface:** Older telemetry interface (Python-based) ([View Here](https://github.com/ArnavBallinCode/ISRO_IROC_Webinterface))

---

## ⚙️ **How It Works**  

### 🎯 **System Architecture**  
1️⃣ **Telemetry Data Flow**  
   - A **Python script (`listen.py`)** reads MAVLink telemetry and writes `.json` files in `public/params/`.  
   - The React-based frontend reads these JSON files and updates the UI dynamically.  

2️⃣ **Calibration Workflow (WebSocket-based)**
   - The frontend calibration UI connects to a Python WebSocket server (`calibration_ws_server.py`) at `ws://localhost:8765`.
   - When you trigger a calibration (Gyro, Accel, Compass, Radio, Level) from the UI, a command is sent over WebSocket.
   - The backend receives the command and sends the appropriate MAVLink calibration command to the drone via `/dev/tty.usbserial-<ID>`.
   - The backend sends status/progress updates back to the frontend, which are displayed in real time (just like Mission Planner).

3️⃣ **Frontend (React + TypeScript)**  
   - Fetches and processes telemetry from `/public/params/`.  
   - Uses **Three.js** for **3D drone movement & attitude representation**.  
   - Displays real-time battery, altitude, and position data.  
   - Provides a calibration UI for all major sensors, with live feedback.

4️⃣ **Backend (Python + MAVLink + WebSocket)**  
   - Uses `pymavlink` to listen to drone telemetry and handle calibration commands.  
   - Converts MAVLink messages into structured `.json` files.  
   - Runs a WebSocket server to bridge calibration commands between the frontend and the drone.

---

## 🚀 **Installation & Setup**  

### 📌 **1. Clone the Repository**  
```sh
git clone https://github.com/ArnavBallinCode/Drone_Web_9009.git
cd Drone_Web_9009
```

---

## 🛠 **2. Setting Up the TypeScript Project**  

1️⃣ Install **Node.js** (latest LTS) from [nodejs.org](https://nodejs.org/)  
2️⃣ Install dependencies:  
```sh
npm install
```
3️⃣ Start the React development server:  
```sh
npm run dev
```
4️⃣ Open `http://localhost:3000/` (or `3001` if 3000 is in use) in your browser.  

---

## 🛰 **3. Running MAVLink Telemetry Data Collection**  
1️⃣ Connect Pixhawk/Jetson via USB (e.g., `/dev/tty.usbserial-D30JKVZM`)  
2️⃣ Run the Python script:  
```sh
python3 listen.py --connection /dev/tty.usbserial-D30JKVZM --baud 57600
```
3️⃣ Data will be written to `public/params/`.  

---

## 🛠 **4. Running the Calibration WebSocket Server**
1️⃣ Ensure you have Python 3.8+ and install dependencies:
```sh
pip install websockets pymavlink
```
2️⃣ Start the calibration server:
```sh
python calibration_ws_server.py
```
- The server will connect to your drone via `/dev/tty.usbserial-D30JKVZM` at 57600 baud.
- It will listen for calibration commands from the frontend on `ws://localhost:8765`.

---

## 📡 **5. Viewing the Telemetry Dashboard & Calibration**  
Once the frontend and both Python scripts are running:  
- Open **`http://localhost:3000/`** (or `3001`) in your browser.  
- You will see **real-time drone telemetry, battery status, GPS, IMU data, and a 3D model** representing the drone's movement.  
- Go to the **Calibration** page to perform Gyroscope, Accelerometer, Compass, Radio, and Level calibrations.  
- Calibration status and progress will be shown live in the UI.

---

## 📝 **Calibration Workflow Details**
- The frontend sends a calibration command (e.g., Gyro, Accel, Compass, Radio, Level) via WebSocket.
- The backend receives the command and sends the corresponding MAVLink command to the drone.
- The backend sends status/progress updates back to the frontend.
- The workflow is similar to Mission Planner, providing a seamless calibration experience.

---

## 🎯 **Upcoming Features**  
✅ WebSocket-based real-time updates (instead of polling JSON files)  
✅ AI-powered anomaly detection for UAV telemetry  
✅ Enhanced **3D mapping using LiDAR & SLAM data**  

---

## 👨‍💻 **Contributing**  
1️⃣ Fork the repository  
2️⃣ Create a new branch (`feature-xyz`)  
3️⃣ Commit your changes (`git commit -m "Added XYZ feature"`)  
4️⃣ Push and submit a PR 🚀  

---
## License
This project is **not open-source**. All rights are reserved by the author. No part of this repository may be used or reproduced without explicit permission from **Arnav Angarkar**.

---

## 📞 **Contact & Support**  
If you need help, open an issue in the repo or reach out via:  
📧 **Email:** 24bcs015@iiitdwd.ac.in  

# Team NJORD - Drone Web Interface

## Project Overview
A sophisticated web interface for monitoring and controlling Pixhawk-based drones using MAVLink protocol. This project provides real-time telemetry data visualization, sensor calibration capabilities, and comprehensive system monitoring.

## Team Members
- **Arnav Angarkar** 
- **Saurav Karki** 
- **Krishna Sai** 
- **Gourav Purohit** 
- **Ranjith Babu** 
- **Lohith B**


![Team NJORD with Director](Team_Dir_Image.jpeg)

## Features
- Real-time telemetry data monitoring
- Comprehensive system health tracking
- Advanced sensor calibration interface
- Robust MAVLink communication
- Web-based control interface

## System Specifications

### Connection Parameters
- **Baud Rate**: 57600 bps
- **Protocol**: MAVLink 2.0
- **Connection Type**: Serial/Telemetry

### Monitored Parameters
1. **Battery Status**
   - Voltage: 11.8V
   - Current: 4.2A
   - Capacity Used: 1240mAh
   - Time Remaining: ~22min
   - Charge Level: 78%

2. **Communication Metrics**
   - Signal Strength: 92%
   - Link Quality: 98%
   - Data Rate: 57.6 kbps
   - Packet Loss: 0.2%

3. **System Health**
   - CPU Load: 24%
   - Memory Usage: 32%
   - Temperature: 32°C
   - Storage: 45% used
   - Overall Status: Normal

## Technical Architecture

### Frontend
- React.js for dynamic UI
- WebSocket for real-time data updates
- Chart.js for telemetry visualization

### Backend
- Python-based MAVLink communication
- WebSocket server for real-time data transmission
- JSON-based data storage and retrieval

### Data Flow
1. MAVLink messages from Pixhawk
2. Python script processing (`listen.py`)
3. WebSocket transmission
4. React frontend visualization

## Installation & Setup

### Prerequisites
```bash
# Python dependencies
pip install pymavlink websockets asyncio json

# Node.js dependencies
npm install
```

### Running the System
1. Start the MAVLink listener:
```bash
python3 listen.py --connection /dev/tty.usbserial-* --baud 57600
```

2. Launch the web interface:
```bash
npm run dev
```

## Monitored Parameters

### Attitude Data
- Roll, Pitch, Yaw angles
- Angular velocities
- Orientation quaternions

### Position Data
- Local position (NED frame)
- Global position (GPS coordinates)
- Velocity vectors

### IMU Data
- Raw accelerometer readings
- Gyroscope data
- Magnetometer measurements

### System Status
- Heartbeat messages
- System mode
- Armed status
- Flight mode

## Calibration Features
- Gyroscope calibration
- Accelerometer calibration
- Magnetometer calibration
- Level horizon calibration

## Future Enhancements
1. Autonomous mission planning
2. 3D visualization of drone attitude
3. Advanced flight data logging
4. Machine learning-based anomaly detection
5. Enhanced security features

## Acknowledgments
Special thanks to our Director for their guidance and support in making this project possible.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
For any queries regarding the project, please contact Team NJORD members.


