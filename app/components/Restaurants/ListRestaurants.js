import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native';
import { Image } from 'react-native-elements';
import * as firebase from 'firebase';

export default function ListRestaurants(props) {
    const { restaurants, isLoading, handleLoadMore } = props;

    return (
        <View>
            {restaurants ? (
                <FlatList 
                    data={restaurants}
                    renderItem={restaurant => <Restaurant restaurant={restaurant}/>}
                    keyExtractor={(item, index) => index.toString()}
                    // Cuando lleguemos al final de la lista pedirá los siguientes 8 restaurants
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0}
                    ListFooterComponent={<FooterList isLoading={isLoading} />}
                />
            ) : (
                <View style={styles.loaderRestaurants}>
                    <ActivityIndicator size="large" />
                    <Text>Cargando restaurants</Text>
                </View>
            )}
        </View>
    )
}

function Restaurant(props) {
    const { restaurant } = props
    const {name, address, description, images} = restaurant.item.restaurant;
    const [imageRestaurant, setImageRestaurant] = useState(null)

    // Para obtener la URL de la imagen principal del restaurant
    useEffect(() => {
        const image = images[0];
        firebase.storage().ref(`restaurant-images/${image}`).getDownloadURL().then(result => {
            console.log(result)
            setImageRestaurant(result);
        })
    }, [])

    return (
        <TouchableOpacity onPress={() => console.log()} > 
            <View style={styles.viewRestaurant}>
                <View style={styles.viewRestaurantImage}>
                    <Image 
                        resizeMode="cover"
                        source={{uri: imageRestaurant}}
                        style={styles.imageRestaurant}
                        PlaceholderContent={<ActivityIndicator color="fff"/>}
                    />
                </View>
                <View>
                    <Text style={styles.restaurantName}>{name}</Text>
                    <Text style={styles.restaurantAddress}>{address}</Text>
                    {/* Muestra un maximo de 60 caracteres de la descripción */}
                    <Text style={styles.restaurantDescription}>{description.substr(0, 60)}...</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

function FooterList(props) {
    const { isLoading } = props;

        if(isLoading) {
            return (
                <View style={styles.loadingRestaurants}>
                    <ActivityIndicator size="large" />
                </View>
            )
        } else {
            return(
                <View style={styles.notFoundRestaurants}>
                    <Text>No quedan restaurantes por cargar</Text>
                </View>
            )
        }
}

const styles = StyleSheet.create({
    loadingRestaurants: {
        marginTop: 20,
        alignItems: "center"
    },
    viewRestaurant: {
        flexDirection: "row",
        margin: 10
    },
    viewRestaurantImage: {
        marginRight: 15
    },
    imageRestaurant: {
        width: 80,
        height: 80
    },
    restaurantName: {
        fontWeight: "bold"
    },
    restaurantAddress: {
        paddingTop: 2,
        color: "grey"
    },
    restaurantDescription: {
        paddingTop: 2,
        color: "grey",
        width: 300
    },
    loaderRestaurants: {
        marginTop: 10,
        marginBottom: 10
    },
    notFoundRestaurants: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: "center"
    }
})