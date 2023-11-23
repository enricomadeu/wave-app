import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

const TOKEN_KEY = "your_token_key";

export const saveToken = async (token) => {
	try {
		await AsyncStorage.setItem(TOKEN_KEY, token);
	} catch (error) {
		console.error("Error saving token to AsyncStorage:", error);
	}
};

export const getToken = async () => {
	try {
		const token = await AsyncStorage.getItem(TOKEN_KEY);
		return token;
	} catch (error) {
		console.error("Error retrieving token from AsyncStorage:", error);
		return null;
	}
};

export const removeToken = async () => {
	try {
		await AsyncStorage.removeItem(TOKEN_KEY);
	} catch (error) {
		console.error("Error removing token from AsyncStorage:", error);
	}
};

export const decodeToken = (token) => {
	return jwtDecode(token);
};
