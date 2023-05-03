import React, { memo, useRef, useEffect } from "react";
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

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height - 40 - 30;

const Reading = ({ route, navigation }) => {
    const [book, setBook] = React.useState(route.params.book);
    
    const [savePage, setSavePage] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);

    const scrollRef = useRef();

    const removeBook = async () => {
        await AsyncStorage.removeItem("books");
    }

    const getSavePageData = async () => {
        try {
            // console.log(book);
            const value = await AsyncStorage.getItem("books");
            if (value) {
                const pageValue = JSON.parse(value);
                // console.log(pageValue);
                if (pageValue[book.id]) {
                    setSavePage(pageValue[book.id]);
                }
            }
            // return value;
        } catch (e) {

            alert('Some thing went wrong! Please try again');
            // return null;
        }
    }

    const setBookMark = async () => {
        try {
            const newSaveData = {};
            newSaveData[`${book.id}`] = currentPage;
            await AsyncStorage.mergeItem("books", JSON.stringify(newSaveData));
            alert('page saved');
        } catch (e) {
            alert('Some thing went wrong! Please try again')
        }
    }

    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        // console.log("offsetY: " + offsetY);
        const newPage = Math.floor(offsetY / deviceHeight);
        // console.log("newPage: ", newPage);
        setCurrentPage(newPage + 1);
    };
    const jumpPage = () => {
        scrollRef.current.scrollTo({
            y: 1 * deviceHeight,
            animated: true
        })
    }

    useEffect(() => {
        //  jumpPage();
        // removeBook();
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
                source={{uri: book.bookCover }}
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
                contentOffset={{ x: 0, y: savePage * deviceHeight }}
                style={{ flex: 1 }}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            // contentContainerStyle={{ marginBottom: 10}}
            >
                {
                    book.contentImg.map((img, index) => (
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

export default memo(Reading);