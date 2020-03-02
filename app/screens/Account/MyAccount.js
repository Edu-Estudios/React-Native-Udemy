import React, {useState, useEffect} from 'react';
import * as firebase from 'firebase';

import Loading from '../../components/Loading';

import UserGuest from './UserGuest';
import UserLogged from './UserLogged';
 
// Desde aquí se va a comprobar si un usuario está logueado o no
export default function MyAccount(){
    // "login" va a ser la variable que indique si está logueado o no y "setLogin" es el método que va a cambiar la variable
    const [login, setLogin] = useState(null); // useState permite que cada vez que se actualice el valor de "login" se recargue solo este componente y no toda la App

    // "useEffect" ejecuta el código cada vez que se reenderiza el componente
    useEffect(() => {
        // Esta petición devuelve "null" cuando el usuario no está logueado
        firebase.auth().onAuthStateChanged(user => {
            // Si user = null/false/undefined entonces setLogin(false), sino setLogin(true)
            !user ? setLogin(false) : setLogin(true);
        })
    }, []);

    if(login === null) {
        return (
            <Loading isVisible={true} text="Cargando..."/>
        )
    }
    return login ? <UserLogged /> : <UserGuest />
}