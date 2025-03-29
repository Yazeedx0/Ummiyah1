import { useEffect, useRef, useState, useCallback } from 'react';

interface SpeechRecognitionOptions {
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
  onFinalTranscript?: (transcript: string) => void;
}

export const useSpeechRecognition = ({
  language = 'ar-SA',
  continuous = true,
  interimResults = true,
  onFinalTranscript
}: SpeechRecognitionOptions = {}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const finalTranscriptRef = useRef<string>('');
  const interimTranscriptRef = useRef<string>('');
  const continuousRef = useRef<boolean>(continuous);

  // Initialize recognition object
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = 
      window.SpeechRecognition || 
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      console.warn('Speech Recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = continuous;
    recognition.interimResults = interimResults;
    recognition.lang = language;

    // Handle recognition results
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      interimTranscriptRef.current = '';
      finalTranscriptRef.current = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        
        if (event.results[i].isFinal) {
          finalTranscriptRef.current += transcript;
        } else {
          interimTranscriptRef.current += transcript;
        }
      }
      
      const fullTranscript = finalTranscriptRef.current + interimTranscriptRef.current;
      setTranscript(fullTranscript);
      
      // If we have a final transcript and callback, call it
      if (finalTranscriptRef.current && onFinalTranscript) {
        onFinalTranscript(finalTranscriptRef.current);
      }
    };

    // Handle errors
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech Recognition Error:', event.error);
      if (event.error === 'not-allowed') {
        setIsListening(false);
      }
    };

    // Auto-restart if continuous is enabled
    recognition.onend = () => {
      if (isListening && continuousRef.current) {
        try {
          recognition.start();
        } catch (error) {
          console.error('Failed to restart recognition:', error);
          setIsListening(false);
        }
      } else {
        setIsListening(false);
        // When recognition ends normally, trigger the final transcript callback
        if (finalTranscriptRef.current && onFinalTranscript) {
          onFinalTranscript(finalTranscriptRef.current);
          finalTranscriptRef.current = '';
        }
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (error) {
          // Ignore errors on cleanup
        }
      }
    };
  }, [language, continuous, interimResults, onFinalTranscript, isListening]);

  // Start listening function
  const startListening = useCallback(() => {
    if (!recognitionRef.current || !isSupported) return;
    
    setTranscript('');
    finalTranscriptRef.current = '';
    interimTranscriptRef.current = '';
    continuousRef.current = continuous;
    
    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
    }
  }, [isSupported, continuous]);

  // Stop listening function
  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    
    continuousRef.current = false;
    
    try {
      recognitionRef.current.stop();
      setIsListening(false);
    } catch (error) {
      console.error('Failed to stop speech recognition:', error);
      setIsListening(false);
    }
  }, []);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    isSupported
  };
};

// Add type declarations for Speech Recognition API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}
