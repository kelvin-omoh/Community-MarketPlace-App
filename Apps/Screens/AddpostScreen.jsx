import { View, Text, TextInput, Button, TouchableOpacity, Image, ToastAndroid, Alert, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from '../../FirebaseConfig';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useUser } from '@clerk/clerk-expo';

export default function AddpostScreen() {
    const [categoryList, setCategoryList] = useState([])

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user } = useUser()
    const storage = getStorage();

    const getCategory = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "category"));
            const categories = querySnapshot.docs.map((doc) => doc.data());
            setCategoryList(categories);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        getCategory()
    }, [])


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };


    const handleSubmit = async (value) => {

        //Convert URI to Blob file

        setLoading(true)
        const res = await fetch(image);
        const blob = await res.blob()


        const storageRef = ref(storage, 'communityPost/' + Date.now() + '.jpg');

        // 'file' comes from the Blob or File API
        const uploadFile = await uploadBytes(storageRef, blob)

        const uri = await getDownloadURL(uploadFile.ref)
        console.log(uri);

        value.image = uri;
        value.userName = user.fullName;
        value.userEmail = user.primaryEmailAddress.emailAddress;
        value.userImage = user.imageUrl;

        const docRef = await addDoc(collection(db, "userPost"), value);
        if (docRef.id) {
            console.log("Document written with ID: ", docRef.id);

            setLoading(false)
            Alert.alert(" Post added successfully ")
        }

    }

    return (
        <KeyboardAvoidingView className=" p-10 ">
            <ScrollView>
                <Text className=' text-[27px]  font-bold  ' >Add new Post</Text>
                <Text className=' text-[17px] text-gray-500 mb-10    ' >Create new post and start selling</Text>
                <Formik
                    initialValues={{ title: '', desc: '', category: '', address: '', price: '', userName: '', userEmail: '', userImage: '', createdAt: Date.now() }}

                    onSubmit={(value) => { handleSubmit(value) }}

                    validate={(values) => {
                        const errors = {}
                        if (!values.title) {
                            ToastAndroid.show("Title must be there", ToastAndroid.SHORT)
                            errors.name = "Title must be there"
                            return errors
                        }
                    }}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        setFieldValue,
                        errors

                    }) => (
                        <View className=' flex mb-4 flex-col gap-1 '>
                            <TouchableOpacity onPress={pickImage} className="w-[90px] h-[90px] ">


                                {image ? <Image className=" w-full h-full  rounded-lg " source={{ uri: image }} />
                                    : <Image className=" w-full h-full  rounded-lg " source={require('../../assets/imgPlaceholder.jpeg')} />

                                }
                            </TouchableOpacity>

                            <TextInput
                                placeholder='Title'
                                className=" rounded-lg px-4 mb-2 py-1 text-[17px]  border-[black] border-2 "
                                onChangeText={handleChange('title')}
                                onBlur={handleBlur('title')}
                                value={values?.title}
                            />
                            <TextInput
                                numberOfLines={4}
                                placeholder='Description..'
                                className=" rounded-lg px-4 mb-2 py-1 text-[17px]  border-[black] border-2 "
                                onChangeText={handleChange('desc')}
                                onBlur={handleBlur('desc')}
                                value={values?.desc}
                            />

                            <TextInput

                                placeholder='Price'
                                keyboardType='number-pad'
                                className=" rounded-lg px-4 mb-2 py-1 text-[17px]  border-[black] border-2 "
                                onChangeText={handleChange('price')}
                                onBlur={handleBlur('price')}
                                value={values?.price}
                            />
                            <TextInput
                                placeholder='address'
                                className=" rounded-lg px-4 mb-2 py-1 text-[17px]  border-[black] border-2 "
                                onChangeText={handleChange('address')}
                                onBlur={handleBlur('address')}
                                value={values?.address}
                            />
                            <View className=" rounded-lg px-4 mb-2 py-1 text-[17px]  border-[black] border-2 ">
                                <Picker
                                    selectedValue={values.category}

                                    onValueChange={(itemValue) => setFieldValue('category', itemValue)}>
                                    {categoryList && categoryList.map((item, id) => (
                                        <Picker.Item key={id} label={item.name} value={item.name} />
                                    ))}
                                </Picker>
                            </View>


                            <TouchableOpacity disabled={loading} onPress={handleSubmit} className={` p-5 
                        ${loading ? "bg-blue-700 " : "bg-blue-900"}  text-white text-center text-[16px] rounded-full `} >

                                {loading ?
                                    <ActivityIndicator color={'#fff'} />
                                    :
                                    <Text className=" text-center text-white text-[16px] ">submit</Text>
                                }




                            </TouchableOpacity >

                        </View>
                    )
                    }

                </Formik >
            </ScrollView>
        </KeyboardAvoidingView >
    )
}