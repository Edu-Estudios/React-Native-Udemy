// Archivo de configuración de Firebase
import firebase from 'firebase/app';

// Trozo de código sacado del proyecto Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCnl23fcarfBkjDJbWkjjJMsvbUxh4NCNg",
    authDomain: "tenedores-2ef6c.firebaseapp.com",
    databaseURL: "https://tenedores-2ef6c.firebaseio.com",
    projectId: "tenedores-2ef6c",
    storageBucket: "tenedores-2ef6c.appspot.com",
    messagingSenderId: "838230836910",
    appId: "1:838230836910:web:391f837a149f4ee1360f3f"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

/* <!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.8.2/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCnl23fcarfBkjDJbWkjjJMsvbUxh4NCNg",
    authDomain: "tenedores-2ef6c.firebaseapp.com",
    databaseURL: "https://tenedores-2ef6c.firebaseio.com",
    projectId: "tenedores-2ef6c",
    storageBucket: "tenedores-2ef6c.appspot.com",
    messagingSenderId: "838230836910",
    appId: "1:838230836910:web:391f837a149f4ee1360f3f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script> */