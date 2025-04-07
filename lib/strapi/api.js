// lib/strapi/api.ts
import { fetchAPI, StrapiResponse, StrapiSingleResponse } from './config';

export async function getArticles(params = {}) {
  const response = await fetchAPI(`articles?populate=*`);
  // console.log(response);
  return response;
}

export async function getFeaturedArticle() {
  const response = await fetchAPI('articles?filters[featured]=true&populate=*');
  console.log(response)
  return response ;
}

export async function getTest() {
  const response = await fetchAPI('test');
  return response ;
}


export async function getArticleBySlug(slug) {
  const response = await fetchAPI(`articles?filters[slug]=${slug}&populate=*`);
  // console.log(response)
  return response ;
}

export async function getLatestArticles(limit = 6) {
  const response = await fetchAPI(`articles?sort=publish_date:desc&pagination[limit]=${limit}&populate=*`);
  return response ;
}

export async function getPodcasts(params = {}) {
  const queryParams = new URLSearchParams({
    'populate': 'cover_image,category,episodes',
    ...params
  }).toString();
  
  const response = await fetchAPI(`podcasts?${queryParams}`);
  return response;
}

export async function getActivePodcasts(limit = 4) {
  const response = await fetchAPI(
    `podcasts?filters[active]=true&pagination[limit]=${limit}&populate=*`
  );
  return response;
}

export async function getCategories() {
  const response = await fetchAPI('categories');
  return response;
}

export async function getAuthor(id) {
  const response = await fetchAPI(`authors/${id}?populate=*`);
  return response;
}

// Helper function to process image URLs
export function getStrapiMedia(image) {
  // console.log(image)
  if (!image) return null;
  // console.log(image)
  console.log(image)
  // const { url } = image.formats.thumbnail;
  return `https://media-cms.onrender.com${image.url}`;
}
/**
 * Get all living lists with their items
 * @param {Object} params - Query parameters
 * @returns {Promise} The API response
 */
export async function getLivingLists(params = {}) {
  const response = await fetchAPI(`living-lists?populate=items&status=published`);
  return response;
}

/**
 * Get a specific living list by ID
 * @param {number|string} id - The ID of the living list
 * @returns {Promise} The API response
 */
export async function getLivingListById(id) {
  const response = await fetchAPI(
    `living-lists/${id}?populate[items][populate][0]=attributes&populate[items][populate][1]=accolades&populate[items][populate][2]=stats&populate[items][populate][3]=image
`
  );
  return response;
}

/**
 * Get a living list by its title
 * @param {string} title - The title to search for
 * @returns {Promise} The API response
 */
export async function getLivingListByTitle(title) {
  const encodedTitle = encodeURIComponent(title);
  const response = await fetchAPI(`living-lists?filters[title][$eq]=${encodedTitle}&populate=items&status=published`);
  return response;
}

/**
 * Get living lists sorted by rank
 * @returns {Promise} The API response
 */
export async function getLivingListsByRank() {
  const response = await fetchAPI(`living-lists?populate=items`);
  return response;
}

/**
 * Get a specific item from a list by the item's ID
 * @param {number|string} listId - The ID of the living list
 * @param {number|string} itemId - The ID of the item within the list
 * @returns {Promise} The API response with the filtered item
 */
export async function getListItemById(listId, itemId) {
  // First, get the full list with all items
  const response = await fetchAPI(`living-lists/${listId}?populate=items&status=published`);
  
  // Then filter for the specific item client-side
  if (response.data && response.data.attributes && response.data.attributes.items) {
    const item = response.data.attributes.items.find(item => item.id === parseInt(itemId));
    
    if (item) {
      return {
        data: {
          id: itemId,
          attributes: item
        }
      };
    }
  }
  
  // Return empty data if item not found
  return { data: null };
}

/**
 * Get recently updated living lists
 * @param {number} limit - Number of lists to return
 * @returns {Promise} The API response
 */
export async function getRecentlyUpdatedLists(limit = 5) {
  const response = await fetchAPI(`living-lists?sort=updatedAt:desc&pagination[limit]=${limit}&populate=items&status=published`);
  return response;
}

/**
 * Search living lists by keyword in title or description
 * @param {string} keyword - The keyword to search for
 * @returns {Promise} The API response
 */
export async function searchLivingLists(keyword) {
  const encodedKeyword = encodeURIComponent(keyword);
  const response = await fetchAPI(
    `living-lists?filters[$or][0][title][$containsi]=${encodedKeyword}&filters[$or][1][description][$containsi]=${encodedKeyword}&populate=items&status=published`
  );
  return response;
}

/**
 * Get paginated living lists
 * @param {number} page - Page number
 * @param {number} pageSize - Number of items per page
 * @returns {Promise} The API response
 */
export async function getPaginatedLivingLists(page = 1, pageSize = 10) {
  const response = await fetchAPI(
    `living-lists?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=items&status=published`
  );
  return response;
}