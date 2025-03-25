// lib/strapi/config.ts
export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
export const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
// console.log(STRAPI_URL, STRAPI_API_TOKEN);
// Fetch wrapper with error handling and token
export async function fetchAPI(endpoint, options) {
  const defaultOptions = {
    headers: {
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };
  const response = await fetch(`${STRAPI_URL}/api/${endpoint}`, mergedOptions);
  // console.log(response)
  if (!response.ok) {
    // console.log(response)
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  return data;
}