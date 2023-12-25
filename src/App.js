import React, { useEffect, useState } from "react";

const SpeechToTextComponent = () => {
  const [recognizedText, setRecognizedText] = useState("");

  useEffect(() => {
    // Check browser support for the Web Speech API
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      // Create SpeechRecognition object
      const recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();

      // Configure recognition settings
      recognition.lang = "en-US"; // Set language
      recognition.continuous = true; // Enable continuous mode

      // Handle recognition result event
      recognition.onresult = (event) => {
        const transcript =
          event.results[event.results.length - 1][0].transcript;
        setRecognizedText(transcript);
      };

      // Start recognition
      recognition.start();

      // Clean up on component unmount
      return () => {
        recognition.stop();
      };
    } else {
      // Web Speech API not supported, handle fallback
      console.log("Web Speech API not supported");
    }
  }, []);

  return (
    <div>
      <h1>Speech-to-Text</h1>
      <p>Recognized Text: {recognizedText}</p>
    </div>
  );
};

export default SpeechToTextComponent;
