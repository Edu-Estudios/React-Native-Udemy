import React, {useState} from 'react';
import {SocialIcon} from 'react-native-elements';
import Loading from '../Loading';

// Importaciones necesarias para hacer el Login con Facebook
import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import {FacebookApi} from '../../utils/Social';


export default function LoginFacebook(props) {
    const {toastRef, navigation} = props
    const [isLoading, setIsLoading] = useState(false)

    const login = async () => {
        setIsLoading(true)
        // Ayuda a inicializar el SDK de Facebook
        await Facebook.initializeAsync('3046276698715908');
        // type devuelve "success" si el inicio de sesión ha ido bien y "cancel" sino
        // token devuelve "undefined" si no se ha iniciado sesion y un token si si se ha iniciado sesion
        const {type, token} = await Facebook.logInWithReadPermissionsAsync(
            FacebookApi.application_id,
            {permissions: FacebookApi.permissions}
        );

        if(type==="success") {
            // Guardamos el token generado al iniciar sesión
            const credentials = firebase.auth.FacebookAuthProvider.credential(token);
            // Y hacemos iniciar sesión con el token generado
            await firebase.auth().signInWithCredential(credentials).then(() => {
                navigation.navigate("MyAccount")
            }).catch(() => {
                toastRef.current.show("Error al iniciar sesión")
            })
        } else if(type==="cancel") {
            toastRef.current.show("Inicio de sesión cancelado")
        } else {
            toastRef.current.show("Error desconocido")
        }
        setIsLoading(false)
    }
    return(
        /* Con <> </> no hace falta poner View, es algo genérico */
        <>
        <SocialIcon title="Iniciar sesión con Facebook" button type="facebook" onPress={login}/>
        <Loading isVisible={isLoading} text="Iniciando sesión" />
        </>
    )
}