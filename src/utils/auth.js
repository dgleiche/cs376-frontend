import firebase from 'firebase'

export function currentUser() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(
      (user) => {
        resolve(user)
      },
      (error) => reject(error)
    )
  })
}
