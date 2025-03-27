import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../constants/Colors';
import * as ImagePicker from 'expo-image-picker';

export default function ImageUploadComponent({ uploadedImage }) {
    const [image, setImage] = useState();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images','videos'], // Fixed mediaTypes option
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if(!result.canceled) {
            uploadedImage(result.assets[0].uri);
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View>
            <Text style={{ marginVertical: 5 }}>Upload your image</Text>

            <TouchableOpacity 
                onPress={pickImage}
                style={{
                    padding: 50,
                    backgroundColor: Colors.LIGHT_GRAY,
                    borderRadius: 15,
                    marginVertical: 10,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                {image ? (
                    <Image source={{ uri: image }}
                        style={{
                            width: '100%',
                            height: 300,
                            borderRadius: 15
                        }} />
                ) : (
                    <Image source={require('./../../assets/images/upload.png')}
                        style={{
                            width: 70,
                            height: 70
                        }} />
                )}
            </TouchableOpacity>
        </View>
    );
}
