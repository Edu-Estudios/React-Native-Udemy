import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import ActionButton from 'react-native-action-button';

import ListRestaurants from '../../components/Restaurants/ListRestaurants';

import { firebaseApp } from '../../utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/firestore';

// Constante donde se guarda la conexion a la BBDD
const db = firebase.firestore(firebaseApp);

export default function Restaurants(props) {
    /* En los props vienen la funciones del navigation */
    console.log(props);
    const {navigation} = props;

    /* Estado del usuario para ver si esta logueado o no*/
    const [user, setuser] = useState(null)

    const [restaurants, setRestaurants] = useState([])
    // Se va a usar para indicar cual es el primer restaurante a mostrar del Array
    const [startRestaurants, setStartRestaurants] = useState(null)
    
    const [isLoading, setIsLoading] = useState(false)
    const [totalRestaurants, setTotalRestaurants] = useState(0)

    const limitRestaurants = 8;

    // Este estado va a indicar al useEffect cuando tiene que pedir de nuevo los restaurantes
    const [isReloadRestaurants, setIsReloadRestaurants] = useState(false)

    /* Coge el usuario logueado de firebase */
    useEffect(() => {
        firebase.auth().onAuthStateChanged(userInfo => {
            setuser(userInfo)
        })
    }, []);

    useEffect(() => {
        // Devuelve el total de Restaurantes que hay guardados en la BBDD
        db.collection("restaurants").get().then((snapshot) => 
        setTotalRestaurants(snapshot.size));

        // Funcion asíncrona
        (async ()=> {
            const resultRestaurants = [];
            // Trae los restaurantes ordenados por fecha de creacion. Como maximo trae tantos restaurantes como hayamos puesto en la constante limitRestaurants
            const restaurants = db.collection("restaurants").orderBy('createAt', "desc").limit(limitRestaurants)

            await restaurants.get().then(response => {
                setStartRestaurants(response.docs[response.docs.length - 1]);

                response.forEach(doc => {
                    let restaurant = doc.data();
                    restaurant.id = doc.id;
                    resultRestaurants.push({restaurant});
                });
                setRestaurants(resultRestaurants);
            })
        })();
        setIsReloadRestaurants(false);
    }, [isReloadRestaurants])

    const handleLoadMore = async () => {
        const resultRestaurants = [];
        // Si se cumple la condición entonces el setIsLoading se pone a true
        restaurants.length < totalRestaurants && setIsLoading(true);

        // Coge los restaurantes que hay en la BBDD después del último que tenemos guardado (startRestaurants)
        const restaurantsDB = db.collection('restaurants').orderBy("createAt", "desc").startAfter(startRestaurants.data().createAt).limit(limitRestaurants);

        await restaurantsDB.get().then(response => {
            if(response.docs.length > 0) {
                setStartRestaurants(response.docs[response.docs.length - 1]);
            } else {
                setIsLoading(false);
            }

            response.forEach(doc => {
                let restaurant = doc.data();
                restaurant.id = doc.id;
                resultRestaurants.push({restaurant});
            })

            // el array tendrá sus valores anteriores más los nuevos
            setRestaurants([...restaurants, ...resultRestaurants])
        })
    }

    return(
        <View style={styles.viewBoddy}>
            <ListRestaurants restaurants={restaurants} isLoading={isLoading} handleLoadMore={handleLoadMore}/>
            {/* Si el usuario está logueado entonces mostrará el botón para añadir nuevos Restaurantes */}
            {user && <AddRestaurantButton navigation={navigation} setIsReloadRestaurants={setIsReloadRestaurants}/>}
        </View>
    )
}

function AddRestaurantButton(props) {
    const {navigation, setIsReloadRestaurants} = props;

    return (
        <ActionButton 
            buttonColor="#00a680"
            /* Gracias a los {} podemos pasarle props al componente que está en el navigation. De esta forma el componente AddRestaurant tendrá acceso al setIsReloadRestaurants */
            onPress={() => navigation.navigate("AddRestaurant", {setIsReloadRestaurants})}
        />
    )
}

const styles = StyleSheet.create({
    viewBoddy: {
        /* Se ha utilizado para colocar el botón en la parte inferior */
        flex: 1
    }
})