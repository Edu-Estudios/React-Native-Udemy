import React, {useRef} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

import Toast from 'react-native-easy-toast';

// Paquete necesario para que el teclado de la pantalla no oculte el campo input en el que se va a escribir
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'

import RegisterForm from '../../components/Account/RegisterForm';

export default function Register() {
    /* Para hacer una referencia de un elemento hay que utilizar useRef */
    const toastRef = useRef();

    return(
        /* A la hora de hacer el curso el scroll no funciona en Android  */
        <KeyboardAwareScrollView>
            <Image source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")} style={styles.logo} resizeMode="contain"/>
            <View style={styles.viewForm}>
                {/* Le pasamos por los props la referencia al Toast */}
                <RegisterForm toastRef={toastRef}/>
            </View>
            {/* Es necesario utilizar useRef ya que se va a hacer referencia a este elemento desde otro componente (RegisterForm.js) */}
            <Toast ref={toastRef} position="center" opacity={0.5}/>
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