import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const SignOutButton = () => {

    const navigation = useNavigation();

    const handleSignOut = () => {
        signOut(auth)
        .then(() => {
            navigation.replace("SignIn");
        })
        .catch(error => alert(error.message));
    };

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={handleSignOut}
        >
            <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      )
}

export default SignOutButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4682B4',
        width: '75%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40
    },
    buttonText: {
        color: 'white',
        fontWeight: 800,
        fontSize: 16
    },
})