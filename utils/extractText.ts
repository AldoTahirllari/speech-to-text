export const extractTextFromSSML = (ssml: string): string => {
  const textOnly = ssml.replace(/<\/?[^>]+(>|$)/g, '');

  const trimmedText = textOnly.trim();

  return trimmedText;
};
