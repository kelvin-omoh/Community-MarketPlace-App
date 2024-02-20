import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { AntDesign } from '@expo/vector-icons';
export default function Header() {
    const { user } = useUser()
    return (

        <View className=" px-2 ">
            <View className=" flex flex-row      gap-4">
                <View className=" w-[40px] h-[40px] ">
                    <Image source={{ uri: user?.imageUrl }} className=" rounded-full w-full h-full" />
                </View>

                <View >
                    <Text>Welcome </Text>
                    <Text className=" text-[20px] font-bold ">{user?.fullName}</Text>
                </View>


            </View>

            <View className=" py-2 flex   flex-row  gap-2 items-center border border-blue-600 bg-white rounded-full mt-4 px-5  ">
                <AntDesign className=" " name="search1" size={24} color="grey" />
                <TextInput className="" placeholder='search..' onChange={(value) => console.log(value)} />
            </View>
        </View>
    )
}