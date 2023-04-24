import { Image, Text, View } from 'react-native';
import React from 'react';
import { storage } from '../../firebaseConfig';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';


// const url = await storage().ref('10_StrawberryFrosted_edit.png').getDownloadURL();
// console.log(url)
  

const AvatarScreen = ({navigation}) => {

    const sparkyRef = ref(storage, '10_StrawberryFrosted_edit.png');
    // console.log(sparkyRef)
    getDownloadURL(sparkyRef)
      .then((url) => {
        console.log("url=")
        console.log(url)

      });
      return (
        <View>
          <Text>Select an avatar:</Text>
          <Image
          style={{width: '100%', height: '50%'}}
          source={{uri:'https://engineering.fb.com/wp-content/uploads/2016/04/yearinreview.jpg'}}
            />
          <Image
          style={{width: '100%', height: '50%'}}
          source={{uri:'https://firebasestorage.googleapis.com/v0/b/myfitnesstrainer-94289.appspot.com/o/10_StrawberryFrosted_edit.png?alt=media&token=495df0d3-924d-406b-8683-7a339aa82aee'}}
            />
          {/* <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' /> */}
        </View>
      );

  };


export default AvatarScreen;