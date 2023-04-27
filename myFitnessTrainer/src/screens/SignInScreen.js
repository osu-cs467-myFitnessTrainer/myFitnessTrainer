import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const SignInScreen = ({navigation}) => {
    // TO DO: FOR TESTING, Revert email and password back to empty strings 
    const [email, setEmail] = useState('test@test.com');
    const [password, setPassword] = useState('test123');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if(user) {
                navigation.replace("Dashboard");
            }
        });

        return unsubscribe;
    }, []);

    const navigateToSignUpScreen = () => {
        navigation.navigate('SignUp');
    }

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logged in with:', user.email);
        })
        .catch(error => alert(error.message))
    };
    
    const signUpMessage = "Don't have an account?";

    return (
    <View
        style={styles.container}
    >
        <View style={styles.inputContainer}>
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
        />
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity
            onPress={handleSignIn}
            style={styles.button}
        >
            <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <Text style={styles.signUpMessage}>{signUpMessage}</Text>
        <TouchableOpacity
            onPress={navigateToSignUpScreen}
            style={[styles.button, styles.buttonOutline]}
        >
            <Text style={styles.buttonOutlineText}>Sign Up</Text>
        </TouchableOpacity>
        </View>
    </View>
    )
}

export default SignInScreen

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
        fontSize: 18,
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
