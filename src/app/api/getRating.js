import axios from 'axios';

export default async function handler(req, res) {
  const { locationName } = req.query;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  print("Api key is: ")
  try {
    print(apikey)
    // Get Place ID
    const placeIdResponse = await axios.get("https://maps.googleapis.com/maps/api/place/findplacefromtext/json",
      {
        params: {
          input: locationName,
          inputtype: 'textquery',
          key: apiKey,
        },
      }
    );

    const candidates = placeIdResponse.data.candidates;
    if (!candidates.length) {
      return res.status(404).json({ message: 'Place not found' });
    }

    const placeId = candidates[0].place_id;

    // Get Place Rating
    const ratingResponse = await axios.get("https://maps.googleapis.com/maps/api/place/details/json",
      {
        params: {
          place_id: placeId,
          fields: 'rating',
          key: apiKey,
        },
      }
    );

    const rating = ratingResponse.data.result?.rating || 'N/A';

    res.status(200).json({ placeId, rating });
  } catch (error) {
    console.error('Error fetching rating:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}