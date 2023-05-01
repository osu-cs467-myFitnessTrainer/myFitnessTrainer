import { Image } from "react-native";

const Avatar = ({imgSource, pixelSize}) => {
    return <Image source={{uri: imgSource }} style={{ width: pixelSize, height: pixelSize, borderRadius: pixelSize/2 }} />;
};

export default Avatar;
