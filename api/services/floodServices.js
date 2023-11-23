import { api_url } from "../utils/constants";
import { getToken } from "../utils/jwt";

export const getFloods = async (latitude, longitude) => {
	const token = await getToken();
	const response = await fetch(
		`${api_url}/floods?latitude=${latitude}&longitude=${longitude}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		}
	);
	if (response.ok) {
		const floods = await response.json();
		return floods;
	} else {
		console.error("Erro ao buscar alagamentos:", response.error);
		return null;
	}
};

export const getDetailedFlood = async (floodId) => {
	const token = await getToken();
	const response = await fetch(`${api_url}/floods/${floodId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});
	if (response.ok) {
		const flood = await response.json();
		return flood;
	} else {
		console.error("Erro ao buscar alagamento:", response.error);
		return null;
	}
};

export const createFlood = async (floodData) => {
	const token = await getToken();
	const response = await fetch(`${api_url}/create-flood `, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(floodData),
	});
	if (response.ok) {
		console.log("Alagamento criado com sucesso");
		return true;
	} else {
		console.error("Erro ao criar alagamento:", response.error);
		return null;
	}
};
