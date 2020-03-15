import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import {Avatar} from 'react-native-elements';

import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions'; // Permite conseguir los permisos necesarios para acceder a ciertos elementos del móvil como la cámara
import * as ImagePicker from 'expo-image-picker'; // Permite que la app acceda a las fotos del móvil

export default function InfoUser(props) {
    // Doble estructuring. Datos que vienen del usuario logueado a través de Firebase (UserLogged.js)
    const {
        userInfo,
        userInfo: {uid, displayName, email, photoURL },
        setReloadData,
        toastRef,
        setIsLoading,
        setTextLoading
    } = props;

    console.log(userInfo)

    const changeAvatar = async () => {
        /* Permite conseguir los permisos para acceder a la galería del móvil. Para que funcione en Android hay que indicarlo en el app.json (mirar donde pone "android") */
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL); // La primera vez saldrá el típico popup de permitir acceder al elemento indicado, luego devolverá un objeto "permissions"
        const resultPermissionCamera = resultPermission.permissions.cameraRoll.status;

        if(resultPermissionCamera === "denied") {
            toastRef.current.show("Es necesario aceptar los permisos de la librería")
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            });

            if(result.cancelled) {
                toastRef.current.show("Has cerrado la galería de imagenes sin seleccionar ninguna imagen")
            } else {
                // Le pasamos la url de la imagen seleccionada y el id del usuario que está logueado, para no ir acumulando avatares
                uploadImage(result.uri, uid).then(() => {
                    console.log('Imagen subida correctamente')
                    updatePhotoUrl(uid);
                })
            }
        }
    }

    const uploadImage = async (uri, nameImage)  => {
        console.log('URI ' + uri)
        console.log('nameImage ' + nameImage)

        setTextLoading("Actualizando avatar");
        setIsLoading(true);
        // Para subir la imagen a firebase...
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase.storage().ref().child(`avatar/${nameImage}`);
        return ref.put(blob);
    }

    // Para actualizar la foto de perfil con la imagen recien subida
    const updatePhotoUrl = (uid) => {
        firebase.storage().ref(`avatar/${uid}`).getDownloadURL().then(async result => {
            const update = {
                photoURL: result
            }
            await firebase.auth().currentUser.updateProfile(update);
            // Refresca la informacion del usuario cuando la imagen de avatar se ha subido correctamentes
            setReloadData(true);
            setIsLoading(false);
        }).catch(() => {
            toastRef.current.show("Error al recuperar el avatar del servido")
        })
    }

    return(
        <View style={styles.viewUserInfo}>
            <Avatar 
                rounded
                size="large"
                showEditButton
                onEditPress={changeAvatar}
                containerStyle={styles.userInfoAvatar}
                source={{uri: photoURL ? photoURL : "https://api.adorable.io/avatars/266/abott@adorable.png"}}/>
            <View>
                <Text style={styles.displayName}>
                    {displayName ? displayName : "Anónimo"}
                </Text>
                <Text style={styles.displayName}>
                    {email ? email : "Social Login"}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewUserInfo: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f2f2f2",
        paddingTop: 30,
        paddingBottom: 30
    },
    userInfoAvatar: {
        marginRight: 20
    },
    displayName: {
        fontWeight: "bold"
    }
});