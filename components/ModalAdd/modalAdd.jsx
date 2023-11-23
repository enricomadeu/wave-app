import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Modal,
	StyleSheet,
	TextInput,
	KeyboardAvoidingView,
	Alert,
} from "react-native";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { styles } from "../../Style";

import { createFlood } from "../../api/services/floodServices";
import { calcularCor } from "../../api/utils/functions";

export const ModalAdd = ({
	visible,
	toggleMenu,
	newFloodMarker,
	handleGetFloods,
}) => {
	const [descricao, setDescricao] = useState("");
	const [waterPercentage, setWaterPercentage] = useState("0");
	const [data, setData] = useState(
		format(new Date(), "d MMM yyyy", {
			locale: ptBR,
		})
	);
	const [hora, setHora] = useState(
		format(new Date(), "HH:mm", {
			locale: ptBR,
		})
	);

	useEffect(() => {
		setData(
			format(new Date(), "d MMM yyyy", {
				locale: ptBR,
			})
		);
		setHora(
			format(new Date(), "HH:mm", {
				locale: ptBR,
			})
		);
	}, [visible]);

	const handleWaterPercentageChange = (text) => {
		if (!text) {
			setWaterPercentage("0");
			return;
		}

		if (text > 100) {
			setWaterPercentage("100");
			return;
		}

		setWaterPercentage(text);
	};

	const handleSave = async () => {
		// Lógica para salvar os dados
		if (+waterPercentage == 0) {
			Alert.alert(
				"Atenção",
				"Não é possível salvar uma ocorrência sem nível de água."
			);
			return;
		}

		if (!newFloodMarker.latitude || !newFloodMarker.longitude) {
			Alert.alert("Atenção", "Por favor, selecione um local no mapa.");
			return;
		}

		const flood_center_location = {
			latitude: +newFloodMarker.latitude,
			longitude: +newFloodMarker.longitude,
		};

		const user_location = {
			latitude: +newFloodMarker.latitude,
			longitude: +newFloodMarker.longitude,
		};

		const response = await createFlood({
			flood_center_location,
			user_location,
			date_time: new Date().toISOString(),
			description: descricao,
			water_level: +waterPercentage,
			attachments: [""],
		});

		if (response) {
			setDescricao("");
			setWaterPercentage("0");
			toggleMenu("add");
			handleGetFloods();
			Alert.alert("Sucesso", "Ocorrência salva com sucesso");
		} else {
			Alert.alert("Erro", "Ocorreu um erro ao salvar a ocorrência");
		}
	};

	return (
		<Modal animationType="slide" transparent={true} visible={visible}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={stylesModalAdd.modalContainer}
			>
				{/* Aqui você pode adicionar o conteúdo do seu menu expandido */}
				<View style={stylesModalAdd.menuContent}>
					<View style={stylesModalAdd.viewContent}>
						<View>
							<Text style={stylesModalAdd.subText}>Data</Text>
							<Text style={stylesModalAdd.text}>{data}</Text>
						</View>
						<View style={stylesModalAdd.textRight}>
							<Text style={stylesModalAdd.subText}>Hora</Text>
							<Text style={stylesModalAdd.text}>{hora}</Text>
						</View>
					</View>
					<TextInput
						style={stylesModalAdd.textArea}
						multiline={true}
						placeholder="Breve descrição sobre o que está acontecendo"
						keyboardType="default"
						value={descricao}
						onChangeText={setDescricao}
					></TextInput>
					<View style={stylesModalAdd.levelContainer}>
						<Text style={stylesModalAdd.textDescricao}>
							Este campo permite que você insira o nível atual da água durante a
							enchente.
						</Text>
						<TextInput
							style={stylesModalAdd.input}
							placeholder="Nível da água"
							keyboardType="numeric"
							value={waterPercentage}
							onChangeText={handleWaterPercentageChange}
						></TextInput>
						<View style={stylesModalAdd.progressBar}>
							<View
								style={{
									width: 50,
									backgroundColor: calcularCor(waterPercentage, 0.8),
									height: `${waterPercentage}%`,
								}}
							/>
						</View>
					</View>
					{/* Adicione mais componentes conforme necessário */}
					<View style={stylesModalAdd.actionsContainer}>
						<TouchableOpacity
							style={{
								...stylesModalAdd.closeButton,
								...stylesModalAdd.button,
							}}
							onPress={() => toggleMenu("add")}
						>
							<Text style={styles.buttonText}>Voltar</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								...stylesModalAdd.saveButton,
								...stylesModalAdd.button,
							}}
							onPress={handleSave}
						>
							<Text style={styles.buttonText}>Salvar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</KeyboardAvoidingView>
		</Modal>
	);
};

const stylesModalAdd = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: "flex-end",
	},
	actionsContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: 20,
	},
	levelContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: 20,
		height: 80,
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
	saveButton: {
		backgroundColor: "#22577A",
	},
	menuContent: {
		backgroundColor: "white",
		padding: 40,
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
		height: "45%",
		display: "flex",
		justifyContent: "space-between",
	},
	input: {
		borderColor: "#B2B2B240",
		borderWidth: 1,
		borderRadius: 16,
		paddingHorizontal: 10,
		textAlignVertical: "center",
		height: "100%",
		width: "25%",
		fontSize: 32,
		textAlign: "center",
	},
	textArea: {
		borderColor: "#B2B2B240",
		borderWidth: 1,
		borderRadius: 16,
		paddingHorizontal: 10,
		paddingTop: 10,
		textAlignVertical: "top", // Alinhar o texto ao topo
		height: 100, // Altura inicial do campo de texto
		width: "100%",
	},
	textDescricao: {
		fontSize: 14,
		textAlign: "center",
		width: "40%",
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
		fontSize: 16,
		fontWeight: "bold",
	},
	subText: {
		fontSize: 14,
		fontWeight: "bold",
		color: "#777",
	},
	textRight: {
		alignItems: "flex-end",
	},
	progressBar: {
		height: "100%",
		width: 50,
		backgroundColor: "#D9D9D9",
		borderColor: "#B2B2B240",
		borderWidth: 1,
		borderRadius: 10,
		overflow: "hidden",
		display: "flex",
		justifyContent: "flex-end",
	},
});
