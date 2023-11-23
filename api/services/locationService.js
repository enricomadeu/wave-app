import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

export const requestLocationPermission = async () => {
	try {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			console.log("Permissão de localização negada");
		} else {
			setInterval(() => {
				getOneTimeLocation();
			}, 5000);
		}
	} catch (err) {
		console.warn(err);
	}
};

const getOneTimeLocation = async () => {
	const location = await Location.getCurrentPositionAsync({});
	await storeLocation(location.coords.latitude, location.coords.longitude);
};

const storeLocation = async (latitude, longitude) => {
	try {
		await AsyncStorage.setItem("latitude", latitude.toString());
		await AsyncStorage.setItem("longitude", longitude.toString());
	} catch (error) {
		console.log("Failed to store location:", error);
	}
};

export const getDistance = (lat1, lon1, lat2, lon2) => {
	const R = 6371; // raio médio da Terra em quilômetros
	const dLat = toRad(lat2 - lat1);
	const dLon = toRad(lon2 - lon1);
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRad(lat1)) *
			Math.cos(toRad(lat2)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const distance = R * c * 1000; // distância em metros

	// Se a distância for menor que 1 km, retorne em metros
	if (distance < 1000) {
		return distance.toFixed(2) + " m";
	}

	return distance.toFixed(2) + " km";
};

const toRad = (value) => {
	return (value * Math.PI) / 180;
};
