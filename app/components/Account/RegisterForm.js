import React, {useState} from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import {Input, Icon, Button} from 'react-native-elements';

import {validateEmail} from '../../utils/Validation';

import * as firebase from 'firebase'; // Necesario para el envío de datos a Firebase

import Loading from '../Loading';

import {withNavigation} from 'react-navigation';

 function RegisterForm(props) {
    // Referencia del elemento Toast de Register.js y navigation
    const {toastRef, navigation} = props;

    // Controladores para mostrar o no las contraseñas
    const [hidePassword, setHidePassword] = useState(true)
    const [hideSecondPassword, setHideSecondPassword] = useState(true)

    // Controladores para guardar los datos del formulario (es una de las muchas formas que hay para guardar los datos del formulario)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    // Controlador para ver si se ha empezado o terminado la petición de crear cuenta (Firebase)
    const [isVisibleLoading, setIsVisibleLoading] = useState(false);

    // Función utilizada al pulsar en el botón "Unirse" para registrar al usuario
    // Es necesario que sea asíncrona ya que va a tener que esperar a las respuestas de las peticiones a Firebase
    const register = async() => {
        setIsVisibleLoading(true);

        // Validaciones de datos
        if(!email || !password || !repeatPassword) {
            toastRef.current.show("Todos los campos son obligatorios")
        } else {
            // Validador de email
            if (!validateEmail(email)) {
                toastRef.current.show("El email no es correcto")
            } else {
                if (password !== repeatPassword) {
                    toastRef.current.show("Las contraseñas no coinciden")
                } else {
                    // Lo siguiente es un método de Firebase que permite registrar un usuario. Solo es necesario pasarle el correo y la contraseña
                    // "await" para quedar a la espera de la respuesta
                    await firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
                        // Cuando se haya creado el nuevo usuario correctamente nos redirecciona a MyAccount, y dentro de este componente ya está controlado si el usuario está logueado o no para mostrar una pantalla u otra
                        navigation.navigate("MyAccount");
                    }).catch(() => {
                        toastRef.current.show("Error al crear la cuenta, inténtelo más tarde")
                    })
                }
            }
        }

        setIsVisibleLoading(false);
    }

    return (
        <View style={styles.formContainer}>
            <Input 
                placeholder="Correo electrónico" 
                containerStyle={styles.inputForm}
                /* De esta forma se coge el texto escrito en el input */
                onChange={e => setEmail(e.nativeEvent.text)} 
                rightIcon={
                    <Icon type="material-community" name="at" iconStyle={styles.iconRight}/>
                }
            />
            <Input
                placeholder="Contraseña"
                password={true}
                secureTextEntry={hidePassword} // Oculta la contraseña con puntitos
                containerStyle={styles.inputForm}
                onChange={e => setPassword(e.nativeEvent.text)} 
                rightIcon={
                    <Icon type="material-community" name={hidePassword ? "eye-outline" : "eye-off-outline"} iconStyle={styles.iconRight} onPress={() => setHidePassword(!hidePassword)}/>
                }
            />
            <Input
                placeholder="Repetir Contraseña"
                password={true}
                secureTextEntry={hideSecondPassword}
                containerStyle={styles.inputForm}
                onChange={e => setRepeatPassword(e.nativeEvent.text)} 
                rightIcon={
                    <Icon type="material-community" name={hideSecondPassword ? "eye-outline" : "eye-off-outline"} iconStyle={styles.iconRight} onPress={() => setHideSecondPassword(!hideSecondPassword)}/>
                }
            />
            <Button 
                title="Unirse"
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                onPress={register}
            />
            <Loading text="Creando cuenta" isVisible={isVisibleLoading}/>
        </View>
    )
}

// Necesario para que los props del componente tengan las propiedades del navigation
export default withNavigation(RegisterForm);

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    inputForm : {
        width: "100%",
        marginTop: 20
    },
    iconRight: {
        color: "#c1c1c1"
    },
    btnContainerRegister: {
        marginTop: 20,
        width: "95%"
    },
    btnRegister: {
        backgroundColor: "#00a680"
    }
})