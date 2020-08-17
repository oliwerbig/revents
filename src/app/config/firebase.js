import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

var firebaseConfig = {
	apiKey: 'AIzaSyDYUzFpPkpEHZ_ohS1hpZj6i5yZz6N4en0',
	authDomain: 'revents-286208.firebaseapp.com',
	databaseURL: 'https://revents-286208.firebaseio.com',
	projectId: 'revents-286208',
	storageBucket: 'revents-286208.appspot.com',
	messagingSenderId: '749417626749',
	appId: '1:749417626749:web:79825006733a4fb3190514',
	measurementId: 'G-Y8QMRK03JK',
}

firebase.initializeApp(firebaseConfig)
firebase.firestore()

export default firebase