import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Input, Button} from 'react-native-elements';
import * as firebase from 'firebase';

export default function ChangeDisplayNameForm(props) {
    /* displayName traerá el nombre que ya tiene el usuario. setIsVisibleModal para poder ocultar el modal al pulsar en el botón de Cambiar Nombre */
    /* setReloadData para actualizar la información en pantalla al cambiar el nombre. */
    const {displayName, setIsVisibleModal, setReloadData, toastRef} = props;
    const [newDisplayName, setNewDisplayName] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const updateDisplayName = () => {
        // Cada vez que se envia el formulario se tiene que limpiar el estado de errores
        setError(null);
        if(!newDisplayName) {
            setError("El nombre del usuario no ha cambiado")
        } else {
            setIsLoading(true);
            const update = {
                displayName: newDisplayName
            };
            firebase.auth().currentUser.updateProfile(update).then(() => {
                setIsLoading(false);
                // Para actualizar la informacion del usuario en pantalla
                setReloadData(true);
                toastRef.current.show("Nombre actualizado correctamente");
                setIsVisibleModal(false);
            }).catch(() => {
                setError("Error al actualizar el nombre");
                setIsLoading(false);
            })
        }
    }

    return (
        <View style={styles.view}>
            <Input 
                placeholder="Nombre"
                containerStyle={styles.input}
                /* Si el usuario tiene un nombre ya guardado muestralo, sino no */
                defaultValue={displayName && displayName}
                onChange={e => setNewDisplayName(e.nativeEvent.text)}
                rightIcon={{
                    type: "material-community",
                    name: "account-circle-outline",
                    color: "#c2c2c2"
                }}
                errorMessage={error}
            />
            <Button
                title="Cambiar nombre"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={updateDisplayName}
                /* Muestra un spinner en el botón mientras se actualiza el nombre */
                loading={isLoading}
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
        width: "95%"
    },
    btn: {
        backgroundColor: "#00a680"
    }
})