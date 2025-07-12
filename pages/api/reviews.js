export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  const placeId = process.env.PLACE_ID;
  const apiKey = process.env.SERPAPI_KEY;

  if (!placeId || !apiKey) {
    return res.status(500).json({
      error: "Missing API credentials",
      placeIdExists: !!placeId,
      apiKeyExists: !!apiKey,
    });
  }

  const url = `https://serpapi.com/search.json?engine=google_maps_reviews&place_id=${placeId}&api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    let reviews = [];

    if (data.reviews && Array.isArray(data.reviews)) {
      reviews = data.reviews;
    } else if (data.local_results && data.local_results.reviews) {
      reviews = data.local_results.reviews;
    } else if (data.place_results && data.place_results.reviews) {
      reviews = data.place_results.reviews;
    }

    // Transform reviews to extract the correct data
    const processedReviews = reviews.map((review) => {
      // Extract user name from the correct path
      const authorName =
        review.user?.name || review.original?.user?.name || "Anonymous";

      // Extract rating
      const rating = review.rating || 0;

      // Extract review text
      const reviewText =
        review.snippet ||
        review.text ||
        review.extracted_snippet?.original ||
        "";

      // Extract date
      const reviewDate = review.date || "";

      // Extract profile photo
      const profilePhoto =
        review.user?.thumbnail || review.original?.user?.thumbnail || "";

      return {
        author_name: authorName,
        rating: rating,
        text: reviewText,
        date: reviewDate,
        profile_photo_url: profilePhoto,
      };
    });

    console.log("Total processed reviews:", processedReviews.length);

    if (processedReviews.length > 0) {
      res.status(200).json(processedReviews);
    } else {
      res.status(200).json({
        reviews: [],
        debug: {
          totalReviewsFound: reviews.length,
          responseKeys: Object.keys(data),
          error: data.error || null,
        },
      });
    }
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({
      error: "Failed to fetch reviews",
      details: error.message,
    });
  }
}
