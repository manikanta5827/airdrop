import React, { useState } from 'react';
import axios from 'axios';

const AirdropPage = () => {
  const [publicKey, setPublicKey] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isValidSolanaAddress = (address) => {
    // Solana addresses are 32-44 characters long and base58 encoded
    return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
  };

  const requestAirdrop = async () => {
    if (!publicKey) {
      setMessage('❌ Please enter a public key');
      return;
    }

    if (!isValidSolanaAddress(publicKey)) {
      setMessage('❌ Please enter a valid Solana public key');
      return;
    }
    
    setIsLoading(true);
    setMessage('Processing...');

    try {
      const response = await axios.post(
        'https://api.devnet.solana.com',
        {
          jsonrpc: '2.0',
          id: 1,
          method: 'requestAirdrop',
          params: [publicKey, 2 * 1e9], // 2 SOL (in lamports)
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const result = response.data.result;

      if (result) {
        setMessage(`✅ Airdrop successful! Tx Signature: ${result}`);
      } else {
        setMessage(`❌ Airdrop failed. Check your address and try again.`);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error?.message || error.message;
      setMessage(`❌ Error: ${errorMessage}`);
      console.error('Airdrop error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      requestAirdrop();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Solana Airdrop</h1>
            <p className="text-sm text-gray-600 mb-6">Request 2 SOL on Devnet</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="publicKey" className="block text-sm font-medium text-gray-700 mb-1">
                Public Key
              </label>
              <input
                id="publicKey"
                type="text"
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value.trim())}
                onKeyDown={handleKeyPress}
                placeholder="Enter your Solana public key"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                disabled={isLoading}
              />
            </div>

            <button
              onClick={requestAirdrop}
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition duration-200 ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Request Airdrop'
              )}
            </button>

            {message && (
              <div className={`mt-4 p-4 rounded-lg ${
                message.includes('✅') 
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : message.includes('❌')
                  ? 'bg-red-50 text-red-800 border border-red-200'
                  : 'bg-blue-50 text-blue-800 border border-blue-200'
              }`}>
                <p className="text-sm break-all">{message}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirdropPage; 