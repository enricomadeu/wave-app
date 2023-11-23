import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "../../api/services/authService";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { ModalAdd } from "../ModalAdd/modalAdd";
import { ModalProfile } from "../ModalProfile/modalProfile";

export const Menu = ({
	isListagemScreen,
	navigation,
	newFloodMarker,
	handleGetFloods,
	floods,
}) => {
	const [addMenuVisible, setAddMenuVisible] = useState(false);
	const [profileMenuVisible, setProfileMenuVisible] = useState(false);
	const [user, setUser] = useState({});

	useEffect(() => {
		handleGetUser();
	}, []);

	const handleGetUser = async () => {
		const response = await AsyncStorage.getItem("user");
		setUser(JSON.parse(response));
	};

	const toggleMenu = (menu) => {
		switch (menu) {
			case "add":
				setAddMenuVisible(!addMenuVisible);
				break;
			case "profile":
				setProfileMenuVisible(!profileMenuVisible);
				break;
			case "list":
				if (!isListagemScreen) {
					navigation.navigate("Listagem", { floods });
				} else {
					navigation.goBack();
				}
				break;
			default:
				break;
		}
	};

	const handleLogout = async () => {
		toggleMenu("profile");
		await AsyncStorage.removeItem("user");
		await logout();
		navigation.navigate("Login");
	};

	return (
		<View style={stylesMenu.bottomMenu}>
			<ModalAdd
				visible={addMenuVisible}
				toggleMenu={toggleMenu}
				newFloodMarker={newFloodMarker}
				handleGetFloods={handleGetFloods}
			/>
			<ModalProfile
				visible={profileMenuVisible}
				toggleMenu={toggleMenu}
				handleLogout={handleLogout}
				user={user}
			/>
			<TouchableOpacity onPress={() => toggleMenu("list")}>
				{isListagemScreen ? (
					<Entypo name="back" size={30} color="#009BE5" />
				) : (
					<MaterialCommunityIcons
						name="format-list-bulleted"
						size={35}
						color="#009BE5"
					/>
				)}
			</TouchableOpacity>
			<TouchableOpacity
				style={stylesMenu.addButton}
				onPress={() => toggleMenu("add")}
			>
				<AntDesign name="pluscircle" size={50} color="#009BE5" />
			</TouchableOpacity>
			<TouchableOpacity onPress={() => toggleMenu("profile")}>
				<Octicons name="person-fill" size={35} color="#009BE5" />
			</TouchableOpacity>
		</View>
	);
};

const stylesMenu = StyleSheet.create({
	bottomMenu: {
		backgroundColor: "white",
		paddingVertical: 10,
		paddingHorizontal: 50,
		width: "100%",
		height: "10%",
		zIndex: 2,
		position: "absolute",
		bottom: 0,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	menuIcon: {
		resizeMode: "cover",
		width: 30,
		height: 30,
	},
	listIcon: {
		resizeMode: "cover",
		width: 40,
		height: 40,
	},
	addIcon: {
		resizeMode: "cover",
		width: 50,
		height: 50,
	},
	addButton: {
		marginTop: -90,
		padding: 6,
		backgroundColor: "#fff",
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
	},
	modalContainer: {
		flex: 1,
		justifyContent: "flex-end",
	},
	closeButton: {
		backgroundColor: "lightgray",
		padding: 10,
		alignItems: "center",
	},
	menuContent: {
		zIndex: 1,
		backgroundColor: "white",
		padding: 20,
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		height: "70%",
	},
});
