import { initializeApp, getApps } from 'firebase/app'
import {
  get,
  getDatabase,
  onValue,
  ref,
  remove,
  set,
  update,
} from 'firebase/database'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const firebaseEnabled = Object.values(firebaseConfig).every(Boolean)

const app = firebaseEnabled ? getApps()[0] ?? initializeApp(firebaseConfig) : null
const database = app ? getDatabase(app) : null

export function getRoomRef(roomCode) {
  return ref(database, `rooms/${roomCode}`)
}

export function getRoomPlayerRef(roomCode, playerId) {
  return ref(database, `rooms/${roomCode}/players/${playerId}`)
}

export function readRoomSnapshot(roomCode) {
  return get(getRoomRef(roomCode))
}

export { onValue, remove, set, update }
