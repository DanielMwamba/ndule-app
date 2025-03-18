import { NextResponse } from "next/server";

export async function GET() {
  try {
    if (
      !process.env.SPOTIFY_CLIENT_ID ||
      !process.env.SPOTIFY_CLIENT_SECRET
    ) {
      throw new Error("Missing Spotify credentials");
    }

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString("base64"),
      },
      body: "grant_type=client_credentials",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to get access token");
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error getting Spotify token:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to get access token",
      },
      { status: 500 }
    );
  }
}
