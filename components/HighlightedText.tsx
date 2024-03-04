import React from 'react';

interface HighlightedTextProp {
  text: string;
  from: number;
  to: number;
}

export const HighlightedText: React.FC<HighlightedTextProp> = ({
  text,
  from,
  to,
}) => {
  const [start, highlight, finish] = splitText(text, from, to);

  return (
    <p>
      {start}
      <span style={{ backgroundColor: 'yellow' }}>{highlight}</span>
      {finish}
    </p>
  );
};

interface TextSegmentInterface {
  (text: string, from: number, to: number): string[];
}

export const splitText: TextSegmentInterface = (
  text: string,
  from: number,
  to: number,
) => [text.slice(0, from), text.slice(from, to), text.slice(to)] as string[];

export const extractTextFromSSML = (ssml: string): string => {
  const textOnly = ssml.replace(/<\/?[^>]+(>|$)/g, '');

  const trimmedText = textOnly.trim();

  return trimmedText;
};
