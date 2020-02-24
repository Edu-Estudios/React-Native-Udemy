import React from 'react';
import {Icon} from 'react-native-elements';

// Importaciones necesarias para el Navigation
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs'; // Necesario para montar una navegación basada en tabs en la parte inferior de la pantalla

// Importaciones de los Stacks
import RestaurantsScreenStacks from './RestaurantsStacks';
import TopListScreenStacks from './TopListStacks';
import SearchScreenStacks from './SearchStacks';
import AccountScreenStacks from './AccountStacks';

// En esta constante irán todas las rutas de navegación
const NavigationStacks = createBottomTabNavigator(
    {
        // Podemos darle cualquier nombre
        Restaurants: {
            // Aquí se indica el Stack al que está vinculado
            screen: RestaurantsScreenStacks,
            navigationOptions: () => ({
                // El tabBarLabel será el texto que aparecerá en el menú de navegación
                tabBarLabel: "Restaurantes",
                // Y esté será el icono que aparecerá
                tabBarIcon: ({tintColor}) => (
                    <Icon type="material-community" name="compass-outline" size={22} color={tintColor}/>
                )
            })
        },

        TopLists: {
            screen: TopListScreenStacks,
            navigationOptions: () => ({
                tabBarLabel: "Ranking",
                tabBarIcon: ({tintColor}) => (
                    <Icon type="material-community" name="star-outline" size={22} color={tintColor}/>
                )
            })
        },

        Search: {
            screen: SearchScreenStacks,
            navigationOptions: () => ({
                tabBarLabel: "Buscador",
                tabBarIcon: ({tintColor}) => (
                    <Icon type="material-community" name="magnify" size={22} color={tintColor}/>
                )
            })
        },

        Account: {
            screen: AccountScreenStacks,
            navigationOptions: () => ({
                tabBarLabel: "Mi Cuenta",
                tabBarIcon: ({tintColor}) => (
                    <Icon type="material-community" name="home-outline" size={22} color={tintColor}/>
                )
            })
        }
    },
    // Se puede crear un objeto para indicar otras propiedades
    {
        // Para indicar la página en la que estaremos al abrir la app
        initialRouteName: "Restaurants",
        // Para indicar el orden en el que van a aparecer las páginas
        order: ["Restaurants", "TopLists", "Search", "Account"],
        // Para indicar el color de la página en la que estamos y el color de las páginas en las que no estamos
        tabBarOptions: {
            inactiveTintColor: "#646464",
            activeTintColor: "#00a680"
        }
    }
);

// Por último hay que exportarlo de esta forma para poder llamarlo en el App.js
export default createAppContainer(NavigationStacks);