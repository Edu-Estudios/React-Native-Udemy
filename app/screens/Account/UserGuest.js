import React from 'react';
// Scrollview es para poder hacer scroll
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';
import {Button} from 'react-native-elements';
// Esto nos permite redireccionar a otro componente/pantalla dentro de este mismo Stack de rutas (AccountStacks.js)
import {withNavigation} from 'react-navigation';

// Para que funcione el withNavigation es necesario quitar el antiguo "export default" y añadirle los "props". Estos "props" vienen automáticamente gracias al withNavigation
function UserGuest(props) {
    // Esta es la propiedad que se necesita para redireccionar
    const {navigation} = props;
    return (
        <ScrollView style={styles.viewBody} centerContent={true}>
            <Image source={require("../../../assets/img/user-guest.jpg")} style={styles.image} resizeMode="contain"/>
            <Text style={styles.title}>Consulta tu perfil de 5 Tenedores</Text>
            <Text style={styles.description}>
                ¿Cómo describirías tu mejor restaurante? Busca y visualiza los mejores restaurantes de una forma sencilla, vota cual te ha gustado más y 
                comenta cómo ha sido tu experiencia?
            </Text>
            <View style={styles.viewBtn}>
                {/* Ahora el botón utilizará una de las props de withNavigation para redireccionar al Login. 
                El nombre "Login" es el que se le ha puesto a la ruta del AccountScreeStacks (AccountStacks.js)  */}
                <Button buttonStyle={styles.btnStyle} containerStyle={styles.btnContainer} title="Ver tu perfil" onPress={() => navigation.navigate("Login")}/>
            </View>
        </ScrollView>
    )
}
// Esto es lo que otorga las propiedades de "withNavigation" al componente
export default withNavigation(UserGuest);

const styles = StyleSheet.create({
    viewBody: {
        marginLeft: 30,
        marginRight: 30
    },
    image: {
        height: 300,
        /* Esta entre "" porque es porcentaje */
        width: "100%",
        marginBottom: 40
    },
    title: {
        fontWeight: 'bold',
        fontSize: 19,
        marginBottom: 20,
        textAlign: "center"
    },
    description: {
        textAlign: "center",
        marginBottom: 20
    },
    viewBtn: {
        flex: 1,
        alignItems: "center"
    },
    btnStyle: {
        backgroundColor: "#00a680"
    },
    btnContainer: {
        width: "70%"
    }
})