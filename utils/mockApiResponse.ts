export const mockApiResponse = <T>(data: T, delay = 10): Promise<T> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
