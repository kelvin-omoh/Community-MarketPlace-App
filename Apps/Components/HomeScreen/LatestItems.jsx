import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import PostItems from './PostItems'

export default function LatestItems({ latestItems, headings }) {
    // console.log(latestItems);
    return (
        <View className="my-6 py-3  ">
            <Text className=" font-bold text-[20px]">{headings}</Text>

            <FlatList
                className=""
                data={latestItems}
                numColumns={2}

                renderItem={({ item, index }) => (
                    <PostItems item={item} />
                )}
            />
        </View>
    )
}