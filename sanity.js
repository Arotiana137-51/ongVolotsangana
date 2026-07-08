// sanity.js
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url';


const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID||"vxhc8rag", 
  dataset: process.env.SANITY_DATASET||"production",
  useCdn: false,  // false = always fresh data; Next.js revalidate handles caching
  apiVersion: '2024-09-20'
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

export default client;
