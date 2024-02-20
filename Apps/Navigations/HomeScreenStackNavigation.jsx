import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import ItemsList from '../Screens/ItemsList';
import ProductDetail from '../Screens/ProductDetail';
import MyProduct from '../Screens/MyProduct';

const Stack = createStackNavigator();

export default function HomeScreenStackNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
            <Stack.Screen name="item-list"

                options={({ route }) => (
                    {
                        title: route.params.category,
                        headerTintColor: 'white',
                        headerStyle: {
                            backgroundColor: "#3d82d3",

                        }
                    }
                )}

                component={ItemsList}

            />

            <Stack.Screen name="product-detail"

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

            <Stack.Screen name="my-product"

                options={({ route }) => (
                    {
                        title: "Detail",
                        headerTintColor: 'white',
                        headerStyle: {
                            backgroundColor: "#3d82d3",

                        }
                    }
                )}

                component={MyProduct}

            />

        </Stack.Navigator>
    )
}