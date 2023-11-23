import { saveToken, removeToken, decodeToken } from "../utils/jwt";
import { api_url } from "../utils/constants";

export const login = async (credentials) => {
	const response = await fetch(`${api_url}/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	});

	if (response.ok) {
		const { token } = await response.json();
		saveToken(token);
		const user = decodeToken(token);
		return { success: true, user };
	} else {
		return null;
	}
};

export const logout = async () => {
	await removeToken();
	return true;
};

export const register = async (userData) => {
	const response = await fetch(`${api_url}/create-user`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userData),
	});

	if (response.ok) {
		return true;
	} else {
		return null;
	}
};
