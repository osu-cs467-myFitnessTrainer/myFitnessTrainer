import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import React, { useState } from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../../firebaseConfig';

const AvatarScreen = ({navigation}) =>  {
  const [defaultImageURL, setDefaultImageURL] = useState(null)
  const [avatarURL, setAvatarURL] = useState(null)
  const [image, setImage] = useState(null);

  const defaultImageRef = ref(storage, 'default.png');
  getDownloadURL(defaultImageRef)
    .then((url) => {
      setDefaultImageURL(url);
      setAvatarURL(url);
    });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
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

  const uploadImage = async () => {
    if (image){
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

      const fileRef = ref(getStorage(), "avatar.png");
      await uploadBytes(fileRef, blob);

      blob.close();

      const pickedImageRef = ref(storage, 'avatar.png');
      console.log("pickedImageRef")
      console.log(pickedImageRef)
      getDownloadURL(pickedImageRef)
        .then((url) => {
          setAvatarURL(url);
        });
      console.log("image was picked; avatarURL=")
      console.log(avatarURL)
    } 
    else {
      console.log("defaultImageURL")
      console.log(defaultImageURL)
      console.log("no image was picked; using default. avatarURL=")
      console.log(avatarURL)
    }
    navigation.navigate('Dashboard')
  };

  let imgSource;
  image ? imgSource = image : imgSource = defaultImageURL;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{uri: imgSource }} style={{ width: 200, height: 200, borderRadius: 200/2 }} />
      <Button title="Change avatar" onPress={pickImage} />
      <Button
        title="Save"
        onPress={uploadImage}
      />
    </View>
  );
}

export default AvatarScreen;