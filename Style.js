import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		gap: 10,
		backgroundColor: "#fff",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 24,
	},
	input: {
		height: 60,
		padding: 16,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 15,
	},
	inputGroup: {
		width: "80%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: 10,
	},
	button: {
		width: "80%",
		backgroundColor: "#22577A",
		borderRadius: 30,
		padding: 14,
	},
	buttonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
		alignSelf: "center",
	},
	error: {
		color: "red",
		marginBottom: 16,
		marginTop: -16,
	},
	forgotPassword: {
		marginBottom: 16,
		color: "#007bff",
		fontSize: 16,
	},
	signupContainer: {
		flexDirection: "row",
		marginTop: 24,
	},
	signupText: {
		fontSize: 16,
	},
	signupLink: {
		fontSize: 16,
		color: "#007bff",
		marginLeft: 4,
	},
	checkboxContainer: {
		backgroundColor: "transparent",
		borderWidth: 0,
		padding: 0,
	},
	image: {
		width: 125,
		height: 125,
		resizeMode: "cover",
		borderRadius: 10,
		marginBottom: 60,
		marginTop: 80,
	},
	waveView: {
		position: "absolute",
		width: "100%",
		height: "40%",
		overflow: "visible",
	},
	map: {
		width: "100%",
		height: "100%",
	},
});
