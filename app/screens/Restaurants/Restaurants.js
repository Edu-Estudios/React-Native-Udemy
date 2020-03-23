import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import ActionButton from 'react-native-action-button';
import * as firebase from 'firebase';

export default function Restaurants(props) {
    /* En los props vienen la funciones del navigation */
    console.log(props);
    const {navigation} = props;

    /* Estado del usuario para ver si esta logueado o no*/
    const [user, setuser] = useState(null)

    /* Coge el usuario logueado de firebase */
    useEffect(() => {
        firebase.auth().onAuthStateChanged(userInfo => {
            setuser(userInfo)
        })
    }, [])

    return(
        <View style={styles.viewBoddy}>
            <Text>Estamos en Restaurantes</Text>
            {/* Si el usuario está logueado entonces mostrará el botón para añadir nuevos Restaurantes */}
            {user && <AddRestaurantButton navigation={navigation}/>}
        </View>
    )
}

function AddRestaurantButton(props) {
    const {navigation} = props;

    return (
        <ActionButton 
            buttonColor="#00a680"
            onPress={() => navigation.navigate("AddRestaurant")}
        />
    )
}

const styles = StyleSheet.create({
    viewBoddy: {
        /* Se ha utilizado para colocar el botón en la parte inferior */
        flex: 1
    }
})