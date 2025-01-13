
import React, { useState, useEffect } from "react";
import "./Combinetts.css";
import  ThemeToggle from '../TTS/ThemeToggle';
import HistoryList from '../TTS/HistoryList';
import TextInput from '../TTS/TextInput';
import VoiceControl from '../TTS/VoiceControl';
import ActionButtons from '../TTS/ActionButtons'; 
import Nabvar from '../Navbar';
//import API_KEY from '../../config';
  function App() {
    const [text, setText] = useState("");
    const [voice, setVoice] = useState("en-US");
    const [rate, setRate] = useState(1);
    const [pitch, setPitch] = useState(1);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [history, setHistory] = useState([]);
    const [darkMode, setDarkMode] = useState(false);
    const [answer, setAnswer] = useState("");
    //const [error, setError] = useState(""); 
  
    const voices = [
      { name: "en-US", label: "English (US)" },
  { name: "en-GB", label: "English (UK)" },
  { name: "en-AU", label: "English (Australia)" },
  { name: "en-CA", label: "English (Canada)" },
  { name: "en-IN", label: "English (India)" },
  { name: "fr-FR", label: "French (France)" },
  { name: "de-DE", label: "German (Germany)" },
  { name: "es-ES", label: "Spanish (Spain)" },
  { name: "it-IT", label: "Italian (Italy)" },
  { name: "pt-PT", label: "Portuguese (Portugal)" },
  { name: "zh-CN", label: "Chinese (Mandarin)" },
  { name: "ja-JP", label: "Japanese (Japan)" },
  { name: "ko-KR", label: "Korean (South Korea)" },
  { name: "hi-IN", label: "Hindi (India)" },
  { name: "ar-SA", label: "Arabic (Saudi Arabia)" },
  { name: "ru-RU", label: "Russian (Russia)" },
  { name: "tr-TR", label: "Turkish (Turkey)" }
    
    ];
  
    const handleChangeText = (newText) => {
      setText(newText);
    };
  
    const handleVoiceChange = (newVoice) => {
      setVoice(newVoice);
    };
  
    const handleRateChange = (newRate) => {
      setRate(newRate);
    };
  
    const handlePitchChange = (newPitch) => {
      setPitch(newPitch);
    };
  
    const handleSpeak = (textToSpeak) => {
      if (textToSpeak !== "") {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.voice = speechSynthesis.getVoices().find((voiceObj) => voiceObj.lang === voice);
        utterance.rate = rate;
        utterance.pitch = pitch;
  
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => {
          setIsSpeaking(false);
          addToHistory(textToSpeak);
          showToast();
        };
  
        speechSynthesis.speak(utterance);
      }
    };
  
    const handleStop = () => {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    };
  
    const handleReset = () => {
      setText("");
      setIsSpeaking(false);
      speechSynthesis.cancel();
    };
  
    const addToHistory = (newText) => {
      setHistory((prevHistory) => [newText, ...prevHistory]);
    };
  
    const toggleDarkMode = () => {
      setDarkMode((prevMode) => !prevMode);
    };
  
    const showToast = () => {
      const toast = document.createElement("div");
      toast.className = "toast";
      toast.textContent = "Enjoying the voice? Let us know!";
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    };
      const apiKey = "AIzaSyDZqjOHId1pnRr_f1-h7NzaWn_TVhmqqHM";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
  const fetchAnswer = async (query) => {
    if (!query.trim()) {
      //setError("Please enter a valid query.");
      return;
    }
  
    //setError(null);
    setAnswer("Fetching answer...");
  
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: query, 
                },
              ],
            },
          ],
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Failed to fetch answer.");
      }
      const data = await response.json();
      console.log("Response Data:", data);
      let generatedAnswer = data.candidates[0]?.content?.parts[0]?.text || "No response provided";
      console.log(generatedAnswer);
      generatedAnswer = generatedAnswer.replace(/\*/g, "");
      setAnswer(generatedAnswer);
      handleSpeak(generatedAnswer);
  
    } catch (err) {
      console.error("Error in fetchAnswer:", err);
      setAnswer("");
    }
  };
  
  const handleQuerySubmit = (e) => {
    e.preventDefault();
    fetchAnswer(text);
  };

  useEffect(() => {
    speechSynthesis.onvoiceschanged = () => {
      setVoice(speechSynthesis.getVoices()[0]?.lang || "en-US");
    };
  }, []);

  return (
    <>
    <Nabvar/>
    <div className={`AppT ${darkMode ? "dark" : "light"}`}>
      <div className="container">
        <h1>Text-to-Speech Converter</h1>
        <ThemeToggle toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <div className="content-wrapper">
          <div className="history-container">
          
            <HistoryList history={history} />
          </div>
          <div className="input-controls-container">
            <TextInput text={text} onTextChange={handleChangeText} />
            <form onSubmit={handleQuerySubmit}>
              <button type="submit">Get Answer</button>
            </form>
            <p>{answer && `Answer:  ${answer}`}</p> {}
            <div className="controls">
              <VoiceControl
                voice={voice}
                voices={voices}
                onVoiceChange={handleVoiceChange}
                rate={rate}
                onRateChange={handleRateChange}
                pitch={pitch}
                onPitchChange={handlePitchChange}
              />
            </div>
            <ActionButtons
              onSpeak={() => handleSpeak(text)}
              onStop={handleStop}
              onReset={handleReset}
              isSpeaking={isSpeaking}
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;



