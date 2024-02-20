import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function PostItems({ item }) {

    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => navigation.navigate('product-detail', {
            product: item
        })} className="  border rounded-lg border-slate-300  flex-1 p-2 m-2 ">

            <Image source={{ uri: item?.image }} className=" h-[170px] rounded-lg w-full  " />
            <View >

                <Text className=" text-[15px] font-bold mt-2">{item.title}</Text>
                <Text className=" w-[70px] text-[20px] px-1 text-blue-500 font-bold ">${item.price}</Text>
                <Text className=" text-blue-500 text-center p-1 rounded-full px-3 text-[12px] w-[80px] bg-blue-200 font-bold mt-2">{item.category}</Text>
            </View>


        </TouchableOpacity>
    )
}