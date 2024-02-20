import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Slider({ sliderList }) {

    return (
        <View className="mt-5  w-full  " >
            <FlatList
                data={sliderList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                className=" "
                renderItem={({ item }) => (
                    <View className=" h-[200px] mr-3 w-[200px] ">
                        <Image source={{ uri: item.image }} className=" mx-3 rounded-lg  object-cover h-full w-full " />
                    </View>


                )

                }
            />
        </View>
    )
}