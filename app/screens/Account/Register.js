import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

// Paquete necesario para que el teclado de la pantalla no oculte el campo input en el que se va a escribir
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'

import RegisterForm from '../../components/Account/RegisterForm';

export default function Register() {
    return(
        /* A la hora de hacer el curso el scroll no funciona en Android  */
        <KeyboardAwareScrollView>
            <Image source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")} style={styles.logo} resizeMode="contain"/>
            <View style={styles.viewForm}>
                <RegisterForm />
            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 150,
        marginTop: 20
    },
    viewForm: {
        marginRight: 40,
        marginLeft: 40
    }
})