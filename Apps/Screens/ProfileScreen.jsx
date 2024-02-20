import { View, Text, Image, FlatList, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useUser, SignedOut, useAuth } from '@clerk/clerk-expo'
import diary from "../../assets/icon.png"
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
export default function ProfileScreen() {
    const { user } = useUser()
    const { isLoaded, signOut } = useAuth();
    const navigation = useNavigation()
    const menuList = [
        {
            id: 1,
            name: "My Products",
            icon: "book",
            path: "my-product"
        },
        {
            id: 2,
            name: "Explore",
            icon: "globe",
            path: "explorne"
        },
        {
            id: 3,
            name: "KO",
            icon: "code-fork",
            url: ''
        },
        {
            id: 4,
            name: "Logout",
            icon: "sign-out"
        },



    ]



    const onMenuPress = async (item) => {
        if (item.name === 'Logout') {
            signOut();

        }
        item?.path ? navigation.navigate(item?.path) : console.log(item?.name);
    }
    return (
        <View className=" p-4 bg-white flex-1 py-8">
            <View className=" mt-24 items-center py-8">
                <Image source={{ uri: user?.imageUrl }} className=" h-12 w-12 items-center rounded-full" />
                <Text className=" text-[24px] mt-2 font-bold">{user.fullName}</Text>
                <Text className=" text-[18px] mt-2  text-gray-400">{user.primaryEmailAddress.emailAddress}</Text>


            </View>

            <FlatList
                data={menuList}
                numColumns={3}
                style={{ marginTop: 20 }}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => onMenuPress(item)}
                        className=" border-[1px] items-center mx-2 mt-4 rounded-lg  border-blue-400 bg-blue-50 flex-1 p-5">
                        {item.icon && <FontAwesome className="  w-[50px] h-[50px]" name={`${item?.icon}`} size={24} color="blue" />}
                        <Text className="text-[12px] mt-2 text-blue-700">{item?.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}