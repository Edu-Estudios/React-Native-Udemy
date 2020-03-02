import React from 'react';
import {
    View,
    Text
} from 'react-native';

import {Button} from 'react-native-elements';

import * as firebase from 'firebase';

export default function UserLogged() {
    return(
        <View>
            <Text>
                User logged
            </Text>
            {/* Botón para cerrar sesión, utilizando Firebase como Back */}
            <Button title="Cerrar sesión" onPress={() => firebase.auth().signOut()}/>
        </View>
    )
}