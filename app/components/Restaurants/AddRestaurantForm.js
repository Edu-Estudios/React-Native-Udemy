import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, Alert, Dimensions} from 'react-native';
import {Icon, Avatar, Image, Input, Button} from 'react-native-elements';

/* Paquetes para poder coger imagenes de la galeria del movil */
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import Modal from '../Modal';


import uuidv4 from 'uuid/v5';

import {firebaseApp} from '../../utils/FireBase';
import firebase from 'firebase/app';
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

/* Permite capturar el ancho de la pantalla del dispositivo utilizado */
const WidthScreen = Dimensions.get("window").width;

export default function AddRestaurantForm(props) {
    const {navigation, toastRef, setisLoading, setIsReloadRestaurants} = props;

    // Array donde se van a guardar las imagenes que se van a subir al crear un restaurante
    const [imagesSelected, setImagesSelected] = useState([])

    const [restaurantName, setRestaurantName] = useState("")

    const [restaurantAddress, setRestaurantAddress] = useState("")

    const [restaurantDescription, setRestaurantDescription] = useState("")

    const [isVisibleMap, setIsVisibleMap] = useState(false)

    const [locationRestaurant, setLocationRestaurant] = useState(null)

    const addRestaurant = () => {
        if(!restaurantName || !restaurantAddress || !restaurantDescription) {
            toastRef.current.show("Todos los campos del formulario son obligatorios")
        } else if(imagesSelected.length == 0) {
            toastRef.current.show("El restaurante tiene que tener al menos una imagen")
        } else if(!locationRestaurant) {
            toastRef.current.show("Tienes que localizar el restaurante en el mapa")
        } else {
            setisLoading(true)
            uploadImagesStorage(imagesSelected).then(arrayImages => {
                /* Una vez subidas las imagenes... */
                console.log(arrayImages)
                /* Crea o busca la coleccion restaurants en la BBDD de firebase */
                db.collection("restaurants").add({
                    name: restaurantName,
                    address: restaurantAddress,
                    description: restaurantDescription,
                    location: locationRestaurant,
                    images: arrayImages,
                    rating: 0,
                    ratingTotal: 0,
                    quantityVoting: 0,
                    createAt: new Date(),
                    createBy: firebase.auth().currentUser.uid
                }).then(() => {
                    setisLoading(false);
                    setIsReloadRestaurants(true);
                    navigation.navigate("Restaurants");
                }).catch((error) => {
                    setisLoading(false)
                    toastRef.current.show("Error al crear el restaurante")
                    console.log(error)
                })
            })
        }
    }

    const uploadImagesStorage = async imageArray => {
        /* Array donde se guardarán las imagenes a medida que se vayan subiendo */
        const imagesBlob = [];
        /* Se va a hacer una promesa para controlar que hasta que no se hayan subido todas las imagenes no se guarde el restaurante en la BBDD */
        await Promise.all(
            imageArray.map(async image => {
                const response = await fetch(image);
                const blob = await response.blob();
                /* el uuidv4() genera un nombre en función de un id autogenerado */
                const ref = firebase.storage().ref("restaurante-images").child(uuidv4());
                await ref.put(blob).then(result => {
                    /* Recuperamos el nombre autogenerado de la imagen que se ha subido */
                    imagesBlob.push(result.metadata.name)
                })
            })
        );
        return imagesBlob
    }

    return (
        <ScrollView>
            {/* ImageRestaurant es el banner con la imagen principal del Restaurante, que será siempre la primera del Array de imagenes seleccionadas */}
            <ImageRestaurant imageRestaurant={imagesSelected[0]}/>
            <FormAdd setRestaurantName={setRestaurantName} 
                    setRestaurantAddress={setRestaurantAddress} 
                    setRestaurantDescription={setRestaurantDescription}
                    setIsVisibleMap={setIsVisibleMap}
                    locationRestaurant={locationRestaurant}/>
            <UploadImage imagesSelected={imagesSelected} setImagesSelected={setImagesSelected} toastRef={toastRef}/>
            <Button 
                title="Crear restaurante"
                onPress={addRestaurant}
                buttonStyle={styles.btnAddRestaurant}
            />

            <Map isVisibleMap={isVisibleMap} setIsVisibleMap={setIsVisibleMap} setLocationRestaurant={setLocationRestaurant} toastRef={toastRef}/>
        </ScrollView>
    )
}

/* Banner con la imagen principal que va a tener el restaurante */
function ImageRestaurant(props) {
    const { imageRestaurant } = props;

    return (
        <View style={styles.viewPhoto}>
            {/* Si hay una foto seleccionada aparecera la primera como imagen principal, sino aparecerá la imagen original.png guardada en assets */}
            {imageRestaurant ? (
                <Image 
                    source={{uri: imageRestaurant}}
                    style={{width: WidthScreen, height: 200}}
                />
            ) : (
                <Image 
                    source={ require("../../../assets/img/original.png")}
                    style={{width: WidthScreen, height: 200}}
                />
            )}
        </View>
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

    const removeImage = image => {
        console.log(image);
        const arrayImages = imagesSelected;
        /* Alert permite mostrar por pantalla el popup de aviso de Android o iOS */
        Alert.alert(
            /* Título */
            "Eliminar imagen",
            /* Mensaje */
            "¿Estás seguro de que quieres eliminar la imagen?",
            /* Array de los botones que van a aparecer */
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                }, 
                {
                    text: "Eliminar",
                    /* Con el onPress se va a modificar el array de imagenes seleccionadas. 
                    Con filter recorremos el array y mantenemos aquellos elementos cuya URL sea distinta a la URL de la imagen que queremos eliminar*/
                    onPress: () => setImagesSelected(arrayImages.filter(imageUrl => imageUrl !== image))
                }
            ], 
            { cancelable: false}
        )
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
                    onPress={() => removeImage(imageRestaurant)}
                    style={styles.miniatureStyle} 
                    source={{uri: imageRestaurant}}
                />
            ))}
            
        </View>
    )
}

