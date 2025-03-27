import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'

export default function Banner() {
  return (
    <View style={{
      marginTop:20
    }}>
      <Image source={require('./../../assets/images/banner.jpeg')}
      style={{
        width:'100%',
        height:140,
        borderRadius:15
      }}/>

      <View style={{
        position:'absolute',
        padding:15
      }}>
        <Text style={{
          fontSize:30,
          fontWeight:'bold',
          color:Colors.WHITE
        }}>Turn words</Text>

        <Text style={{
          fontSize:30,
          fontWeight:'bold',
          color:Colors.YELLOW
        }}>into ART</Text>

      </View>

      <TouchableOpacity style={{
        padding:7,
        backgroundColor:Colors.YELLOW,
        position:'absolute',
        bottom:0,
        right:0,
        margin:15,
        borderRadius:7,
        paddingHorizontal:15
      }}>
        <Text>Explore</Text>
      </TouchableOpacity>


    </View>
  )
}