import { Image, StyleSheet, View } from "react-native";

const Avatar = ({imgSource, pixelSize}) => {
    return (
        <View style={styles.container}>
            <Image source={{uri: imgSource }} style={{ width: pixelSize, height: pixelSize, borderRadius: pixelSize/2 }} />
        </View>
    )
};

export default Avatar;

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center'
    },
})
