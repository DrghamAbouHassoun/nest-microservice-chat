# Chat Application

This is a chat application created using NestJS for the backend and React.js for the frontend. The backend is designed as a microservice architecture with various services to handle different functionalities.

## Backend Services

### API Service
The API service handles all API requests and includes a Socket.IO gateway to manage user communication.

### Email Service
The email service is responsible for sending emails.

### Logging Service
The logging service saves user actions and logs errors.

## Running the Application

To run the application, follow these steps:

1. Start the API Service:
    ```bash
    cd api-service && npm run start:dev
    ```

2. Start the Email Service:
    ```bash
    cd email-service && npm run start:dev
    ```

3. Start the Logging Service:
    ```bash
    cd logger-service && npm run start:dev
    ```

4. Start the Frontend:
    ```bash
    cd chat-frontend && npm run start
    ```

## Frontend

The frontend of the application is built using React.js. To start the frontend, navigate to the `chat-frontend` directory and run the following command:

```bash
cd chat-frontend && npm run start