import React, { useState } from 'react';
import { Button, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { storage, auth, db } from '../../firebaseConfig';
import { getDocumentId } from "../../databaseFunctions";
import Avatar from '../components/Avatar';

const pickedImageFileName = Date.now() + ".png";

function DisplayedMessage({isFromSignUpScreen}){
  if (isFromSignUpScreen){
    return <Text>Stick with the default avatar, or select your own!</Text>
  }
}

const AvatarScreen = ({navigation, route}) =>  {
  const [currentImageInDBURL, setCurrentImageInDBURL] = useState(null);
  const [image, setImage] = useState(null);

  // get URL of user's current avatar_file_name
  const currentAvatarImageInDBRef = ref(storage, route.params.avatarFileName);
  console.log("route.params.avatarFileName=", route.params.avatarFileName);
  getDownloadURL(currentAvatarImageInDBRef)
    .then((url) => {
      setCurrentImageInDBURL(url);
    });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveAvatarSelection = async () => {
    const userId = await getDocumentId(
      "users",
      "email",
      auth.currentUser.email
    );

    if (image){ // if user picked an image from their device
      // upload image to Firebase
      // https://github.com/expo/examples/blob/master/with-firebase-storage-upload/App.js#L178-L205

      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", image, true);
        xhr.send(null);
      });
      // save image from device as pickedImageFileName
      const fileRef = ref(getStorage(), pickedImageFileName);
      await uploadBytes(fileRef, blob);
      blob.close();

      const docRef = doc(db, "users", userId);
      await updateDoc(docRef, {
        avatar_file_name: pickedImageFileName
      });
    } 
    navigation.navigate("Dashboard")
  };

  let imgSource;
  image ? imgSource = image : imgSource = currentImageInDBURL;  // checks if (picked) image is null
  return (
    <View style={styles.view}>
      <DisplayedMessage isFromSignUpScreen={route.params.fromSignUpScreen} />
      <Avatar 
        imgSource={imgSource} 
        pixelSize={200} 
      />
      <Button 
        title="Change avatar" 
        onPress={pickImage} 
      />
      <TouchableOpacity style={styles.button} onPress={saveAvatarSelection}>
          <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

export default AvatarScreen;

const styles = StyleSheet.create({
  view: {
    flex: 1, 
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
      backgroundColor: "#4682B4",
      width: "75%",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 40,
  },
  buttonText: {
      color: "white",
      fontWeight: 800,
      fontSize: 16,
  },
});
