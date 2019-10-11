import firebase from 'firebase'
import admin from 'firebase-admin'
import { config } from './firebase-config'

firebase.initializeApp(config) //Firebase client (Sign in, database, so on)
admin.initializeApp(config) //Firebase admin (Accounts, profiles...)

export { firebase, admin }