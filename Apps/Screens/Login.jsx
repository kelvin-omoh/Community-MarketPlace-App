import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import * as WebBrowser from "expo-web-browser";


import { useWarmUpBrowser } from '../../hooks/warmUpBrowser';

import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {

    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
            WebBrowser.maybeCompleteAuthSession();
            const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();

            if (createdSessionId) {
                setActive({ session: createdSessionId });
            } else {
                // Use signIn or signUp for next steps such as MFA
            }
        } catch (err) {
            console.error("OAuth error", err);
        }
    }, []);


    return (
        <View >
            <Image className=" h-[50vh] object-cover  w-[100vw] " source={require('../../assets/market.jpg')} />
            <View className='p-8 mx-3 shadow-lg mt-2 bg-white  rounded-lg px-3'>
                <Text className='text-[30px] font-bold text-center  '>Community Market-Place</Text>
                <Text className='text-[18px] text-slate-500 mt-7  text-center  '>Buy and sell MarketPlace where can you sell all items and make real money</Text>

                <TouchableOpacity onPress={onPress} className='p-3 bg-blue-500 text-white rounded-full mt-6 text-center '>
                    <Text className=' text-white text-[18px] text-center '>Get started</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}