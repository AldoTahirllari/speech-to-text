import { HighlightedText } from '@/components/HighlightedText';
import { extractTextFromSSML } from '@/utils/extractText';
import { mockApiResponse } from '@/utils/mockApiResponse';
import { SSML } from '@/utils/ssml';
import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import { useTextToSpeech } from '../../hooks/usetTextToSpeech';

function Dashboard() {
  const [sentences, setSentences] = useState<string[]>([]);
  const [sentenceCount, setSentenceCount] = useState(2);
  const [lang, setLang] = useState<string>('en-US');
  const [textChunk, setTextChunk] = useState<string[]>([]);

  const [pitch, setPitch] = useState<number>(1);
  const [rate, setRate] = useState<number>(1);
  const [volume, setVolume] = useState<number>(1);
  const [ssml, setSSML] = useState<string>('');

  const [highlightSection, setHighlightSection] = React.useState({
    from: 0,
    to: 0,
  });

  useEffect(() => {
    const textchunk = sentences.slice(0, sentenceCount);

    setTextChunk(textchunk);
  }, [sentenceCount, sentences]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await mockApiResponse(SSML); // Fetch data
        const extractedText = extractTextFromSSML(response); // Extract text from response
        setSSML(extractedText); // Set the ssml state with the extracted text
        setSentences(
          extractedText.replace(/([.?!])\s*(?=[A-Z])/g, '$1|').split('|'),
        ); // Split text into sentences and set sentences state
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const loadMoreSentences = () => {
    const nextSentenceCount = sentenceCount + 2;
    setSentenceCount(nextSentenceCount);
  };

  const { start, pause, stop, resume, articulation } = useTextToSpeech({
    textChunk,
    options: { lang, pitch, rate, volume },
  });
  if (articulation) {
    articulation.addEventListener('boundary', ({ charIndex, charLength }) => {
      setHighlightSection({ from: charIndex, to: charIndex + charLength });
    });
  }

  const handleLangChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLang(event.target.value);
  };

  const handlePitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPitch(Number(event.target.value));
  };

  const handleRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRate(Number(event.target.value));
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setVolume(Number(event.target.value));

  return (
    <>
      <Container>
        <ContentContainer>
          {textChunk.map((sentence, id) => (
            <div key={id}>{sentence}</div>
          ))}
          {sentences.length > sentenceCount && (
            <button onClick={loadMoreSentences}>Load More</button>
          )}
          <select value={lang} onChange={handleLangChange}>
            <option value="en-US">English (US)</option>
            <option value="es-ES">Spanish (Spain)</option>
            <option value="tr-TR">Turkish (Turkey)</option>
          </select>
        </ContentContainer>

        <ConfigContainer>
          <Label>
            Pitch
            <input
              type="range"
              id="2"
              min="0.2"
              step="0.2"
              max="2"
              value={pitch}
              onChange={handlePitchChange}
            />
          </Label>
          <Label>
            Rate
            <input
              type="range"
              min="0.2"
              id="343"
              step="0.2"
              max="2"
              value={rate}
              onChange={handleRateChange}
            />
          </Label>
          <Label>
            Range
            <input
              type="range"
              min="0.2"
              id="23423532"
              max="2"
              step="0.2"
              value={volume}
              onChange={handleVolumeChange}
            />
          </Label>
        </ConfigContainer>
        <ButtonContainer>
          <Button onClick={start}>Speak</Button>
          <Button onClick={stop}>Stop</Button>
          <Button onClick={pause}>Pause</Button>
          <Button onClick={resume}>Resume</Button>
        </ButtonContainer>
      </Container>
      <HighlightedText text={textChunk.join(' ')} {...highlightSection} />
    </>
  );
}

export default Dashboard;

const Label = styled.label`
  display: flex;
`;

const Container = styled.div`
  display: grid;
  gap: 3rem;
  background-color: aliceblue;
`;

export const ContentContainer = styled.div`
  gap: 1rem;
  padding: 1rem 1rem 1rem 1rem;

  select {
    padding: 0.5rem;
  }
`;
export const ButtonContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 2rem;
`;
export const Button = styled.button`
  cursor: pointer;

  padding: 0.5rem;
  :hover {
  }
  border-radius: 20px;
  font-size: medium;
  background-color: antiquewhite;
`;

export const ConfigContainer = styled.div`
  display: grid;
  gap: 2rem;
  padding: 3rem 0 1rem 0;
`;

export const TextInput = styled.input`
  width: 70%;
`;
