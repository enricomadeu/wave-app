import React, { useState } from "react";
import { View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { styles } from "../../Style";

const Tab = createBottomTabNavigator();

export const Home = ({ navigation }) => {
	const [region, setRegion] = useState({
		latitude: -23.963992,
		longitude: -46.321454,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	});

	return (
		<View style={styles.container}>
			<MapView style={styles.map} provider={PROVIDER_GOOGLE} region={region}>
				<Marker coordinate={region} title="Sua Localização Atual" />
			</MapView>
		</View>
	);
};
