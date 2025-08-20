import { Component, OnInit } from '@angular/core';
import { Gemini, ChatResponse } from '../../services/gemini';

@Component({
  selector: 'app-ira',
  templateUrl: './ira.html',
  styleUrls: ['./ira.css'],
  standalone: false
})
export class Ira implements OnInit {

  message: string = '';
  messages: Array<{text: string, sender: string, timestamp: Date}> = [];
  audioUrl: string | null = null;
  isLoading: boolean = false;
  errorMessage: string = '';
  private currentAudio: HTMLAudioElement | null = null;

  constructor(private geminiService: Gemini) {}

  ngOnInit() {
    console.log("IRA LOADED!");
    // Add welcome message
    this.messages.push({
      text: "Hello! I'm Ira, your virtual assistant. How can I help you today?",
      sender: "Ira",
      timestamp: new Date()
    });
  }

  sendMessage() {
    if (!this.message.trim() || this.isLoading) return;

    const userMessage = this.message.trim();
    this.messages.push({
      text: userMessage,
      sender: "You",
      timestamp: new Date()
    });

    this.isLoading = true;
    this.errorMessage = '';
    this.message = '';

    this.geminiService.askGemini(userMessage).subscribe({
      next: (response: ChatResponse) => {
        if (response.success && response.text) {
          this.messages.push({
            text: response.text,
            sender: "Ira",
            timestamp: new Date()
          });

          // Handle audio
          if (response.audio) {
            this.playAudio(response.audio);
          }
        } else {
          this.errorMessage = 'Failed to get response from Ira';
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error getting response:', error);
        this.errorMessage = 'Sorry, I encountered an error. Please try again.';
        this.isLoading = false;
      }
    });
  }

  private playAudio(audioBase64: string) {
    try {
      console.log('Received audio data length:', audioBase64.length);
      
      // Validate base64 string
      if (!audioBase64 || typeof audioBase64 !== 'string') {
        console.error('Invalid audio data received');
        return;
      }

      // Check if the string looks like valid base64
      if (!/^[A-Za-z0-9+/]*={0,2}$/.test(audioBase64)) {
        console.error('Invalid base64 format');
        return;
      }

      // Convert base64 to blob
      const byteCharacters = atob(audioBase64);
      const byteNumbers = new Array(byteCharacters.length);
      
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'audio/mpeg' });
      
      // Create audio URL
      if (this.audioUrl) {
        URL.revokeObjectURL(this.audioUrl); // Clean up previous URL
      }
      
      this.audioUrl = URL.createObjectURL(blob);
      console.log('Audio blob created, size:', blob.size);
      
      // Create and play audio
      const audio = new Audio(this.audioUrl);
      this.currentAudio = audio;
      
      // Set up audio event listeners
      audio.addEventListener('loadeddata', () => {
        console.log('Audio loaded, duration:', audio.duration);
        // Auto-play the audio
        audio.play().then(() => {
          console.log('Audio started playing automatically');
        }).catch(e => {
          console.log('Auto-play prevented by browser:', e);
          // Show user that they need to click to play
          this.errorMessage = 'Click the audio player below to hear Ira\'s response';
        });
      });
      
      audio.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        this.errorMessage = 'Error playing audio. Please try again.';
      });
      
      audio.addEventListener('ended', () => {
        console.log('Audio finished playing');
      });
      
      // Load the audio
      audio.load();
      
    } catch (error) {
      console.error('Error playing audio:', error);
      this.errorMessage = 'Error playing audio. Please try again.';
    }
  }

  playAudioAgain() {
    if (this.currentAudio) {
      this.currentAudio.currentTime = 0;
      this.currentAudio.play().catch(e => {
        console.log('Error playing audio again:', e);
      });
    }
  }

  stopAudio() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
    }
  }

  startRecording() {
    console.log('Voice recording started...');
    // TODO: Implement voice recording functionality
    this.errorMessage = 'Voice recording feature coming soon!';
  }

  clearMessages() {
    this.messages = [];
    if (this.audioUrl) {
      URL.revokeObjectURL(this.audioUrl);
      this.audioUrl = null;
    }
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    this.errorMessage = '';
    this.ngOnInit(); // Re-add welcome message
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
