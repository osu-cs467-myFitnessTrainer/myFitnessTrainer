// import { Image, Text, View } from 'react-native';
// import React, { useState } from 'react';
import { storage } from '../../firebaseConfig';
import { getStorage, ref, uploadBytes, putFile } from 'firebase/storage';
import uuid from "uuid";

// import 'firebase/storage';
// import firebase from 'firebase/app';

import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);

    }
  };




  // // Function to handle image upload
  // const uploadImage = async () => {
  //   console.log("in uploadImage func")
  //   console.log("image.uri")
  //   console.log(image)

  //   const response = await fetch(image.uri);
  //   console.log("response")
  //   console.log(response)

  //   const blob = await res.blob();

  //   const fileRef = ref(getStorage(), uuid.v4());
  //   const uploadImageResult = await uploadBytes(fileRef, blob);
  //   console.log("uploadImageResult")
  //   console.log(uploadImageResult)

  //   uploadBytes(defaultPicReference, blob).then(() => {
  //     console.log("uploaded a blob or file!")
  //   });
  // };

  const uploadImage = async () => {
    console.log("in uploadImage func")
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
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

    const fileRef = ref(getStorage(), uuid.v4());
    const uploadImageResult = await uploadBytes(fileRef, blob);
    console.log("uploadImageResult")
    console.log(uploadImageResult)


    // We're done with the blob, close and release it
    blob.close();

    // return await getDownloadURL(fileRef);
  };


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

      <Button
        title="upload to firebase"
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


// export default AvatarScreen;