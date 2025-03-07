export default async function handler(req, res) {
  try {
    const token = process.env.NEXT_PUBLIC_INST_TOKEN; // Preuzimanje trenutnog tokena iz .env.local

    const response = await fetch(
      `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
    );
    const data = await response.json();

    if (data.access_token) {
      const envPath = path.join(process.cwd(), ".env.local");

      // Čitaj postojeći .env.local fajl
      let envFile = fs.readFileSync(envPath, "utf8");

      // Zameni stari token novim
      envFile = envFile.replace(
        /NEXT_PUBLIC_INST_TOKEN=.*/g,
        `NEXT_PUBLIC_INST_TOKEN=${data.access_token}`
      );

      // Sačuvaj novi .env.local fajl
      fs.writeFileSync(envPath, envFile);

      console.log("Novi token sačuvan u .env.local");

      res
        .status(200)
        .json({
          message: "Token osvežen i sačuvan.",
          token: data.access_token,
        });
    } else {
      res.status(500).json({ error: "Nije moguće osvežiti token." });
    }
  } catch (error) {
    console.error("Greška pri obnavljanju tokena:", error);
    res.status(500).json({ error: "Greška pri osvežavanju tokena." });
  }
}
