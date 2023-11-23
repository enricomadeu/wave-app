import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	ActivityIndicator,
	Alert,
} from "react-native";

import { login } from "../../api/services/authService";
import { requestLocationPermission } from "../../api/services/locationService";

import { styles } from "../../Style";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Login = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleEmailChange = (text) => {
		setEmail(text);
	};

	const handlePasswordChange = (text) => {
		setPassword(text);
	};

	const handleSubmit = async () => {
		if (!email || !password) {
			setError("Por favor, preencha todos os campos.");
		} else {
			setLoading(true);
			const response = await login({ email, password });
			if (!response) {
				Alert.alert("Atenção", "Nenhum usuário encontrado com esses dados.");
			} else {
				await requestLocationPermission();
				AsyncStorage.setItem("user", JSON.stringify(response.user));
				navigation.navigate("Home");
			}
			setLoading(false);
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
			<TouchableOpacity
				style={styles.button}
				onPress={handleSubmit}
				disabled={loading}
			>
				{loading ? (
					<ActivityIndicator
						style={styles.buttonText}
						size="small"
						color="#fff"
					/>
				) : (
					<Text style={styles.buttonText}>Entrar</Text>
				)}
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
