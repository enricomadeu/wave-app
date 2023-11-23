import React, { useEffect, useState } from "react";
import { View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

import { styles } from "../../Style";

import { Menu } from "../Menu/menu";
import { FloodMarker } from "../FloodMarker/floodMarker";

import { getFloods } from "../../api/services/floodServices";
import { getDistance } from "../../api/services/locationService";

export const Home = ({ navigation }) => {
	const [region, setRegion] = useState({
		latitude: -23.55052,
		longitude: -46.633308,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	});
	const [floods, setFloods] = useState([]);
	const [newFloodMarker, setNewFloodMarker] = useState({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		handleLocationInit();
		handleGetFloods();
	}, []);

	const handleLocationInit = async () => {
		const latitude = await AsyncStorage.getItem("latitude");
		const longitude = await AsyncStorage.getItem("longitude");

		setRegion({
			latitude: +latitude,
			longitude: +longitude,
			latitudeDelta: 0.02,
			longitudeDelta: 0.02,
		});
	};

	const handleGetFloods = async () => {
		setLoading(true);
		const latitude = await AsyncStorage.getItem("latitude");
		const longitude = await AsyncStorage.getItem("longitude");

		const response = await getFloods(latitude, longitude);

		for (const flood of response) {
			await handleGetDistance(flood);
			await getAddressFromLocation(flood);
		}

		setFloods(response.sort((a, b) => +a.distance - +b.distance));
		setNewFloodMarker({});
		setLoading(false);
	};

	const handleGetDistance = async (flood) => {
		const latitude = await AsyncStorage.getItem("latitude");
		const longitude = await AsyncStorage.getItem("longitude");

		const distance = getDistance(
			+latitude,
			+longitude,
			flood.flood_center_location.latitude,
			flood.flood_center_location.longitude
		);

		flood.distance = distance;
	};

	const getAddressFromLocation = async (flood) => {
		try {
			let address = await Location.reverseGeocodeAsync({
				latitude: flood.flood_center_location.latitude,
				longitude: flood.flood_center_location.longitude,
			});
			flood.address = address[0];
		} catch (error) {
			console.error("Erro ao obter endereço:", error);
		}
	};

	const handleMapPress = (e) => {
		setNewFloodMarker(e.nativeEvent.coordinate);
	};

	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				provider={PROVIDER_GOOGLE}
				region={region}
				onLongPress={handleMapPress}
				followsUserLocation={true}
				showsMyLocationButton={true}
				loadingEnabled={loading}
			>
				{newFloodMarker.latitude && (
					<Marker
						coordinate={newFloodMarker}
						title="Nova Ocorrência"
						pinColor="red"
					/>
				)}
				<Marker coordinate={region} title="Sua Localização Atual" />
				{floods.map((flood, index) => (
					<FloodMarker flood={flood} key={index} navigation={navigation} />
				))}
			</MapView>
			<Menu
				isListagemScreen={false}
				navigation={navigation}
				newFloodMarker={newFloodMarker}
				handleGetFloods={handleGetFloods}
				floods={floods}
			/>
		</View>
	);
};
