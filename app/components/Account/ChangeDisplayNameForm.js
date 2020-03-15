import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Input, Button} from 'react-native-elements';

export default function ChangeDisplayNameForm(props) {
    /* displayName traerá el nombre que ya tiene el usuario. setIsVisibleModal para poder ocultar el modal al pulsar en el botón de Cambiar Nombre */
    /* setReloadData para actualizar la información en pantalla al cambiar el nombre. */
    const {displayName, setIsVisibleModal, setReloadData, toastRef} = props;

    const updateDisplayName = () => {
        console.log("Nombre de usuario actualizado")
    }

    return (
        <View style={styles.view}>
            <Input 
                placeholder="Nombre"
                containerStyle={styles.input}
                /* Si el usuario tiene un nombre ya guardado muestralo, sino no */
                defaultValue={displayName && displayName}
                onChange={() => console.log("He cambiado el nombre")}
                rightIcon={{
                    type: "material-community",
                    name: "account-circle-outline",
                    color: "#c2c2c2"
                }}
                //errorMessage={}
            />
            <Button
                title="Cambiar nombre"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={updateDisplayName}
                /* Muestra un spinner en el botón mientras se actualiza el nombre */
                // loading={}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10
    },
    input: {
        marginBottom: 10,
    },
    btnContainer: {
        marginTop: 20,
    },
    btn: {
        backgroundColor: "#00a680"
    }
})