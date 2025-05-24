const clientId = "785f7538a94b4f6085d16da465b02be6"; // Replace with your actual client ID
const clientSecret = "c4a01aaa50d4417388abecf67cf25186"; // Replace with your actual client secret
const artistId = "3YQKmKGau1PzlVlkL1iodx";

async function getSpotifyAccessToken() {
	const credentials = btoa(`${clientId}:${clientSecret}`);

	const response = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			Authorization: `Basic ${credentials}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({ grant_type: "client_credentials" }),
	});

	if (!response.ok) {
		throw new Error("Failed to get access token: " + response.status);
	}

	const data = await response.json();
	return data.access_token;
}

async function getArtistData(token, artistId) {
	const response = await fetch(
		`https://api.spotify.com/v1/artists/${artistId}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	if (!response.ok) {
		throw new Error(`Failed to get artist data: ${response.status}`);
	}

	return await response.json();
}

async function main() {
	const resultEl = document.getElementById("result");
	try {
		resultEl.textContent = "Loading...";
		const token = await getSpotifyAccessToken();
		const artistData = await getArtistData(token, artistId);
		resultEl.textContent = JSON.stringify(artistData, null, 2);
	} catch (error) {
		resultEl.textContent = "Error: " + error.message;
	}
}

// Add event listener to the button
document.getElementById("fetchArtistBtn").addEventListener("click", () => {
	main();
});
