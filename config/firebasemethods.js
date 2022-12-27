import React from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';


const signUpUser = (obj) => {
    let { userName, contact, email, password, confirmPassword } = obj;

    // This custom promise will return on Signup screen.
    return new Promise((resolve, reject) => {

        auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredentials) => { // firebase auth '.then'
                // User registerd successfully in firebase Authentication

                // ----------------------- Set User details in Database -----------------------
                const user = userCredentials.user;
                const reference = database().ref(`users/${user.uid}`); // Create a reference
                obj.id = user.uid;  // Save user's unique id inside the object
                obj.category = 'user';

                reference.set(obj) // Set Object to this reference in database
                    .then(() => { // firebase database '.then'
                        // resolve("User's Account Created Successfully and sent to database"); // This "resolve" is our custom message which will show in signup page "then"
                        resolve(user.uid)
                    })
                    .catch((error) => { // Database Error
                        reject(error.message);
                    });
            })
            .catch((err) => { // Authentication Error

                const errorCode = err.code;
                const errorMessage = err.message;

                if (errorCode === 'auth/network-request-failed') {
                    reject('Make sure your device has an active internet connection!');
                }
                if (errorCode === 'auth/email-already-in-use') {
                    reject('This email address is already in use!');
                }
                if (errorCode === 'auth/invalid-email') {
                    reject('This email address is invalid!');
                }
                if (errorCode === 'auth/weak-password') {
                    reject('Password should contain atleat 6 characters!');
                }
                reject(errorMessage);
            });
    });
};



const loginUser = (obj) => {

    let { email, password } = obj;

    return new Promise((resolve, reject) => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredentials) => { // firebase Auth '.then'
                // Signed in Successfully

                // ----------------------- Get User details from Database -----------------------
                const user = userCredentials.user;
                // resolve(user.uid);

                const reference = database().ref(`users/${user.uid}`)
                reference.once('value', (e) => { // Get users data (object) from the above reference in database
                    let status = e.exists();  // firebase .exists() method returns Boolean
                    if (status) {
                        resolve(e.val());
                    } else {
                        reject("User's Data Not Found");
                    }
                });
            })
            .catch((err) => { // firebase Auth Error
                // Sign in Error
                const errorCode = err.code;
                const errorMessage = err.message;

                if (errorCode === 'auth/network-request-failed') {
                    reject('Make sure your device has an active internet connection!');
                }
                if (errorCode === 'auth/invalid-email') {
                    reject('Invalid Email address');
                }
                if (errorCode === 'auth/user-not-found') {
                    reject('User not found! Please Sign up to proceed');
                }
                if (errorCode === 'auth/wrong-password') {
                    reject('Invalid Password');
                }
                if (errorCode === 'auth/too-many-requests') {
                    reject('We have temporarily blocked all requests from this device due to unusual activity. Try again later');
                }
                reject(errorMessage);
            });
    });
};


const signOutUser = () => {
    return new Promise((resolve, reject) => {
        auth()
            .signOut()
            .then(() => {
                resolve("User Signed Out!")
            })
            .catch((error) => {
                const errorCode = error.code;
                let errorMessage = error.message;

                errorMessage = errorMessage.replace(/(\[).+?(\] )/g, '');   // Replacing everything between Array Brackets[] - including brackets and the space after it
                reject(errorMessage);
            })
    })
}


const checkUser = () => {
    return new Promise((resolve, reject) => {
        auth()
            .onAuthStateChanged((user) => {
                if (user) {
                    // User is Signed in
                    const uid = user.uid;
                    resolve(uid);
                } else {
                    // User is Not Signed in
                    reject('User Not Found');
                }
            })
    })
};


const sendData = (nodeName, obj, id) => {
    return new Promise((resolve, reject) => {
        let postListRef;
        if (!id) {
            // In case of adding
            obj.id = database().ref(nodeName).push().key;
            postListRef = database().ref(`${nodeName}/${obj.id}`);
        } else {
            // In Case of editing
            postListRef = database().ref(`${nodeName}/${id}`);
        }
        postListRef.set(obj).then(() => {
            resolve(`Data sent successfully on this node: ${nodeName}/${obj.id}`);
        }).catch((err) => {
            reject(err);
        })
    })
}


const getData = (nodeNames, id) => {
    let reference = database().ref(`${nodeNames}/${id ? id : ''}`)

    return new Promise((resolve, reject) => {
        reference.once('value', dt => {
            let li = Object.values(dt.val());
            resolve(li);
        })
    })

}

// const getDataOld = (nodeNames, id) => {
//     let reference = database().ref(`${nodeNames}/${id ? id : ''}`)

//     return new Promise((resolve, reject) => {
//         onValue(reference, (snapshot) => {  // snapshot is any name of the parameter
//             if (snapshot.exists()) {
//                 let data = snapshot.val();  // Using .val() method because the data we got is encrypted
//                 if (id) {
//                     resolve(data);
//                 }
//                 else {
//                     let arr = Object.values(data);
//                     resolve(arr);
//                 }
//             } else {
//                 reject("Data Not Found");
//             }

//         }, {
//             onlyOnce: false // Turn this 'false' to get realtime data
//         });

//     })
// }



export { signUpUser, loginUser, signOutUser, checkUser, sendData, getData };