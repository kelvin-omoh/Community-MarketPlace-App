import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../Screens/ProfileScreen';
import MyProduct from '../Screens/MyProduct';
import AddpostScreen from '../Screens/AddpostScreen';
import ProductDetail from '../Screens/ProductDetail';

const Stack = createStackNavigator();


export default function ProfileScreenStack() {

    return (
        <Stack.Navigator >
            <Stack.Screen options={{ headerShown: false }} name="profile-tab" component={ProfileScreen} />
            <Stack.Screen name="product-detailb"

                options={({ route }) => (
                    {
                        title: "Detail",
                        headerTintColor: 'white',
                        headerStyle: {
                            backgroundColor: "#3d82d3",

                        }
                    }
                )}

                component={ProductDetail}

            />



        </Stack.Navigator>
    )
}