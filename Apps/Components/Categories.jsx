import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Categories({ categoryList }) {


    const navigation = useNavigation()
    return (
        <View className="mt-5  ">
            <Text className=" font-bold text-[20px]">Categories</Text>
            <FlatList
                data={categoryList}
                numColumns={4}
                renderItem={({ item }) => (

                    <TouchableOpacity onPress={() =>
                        navigation.navigate("item-list", {
                            category: item.name
                        })}

                        className=" bg-blue-50  w-full  border-gray-400 flex flex-1 flex-col mx-1   border-[1px] rounded-lg items-center justify-center ">
                        <View className=" flex mx-auto  rounded-lg p-2 flex-1 justify-center items-center object-cover mr-3  w-[50px] h-[50px] ">
                            <Image source={{ uri: item?.icon }} className="   rounded-lg h-full w-full  justify-center items-center    " />
                        </View>
                        <Text className=" font-bold text-center  ">{item?.name}</Text>
                    </TouchableOpacity >

                )

                }
            />
        </View>
    )
}