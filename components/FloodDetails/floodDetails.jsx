import React from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Menu } from "../../components/Menu/menu";

import { calcularCor } from "../../api/utils/functions";

import { styles } from "../../Style";

export const FloodDetails = ({ navigation, route }) => {
	const flood = route.params?.flood || {};

	return (
		<View style={styles.container}>
			<View style={stylesFloodDetails.header}>
				<Ionicons
					name="alert-circle"
					size={40}
					color={calcularCor(flood.water_level, 0.9)}
				/>
				<Text style={stylesFloodDetails.title}>
					{flood.address.street || flood.address.name}
				</Text>
			</View>
			<View style={stylesFloodDetails.content}>
				<View style={stylesFloodDetails.card}>
					<View style={stylesFloodDetails.viewContent}>
						<View>
							<Text style={stylesFloodDetails.subText}>Data do Ocorrido</Text>
							<Text style={stylesFloodDetails.text}>
								{format(new Date(flood.start_date), "d MMMM yyyy", {
									locale: ptBR,
								})}
							</Text>
						</View>
						<View style={stylesFloodDetails.textRight}>
							<Text style={stylesFloodDetails.subText}>Distância até você</Text>
							<Text style={stylesFloodDetails.text}>{flood.distance}</Text>
						</View>
					</View>
					<View style={stylesFloodDetails.viewContent}>
						<View>
							<Text style={stylesFloodDetails.subText}>
								Periodo do Ocorrido
							</Text>
							<Text style={stylesFloodDetails.text}>
								{format(new Date(flood.start_date), "HH:mm", {
									locale: ptBR,
								}) +
									" às " +
									format(new Date(flood.end_date), "HH:mm", {
										locale: ptBR,
									})}
							</Text>
						</View>
						<View style={stylesFloodDetails.textRight}>
							<Text style={stylesFloodDetails.subText}>Status</Text>
							<Text style={stylesFloodDetails.text}>
								{flood.status.charAt(0).toUpperCase() +
									flood.status.substring(1)}
							</Text>
						</View>
					</View>
					<View style={stylesFloodDetails.viewContent}>
						<View style={stylesFloodDetails.singleView}>
							<Text style={stylesFloodDetails.subText}>Relato</Text>
							<TextInput
								style={stylesFloodDetails.textArea}
								multiline={true}
								value={flood.description}
								editable={false}
							></TextInput>
						</View>
					</View>
					<View style={stylesFloodDetails.viewContent}>
						<View style={stylesFloodDetails.singleView}>
							<Text style={stylesFloodDetails.subText}>
								Nível da água - {flood.water_level}%
							</Text>
							<View style={stylesFloodDetails.progressBar}>
								<View
									style={{
										width: "100%",
										backgroundColor: calcularCor(flood.water_level, 0.8),
										height: `${flood.water_level}%`,
									}}
								/>
							</View>
						</View>
					</View>
				</View>
			</View>
			<Menu isListagemScreen={true} navigation={navigation} />
		</View>
	);
};

const stylesFloodDetails = StyleSheet.create({
	card: {
		width: "100%",
		height: "84%",
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
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		gap: 45,
	},
	header: {
		paddingTop: 50,
		paddingBottom: 10,
		paddingHorizontal: 20,
		gap: 10,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		textAlign: "left",
	},
	container: {
		flex: 1,
		width: "100%",
		height: "100%",
	},
	content: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		height: "100%",
		alignItems: "center",
		backgroundColor: "#F3F4F8",
		paddingVertical: 20,
		paddingHorizontal: 20,
		paddingBottom: 130,
		overflow: "scroll",
	},
	singleView: {
		width: "100%",
		height: "100%",
		display: "flex",
		flexDirection: "column",
		gap: 10,
	},
	viewContent: {
		display: "flex",
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 10,
		width: "100%",
	},
	text: {
		fontSize: 20,
		fontWeight: "bold",
	},
	subText: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#777",
	},
	textRight: {
		alignItems: "flex-end",
	},
	textArea: {
		borderColor: "#B2B2B240",
		borderWidth: 1,
		borderRadius: 16,
		paddingHorizontal: 10,
		paddingTop: 10,
		textAlignVertical: "top",
		height: 150,
		width: "100%",
		color: "gray",
	},
	button: {
		width: "45%",
		padding: 10,
		alignItems: "center",
		borderRadius: 30,
	},
	closeButton: {
		backgroundColor: "#009BE5",
	},
	progressBar: {
		height: "50%",
		width: "100%",
		backgroundColor: "#D9D9D9",
		borderColor: "#B2B2B240",
		borderWidth: 1,
		borderRadius: 10,
		overflow: "hidden",
		display: "flex",
		justifyContent: "flex-end",
	},
});
