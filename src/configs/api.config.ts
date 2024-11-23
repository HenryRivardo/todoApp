export const APIConfiguration = {
  baseURL: import.meta.env.VITE_BASE_API_URL as string,
  APIKey: import.meta.env.VITE_PRIVATE_API_KEY as string,
};
console.log('Base URL:', import.meta.env.VITE_BASE_API_URL);
console.log('API Key:', import.meta.env.VITE_PRIVATE_API_KEY);
