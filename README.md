# C++ Socket-Based Web Server Project || Roll no : 049 || UID : 2405054

## Project Overview
A dynamic web server implementation using C++ sockets, featuring an interactive grading interface designed for Professor Aaron. This project demonstrates both backend server capabilities and frontend user experience design.

## Technical Features

### Backend Implementation
- Custom HTTP server built in C++
- Multi-threaded client handling
- Static file serving (HTML, CSS, JavaScript)
- WebSocket implementation for real-time interactions

### Frontend Components
1. **Interactive Interface**
   - Dynamic greeting system
   - Mood selection interface
   - Automated grading system
   - Real-time animations and transitions

2. **Audio-Visual Elements**
   - Web Audio API integration
   - CSS3 animations
   - Dynamic particle effects
   - Interactive slider components

## Technologies Used
- **Backend:** C++, Winsock2
- **Frontend:** HTML5, CSS3, JavaScript
- **APIs:** Web Audio API
- **Protocols:** HTTP/1.1

## Project Structure
```
project/
│
├── webserver.cpp     | Main server implementation
├── index.html        | Main webpage
├── style.css         | Styling definitions
├── script.js         | Client-side logic
└── README.md         | Documentation
```

## Setup Instructions

### Prerequisites
- C++ Compiler (MinGW/g++)
- Web Browser (Chrome/Firefox recommended)
- Windows OS

### Compilation
```bash
g++ webserver.cpp -o myserver.exe -lws2_32
```

### Execution
1. Start the server:
   ```bash
   .\myserver.exe
   ```

2. Access the application:
   ```
   http://localhost:3000
   ```

## Features in Detail

### 1. Grading Interface
- Automated grade optimization
- Visual feedback system
- Interactive sliding mechanism

### 2. Response System
- Dynamic content generation
- Real-time visual feedback
- Audio response integration

### 3. User Experience
- Intuitive interface design
- Smooth animations
- Responsive layout

## Technical Implementation
The server utilizes socket programming to handle HTTP requests, serving static files and managing client connections through multi-threading. The frontend implements modern web technologies for an engaging user experience.

---
*Thank You!*
---
*Made with LOVE for AARON SIR by SHREYAS BHANDARY*
