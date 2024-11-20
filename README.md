# Angular Frontend with Hexagonal Architecture and WebSocket Integration

This is the frontend part of the project built with Angular, following a hexagonal architecture pattern. The application consumes WebSockets using the `stompjs` library to communicate with the backend microservices.

## Features

- **Hexagonal Architecture**: The frontend follows the hexagonal architecture, ensuring separation of concerns and maintainability.
- **WebSocket Integration**: Real-time communication with the backend using the `stompjs` library over WebSockets.
- **Angular Framework**: Built using Angular for efficient, scalable, and maintainable frontend development.
- **Responsive Design**: The project is designed to be responsive using **PrimeNG** for styling.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [Angular CLI](https://angular.io/cli) (latest version)
- [WebSocket server] (Backend microservices need to be running to provide the WebSocket connection)

## Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/MrCadavid/eventsApp
    cd your-angular-project
    ```

2. Install the necessary dependencies:

    ```bash
    npm install
    ```

## Running the Application

To run the application in development mode, follow these steps:

1. Make sure your backend microservices are running and accessible.
   
2. Start the Angular development server:

    ```bash
    ng serve
    ```

3. Open your browser and navigate to `http://localhost:4200` to view the application.

## WebSocket Integration

This project uses **STOMP over WebSockets** for real-time communication with the backend.

