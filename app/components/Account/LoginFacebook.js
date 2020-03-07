import React, {useState} from 'react';
import {SocialIcon} from 'react-native-elements';
import Loading from '../Loading';

// Importaciones necesarias para hacer el Login con Facebook
import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import {FacebookApi} from '../../utils/Social';


export default function LoginFacebook() {
    const login = async () => {
        // type devuelve "success" si el inicio de sesión ha ido bien y "cancel" sino
        // token devuelve "undefined" si no se ha iniciado sesion y un token si si se ha iniciado sesion
        const {type, token} = await Facebook.logInWithReadPermissionsAsync(
            FacebookApi.application_id,
            {permissions: FacebookApi.permissions}
        );

        if(type==="success") {
            const credentials = firebase.auth.FacebookAuthProvider.credential(token);
            await firebase.auth().signInWithCredential(credentials).then(() => {
                console.log('login correcto')
            }).catch(() => {
                console.log('error accediendo con Facebook')
            })
        } else if(type==="cancel") {
            console.log("Inicio de sesión cancelado")
        } else {
            console.log("Error desconocido")
        }
    }
    return(
        <SocialIcon title="Iniciar sesión con Facebook" button type="facebook" onPress={login}/>
    )
}