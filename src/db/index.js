import firebase from 'firebase'
import 'firebase/firestore'

const config = {
    apiKey: 'AIzaSyC2ajltA42sCax0e1vxQFvWZk1MDvwHIRc',
    authDomain: 'vuetutorial-d250b.firebaseapp.com',
    databaseURL: 'https://vuetutorial-d250b.firebaseio.com',
    projectId: 'vuetutorial-d250b',
    storageBucket: 'vuetutorial-d250b.appspot.com',
    messagingSenderId: '373484546923'
  }

const firebaseapp = firebase.initializeApp(config, {
  timestampsInSnapshots: true
})

export default firebaseapp.firestore()
