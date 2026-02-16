/**
 * Transform localhost URLs to production URLs
 * This fixes the mixed content issue where existing data has localhost URLs
 */

export function transformImageUrl(url) {
  if (!url) return url;
  
  // Replace localhost URLs with proper API base URL
  if (url.includes('http://localhost')) {
    const baseUrl = process.env.API_BASE_URL || process.env.RENDER_EXTERNAL_URL || `http://localhost:${process.env.PORT || 5000}`;
    return url.replace(/http:\/\/localhost:\d+/, baseUrl);
  }
  
  return url;
}

/**
 * Transform URLs in portfolio or exhibition object
 */
export function transformPortfolioUrls(portfolio) {
  if (!portfolio) return portfolio;
  
  const transformed = { ...portfolio.toObject ? portfolio.toObject() : portfolio };
  
  if (transformed.imageUrl) {
    transformed.imageUrl = transformImageUrl(transformed.imageUrl);
  }
  
  if (transformed.thumbnailUrl) {
    transformed.thumbnailUrl = transformImageUrl(transformed.thumbnailUrl);
  }
  
  if (transformed.galleryUrls && Array.isArray(transformed.galleryUrls)) {
    transformed.galleryUrls = transformed.galleryUrls.map(item => ({
      ...item,
      url: transformImageUrl(item.url)
    }));
  }
  
  return transformed;
}

export function transformExhibitionUrls(exhibition) {
  if (!exhibition) return exhibition;
  
  const transformed = { ...exhibition.toObject ? exhibition.toObject() : exhibition };
  
  if (transformed.coverImageUrl) {
    transformed.coverImageUrl = transformImageUrl(transformed.coverImageUrl);
  }
  
  if (transformed.exhibitionGuide?.url) {
    transformed.exhibitionGuide.url = transformImageUrl(transformed.exhibitionGuide.url);
  }
  
  if (transformed.imageGallery && Array.isArray(transformed.imageGallery)) {
    transformed.imageGallery = transformed.imageGallery.map(item => ({
      ...item,
      url: transformImageUrl(item.url)
    }));
  }
  
  return transformed;
}

export default {
  transformImageUrl,
  transformPortfolioUrls,
  transformExhibitionUrls
};
