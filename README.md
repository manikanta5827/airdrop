# Solana Devnet Airdrop

A modern React application that allows users to request SOL tokens on the Solana Devnet. Built with React, Tailwind CSS, and the Solana RPC API.

## Features

- Request 2 SOL tokens on Solana Devnet
- Real-time transaction status updates
- Modern, responsive UI with animations
- Input validation for Solana addresses
- Error handling and user feedback

## Tech Stack

- React.js
- Tailwind CSS
- Axios for API requests
- Solana Devnet RPC API

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd solana-airdrop
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## How It Works

1. **User Input**: Enter your Solana public key in the input field
2. **Validation**: The app validates the Solana address format
3. **Airdrop Request**: Sends a request to Solana Devnet RPC endpoint
4. **Transaction**: Processes the airdrop request (2 SOL)
5. **Feedback**: Displays transaction status and signature

## API Endpoint

The application uses the Solana Devnet RPC endpoint:
```
https://api.devnet.solana.com
```

## Development

Built with:
- Create React App
- Tailwind CSS for styling
- Modern React practices (hooks, functional components)

## License

MIT
