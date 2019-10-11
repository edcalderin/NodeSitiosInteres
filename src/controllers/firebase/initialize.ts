import firebase from 'firebase'
import admin from 'firebase-admin'
import { config } from './firebase-config'

firebase.initializeApp(config)
admin.initializeApp(config)

export { firebase, admin }