function FormAdd(props) {
    const {setRestaurantName, setRestaurantAddress, setRestaurantDescription, setIsVisibleMap, locationRestaurant} = props

    return(
        <View style={styles.viewForm}>
            <Input 
                placeholder="Nombre del restaurante"
                containerStyle={styles.input}
                onChange={e => setRestaurantName(e.nativeEvent.text)}
            />
            <Input 
                placeholder="Dirección"
                containerStyle={styles.input}
                rightIcon={{
                    type: "material-community",
                    name: "google-maps",
                    color: locationRestaurant ? "#00a680" : "#c2c2c2",
                    onPress: () => setIsVisibleMap(true)
                }}
                onChange={e => setRestaurantAddress(e.nativeEvent.text)}
            />
            <Input 
                placeholder="Descripción del restaurante"
                multiline={true}
                inputContainerStyle={styles.textArea}
                onChange={e => setRestaurantDescription(e.nativeEvent.text)}
            />
        </View>
    )
}

/* Mapa de la marca del movil en un modal */
function Map(props) {
    /* Le pasamos por props las propiedades que va a necesitar */
    const {isVisibleMap, setIsVisibleMap, setLocationRestaurant, toastRef} = props;
    /* Y agregamos una localización interna para este componente */
    const [location, setLocation] = useState(null)
    /* Va a ser necesario pedir permisos al usuario para poder usar la geolocalización del movil */
    useEffect(() => {
        (async () => {
            /* Aquí preguntamos por los permisos, igual que como se hizo con los permisos para acceder a la galería de fotos */
            const resultPermissions = await Permissions.askAsync(Permissions.LOCATION)
            const statusPermissions = resultPermissions.permissions.location.status

            if(statusPermissions !== "granted") {
                toastRef.current.show("Para poder acceder al mapa es necesario aceptar los permisos de localización. Vaya a ajustes para aceptarlos manualmente")
            } else {
                /* Con este método cogemos la posición del usuario */
                const loc = await Location.getCurrentPositionAsync({})
                console.log(loc)
                /* Y agregamos al useState interno de Map la localización del usuario. 
                Los elementos de un usState son objetos, con lo que pueden tener varios atributos, como se ve con latitude y longitude */
                setLocation({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    /* Los Delta son obligatorios para que funcione y tienen que llevar ese valor */
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001
                })
            }
        }) ()
    }, [])

    /* Esta es la función que se ejecuta al darle al botón de Guardar */
    const confirmLocation = () => {
        setLocationRestaurant(location);
        toastRef.current.show("Localización actualizada correctamente")
        setIsVisibleMap(false)
    }

    return (
        <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap} >
            <View>
                {/* El mapa solo se podrá abrir si el usuario ha dado permisos de localización */}
                {location && (
                    /* el onRegionChange se ejecuta cada vez que movemos la chincheta del mapa */
                    <MapView style={styles.mapStyle} initialRegion={location} showsUserLocation={true} onRegionChange={region => setLocation(region)}>
                        {/* Esto pone una marca en el mapa */}
                        <MapView.Marker coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude
                        }}
                        draggable/>
                    </MapView>
                )}
                <View style={styles.viewMapBtn}>
                        <Button 
                            title="Guardar"
                            onPress={confirmLocation}
                            containerStyle={styles.viewMapBtnContainerSave}
                            buttonStyle={styles.viewMapBtnSave}
                        />
                        <Button 
                            title="Cancelar"
                            onPress={() => setIsVisibleMap(false)}
                            containerStyle={styles.viewMapBtnContainerCancel}
                            buttonStyle={styles.viewMapBtnCancel}
                        />
                </View>
            </View>
        </Modal>
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
    },
    viewPhoto: {
        alignItems: "center",
        height: 200,
        marginBottom: 20
    },
    viewForm: {
        marginLeft: 10,
        marginRight:10
    },
    input: {
        marginBottom: 10
    },
    textArea: {
        height: 100,
        width: "100%",
        padding: 0,
        margin: 0
    },
    mapStyle: {
        width: "100%",
        height: 350
    },
    viewMapBtn: {
        flexDirection: "row",
        justifyContent: 'center',
        marginTop: 10
    },
    viewMapBtnContainerSave: {
        paddingRight: 5
    },
    viewMapBtnSave: {
        backgroundColor: "#00a680"
    },
    viewMapBtnContainerCancel: {
        paddingLeft: 5
    },
    viewMapBtnCancel: {
        backgroundColor: "#a80d0d"
    },
    btnAddRestaurant: {
        backgroundColor: "#00a680",
        margin: 20
    }
})