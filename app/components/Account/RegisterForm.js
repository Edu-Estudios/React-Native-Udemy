import React, {useState} from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import {Input, Icon, Button} from 'react-native-elements';

import {validateEmail} from '../../utils/Validation';

export default function RegisterForm() {

    // Controladores para mostrar o no las contraseñas
    const [hidePassword, setHidePassword] = useState(true)
    const [hideSecondPassword, setHideSecondPassword] = useState(true)

    // Controladores para guardar los datos del formulario (es una de las muchas formas que hay para guardar los datos del formulario)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    // Función utilizada al pulsar en el botón "Unirse" para registrar al usuario
    const register = () => {

        // Validaciones de datos
        if(!email || !password || !repeatPassword) {
            console.log('Todos los campos son obligatorios')
        } else {
            // Validador de email
            if (!validateEmail(email)) {
                console.log('El email no es correcto')
            } else {
                if (password !== repeatPassword) {
                    console.log('Las contraseñas no coinciden')
                } else {
                    console.log('Correcto')
                }
            }
        }
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
        </View>
    )
}

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