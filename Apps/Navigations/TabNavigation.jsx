import { View, Text } from 'react-native'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import ExploreScreen from '../Screens/ExploreScreen';
import AddpostScreen from '../Screens/AddpostScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import { AntDesign } from '@expo/vector-icons';
import HomeScreenStackNavigation from './HomeScreenStackNavigation';
import ExploreScreenStackNav from './ExploreScreenStackNav';
import ProfileScreenStack from './ProfileScreenStack';
import MyProduct from '../Screens/MyProduct';


const Tab = createBottomTabNavigator();
// <Tab.Navigator>
//     <Tab.Screen name="Home" component={HomeScreen} />
//     {/* <Tab.Screen name="Explore" component={ExploreScreen} />
//         <Tab.Screen name="Addpost" component={AddpostScreen} />
//         <Tab.Screen name="Profile" component={ProfileScreen} /> */}
// </Tab.Navigator>
export default function TabNavigation() {
    return (

        <Tab.Navigator className="" screenOptions={
            {
                headerShown: false,

                tabBarActiveTintColor: "red",

            }
        }>
            <Tab.Screen name="home-nav" options={{
                tabBarLabel: ({ color }) => (
                    <Text style={{ color: color, fontSize: 16, marginBottom: 3 }}>Home</Text>
                ),
                tabBarIcon: ({ size, color }) => (
                    <AntDesign name="home" size={size} color={color} />
                )
            }} component={HomeScreenStackNavigation} />


            <Tab.Screen
                options={{
                    tabBarLabel: ({ color }) => (
                        <Text style={{ color: color, fontSize: 16, marginBottom: 3 }}>Explore</Text>
                    ),
                    tabBarIcon: ({ size, color }) => (
                        <AntDesign name="search1" size={size} color={color} />
                    )
                }}
                name="explore" component={ExploreScreenStackNav} />


            <Tab.Screen
                options={{
                    tabBarLabel: ({ color }) => (
                        <Text style={{ color: color, fontSize: 16, marginBottom: 3 }}>Add post</Text>
                    ),
                    tabBarIcon: ({ size, color }) => (
                        <AntDesign name="camerao" size={size} color={color} />
                    )
                }}
                name="Add Post" component={AddpostScreen} />

            <Tab.Screen
                options={{
                    tabBarLabel: ({ color }) => (
                        <Text style={{ color: color, fontSize: 16, marginBottom: 3 }}>Profile </Text>
                    ),
                    tabBarIcon: ({ size, color }) => (
                        <AntDesign name="user" size={size}
                            color={color} />
                    ),
                }}

                name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    )


}