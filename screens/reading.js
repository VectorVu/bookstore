import React, { useRef, useEffect } from "react";
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    SafeAreaView
} from 'react-native';
import Header from './Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

const images = [
    'https://res.cloudinary.com/vector998/image/upload/v1682919376/images/b1-1_aer0ba.jpg',
    'https://res.cloudinary.com/vector998/image/upload/v1682919377/images/b1-2_mqfu9u.jpg',
    'https://res.cloudinary.com/vector998/image/upload/v1682919377/images/b1-3_vyurqu.jpg',
    'https://res.cloudinary.com/vector998/image/upload/v1682919377/images/b1-4_v4vxuo.jpg',
    'https://res.cloudinary.com/vector998/image/upload/v1682919377/images/b1-5_elemiw.jpg',
    'https://res.cloudinary.com/vector998/image/upload/v1682919377/images/b1-6_y2mlbq.jpg',
    'https://res.cloudinary.com/vector998/image/upload/v1682919377/images/b1-6_y2mlbq.jpg',
    'https://res.cloudinary.com/vector998/image/upload/v1682919377/images/b1-6_y2mlbq.jpg',
    'https://res.cloudinary.com/vector998/image/upload/v1682919377/images/b1-6_y2mlbq.jpg',
    'https://res.cloudinary.com/vector998/image/upload/v1682919377/images/b1-6_y2mlbq.jpg',
    'https://res.cloudinary.com/vector998/image/upload/v1682919377/images/b1-6_y2mlbq.jpg',
];
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height - 40 - 30;

const Reading = ({ route, navigation }) => {
    const [book, setBook] = React.useState(route.params.book);

    const [pages, setPages] = React.useState(['']);
    const [currentPage, setCurrentPage] = React.useState(0);

    const [savePage, setSavePage] = React.useState(8);

    const scrollRef = useRef();

    const getSavePageData = async () => {
        try {
            const value = await AsyncStorage.getItem("books");
            // console.log(JSON.parse(value));
            setPages(value);
            // return value;
        } catch (e) {

            alert('Some thing went wrong! Please try again');
            // return null;
        }
    }

    const setBookMark = async () => {
        try {
            const saveData = JSON.stringify([{ "1": currentPage }]);
            await AsyncStorage.setItem("books", saveData);
            alert('page saved');
        } catch (e) {
            alert('Some thing went wrong! Please try again')
        }
    }

    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const newPage = Math.floor(offsetY / deviceHeight);
        setCurrentPage(newPage);
    };
    const jumpPage = () => {
        scrollRef.current.scrollTo({
            y: 1 * deviceHeight,
            animated: true
        })
    }

    useEffect(() => {
        //  jumpPage();
        getSavePageData();
    }, [])

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // marginTop: 40,
            // height: images.length * deviceHeight + 300
        }}>
            <ImageBackground
                source={book.bookCover}
                resizeMode="cover"
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }}
            />

            {/* Color Overlay */}
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: book.backgroundColor
                }}
            >
            </View>
            <Header title={'Reading'} book={book} navigation={navigation}></Header>

            {/* <TouchableOpacity style={{ positon: 'fixed', backgroundColor: 'blue' }} onPress={jumpPage}><Text>Jump</Text></TouchableOpacity> */}
            <TouchableOpacity style={{
                positon: 'fixed',
                backgroundColor: '#F96D41',
                left: deviceWidth - 240,
                height: 30,
                width: 80,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center'
            }} onPress={setBookMark}><Text style={{ color: 'white' }}>Bookmark</Text></TouchableOpacity>
            <ScrollView
                vertical
                pagingEnabled
                showsVerticalScrollIndicator={false}
                ref={scrollRef}
                // contentOffset={{ x: 0, y: savePage * deviceHeight }}
                style={{ flex: 1, width: deviceWidth, height: deviceHeight * images.length }}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            // contentContainerStyle={{ marginBottom: 10}}
            >
                {
                    images.map((img, index) => (
                        <SafeAreaView
                            key={index}
                            style={{
                                // flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                width: deviceWidth,
                                height: deviceHeight
                            }}>
                            <ImageBackground
                                source={{ uri: img }}
                                resizeMode="contain"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0
                                }}
                            />
                            <Text style={{
                                color: '#F96D41',
                                alignContent: 'center',
                                position: "absolute",
                                top: deviceHeight - 140,
                                zIndex: 999
                            }}>{index + 1}</Text>
                        </SafeAreaView>
                    ))
                }
            </ScrollView >
        </View >
    )

}

export default Reading;