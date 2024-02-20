import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from '../Screens/ExploreScreen';
import ProductDetail from '../Screens/ProductDetail';

export default function ExploreScreenStackNav() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator >
            <Stack.Screen options={{ headerShown: false }} name="explore-tab" component={ExploreScreen} />
            <Stack.Screen
                options={({ route }) => (
                    {
                        title: "Detail",
                        headerTintColor: 'white',
                        headerStyle: {
                            backgroundColor: "#3d82d3",

                        }
                    }
                )}

                name="product-detail" component={ProductDetail} />



        </Stack.Navigator>
    )
}