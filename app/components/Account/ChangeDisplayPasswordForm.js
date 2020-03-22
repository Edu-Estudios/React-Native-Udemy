import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Input, Button} from 'react-native-elements';
import * as firebase from 'firebase';
import {reauthenticate} from '../../utils/Api';

export default function ChangeDisplayPasswordForm(props) {
    const {setIsVisibleModal, toastRef} = props
    const [password, setpassword] = useState("")
    const [newPassword, setnewPassword] = useState("")
    const [newPasswordRepeat, setnewPasswordRepeat] = useState("")
    /* El estado de error se maneja como un objeto ya que vamos a tener tres atributos de error dentro, cada uno asociado a uno de los input */
    const [error, seterror] = useState({})
    const [isLoading, setisLoading] = useState(false)
    const [hidePassword, sethidePassword] = useState(true)
    const [hideNewPassword, sethideNewPassword] = useState(true)
    const [hideNewPasswordRepeat, sethideNewPasswordRepeat] = useState(true)


    const updatePassword = () => {
        seterror({});
        console.log('password', password)
        console.log('new password', newPassword)
        console.log('new password repeat', newPasswordRepeat)

        
        if (!password || !newPassword || !newPasswordRepeat) {
            let objError = {}
            /* Si la contraseña esta vacia escribe este error */
            !password && (objError.password = "No puede estar vacío")
            !newPassword && (objError.newPassword = "No puede estar vacío")
            !newPasswordRepeat && (objError.newPasswordRepeat = "No puede estar vacío")
            seterror(objError)
        } else {
            if(newPassword !== newPasswordRepeat) {
                seterror({newPasswordRepeat: "Las contraseñas deben ser iguales"})
            } else {
                if (password === newPassword) {
                    seterror({newPassword: "La nueva contraseña debe ser distinta a la actual"})
                } else {
                    setisLoading(true)
                    reauthenticate(password).then(() => {
                        firebase.auth().currentUser.updatePassword(newPassword).then(() => {
                            setisLoading(false)
                            setIsVisibleModal(false)
                            toastRef.current.show("Contraseña actualizada correctamente")
                            /* Forzamos al cierre de sesion al cambiar la contraseña */
                            //firebase.auth().signOut();
                        }).catch(() => {
                            //seterror({general: "Error al actualizar la contraseña"})
                            setisLoading(false)
                        })
                    }).catch(() => {
                        seterror({password: "Contraseña incorrecta"})
                        setisLoading(false)
                    })
                }
            }
        }

    }

    return(
        <View style={styles.view}>
            <Input 
                placeholder="Contraseña actual"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={hidePassword}
                onChange={e => setpassword(e.nativeEvent.text)}
                rightIcon={{
                    type: "material-community",
                    name: hidePassword ? "eye-outline" : "eye-off-outline",
                    color: "#c2c2c2",
                    onPress: () => sethidePassword(!hidePassword)
                }}
                errorMessage={error.password}
            />
            <Input 
                placeholder="Nueva contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={hideNewPassword}
                onChange={e => setnewPassword(e.nativeEvent.text)}
                rightIcon={{
                    type: "material-community",
                    name: hideNewPassword ? "eye-outline" : "eye-off-outline",
                    color: "#c2c2c2",
                    onPress: () => sethideNewPassword(!hideNewPassword)
                }}
                errorMessage={error.newPassword}
            />
            <Input 
                placeholder="Repetir nueva contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={hideNewPasswordRepeat}
                onChange={e => setnewPasswordRepeat(e.nativeEvent.text)}
                rightIcon={{
                    type: "material-community",
                    name: hideNewPasswordRepeat ? "eye-outline" : "eye-off-outline",
                    color: "#c2c2c2",
                    onPress: () => sethideNewPasswordRepeat(!hideNewPasswordRepeat)
                }}
                errorMessage={error.newPasswordRepeat}
            />
            <Button 
                title="Cambiar contraseña"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={updatePassword}
                loading={isLoading}
            />
            <Text>{error.general}</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingBottom: 10,
        paddingTop: 10
    },
    input: {
        marginBottom: 10
    },
    btnContainer: {
        marginTop: 20,
        width: "95%"
    },
    btn: {
        backgroundColor: "#00a680"
    }
})