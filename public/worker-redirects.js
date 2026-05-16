// Cloudflare Workers script for 301 redirects
// Handles all URL redirects from old to new structure

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const pathname = url.pathname
  
  // Redirect mapping configuration
  const redirects = {
    '/index.html': '/',
    '/about us/AboutUs.html': '/our-story.html',
    '/sri lanka/sri-lanka.html': '/sri-lanka.html',
    '/why us/why-us.html': '/our-story.html',
    '/documents.html': '/contact.html',
    '/certifications/OurCertifications.html': '/sustainability.html',
    '/products/agarwood.html': '/agarwood-oil-suppliers.html',
    '/blog/BlogPage.html': '/blog/index.html',
    '/blog/the-story-of-ceylon-cinnamon/the-story-of-ceylon-cinnamon.html': '/blog/posts/story-of-ceylon-cinnamon.html',
    "/blog/how-ceylonspizee-is-giving-power-back-to-sri-lanka's-spice-farmers/how-ceylonspizee-is-giving-power-back-to-sri-lanka's-spice-farmers.html": '/blog/posts/giving-power-back-to-spice-farmers.html',
    '/blog/ceylonspizee-a-seamless-transparent-import-experience-for-global-spice-buyers/ceylonspizee-a-seamless-transparent-import-experience-for-global-spice-buyers.html': '/blog/posts/ceylonspizee-seamless-transparent-import-experience.html',
    '/blog/regulating-the-agarwood-trade-in-the-uae-cites-framework-challenges-and-future-outlook/regulating-the-agarwood-trade-in-the-uae-cites-framework-challenges-and-future-outlook.html': '/blog/posts/uae-agarwood-cites-regulation.html',
    '/blog/the-rare-essence-of-agarwood-oil-–-natures-most-precious-fragrance/the-rare-essence-of-agarwood-oil-–-natures-most-precious-fragrance.html': '/blog/posts/rare-essence-agarwood-oil.html',
    '/blog/the-essence-of-sri-lankan-agarwood-oil/the-essence-of-sri-lankan-agarwood-oil.html': '/blog/posts/essence-of-sri-lankan-agarwood-oil.html',
    "/blog/inside-the-uae's-agarwood-market-trade-dynamics-cultural-significance-and-global-impact/inside-the-uae's-agarwood-market-trade-dynamics-cultural-significance-and-global-impact.html": '/blog/posts/uae-agarwood-market-insider.html',
    '/blog/how-the-uae-became-a-global-hub-for-agarwood-(oudh)-imports-and-re-exports/how-the-uae-became-a-global-hub-for-agarwood-(oudh)-imports-and-re-exports.html': '/blog/posts/uae-agarwood-global-hub.html'
  }
  
  // Check if current path needs redirect
  if (redirects[pathname]) {
    const newUrl = url.origin + redirects[pathname]
    return Response.redirect(newUrl, 301)
  }
  
  // Handle URL-encoded paths (for spaces and special characters)
  const decodedPathname = decodeURIComponent(pathname)
  if (redirects[decodedPathname] && decodedPathname !== pathname) {
    const newUrl = url.origin + redirects[decodedPathname]
    return Response.redirect(newUrl, 301)
  }
  
  // If no redirect needed, fetch original request
  return fetch(request)
}
