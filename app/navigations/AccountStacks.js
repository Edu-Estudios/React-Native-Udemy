import {createStackNavigator} from 'react-navigation-stack';

import MyAccountScreen from '../screens/Account/MyAccount';

const AccountScreeStacks = createStackNavigator({
    MyAccount: {
        screen: MyAccountScreen,
        navigationOptions: () => ({
            title: "Mi cuenta"
        })
    }
})

export default AccountScreeStacks;