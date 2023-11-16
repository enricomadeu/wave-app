import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Login } from "./components/Login/login.jsx";
import { Cadastro } from "./components/Cadastro/cadastro.jsx";
import { Home } from "./components/Home/home.jsx";

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Login"
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="Cadastro" component={Cadastro} />
				<Stack.Screen name="Home" component={Home} headerShown={true} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
