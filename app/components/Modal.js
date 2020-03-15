import React from 'react';
import {StyleSheet} from 'react-native';
import {Overlay} from 'react-native-elements';

export default function Modal(props) {
    // Será el componente padre el que mande si el dialog tiene que mostrarse o no. Por otro lado el children es el contenido que se va a reenderizar dentro del modal
    const{isVisible, setIsVisible, children} = props;

    const closeModal = () => setIsVisible(false)

    return (
        <Overlay
            isVisible={isVisible}
            windowBackgroundColor="rgba(0, 0, 0, .5)"
            overlayBackgroundColor="transparent"
            overlayStyle={styles.overlay}
            /* Cuando se presiona fuera del modal... */
            onBackdropPress={closeModal}
        >
            {/* Lo que recibe este componente como "children" es el renderComponent que envia AccountOptions.js */}
            {children}
        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay: {
        height: "auto",
        width: "90%",
        backgroundColor: "#fff"
    }
})