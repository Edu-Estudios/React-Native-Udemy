import {createStackNavigator} from 'react-navigation-stack'; // Importación necesaria para crear un Stack
import RestaurantsScreen from '../screens/Restaurants'; // Importación de la parte de la App a la que está vinculado este Stack
import AddRestaurant from '../screens/Restaurants/AddRestaurant';

// Lo primero es crear la constante que será de tipo createStackNavigator
const RestaurantsScreenStacks = createStackNavigator({
    Restaurants: {
        /* Aquí se indica la pantalla a la que está vinculada el Stack */
        screen: RestaurantsScreen,
        navigationOptions: () => ({
            // Este es el nombre que aparece en la parte superior de la pantalla
            title: "Restaurantes"
        })
    },
    AddRestaurant: {
        screen: AddRestaurant,
        navigationOptions: () => ({
            title: "Nuevo Restaurante"
        })
    }
})

// Hay que exportarlo para poder usarlo en el Navigation.js
export default RestaurantsScreenStacks;