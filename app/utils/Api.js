import * as firebase from 'firebase';

// Metodo que va a permitir hacer un relogin en la app para poder cambiar ciertas cosas como el email del usuario
export const reauthenticate = (password) => {
    const user = firebase.auth().currentUser;
    const credentials = firebase.auth.EmailAuthProvider.credential(user.email, password)
    return user.reauthenticateWithCredential(credentials);
}