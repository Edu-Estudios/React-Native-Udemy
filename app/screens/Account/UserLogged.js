import React, {useState, useEffect, useRef} from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

import {Button} from 'react-native-elements';

import * as firebase from 'firebase';

import InfoUser from '../../components/Account/InfoUser';
import AccountOptions from '../../components/Account/AccountOptions';

import Toast from 'react-native-easy-toast';

import Loading from '../../components/Loading';

export default function UserLogged() {
    // Controlador de la información del usuario logueado
    const [userInfo, setUserInfo] = useState({});
    // Controlador para recargar la página cuando se suba una nueva imagen de perfil
    const [reloadData, setReloadData] = useState(false);

    const toastRef = useRef();

    // Estados para el Loading
    const [isLoading, setIsLoading] = useState(false);
    const [textLoading, setTextLoading] = useState("");

    // el useEffect se ejecuta cuando se reenderiza el componente o cuando se actualiza algunas de las propiedades del array
    useEffect(() => {
        (async () => {
            const user = await firebase.auth().currentUser;
            // providerData es un array que contiene los datos de los usuarios logueados. Solo va a haber un usuario logueado asique la posicion 0
            setUserInfo(user.providerData[0])
        })();
        setReloadData(false);
    }, [reloadData]) // Se pone el reloadData entre [] para que el useEffect se ejecute cuando se actualiza el valor de esta variable
    return(
        <View style={styles.viewUserInfo}>
            <InfoUser userInfo={userInfo} setReloadData={setReloadData} toastRef={toastRef} setIsLoading={setIsLoading} setTextLoading={setTextLoading}/>
            <AccountOptions userInfo={userInfo} setReloadData={setReloadData} toastRef={toastRef}/>
            {/* Botón para cerrar sesión, utilizando Firebase como Back */}
            <Button title="Cerrar sesión" buttonStyle={styles.btnCloseSession} titleStyle={styles.btnCloseSessionText} onPress={() => firebase.auth().signOut()}/>
            <Toast ref={toastRef} position="center" opacity={0.5}/>
            {/* El texto del Loading va a ser dinamico y será en InfoUser donde se determine el texto*/}
            <Loading text={textLoading} isVisible={isLoading}/>
        </View>
    )
}

const styles = StyleSheet.create({
    viewUserInfo: {
        minHeight: "100%",
        backgroundColor: "#f2f2f2"
    },
    btnCloseSession: {
        marginTop: 30,
        borderRadius: 0,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#e3e3e3",
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3",
        paddingTop: 10,
        paddingBottom: 10
    },
    btnCloseSessionText: {
        color: "#00a680"
    }
})