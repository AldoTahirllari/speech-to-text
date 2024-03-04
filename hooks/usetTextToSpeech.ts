import { useEffect, useState } from 'react';

interface SpeechOptions {
  lang: string;
  pitch: number;
  rate: number;
  volume: number;
}

interface SpeechConfig {
  textChunk: string[];
  options: SpeechOptions;
}

export const useTextToSpeech = ({ textChunk, options }: SpeechConfig) => {
  const [text, setText] = useState<string>(textChunk.join(' '));
  const [language, setLanguage] = useState<string>(options.lang);
  const [pitch, setPitch] = useState<number>(options.pitch);
  const [rate, setRate] = useState<number>(options.rate);
  const [volume, setVolume] = useState<number>(options.volume);
  const [articulation, setArticulation] =
    useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setText(textChunk.join(' '));
    setLanguage(options.lang);
    setPitch(options.pitch);
    setRate(options.rate);
    setVolume(options.volume);
  }, [options]);

  useEffect(() => {
    if (text && language && pitch && rate && volume) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.pitch = pitch;
      utterance.rate = rate;
      utterance.volume = volume;
      setArticulation(utterance);
    }
  }, [text, language, pitch, rate, volume]);

  const speak = () => {
    if (articulation && 'speechSynthesis' in window) {
      speechSynthesis.speak(articulation);
    } else {
      console.error('Speech synthesis not supported in this browser.');
    }
  };

  const pause = () => {
    speechSynthesis.pause();
  };

  const stop = () => {
    speechSynthesis.cancel();
  };

  const resume = () => {
    speechSynthesis.resume();
  };

  return {
    start: speak,
    pause,
    stop,
    resume,
    articulation,
  };
};
