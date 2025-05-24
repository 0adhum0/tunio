function main() {
	const clientId = "785f7538a94b4f6085d16da465b02be6";
	const clientSecret = "c4a01aaa50d4417388abecf67cf25186";

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
