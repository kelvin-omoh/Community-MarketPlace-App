import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../../FirebaseConfig'
import LatestItems from '../Components/HomeScreen/LatestItems'

export default function ExploreScreen() {
    const [productList, setProductList] = useState([])


    useEffect(() => {
        getAllProduct()
    }, [])

    const getAllProduct = async () => {
        const q = query(collection(db, 'userPost'), orderBy('createdAt', 'desc'))

        const snapshot = await getDocs(q)
        setProductList([])
        snapshot.forEach((doc) => {
            console.log(doc.data());
            setProductList(product => [...product, doc.data()])
        })
    }

    return (
        <ScrollView className=" p-5 py-8">
            <Text className=" text-[30px] font-bold">ExploreScreen</Text>

            <LatestItems latestItems={productList} />
        </ScrollView>
    )
}