#include <iostream>
#include <string>
#include <fstream>
#include <sstream>
#include <winsock2.h>
#include <ws2tcpip.h>
#include <windows.h>

#define PORT 3000

std::string get_content_type(const std::string& path) {
    if (path.length() >= 5 && path.substr(path.length()-5) == ".html") return "text/html";
    if (path.length() >= 4 && path.substr(path.length()-4) == ".css") return "text/css";
    if (path.length() >= 3 && path.substr(path.length()-3) == ".js") return "application/javascript";
    if (path.length() >= 4 && path.substr(path.length()-4) == ".mp3") return "audio/mpeg";
    return "text/plain";
}

// Function to handle HTTP requests
void handle_client(int client_socket) {
    char buffer[1024] = {0};
    recv(client_socket, buffer, 1024, 0);

    std::string request(buffer);
    std::cout << "Request:\n" << request << std::endl;

    // Extract the requested file path
    std::string file_path = ".";
    size_t path_start = request.find(" ") + 1;
    size_t path_end = request.find(" ", path_start);
    file_path += request.substr(path_start, path_end - path_start);

    // Default to index.html if root is requested
    if (file_path == "./") {
        file_path = "./index.html";
    }

    // Open and read the requested file
    std::ifstream file;
    file.open(file_path.c_str(), std::ios::binary);
    std::stringstream content;
    std::string response;

    if (file) {
        content << file.rdbuf();
        file.close();

        // Appropriate content type
        std::string content_type = get_content_type(file_path);

        // HTTP response
        response = "HTTP/1.1 200 OK\r\n";
        response += "Content-Type: " + content_type + "\r\n";
        response += "Cache-Control: no-cache, no-store, must-revalidate\r\n";
        response += "Pragma: no-cache\r\n";
        response += "Expires: 0\r\n";
        response += "Connection: close\r\n\r\n";
        response += content.str();
    } else {
        // File not found
        response = "HTTP/1.1 404 Not Found\r\n";
        response += "Content-Type: text/html\r\n";
        response += "Connection: close\r\n\r\n";
        response += "<h1>404 Not Found</h1>";
    }

    send(client_socket, response.c_str(), response.size(), 0);
    closesocket(client_socket);
}

DWORD WINAPI handle_client_thread(LPVOID lpParam) {
    int client_socket = (int)lpParam;
    handle_client(client_socket);
    return 0;
}

int main() {
    WSADATA wsaData;
    if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0) {
        std::cerr << "WSAStartup failed." << std::endl;
        return 1;
    }
    int server_socket, client_socket;
    struct sockaddr_in server_addr, client_addr;
    socklen_t addr_len = sizeof(client_addr);

    // Creating socket
    server_socket = socket(AF_INET, SOCK_STREAM, 0);
    if (server_socket == -1) {
        std::cerr << "Failed to create socket." << std::endl;
        return 1;
    }

    // Configure server address
    server_addr.sin_family = AF_INET;
    server_addr.sin_port = htons(PORT);
    server_addr.sin_addr.s_addr = INADDR_ANY;

    // Bind the socket to the address
    if (bind(server_socket, (struct sockaddr*)&server_addr, sizeof(server_addr)) < 0) {
        std::cerr << "Failed to bind socket." << std::endl;
        return 1;
    }

    // Listen for incoming connections
    if (listen(server_socket, 5) < 0) {
        std::cerr << "Failed to listen on socket." << std::endl;
        return 1;
    }

    std::cout << "Server listening on port " << PORT << std::endl;

    // Accept and handle incoming connections
    while (true) {
        client_socket = accept(server_socket, (struct sockaddr*)&client_addr, &addr_len);
        if (client_socket < 0) {
            std::cerr << "Failed to accept connection." << std::endl;
            continue;
        }

        // Handle the client in a separate thread
        CreateThread(NULL, 0, handle_client_thread, (LPVOID)client_socket, 0, NULL);
    }

    closesocket(server_socket);
    WSACleanup();
    return 0;
}