import json
import os
from pymavlink import mavutil
import time
import argparse

# Parse command line arguments
parser = argparse.ArgumentParser(description='MAVLink listener with UDP support')
parser.add_argument('--connection', type=str, default='udp:0.0.0.0:14550',
                    help='Connection string (e.g., udp:0.0.0.0:14550 or /dev/tty.usbserial-0001)')
parser.add_argument('--baud', type=int, default=57600,
                    help='Baud rate for serial connection')

args = parser.parse_args()

# Ensure the public/params directory exists
PARAMS_DIR = os.path.join('public', 'params')

os.makedirs(PARAMS_DIR, exist_ok=True)

def create_mavlink_connection():
    try:
        # For UDP connections
        if args.connection.startswith('udp:'):
            master = mavutil.mavlink_connection(args.connection)
            print(f"Established UDP connection on {args.connection}")
        # For serial connections
        else:
            master = mavutil.mavlink_connection(args.connection, baud=args.baud)
            print(f"Established serial connection on {args.connection} at {args.baud} baud")
        return master
    except Exception as e:
        print(f"Error establishing connection: {e}")
        return None

# Connect to MAVLink
master = create_mavlink_connection()
if not master:
    print("Failed to establish MAVLink connection. Exiting.")
    exit(1)

def check_heartbeat():
    print("Waiting for heartbeat...")
    master.wait_heartbeat()
    print("Heartbeat received, starting parameter monitoring...")
    return True

def write_param(param_type, timeout=0.5):
    try:
        # Request specific message type if possible
        # Not all message types support request, so this is a best effort
        try:
            master.mav.request_data_stream_send(
                master.target_system, master.target_component,
                mavutil.mavlink.MAV_DATA_STREAM_ALL, 4, 1)
        except Exception:
            pass
        
        # Wait for the specific message type with timeout
        param_data = master.recv_match(type=param_type, blocking=True, timeout=timeout)
        
        if param_data is not None:
            param_dict = param_data.to_dict()
            print(f"Received {param_type}: {param_dict}")
            
            # file_path = os.path.join('/public/params', f"{param_type.lower()}.json")
            file_path = os.path.join(PARAMS_DIR, f"{param_type}.json")

            with open(file_path, 'w') as json_file:
                json.dump(param_dict, json_file, indent=4)
            return param_dict
        else:
            print(f"No {param_type} message received within timeout")
            return None
    
    except Exception as e:
        print(f"Error writing param {param_type}: {e}")
        return None

# List of parameter types to monitor
param_types = [
    'ATTITUDE', 
    'AHRS', 
    'AHRS2', 
    'BATTERY_STATUS', 
    'HEARTBEAT',
    'DISTANCE_SENSOR', 
    'GLOBAL_POSITION_INT',  
    'RANGEFINDER',
    'RAW_IMU',  
    'SCALED_IMU2' ,
    'LOCAL_POSITION_NED'
]

# Wait for first heartbeat
check_heartbeat()

# Main loop
while True:
    for param_type in param_types:
        print(f"Waiting for {param_type}...")
        write_param(param_type)
    
    # Give some time between full cycle of parameters
    print("Completed cycle, waiting before next cycle...")
    time.sleep(1)