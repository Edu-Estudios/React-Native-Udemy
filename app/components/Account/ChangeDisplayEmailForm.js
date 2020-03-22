import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Input, Button} from 'react-native-elements';
import * as firebase from 'firebase';
import {reauthenticate} from '../../utils/Api';

export default function ChangeDisplayEmailForm(props) {
    const {email, setIsVisibleModal, setReloadData, toastRef} = props
    const [newEmail, setnewEmail] = useState("");
    const [password, setpassword] = useState("");
    const [error, seterror] = useState({})
    const [hidePassword, sethidePassword] = useState(true)
    const [isLoading, setisLoading] = useState(false)

    const updateEmail = () => {
        seterror({});

        if(!newEmail || email === newEmail) {
            seterror({email: "El email no puede ser igual o estar vacío"})
        } else {
            setisLoading(true);

            reauthenticate(password).then(() => {
                firebase.auth().currentUser.updateEmail(newEmail).then(() => {
                    setisLoading(false);
                    setReloadData(true);
                    toastRef.current.show("Email actualizado correctamente");
                    setIsVisibleModal(false);
                }).catch(() => {
                    seterror({email: "Error al actualizar el email"})
                    setisLoading(false);
                })
            }).catch(() => {
                seterror({password: "La contraseña no es correcta"})
                setisLoading(false);
            })
        }

    }

    return (
        <View style={styles.view}>
            <Input 
                placeholder="Correo electrónico"
                containerStyle={styles.input}
                /* Si email existe(&&) entonces muestra el email */
                defaultValue={email && email}
                onChange={e => setnewEmail(e.nativeEvent.text)}
                rightIcon={{
                    type: "material-community",
                    name: "at",
                    color: "#c2c2c2"
                }}
                errorMessage={error.email}
            />
            {/* Se va a utilizar un segundo input para poner la contraseña ya que es necesario para cambiar el email en firebase */}
            <Input
                placeholder="Contraseña"
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
            <Button 
                title="Cambiar email"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={updateEmail}
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