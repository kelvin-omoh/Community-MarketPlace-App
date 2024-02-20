import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../FirebaseConfig'
import LatestItems from '../Components/HomeScreen/LatestItems'
import { useNavigation } from '@react-navigation/native'

export default function MyProduct() {
    const navigation = useNavigation()
    const { user } = useUser()
    const [productList, setProductList] = useState([])
    useEffect(() => {
        user && getUserPost()
    }, [])



    useEffect(() => {
        navigation.addListener('focus', (e) => {
            console.log(e);
            getUserPost()
        })
    }, [navigation])

    const getUserPost = async () => {
        setProductList([])
        const q = query(collection(db, 'userPost'), where('userEmail', "==", user.primaryEmailAddress.emailAddress))

        const snapShot = await getDocs(q)
        snapShot.forEach((doc) => {
            setProductList(item => [...item, doc.data()])
        })
    }


    return (
        <View>
            <LatestItems latestItems={productList} />
        </View>
    )
}