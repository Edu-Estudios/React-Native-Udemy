import React, {useState} from 'react';
import {
    StyleSheet,
    View,

} from 'react-native';
import {Input, Icon, Button} from 'react-native-elements';
import {validateEmail} from '../../utils/Validation';
import Loading from '../Loading';
import * as firebase from 'firebase';
import {withNavigation} from 'react-navigation';


function LoginForm(props) {
    // Controlador para mostrar o no la contraseña
    const [hidePassword, setHidePassword] = useState(true)

    // Controladores para guardar los datos del formulario
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // Referencia del Toast y navigation
    const {toastRef, navigation} = props;

    // Control del Loading
    const [isVisibleLoading, setIsVisibleLoading] = useState(false)

    const login = async () => {
        setIsVisibleLoading(true)
        if(!email || !password) {
            toastRef.current.show("Todos los campos son obligatorios");
        } else {
            if(!validateEmail(email)) {
                toastRef.current.show("El email no es correcto");
            } else {
                await firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
                    navigation.navigate("MyAccount");
                }).catch(() => {
                    toastRef.current.show("Email o contraseña incorrecta");
                })
            }
        }
        setIsVisibleLoading(false)
    }

    return(
        <View style={styles.formContainer}>
            <Input 
                placeholder="Correo electrónico" containerStyle={styles.inputForm} onChange={e => setEmail(e.nativeEvent.text)} rightIcon={
                    <Icon type="material-community" name="at" iconStyle={styles.iconRight}/>
                }/>
            <Input 
                placeholder="Contraseña" containerStyle={styles.inputForm} password={true} secureTextEntry={hidePassword} onChange={e => setPassword(e.nativeEvent.text)} rightIcon={
                    <Icon type="material-community" name={hidePassword ? "eye-outline" : "eye-off-outline"} onPress={() => setHidePassword(!hidePassword)} iconStyle={styles.iconRight}/>
                }/>
            <Button 
                title="Iniciar sesión" containerStyle={styles.btnContainerLogin} buttonStyle={styles.btnLogin} onPress={login}/>
            <Loading isVisible={isVisibleLoading} text="Iniciando sesión"/>
        </View>
    )
}

export default withNavigation(LoginForm);

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    inputForm: {
        width: "100%",
        marginTop: 20
    },
    iconRight: {
        color: '#c1c1c1'
    },
    btnContainerLogin: {
        marginTop: 20,
        width: "95%"
    },
    btnLogin: {
        backgroundColor: "#00a680"
    }
})