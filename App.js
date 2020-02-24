import React from 'react';

// Importamos el archivo de navegación
import Navigation from './app/navigations/Navigation';

// Importamos el archivo de Firebase
import {firebaseApp} from './app/utils/FireBase';

export default function App() {
  return (
    <Navigation />
  );
}
