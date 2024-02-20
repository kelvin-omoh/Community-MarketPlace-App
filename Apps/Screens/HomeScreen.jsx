import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/HomeScreen/Header'
import Slider from '../Components/HomeScreen/Slider'
import { collection, getDocs, orderBy } from "firebase/firestore";
import { db } from '../../FirebaseConfig';
import Categories from '../Components/Categories';
import LatestItems from '../Components/HomeScreen/LatestItems';
export default function HomeScreen() {


    const [sliderList, setSliderList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [latestItems, setLatestItems] = useState([])
    const getSlider = async () => {
        setSliderList([])
        const querySnapshot = await getDocs(collection(db, "sliders"));
        querySnapshot.forEach((doc) => {

            setSliderList((e) => [...e, doc.data()]);
        });
        // const newData = querySnapshot.docs.map((doc) => doc.data());

    }





    const getCategory = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "category"));
            const categories = querySnapshot.docs.map((doc) => doc.data());
            setCategoryList(categories);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };


    const getLatest = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "userPost"), orderBy("createdAt", "desc"));
            const latest = querySnapshot.docs.map((doc) => doc.data());
            setLatestItems(latest);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };



    useEffect(() => {
        getSlider()
        getCategory()
        getLatest()
    }, [])





    return (
        <ScrollView className=" py-8 px-3   ">
            <Header />
            <Slider sliderList={sliderList} />
            <Categories categoryList={categoryList} />
            <LatestItems headings={"Latest Items"} latestItems={latestItems} />
        </ScrollView >
    )
}