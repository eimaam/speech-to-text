import { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { FaMicrophone, FaStop, FaArrowDown } from "react-icons/fa";
import { useSpeechSynthesis } from "react-speech-kit";
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";

interface ISpeechSynthesisVoice {
  default: boolean;
  lang: string;
  localService: boolean;
  name: string;
  voiceURI: string;
}

const DEFAULT_SAMPLE_TEXT = "Hi there! Welcome to SpeechMaster";

const App = () => {
  const { transcript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const { speak, speaking, cancel, voices } = useSpeechSynthesis();

  const [isListening, setIsListening] = useState<boolean>(false);
  const [showPanel, setShowPanel] = useState<boolean>(false);
  const [waveform, setWaveform] = useState([]);
  const [voiceIndex, setVoiceIndex] = useState<number>(47);
  const [loading, setLoading] = useState<boolean>(true);

  const englishVoices: SpeechSynthesisVoice[] = voices.filter(
    (voice: ISpeechSynthesisVoice) => voice.lang.toLowerCase().includes("en")
  );

  const selectedVoice: ISpeechSynthesisVoice = englishVoices[voiceIndex];

  const startListening = () => {
    setIsListening(true);
    cancel();
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
  };

  const initiateSpeech = () => {
    stopListening();
    speak({ text: transcript || DEFAULT_SAMPLE_TEXT, voice: selectedVoice });
  };

  const toggleVoiceSelectionPanel = () => {
    setShowPanel(!showPanel);
  };

  const handleVoiceSelection = (voiceIndex: number) => {
    stopListening();
    cancel();
    setVoiceIndex(voiceIndex);
    setShowPanel(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    let intervalId;
    if (!listening) {
      intervalId = setInterval(() => {
        const newWaveform = Array.from(
          { length: 20 },
          () => Math.random() * 20
        );
        setWaveform(newWaveform);
      }, 100);
    } else {
      clearInterval(intervalId);
      setWaveform([]);
    }
    return () => clearInterval(intervalId);
  }, [isListening]);

  if (!browserSupportsSpeechRecognition) {
    return window.alert("Your browser does not support speech recognition");
  }

  return (
    <div className="w-screen text-center flex flex-col items-center h-screen justify-center bg-gray-100">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <div className="loader" />
        </div>
      ) : (
        <>
          <header className="w-full py-8 bg-blue-600 text-white">
            <h1 className="text-4xl font-bold">SpeechMaster</h1>
            <p className="mt-2  !italic">
              speech-to-text and text-to-speech tool
            </p>
          </header>

          <main className="w-full max-w-3xl p-8 bg-white shadow-lg rounded-lg mt-8">
            <div className="flex flex-col items-center mb-8">
              <h2 className="text-2xl font-semibold mb-4">Speech-to-Text</h2>
              <div className="w-full border text-left rounded p-4 bg-gray-50">
                {transcript || "Your speech will appear here..."}
                {isListening && (
                  <div className="flex space-x-1 mt-4">
                    {waveform.map((height, index) => (
                      <div
                        key={index}
                        className="w-1 bg-primary"
                        style={{ height: `${height}px` }}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
              <div className="mt-4">
                {!listening ? (
                  <button
                    className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600"
                    onClick={startListening}
                  >
                    <FaMicrophone className="h-6 w-6" />
                  </button>
                ) : (
                  <button
                    className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
                    onClick={stopListening}
                  >
                    <FaStop className="h-6 w-6" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center mb-8">
              <h2 className="text-2xl font-semibold mb-4">Text-to-Speech</h2>
              <div className="w-full flex items-center justify-between p-4 bg-gray-50 border rounded">
                {!speaking ? (
                  <button
                  title="Start Speaking"
                    onClick={initiateSpeech}
                    className="bg-green-500 text-white rounded-full p-2 hover:bg-green-600"
                  >
                    <HiMiniSpeakerWave className="h-6 w-6" />
                  </button>
                ) : (
                  <button
                  title="Stop Speaking"
                    onClick={cancel}
                    className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
                  >
                    <HiMiniSpeakerXMark className="h-6 w-6" />
                  </button>
                )}
                {selectedVoice?.name}
                <button
                title="Show Voice Selection Panel"
                  onClick={toggleVoiceSelectionPanel}
                  className="ml-4 bg-gray-300 text-gray-800 rounded-full p-2 hover:bg-gray-400"
                >
                  <FaArrowDown className="h-6 w-6" />
                </button>
              </div>
              {showPanel && (
                <div className="w-full bg-white border rounded mt-2 shadow-md">
                  {englishVoices.slice(0, 10).map((voice, index) => (
                    <button
                    title="Voice Option"
                      key={index}
                      onClick={() => handleVoiceSelection(index)}
                      className="block w-full text-left p-2 hover:bg-gray-100"
                    >
                      {voice.name} ({voice.lang})
                    </button>
                  ))}
                </div>
              )}
            </div>
          </main>

          <footer className="w-full bottom-0 absolute py-4 bg-gray-800 text-white mt-8">
            <p>
              © 2024 SpeechMaster. <br />
              All rights reserved.
            </p>
          </footer>
        </>
      )}
    </div>
  );
};

export default App;
