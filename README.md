# livekit-example

It demonstrates how to serve a static front end and provides an API endpoint for generating LiveKit access tokens.

## Prerequisites

- Node.js (v14 or newer)
- npm

## Installation

### Clone the Project

```
git clone https://github.com/rabee05/livekit-example.git
cd livekit-example
```

### Install Dependencies

Navigate to the project directory and install the necessary dependencies:

```
npm install
```

## Environment Configuration

Follow these steps to configure your environment variables:

- Copy and rename `.env.example` to `.env`:
  ```
  cp .env.example .env
  ```
- Open the `.env` file and include the following information:
  ```
  PORT=3000
  LIVEKIT_API_KEY=Your_LiveKit_API_Key_Here
  LIVEKIT_API_SECRET=Your_LiveKit_API_Secret_Here
  WS_SERVER= Your web socket server from livekit cloud
  ```

Ensure to replace `Your_LiveKit_API_Key_Here`, `WS_SERVER` and `Your_LiveKit_API_Secret_Here` with your actual LiveKit API key and secret.

## Running the Server

You can start the server in different modes depending on your needs:

### Debug Mode

To run the server with extended debugging output, use:

```
npm run debug
```

This command is useful for diagnosing issues during development.

### Development Mode

For development with live reloading:

```
npm run dev
```

This mode uses `nodemon` to automatically restart the server when files change, making it easier to test changes without manually restarting the server.

### Production Mode

To run the server in production:

```
npm start
```

This is the standard way to start the server for production use, without live reloading or extended debug output.

## License

MIT license
