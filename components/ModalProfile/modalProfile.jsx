import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Modal,
	StyleSheet,
	KeyboardAvoidingView,
} from "react-native";

import { styles } from "../../Style";

export const ModalProfile = ({ visible, toggleMenu, handleLogout, user }) => {
	return (
		<Modal animationType="slide" transparent={true} visible={visible}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={stylesModalProfile.modalContainer}
			>
				{/* Aqui você pode adicionar o conteúdo do seu menu expandido */}
				<View style={stylesModalProfile.menuContent}>
					{/* Adicione mais componentes conforme necessário */}
					<View>
						<Text style={stylesModalProfile.text}>Nome:</Text>
						<Text style={stylesModalProfile.subText}>
							{user.first_name} {user.last_name}
						</Text>
					</View>
					<View>
						<Text style={stylesModalProfile.text}>Email:</Text>
						<Text style={stylesModalProfile.subText}>{user.user_email}</Text>
					</View>
					<View>
						<Text style={stylesModalProfile.text}>Username:</Text>
						<Text style={stylesModalProfile.subText}>{user.username}</Text>
					</View>
					<View style={stylesModalProfile.actionsContainer}>
						<TouchableOpacity
							style={{
								...stylesModalProfile.closeButton,
								...stylesModalProfile.button,
							}}
							onPress={() => toggleMenu("profile")}
						>
							<Text style={styles.buttonText}>Voltar</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								...stylesModalProfile.logoutButton,
								...stylesModalProfile.button,
							}}
							onPress={handleLogout}
						>
							<Text style={styles.buttonText}>Sair</Text>
						</TouchableOpacity>
					</View>
				</View>
			</KeyboardAvoidingView>
		</Modal>
	);
};

const stylesModalProfile = StyleSheet.create({
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
	button: {
		width: "45%",
		padding: 10,
		alignItems: "center",
		borderRadius: 30,
	},
	closeButton: {
		backgroundColor: "#009BE5",
	},
	logoutButton: {
		backgroundColor: "#22577A",
	},
	menuContent: {
		backgroundColor: "white",
		padding: 40,
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
		height: "40%",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "flex-start",
	},
	text: {
		fontSize: 24,
		fontWeight: "bold",
	},
	subText: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#777",
	},
});
