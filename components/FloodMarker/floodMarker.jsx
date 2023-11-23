import React from "react";
import { Marker, Circle } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

import { calcularCor } from "../../api/utils/functions";

export const FloodMarker = ({ flood, navigation }) => {
	const handleMarkerClick = () => {
		navigation.navigate("FloodDetails", { flood });
	};

	return (
		<>
			<Marker
				coordinate={flood.flood_center_location}
				title={flood.water_level + "%" + " " + flood.description}
				description={flood.address.street || flood.address.name}
				onPress={handleMarkerClick}
			>
				<Ionicons
					name="alert-circle"
					size={30}
					color={calcularCor(flood.water_level, 0.9)}
				/>
			</Marker>
			<Circle
				center={flood.flood_center_location}
				radius={90}
				strokeWidth={1}
				strokeColor={calcularCor(flood.water_level, 0.5)}
				fillColor={calcularCor(flood.water_level, 0.2)}
			/>
		</>
	);
};
