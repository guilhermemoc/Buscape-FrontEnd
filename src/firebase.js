import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
  apiKey: 'AIzaSyDqpd-b3DD1UpTuGvsjyxk7jFUo54DgNwg',
  authDomain: 'buscape-exercicios-frontend.firebaseapp.com',
  databaseURL: 'https://buscape-exercicios-frontend.firebaseio.com',
  projectId: 'buscape-exercicios-frontend',
  storageBucket: 'buscape-exercicios-frontend.appspot.com',
  messagingSenderId: '1056693044303'
})

export const db = firebaseApp.database()
