import { Image } from "react-native";

const AvatarPreview = ({imgSource, pixelSize}) => {
    return <Image source={{uri: imgSource }} style={{ width: pixelSize, height: pixelSize, borderRadius: pixelSize/2 }} />;
};

export default AvatarPreview;
