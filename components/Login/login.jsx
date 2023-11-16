import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
} from "react-native";
import { router } from "expo-router";

import { styles } from "../../Style";

export const Login = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleEmailChange = (text) => {
		setEmail(text);
	};

	const handlePasswordChange = (text) => {
		setPassword(text);
	};

	const handleSubmit = () => {
		if (!email || !password) {
			setError("Por favor, preencha todos os campos.");
		} else {
			navigation.navigate("Home");
		}
	};

	const redirectCadastro = () => {
		navigation.navigate("Cadastro");
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}
		>
			<Image
				source={require("../../assets/backgroundWave.png")}
				style={styles.waveView}
			/>
			<Image source={require("../../assets/logo.png")} style={styles.image} />
			<Text style={styles.title}>Login</Text>
			{error ? <Text style={styles.error}>{error}</Text> : null}
			<TextInput
				style={{ ...styles.input, width: "80%" }}
				placeholder="Email"
				onChangeText={handleEmailChange}
				value={email}
				keyboardType="email-address"
			/>
			<TextInput
				style={{ ...styles.input, width: "80%" }}
				placeholder="Senha"
				onChangeText={handlePasswordChange}
				value={password}
				secureTextEntry={true}
			/>
			<TouchableOpacity style={styles.button} onPress={handleSubmit}>
				<Text style={styles.buttonText}>Entrar</Text>
			</TouchableOpacity>
			<View style={styles.signupContainer}>
				<Text style={styles.signupText}>Não tem cadastro?</Text>
				<TouchableOpacity onPress={redirectCadastro}>
					<Text style={styles.signupLink}>Cadastre-se aqui</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
};
