// pages/api/refreshToken.js
export default async function handler(req, res) {
  // Proveri da li je zahtev GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Ovdje zameni sa svojim podacima
  const { INS_TOKEN } = process.env; // Uzmi stari token iz .env.local

  try {
    // URL za osvežavanje tokena
    const refreshUrl = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${INS_TOKEN}`;

    // Poziv za osvežavanje tokena
    const response = await fetch(refreshUrl, {
      method: "GET",
    });

    const data = await response.json();

    // Proveri da li je odgovor uspešan
    if (!response.ok) {
      throw new Error(data.error.message || "Failed to refresh token");
    }

    // Ovde možeš sačuvati novi token
    const newToken = data.access_token;
    console.log("New access token:", newToken);

    // Opcionalno: Sačuvaj novi token u bazu podataka ili datoteku
    // ...

    res.status(200).json({ new_token: newToken });
  } catch (error) {
    console.error("Error refreshing access token:", error.message);
    res.status(500).json({ error: error.message });
  }
}
