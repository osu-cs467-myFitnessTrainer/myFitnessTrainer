import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import React, { useState } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../../firebaseConfig';


const AvatarScreen = ({navigation}) =>  {
  const [defaultImageURL, setDefaultImageURL] = useState(null)
  const [avatarURL, setAvatarURL] = useState(null)
  const [image, setImage] = useState(null);

  const defaultImageRef = ref(storage, 'default.png');
  console.log("defaultImageRef")
  console.log(defaultImageRef)
  getDownloadURL(defaultImageRef)
    .then((url) => {
      setDefaultImageURL(url);
    });

    console.log("defaultImageURL")
    console.log(defaultImageURL)

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

        console.log("image")
        console.log(image)
        // image ? image : image = starterImageURL;

        xhr.open("GET", image, true);
        xhr.send(null);
      });

      const fileRef = ref(getStorage(), "avatar.png");
      const uploadImageResult = await uploadBytes(fileRef, blob);
      console.log("uploadImageResult")
      console.log(uploadImageResult)
      blob.close();
      getDownloadURL(fileRef)
      .then((url) => {
        setAvatarURL(url);
      });
      console.log("avatarURL");
      console.log(avatarURL);
    } 
    else {
      setAvatarURL(defaultImageURL);
      console.log("(default) avatarURL");
      console.log(avatarURL);
    }
    navigation.navigate('SignUp')
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



  // let imgs = [
  //   'https://res.cloudinary.com/stealthman22/image/upload/v1586308023/new-portfolio/hero/two-cargo-ships-sailing-near-city-2144905.jpg',
  // ];
    
// const AvatarScreen = ({navigation}) => {


//   const [imagesArray, setImagesArray] = useState([]);
//   const sparkyRef = ref(storage, '10_StrawberryFrosted_edit.png');
//   getDownloadURL(sparkyRef)
//     .then((url) => {
//       // console.log("url=")
//       // console.log(url)
//       setImagesArray(imagesArray => [...imagesArray, url]);
//     });
  

//   return (
//     <View>
//       <Text>Select an avatar:</Text>
//       <Image
//       style={{width: '100%', height: '50%'}}
//       source={{uri: imagesArray[0]}}
//         />
//       <Image
//       style={{width: '100%', height: '50%'}}
//       source={{uri:'https://firebasestorage.googleapis.com/v0/b/myfitnesstrainer-94289.appspot.com/o/10_StrawberryFrosted_edit.png?alt=media&token=495df0d3-924d-406b-8683-7a339aa82aee'}}
//         />
//     </View>
//   );

//   };


export default AvatarScreen;