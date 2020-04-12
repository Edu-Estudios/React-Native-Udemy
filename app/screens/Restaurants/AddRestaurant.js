import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import Toast from 'react-native-easy-toast';
import Loading from '../../components/Loading';

import AddRestaurantForm from '../../components/Restaurants/AddRestaurantForm';

export default function AddRestaurant(props) {
    const {navigation} = props;
    // Esto viene a través del navigation desde Restaurants.js
    const {setIsReloadRestaurants} = navigation.state.params;

    const toastRef = useRef();

    const [isLoading, setisLoading] = useState(false);

    return(
        <View>
            <AddRestaurantForm toastRef={toastRef} setisLoading={setisLoading} navigation={navigation} setIsReloadRestaurants={setIsReloadRestaurants}/>
            <Toast ref={toastRef} position="center" opacity={0.5} />
            <Loading isVisible={isLoading} text="Creando Restaurante"/>
        </View>
    )
}