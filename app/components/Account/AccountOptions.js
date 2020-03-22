import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import {ListItem} from 'react-native-elements';

import Modal from '../Modal';
import ChangeDisplayNameForm from './ChangeDisplayNameForm';
import ChangeDisplayEmailForm from './ChangeDisplayEmailForm';
import ChangeDisplayPasswordForm from './ChangeDisplayPasswordForm';

export default function AccountOptions(props) {
    const {userInfo, setReloadData, toastRef} = props;

    // Estado para el modal
    const [isVisibleModal, setIsVisibleModal] = useState(false);

    // Para ver que componente de formulario se debe reenderizar
    const [renderComponent, setRenderComponent] = useState(null)

    // Array de objetos necesario para el ListItem
    const menuOptions = [
        {
            title: "Cambiar Nombre y Apellidos",
            iconType: "material-community",
            iconNameLeft: "account-circle",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectedComponent("displayName")
        },
        {
            title: "Cambiar email",
            iconType: "material-community",
            iconNameLeft: "at",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectedComponent("displayEmail")
        },
        {
            title: "Cambiar contraseña",
            iconType: "material-community",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectedComponent("displayPassword")
        }
    ];

    // Funcion que se encarga de indicar al modal el formulario que tiene que mostrar en función de la opción seleccionada del ListItem
    const selectedComponent = (key) => {
        switch(key) {
            case "displayName":
                setRenderComponent(<ChangeDisplayNameForm displayName={userInfo.displayName} setIsVisibleModal={setIsVisibleModal} setReloadData={setReloadData} toastRef={toastRef}/>)
                setIsVisibleModal(true);
                break;
            case "displayEmail":
                setRenderComponent(<ChangeDisplayEmailForm email={userInfo.email} setIsVisibleModal={setIsVisibleModal} setReloadData={setReloadData} toastRef={toastRef}/>)
                setIsVisibleModal(true);
                break;
            case "displayPassword":
                setRenderComponent(<ChangeDisplayPasswordForm setIsVisibleModal={setIsVisibleModal} toastRef={toastRef}/>)
                setIsVisibleModal(true);
                break;
            default:
                break;
        }
    }

    return(
        <View>
            {/* Hay que hacer un bucle del array de opciones del menu. Esto hace un bucle de cada elemento del array menuOptions devolviendo el objeto en el que estamos y su indice */}
            {menuOptions.map((menu, index) => (
                <ListItem 
                    key={index} 
                    title={menu.title} 
                    leftIcon={{
                        type: menu.iconType, 
                        name: menu.iconNameLeft, 
                        color: menu.iconColorLeft
                    }}
                    rightIcon={{
                        type: menu.iconType, 
                        name: menu.iconNameRight, 
                        color: menu.iconColorRight
                    }}
                    onPress={menu.onPress}
                    containerStyle={styles.menuItem}
                />
            ))}

            {/* Como el elemento que recibe el Modal.js a traves de "children" no puede ser null entonces hay que reenderizarlo solo cuando no sea null. Esto es una condicion IF dentro del return */}
            {renderComponent && (
                <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
                    <View>
                        {/* Esto es lo que se pasa al "children" que está esperando el componente de Modal */}
                        {renderComponent}
                    </View>
                </Modal>
            )}
            
        </View>
    )
}

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3"
    }
})