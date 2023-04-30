import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebaseConfig';
import { onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, doc } from 'firebase/firestore';

const SignUpScreen = ({navigation}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if(user) {
                navigation.reset({
                    index: 0,
                    routes: [{name:'Avatar'}]
                });
            }
        });

        return unsubscribe;
    }, []);

    const addUserToDatabase = () => {
        try {
            addDoc(collection(db, 'users'), 
            {
                // TODO: potential revision to the users collection (add avatar_url attribute directly instead)
                avatar_id: doc(db, 'avatars/avatar'),
                email: email,
                first_name: firstName,
                last_name: lastName,
                username: username
            })
            .then(docRef => {
                console.log("Document written with ID: ", docRef.id);
            });
    } catch (error) {
        console.error("Error adding document: ", error);
    }
    };

    const validateInput = () => {
        // TO DO: Can enhance validation with an error message under each input field
        if (firstName === '' || lastName === '' || username === '' || email === '' || password === '') {
            Alert.alert('Missing Fields', 'All fields are required to create an account.');
            return false;
        }
        return true;
    };

    const handleSignUp = () => {

        if (!validateInput()) {
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Signed up with:', user.email);
            addUserToDatabase();
        })
        .catch(error => {
            alert(error.message);
        })
    };


  return (
    <View
        style={styles.container}
    >
      <View style={styles.inputContainer}>
        <TextInput
            placeholder='First Name'
            value={firstName}
            onChangeText={text => setFirstName(text)}
            style={styles.input}
        />
        <TextInput
            placeholder='Last Name'
            value={lastName}
            onChangeText={text => setLastName(text)}
            style={styles.input}
        />
        <TextInput
            placeholder='Username'
            value={username}
            onChangeText={text => setUsername(text)}
            style={styles.input}
            autoCapitalize='none'
        />
        <TextInput
            placeholder='Email'
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
            autoCapitalize='none'
        />
        <TextInput
            placeholder='Password'
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry
            autoCapitalize='none'
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
            onPress={handleSignUp}
            style={[styles.button, styles.buttonOutline]}
        >
            <Text style={styles.buttonOutlineText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 15
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
    },
    button: {
        backgroundColor: '#4682B4',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    signUpMessage: {
        marginTop: 30,
        textAlign: 'center'
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 10,
        borderColor: '#4682B4',
        borderWidth: 2
    },
    buttonText: {
        color: 'white',
        fontWeight: 800,
        fontSize: 16
    },
    buttonOutlineText: {
        color: '#4682B4',
        fontWeight: 800,
        fontSize: 16
    },
});