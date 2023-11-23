import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { calcularCor } from "../../api/utils/functions";

export const CardListagem = ({ flood, navigation }) => {
	const handleFloodDetails = () => {
		navigation.navigate("FloodDetails", { flood });
	};

	return (
		<TouchableOpacity
			style={stylesCardListagem.card}
			onPress={handleFloodDetails}
		>
			<View style={stylesCardListagem.viewTitle}>
				<Ionicons
					name="alert-circle"
					size={40}
					color={calcularCor(flood.water_level, 0.9)}
				/>
				<Text style={stylesCardListagem.cardTitle}>
					{flood.address.street || flood.address.name}
				</Text>
			</View>
			<View style={stylesCardListagem.viewContent}>
				<View>
					<Text style={stylesCardListagem.subText}>Data</Text>
					<Text style={stylesCardListagem.text}>
						{format(new Date(flood.start_date), "d MMM yyyy", {
							locale: ptBR,
						})}
					</Text>
				</View>
				<View>
					<Text style={stylesCardListagem.subText}>Distância</Text>
					<Text style={stylesCardListagem.text}>{flood.distance}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const stylesCardListagem = StyleSheet.create({
	card: {
		width: "100%",
		height: 100,
		backgroundColor: "white",
		borderRadius: 8,
		padding: 16,
		margin: 8,
		// Sombras para Android
		elevation: 2,
		// Sombras para iOS
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
	},
	viewTitle: {
		display: "flex",
		alignItems: "center",
		flexDirection: "row",
		gap: 6,
	},
	viewContent: {
		display: "flex",
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 10,
	},
	cardTitle: {
		fontSize: 20,
		fontWeight: "bold",
		textAlignVertical: "center",
	},
	text: {
		fontSize: 16,
		fontWeight: "bold",
	},
	subText: {
		fontSize: 14,
		fontWeight: "bold",
		color: "#777",
	},
});
