import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { collection, query, where, getDocs } from 'firebase/firestore'; import { db } from '../../FirebaseConfig';
import LatestItems from '../Components/HomeScreen/LatestItems';

export default function ItemsList() {
    const [itemList, setItemList] = useState([])
    const [loading, setLoading] = useState(false)
    const { params } = useRoute()
    console.log(params);

    useEffect(() => {
        if (params && params.category) {
            getCategoryByParams(params.category);
        }
    }, [params]);

    const getCategoryByParams = async (category) => {
        try {
            setItemList([])
            setLoading(true)
            const q = query(collection(db, 'userPost'), where('category', '==', category));
            const querySnapshot = await getDocs(q);

            const newData = querySnapshot.docs.map((doc) => doc.data());

            newData && setLoading(false)
            setItemList((prevData) => [...prevData, ...newData]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    console.log(itemList[0]?.image);
    return (


        <View className="px-2">
            {loading ? <ActivityIndicator className="mt-24" size={'large'} color={'#3b82f6'} />
                :
                <>

                    {itemList.length > 0 ? (
                        <LatestItems headings={''} latestItems={itemList} />
                    ) : (
                        <Text className="p-5 text-gray-600">No items found</Text>
                    )}
                </>
            }


        </View>
    )
}