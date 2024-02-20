import { View, Text, Image, TouchableOpacity, Linking, Alert, Share } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'
import { Entypo } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import { useUser } from '@clerk/clerk-expo';
import { collection, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';

export default function ProductDetail({ navigation }) {
    const { params } = useRoute()
    const nav = useNavigation()
    const [product, setProduct] = useState([])
    useEffect(() => {
        params && setProduct(params.product)
        shareButton()
    }, [params, navigation])

    const { user } = useUser()


    const sendEmailMessage = () => {
        const subject = "Regarding" + product?.title
        const body = "Hi " + product?.userName + "\n" + " i am interested in this product"
        Linking.openURL('mailto:' + product.userEmail + "?subject=" + subject + "&body=" + body)
    }

    const shareProduct = () => {
        const content = {
            message: product?.title + " \n" + product?.desc
        }
        Share.share(content).then((res) => {
            console.log(res);
        })
        Alert.alert("hello world")
    }

    const shareButton = () => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => shareProduct()} className="px-2">
                    <Entypo name="share" size={24} color="white" />
                </TouchableOpacity>
            ),
        });
    }


    const deletePost = () => {
        Alert.alert("Do you want to delete this post?", "Are you sure you want to delte this post", [
            {
                text: "Yes",
                onPress: () => deleteFromFirebase()
            },
            {
                text: "Cancel",
                style: 'cancel',
                onPress: () => console.log('cancel pressed')
            },

        ])
    }

    const deleteFromFirebase = async () => {
        const q = query(collection(db, 'userPost'), where('title', '==', product.title))

        const snapshot = await getDocs(q)
        snapshot.forEach(doc => {
            deleteDoc(doc.ref).then(res => console.log(res))
            nav.goBack()
        })
    }

    return (
        <ScrollView className=" bg-white">
            <Image className=" w-full h-[320px] " source={{ uri: product?.image }} />


            <View className="p-3  my-2">
                <Text className=" text-[24px] font-bold " >{product?.title}</Text>
                <View className=" mt-3 items-baseline">
                    <Text className=" rounded-full  p-1 bg-blue-200 text-blue-500 px-2 font-bold " >{product?.category}</Text>

                </View>


                <Text className=" text-[20px] mt-4 font-bold " >Description</Text>
                <Text className=" text-[17px] text-gray-500" >{product?.desc}</Text>
            </View>



            <View className="p-3 gap-3 border-gray-500  bg-blue-100 flex flex-row">
                <Image className=" w-11 h-11 rounded-full " source={{ uri: product?.userImage }} />
                <View>
                    <Text className=" font-bold text-[18px]">{product.userName}</Text>
                    <Text className="text-gray-500">{product.userEmail}</Text>
                </View>


            </View>

            {user?.primaryEmailAddress.emailAddress === product?.userEmail
                ?

                <TouchableOpacity onPress={() => deletePost()} className=" z-40  bg-red-500 p-3 rounded-full text-white m-2">
                    <Text className=" text-center text-white">Delete</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => sendEmailMessage()} className=" z-40  bg-blue-500 p-3 rounded-full text-white m-2">
                    <Text className=" text-center text-white">Send Message</Text>
                </TouchableOpacity>
            }



        </ScrollView>
    )
}