import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, Alert, Dimension} from 'react-native';
import {Icon, Avatar, Image, Input, Button} from 'react-native-elements';

/* Paquetes para poder coger imagenes de la galeria del movil */
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

export default function AddRestaurantForm(props) {
    const {navigation, toastRef, setisLoading} = props;

    // Array donde se van a guardar las imagenes que se van a subir al crear un restaurante
    const [imagesSelected, setImagesSelected] = useState([])
    return (
        <ScrollView>
            <UploadImage imagesSelected={imagesSelected} setImagesSelected={setImagesSelected} toastRef={toastRef}/>
        </ScrollView>
    )
}

/* Componentes internos */
function UploadImage(props) {
    const {imagesSelected, setImagesSelected, toastRef} = props;

    const imageSelect = async() => {
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        console.log(resultPermission)
        const resultPermissionCamera = resultPermission.permissions.cameraRoll.status;
        if(resultPermissionCamera === "denied") {
            toastRef.current.show("Es necesario aceptar los permisos de la galería. Actívalo en Ajustes para acceder a esta funcionalidad", 3000)
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            })

            if(result.cancelled) {
                toastRef.current.show("Se ha cerrado la galería")
            } else {
                console.log(result)
                /* Añade al array de imagesSelected lo que ya tuviera (...imagesSelected) y la nueva imagen seleccionada */
                setImagesSelected([...imagesSelected, result.uri])
            }
        }
        console.log(imagesSelected)
    }
    
    return (
        <View style={styles.viewImages}>
            {imagesSelected.length < 5 && (
                /* Icono del cuadradito con el dibujo de la camara */
                <Icon 
                    type="material-community"
                    name="camera"
                    color="#7a7a7a"
                    containerStyle={styles.containerIcon}
                    onPress={imageSelect}
                />
            )}
            

            {/* Esto es un bucle forEach en el que para cada elemento del array hace lo que hay entre parentesis */}
            {imagesSelected.map((imageRestaurant, index) => (
                /* Cuadradito con la imagen que se ha elegido para subir */
                <Avatar
                    /* Esta key es obligatoria al estar dentro de un bucle */
                    key={index}
                    onPress={() => console.log('hola')}
                    style={styles.miniatureStyle} 
                    source={{uri: imageRestaurant}}
                />
            ))}
            
        </View>
    )
}

const styles = StyleSheet.create({
    viewImages: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30
    },
    containerIcon: {
        alignItems: 'center',
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3"
    },
    miniatureStyle: {
        width: 70,
        height: 70,
        marginRight: 10,
    }
})