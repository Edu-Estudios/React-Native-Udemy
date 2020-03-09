import React, {useState, useEffect} from 'react';
import {
    View,
    Text
} from 'react-native';

import {Button} from 'react-native-elements';

import * as firebase from 'firebase';

import InfoUser from '../../components/Account/InfoUser';

export default function UserLogged() {
    // Controlador de la información del usuario logueado
    const [userInfo, setUserInfo] = useState({});

    // el useEffect se ejecuta cuando se reenderiza el componente o cuando se actualiza algunas de las propiedades del array
    useEffect(() => {
        (async () => {
            const user = await firebase.auth().currentUser;
            // providerData es un array que contiene los datos de los usuarios logueados. Solo va a haber un usuario logueado asique la posicion 0
            setUserInfo(user.providerData[0])
        })();
    }, [])
    return(
        <View>
            <InfoUser userInfo={userInfo}/>
            {/* Botón para cerrar sesión, utilizando Firebase como Back */}
            <Button title="Cerrar sesión" onPress={() => firebase.auth().signOut()}/>
        </View>
    )
}