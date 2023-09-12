# OpenAI Personal Assistant Chatbot

## Overview

This is a simple chatbot created using the OpenAI API. It's designed to assist users with various tasks and answer questions based on the capabilities of the OpenAI GPT-3 model. 
Please note that this chatbot has not been deployed to a public server; however, the code is open source, and users can run it on their own systems.

## Getting Started

To run this chatbot on your local machine, follow these steps:

1. Clone this repository to your local machine:

```
git clone https://github.com/your-username/openai-chatbot.git
```

2. Navigate to the project directory:

3. Install dependencies for both the client and server:

```
cd client
npm install
cd ../server
npm install
```
4. Set up your OpenAI API credentials:

- Create a `.env` file in the `server` directory.
- Add your OpenAI API key to the `.env` file like this:

  ```
  OPENAI_API_KEY=your-api-key-goes-here
  ```

5. Run the development environment:

- Start the client (front-end) development server:

  ```
  cd ../client
  npm run dev
  ```

- Start the server (back-end) development server:

  ```
  cd ../server
  npm run server
  ```

6. Open your web browser and access the chatbot by navigating to `http://localhost:3000`.

## Usage

Once the chatbot is running locally, you can interact with it by typing messages and receiving responses. The chatbot uses the OpenAI GPT-3 model to generate responses based on the input it receives.

## Acknowledgments

- This project is powered by the OpenAI API.

Happy chatting!
