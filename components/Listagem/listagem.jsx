import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "../../Style";

import { Menu } from "../Menu/menu";
import { CardListagem } from "../CardListagem/cardListagem";

export const Listagem = ({ navigation, route }) => {
	const [filteredFloods, setFilteredFloods] = useState([]);
	const floods = route.params?.floods || [];

	useEffect(() => {
		setFilteredFloods(floods);
	}, [floods]);

	const handlePesquisa = (texto) => {
		if (texto === "") {
			setFilteredFloods(floods);
			return;
		}
		const filteredFloods = floods.filter(
			(flood) =>
				flood.address.street &&
				flood.address.street.toLowerCase().includes(texto.toLowerCase())
		);
		setFilteredFloods(filteredFloods);
	};

	return (
		<View style={styles.container}>
			<View style={stylesListagem.header}>
				<Text style={stylesListagem.title}>Listagem de Ocorrências</Text>
				<View style={stylesListagem.searchBar}>
					<TextInput
						style={stylesListagem.input}
						placeholder="Qual endereço?"
						onChangeText={handlePesquisa}
					/>
					<TouchableOpacity onPress={handlePesquisa}>
						<Ionicons name="search" size={24} color="gray" />
					</TouchableOpacity>
				</View>
			</View>
			<ScrollView style={stylesListagem.container}>
				<View style={stylesListagem.content}>
					{filteredFloods.map((flood, index) => (
						<CardListagem key={index} flood={flood} navigation={navigation} />
					))}
				</View>
			</ScrollView>
			<Menu isListagemScreen={true} navigation={navigation} />
		</View>
	);
};

const stylesListagem = StyleSheet.create({
	header: {
		paddingTop: 50,
		paddingBottom: 10,
		paddingHorizontal: 20,
		gap: 10,
		display: "flex",
		width: "100%",
	},
	searchBar: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderColor: "#B2B2B240",
		borderWidth: 1,
		borderRadius: 16,
		paddingHorizontal: 10,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "left",
	},
	input: {
		textAlignVertical: "center",
		height: 40,
		width: "93%",
		fontSize: 16,
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
});
