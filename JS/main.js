function main() {
	const clientId = "your-client-id";
	const clientSecret = "your-client-secret";

	const getToken = async () => {
		const response = await fetch("https://accounts.spotify.com/api/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				// Spotify requires Basic Auth with base64 encoded clientId:clientSecret
				Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
			},
			body: new URLSearchParams({
				grant_type: "client_credentials",
			}),
		});

		if (!response.ok) {
			throw new Error("Failed to get token: " + response.status);
		}

		const data = await response.json();
		return data.access_token;
	};

	getToken()
		.then((token) => console.log("Access Token:", token))
		.catch(console.error);
}
