import firebase from 'firebase/app';


import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBY7p1WRzgXeC91M1cuyvtdKWWRpEI-RXg",
    authDomain: "crwn-iv.firebaseapp.com",
    projectId: "crwn-iv",
    storageBucket: "crwn-iv.appspot.com",
    messagingSenderId: "810936702797",
    appId: "1:810936702797:web:760ad1465231bfb60d0904",
    measurementId: "G-RTLNPFH4KS"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return

    const userRef = firestore.doc(`user/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })

        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef;
}


firebase.initializeApp(config)

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters = ({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

