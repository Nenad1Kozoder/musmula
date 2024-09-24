export default async function handler(req, res) {
  try {
    const refreshUrl = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${process.env.NEXT_PUBLIC_TOKEN}`;

    const response = await fetch(refreshUrl);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Failed to refresh token");
    }

    // Vrati osveženi token ili neku drugu informaciju
    res.status(200).json({ new_token: data.access_token });
  } catch (err) {
    console.error("Error refreshing access token:", err);
    res.status(500).json({ error: err.message });
  }
}
