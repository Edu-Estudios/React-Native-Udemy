import {createStackNavigator} from 'react-navigation-stack';

import MyAccountScreen from '../screens/Account/MyAccount';
import LoginScreen from '../screens/Account/Login';
import RegisterScreen from '../screens/Account/Register';

const AccountScreeStacks = createStackNavigator({
    MyAccount: {
        screen: MyAccountScreen,
        navigationOptions: () => ({
            title: "Mi cuenta"
        })
    },
    // Se crea esta ruta para poder viajar a ella desde la sección de Account
    Login: {
        screen: LoginScreen,
        navigationOptions: () => ({
            title: "Login"
        })
    },
    Register: {
        screen: RegisterScreen,
        navigationOptions: () => ({
            title: "Nuevo usuario"
        })
    }
})

export default AccountScreeStacks;