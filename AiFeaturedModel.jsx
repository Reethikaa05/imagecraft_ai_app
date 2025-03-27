import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import GlobalApi from '../../services/GlobalApi';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';

export default function AiFeaturedModel() {
  const [aiModelList, setAiModelList] = useState([]);
  const router = useRouter();
  useEffect(() => {
    GetAiModelFeaturedList();
  }, [])

  const GetAiModelFeaturedList = async () => {
    const result = await GlobalApi.GetFeaturedCategoryList();
    console.log(result.data.data)
    setAiModelList(result.data.data);
  }

  const OnClickAiModel=(item)=>{
    router?.push({
      pathname:'FormInput',
      params:item
    });

  };
  return (
    <View style={{
      marginTop: 20
    }}>
      <Text style={{
        fontSize: 18,
        fontWeight: 'bold',
        color:Colors.PRIMARY
      }}>FEATURED</Text>

      <FlatList
        data={aiModelList}
        numColumns={4}
        style={{ marginTop: 7 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={()=>OnClickAiModel(item)} 
          style={{
            flex: 1,
            alignItems: 'center'
          }}>
            <View style={{
              padding: 12,
              borderRadius: 8,
              backgroundColor: Colors.LIGHT_GRAY,
              borderRadius: 10
            }}>
              <Image source={{ uri: item?.icon?.url }}
                style={{
                  width: 45,
                  height: 45
                }} />
            </View>
            <Text style={{
              fontSize: 13,
              textAlign: 'center',
              fontWeight:'bold',
              color: Colors.PRIMARY,
              marginTop: 4

            }}>{item?.name}</Text>

          </TouchableOpacity>
        )}
      />
    </View>
  )
};