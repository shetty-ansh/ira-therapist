# ira - Virtual Therapist App

A full-stack virtual assistant application that combines Google's Gemini AI for text responses and ElevenLabs for text-to-speech conversion.

## Features

- 🤖 **AI Chat**: Powered by Google Gemini AI for intelligent conversations
- 🔊 **Text-to-Speech**: ElevenLabs integration for natural voice responses
- 💬 **Real-time Chat**: Interactive chat interface with message history
- 🎨 **Modern UI**: Responsive design with beautiful animations

## Tech Stack

### Backend
- **Node.js** with Express.js
- **Google Gemini AI** API for text generation
- **ElevenLabs** API for text-to-speech
- **CORS** enabled for frontend communication

### Frontend
- **Angular 20** with TypeScript
- **Responsive CSS** with modern design
- **HTTP Client** for API communication
- **Reactive Forms** for user input

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API key
- ElevenLabs API key

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd iraApp2
```

### 2. Install Backend Dependencies
```bash
npm install
```

### 3. Install Frontend Dependencies
```bash
cd iraApp
npm install
```

### 4. Environment Configuration
Create a `.env` file in the root directory:
```env
# Gemini API Key
GEMINI_API=your_gemini_api_key_here

# ElevenLabs API Key
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here

# Server Port
PORT=3000
```

### 5. Get API Keys

#### Google Gemini API
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key to your `.env` file

#### ElevenLabs API
1. Go to [ElevenLabs](https://elevenlabs.io/)
2. Sign up and get your API key
3. Copy the key to your `.env` file

### 6. Start the Backend Server
```bash
# From the root directory
npm run dev
```

The server will start on `http://localhost:3000`

### 7. Start the Frontend Application
```bash
# From the iraApp directory
cd iraApp
ng serve
```

The application will be available at `http://localhost:4200`

## Usage

1. **Open the Application**: Navigate to `http://localhost:4200`
2. **Start Chatting**: Type your message in the input field
3. **Send Message**: Click the send button or press Enter
4. **Listen to Response**: Ira will respond with both text and audio
5. **Voice Recording**: Click the microphone button (coming soon)

## API Endpoints

### POST `/chat`
Main chat endpoint for sending messages and receiving responses.

**Request:**
```json
{
  "prompt": "Hello, how are you?"
}
```

**Response:**
```json
{
  "success": true,
  "text": "Hello! I'm doing great, thanks for asking. How about you?",
  "audio": "base64_encoded_audio_data",
  "timestamp": "2024-01-01T12:00:00.000Z"
}

## Troubleshooting

### Common Issues

1. **API Key Errors**
   - Ensure your `.env` file is in the root directory
   - Verify API keys are correct and have proper permissions
   - Check console for specific error messages

2. **CORS Issues**
   - Backend has CORS enabled by default
   - Ensure frontend is running on the expected port

3. **Audio Not Playing**
   - Check browser console for errors
   - Ensure browser supports audio playback
   - Verify ElevenLabs API key is valid

4. **Frontend Not Loading**
   - Check if Angular CLI is installed globally
   - Verify all dependencies are installed
   - Check for TypeScript compilation errors

### Debug Mode

Enable debug logging by setting environment variables:
```env
DEBUG=true
NODE_ENV=development
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For support and questions:
- Check the troubleshooting section
- Review console logs for error messages
- Ensure all dependencies are properly installed
- Verify API keys and permissions

## Future Enhancements

- [ ] Multiple AI models support
- [ ] Real-time chat with multiple users
- [ ] Mobile app development
- [ ] Advanced audio controls and effects

Screenshots - 
<img width="1000" height="850" alt="image" src="https://github.com/user-attachments/assets/8ed39995-9535-4f23-a3a0-96ecaf7bb8f9" />

<img width="1000" height="850" alt="image" src="https://github.com/user-attachments/assets/263b1b00-11ff-4611-b180-84e668963d59" />






