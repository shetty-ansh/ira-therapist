import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ChatResponse {
  success: boolean;
  text: string;
  audio: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class Gemini {
  
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  askGemini(prompt: string): Observable<ChatResponse> {
    console.log('Sending request to:', `${this.apiUrl}/`);
    console.log('Request payload:', { prompt });
    
    return this.http.post<ChatResponse>(`${this.apiUrl}`, { prompt });
  }
}
