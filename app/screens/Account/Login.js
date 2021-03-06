import React, {useRef} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';
import {Divider} from 'react-native-elements';
/* import {withNavigation} from 'react-navigation'; No es necesario en este caso*/

import LoginForm from '../../components/Account/LoginForm';

import Toast from 'react-native-easy-toast';

import LoginFacebook from '../../components/Account/LoginFacebook';

// Como este componente es uno de los "principales" de un Stack de navigation, los props de "withNavigation" ya vienen precargados
export default function Login(props) {
    const {navigation} = props;
    const toastRef = useRef();
    return (
        <ScrollView>
            <Image source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")} style={styles.logo} resizeMode="contain"/>
            <View style={styles.viewContainer}>
                <LoginForm toastRef={toastRef}/>
                <CreateAccount navigation={navigation}/>
            </View>
            <Divider style={styles.divider}/>
            <View style={styles.viewContainer}>
                <LoginFacebook toastRef={toastRef} navigation={navigation}/>
            </View>
            <Toast ref={toastRef} position="center" opacity={0.5}/>
        </ScrollView>
    );
}

// Creación de un componente interno
function CreateAccount(props) {
    const {navigation} = props;
    return (
        <Text style={styles.register}>
            ¿Aún no tienes una cuenta?{" "}
            <Text style={styles.btnRegister} onPress={() => navigation.navigate("Register")}>
                Regístrate
            </Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 150,
        marginTop: 20,
    },
    viewContainer: {
        marginRight: 40,
        marginLeft: 40
    },
    register: {
        marginTop: 15,
        marginLeft: 10,
        marginRight:10
    },
    btnRegister: {
        color: "#00a680",
        fontWeight: "bold"
    },
    divider: {
        backgroundColor: "#00a680",
        margin: 40
    }
})