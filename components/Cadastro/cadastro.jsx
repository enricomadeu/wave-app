import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
} from "react-native";
import { CheckBox } from "react-native-elements";

import { styles } from "../../Style";

export const Cadastro = ({ navigation }) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");

	const handleCadastro = () => {
		if (!firstName || !lastName || !email || !password || !confirmPassword) {
			setError("Por favor, preencha todos os campos.");
		} else if (password !== confirmPassword) {
			setError("As senhas não coincidem.");
		} else {
			// Lógica para enviar o formulário de cadastro
			console.log(`Nome: ${firstName} ${lastName}`);
			console.log(`Email: ${email}`);
			console.log(`Senha: ${password}`);
			// navigation.navigate("Login");
		}
		// Aqui você pode adicionar a lógica para enviar os dados do cadastro para o servidor
	};

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const redirectLogin = () => {
		navigation.navigate("Login");
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
			<Text style={styles.title}>Cadastro</Text>
			{error ? <Text style={styles.error}>{error}</Text> : null}
			<View style={styles.inputGroup}>
				<TextInput
					style={{ ...styles.input, width: "48%" }}
					placeholder="Primeiro nome"
					value={firstName}
					onChangeText={setFirstName}
				/>
				<TextInput
					style={{ ...styles.input, width: "48%" }}
					placeholder="Último nome"
					value={lastName}
					onChangeText={setLastName}
				/>
			</View>
			<TextInput
				style={{ ...styles.input, width: "80%" }}
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
				keyboardType="email-address"
			/>

			<TextInput
				style={{ ...styles.input, width: "80%" }}
				placeholder="Senha"
				value={password}
				onChangeText={setPassword}
				secureTextEntry={!showPassword}
			/>

			<TextInput
				style={{ ...styles.input, width: "80%" }}
				placeholder="Confirme a senha"
				value={confirmPassword}
				onChangeText={setConfirmPassword}
				secureTextEntry={!showPassword}
			/>

			<CheckBox
				title="Mostrar senha"
				checked={showPassword}
				onPress={toggleShowPassword}
				containerStyle={styles.checkboxContainer}
			/>

			<TouchableOpacity style={styles.button} onPress={handleCadastro}>
				<Text style={styles.buttonText}>Cadastrar</Text>
			</TouchableOpacity>
			<View style={styles.signupContainer}>
				<Text style={styles.signupText}>Já tem uma conta?</Text>
				<TouchableOpacity onPress={redirectLogin}>
					<Text style={styles.signupLink}>Login</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
};
