interface TextSegmentInterface {
  (text: string, from: number, to: number): string[];
}

export const splitText: TextSegmentInterface = (
  text: string,
  from: number,
  to: number,
) => [text.slice(0, from), text.slice(from, to), text.slice(to)] as string[];
