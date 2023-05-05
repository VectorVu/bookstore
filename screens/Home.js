import React, { memo } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, FONTS, SIZES, icons, images } from "../constants";
import URL_IP from "../constants/connect";
import  RenderList  from './RenderList';
import Dialog, { DialogContent } from "react-native-popup-dialog";

const LineDivider = () => {
  return (
    <View style={{ width: 1, paddingVertical: 18 }}>
      <View
        style={{
          flex: 1,
          borderLeftColor: COLORS.lightGray,
          borderLeftWidth: 1,
        }}
      ></View>
    </View>
  );
};


const Home = ({ navigation }) => {
// chinh lai them diem va ten user trong header
  const [user, setUser] = React.useState();
  const getProfile = async () => {
    const userData = JSON.parse(await AsyncStorage.getItem("savedUser"));
    if (userData) {
      setUser(userData);
    }
  }
  const [bookData, setBookData] = React.useState([]);
  const [modalVisible2, setModalVisible2] = React.useState(false);
  const [myBooks, setMyBooks] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState(1);
  let addedPoints = 0;

  React.useEffect(()=>{
    getProfile();
  }, [])
  ////////////////////////////////////
  const getAllBookData = async () => {
    const allBook = await fetch(`${URL_IP}/book`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    });
    if (allBook) {
      const parseData = await allBook.json();
      // console.log(parseData);
      setMyBooks([
        { ...parseData[2], completion: "75%", lastRead: "3d 5h", },
        { ...parseData[3], completion: "23%", lastRead: "10d 5h" },
        { ...parseData[4], completion: "10%", lastRead: "1d 2h", },]);
      setCategories([{
        id: 1,
        categoryName: "Best Seller",
        books: [parseData[2], parseData[3], parseData[4]],
      },
      {
        id: 2,
        categoryName: "The Latest",
        books: [parseData[3]],
      },
      {
        id: 3,
        categoryName: "Coming Soon",
        books: [parseData[4]],
      }])
      setBookData(parseData);
    }
  }

  React.useEffect(() => {
    getAllBookData();
  }, [])

  const renderGetPoints = () => {
    return(
      <Dialog
        visible={modalVisible2}
        onTouchOutside={() => {
          setModalVisible2(false);
        }}
        width={300}
        height={330}
      >
        <DialogContent>
        <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={()=>{
          addedPoints = 10;
          updatePointsPressed();
        }}
      >
        <Text style={styles.buttonText}>10 Points = 10$</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={()=>{
          addedPoints = 60;
          updatePointsPressed();
        }}
      >
        <Text style={styles.buttonText}>60 Points = 50$</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={()=>{
          addedPoints = 150;
          updatePointsPressed();
        }}
      >
        <Text style={styles.buttonText}>150 Points = 100$</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={()=>{
          addedPoints = 400;
          updatePointsPressed();
        }}
      >
        <Text style={styles.buttonText}>400 Points = 200$</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.buttonOpen, {backgroundColor: 'gray'}]}
        onPress={() => setModalVisible2(false)}
      >
        <Text style={styles.buttonText}>CLOSE</Text>
      </TouchableOpacity>
        </DialogContent>
      </Dialog>
    )
  }

  const updatePointsPressed = async () => {
    console.log(addedPoints);
    const userInfo = JSON.parse(await AsyncStorage.getItem("savedUser"));
    const newPoints = userInfo.point + addedPoints;
    let user = {
      username: userInfo.username,
      password: userInfo.password,
      email: userInfo.email,
      phoneNumber: userInfo.phoneNumber,
      point: newPoints,
      savedBooks: userInfo.savedBooks,
    };
    const response = await fetch(`${URL_IP}/user/${userInfo.username}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const res = await response.json();
    console.log(res.message);
    if(res.message === "Update successfully") {
      alert("Successfully");
      setModalVisible2(false);
      await AsyncStorage.setItem("savedUser", JSON.stringify(user));
      getProfile();
      navigation.navigate("home");
    } else {
      alert("Update failed");
      setModalVisible2(false);
    }
  }

  const renderHeader = (user) => {
    // getProfile();
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          paddingHorizontal: SIZES.padding,
          alignItems: "center",
        }}
      >
        {/* Greetings */}
        <View style={{ flex: 1 }}>
          <View style={{ marginRight: SIZES.padding }}>
            <Text style={{ ...FONTS.h3, color: COLORS.white }}>
              Good Morning
            </Text>
            <Text style={{ ...FONTS.h2, color: COLORS.white }}>
              {user.username}
            </Text>
          </View>
        </View>

        {/* Points */}

        {renderGetPoints()}

        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            height: 40,
            paddingLeft: 3,
            paddingRight: SIZES.radius,
            borderRadius: 20,
          }}
          onPress={() => {
            setModalVisible2(true);
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 25,
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              <Image
                source={icons.plus_icon}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </View>

            <Text
              style={{
                marginLeft: SIZES.base,
                color: COLORS.white,
                ...FONTS.body3,
              }}
            >
              {user.point} point
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  function renderMyBookSection(myBooks) {
    const renderItem = ({ item, index }) => {
      return (
        <TouchableOpacity
          style={{
            flex: 1,
            marginLeft: index == 0 ? SIZES.padding : 0,
            marginRight: SIZES.radius,
          }}
          onPress={() =>
            navigation.navigate("BookDetail", {
              book: item,
            })
          }
        >
          {/* Book Cover */}
          <Image
            source={{ uri: item.bookCover }}
            resizeMode="cover"
            style={{
              width: 180,
              height: 250,
              borderRadius: 20,
            }}
          />

          {/* Book Info */}
          <View
            style={{
              marginTop: SIZES.radius,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={icons.clock_icon}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.lightGray,
              }}
            />
            <Text
              style={{ marginLeft: 5, ...FONTS.body3, color: COLORS.lightGray }}
            >
              {item.lastRead}
            </Text>

            <Image
              source={icons.page_icon}
              style={{
                marginLeft: SIZES.radius,
                width: 20,
                height: 20,
                tintColor: COLORS.lightGray,
              }}
            />
            <Text
              style={{ marginLeft: 5, ...FONTS.body3, color: COLORS.lightGray }}
            >
              {item.completion}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={{
            paddingHorizontal: SIZES.padding,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ ...FONTS.h2, color: COLORS.white }}>My Book</Text>

          <TouchableOpacity onPress={() => console.log("See More")}>
            <Text
              style={{
                ...FONTS.body3,
                color: COLORS.lightGray,
                alignSelf: "flex-start",
                textDecorationLine: "underline",
              }}
            >
              see more
            </Text>
          </TouchableOpacity>
        </View>

        {/* Books */}
        <View style={{ flex: 1, marginTop: SIZES.padding }}>
          <FlatList
            data={myBooks}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }

  function renderCategoryHeader() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{ flex: 1, marginRight: SIZES.padding }}
          onPress={() => setSelectedCategory(item.id)}
        >
          {selectedCategory == item.id && (
            <Text style={{ ...FONTS.h2, color: COLORS.white }}>
              {item.categoryName}
            </Text>
          )}
          {selectedCategory != item.id && (
            <Text style={{ ...FONTS.h2, color: COLORS.lightGray }}>
              {item.categoryName}
            </Text>
          )}
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ flex: 1, paddingLeft: SIZES.padding }}>
        <FlatList
          data={categories}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          horizontal
        />
      </View>
    );
  }

  function renderCategoryData() {
    var books = [];

    if (categories.length > 0) {
      let selectedCategoryBooks = categories.filter(
        (a) => a.id == selectedCategory
      );
      if (selectedCategoryBooks.length > 0) {
        books = selectedCategoryBooks[0].books;
      }
    }

    return (
      <RenderList listBook={books} navigation={navigation}></RenderList>
    );
  }
  return ( user &&
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
      {/* Header Section, thêm marginTop để né mấy cái tai thỏ, tai heo, mắt cú, mắt mèo*/}
      <View style={{ height: 70, marginTop: 10 }}>
        {renderHeader(user)}
        {/* {renderButtonSection()} */}
      </View>
      {/* Body Section */}
      <FlatList
        ListHeaderComponent={
          <View style={{ marginTop: SIZES.radius }}>
            {/* Categories Section */}
            {bookData.length > 0 ? <>
              <View style={{ marginTop: SIZES.padding }}>
                <View>{renderMyBookSection(myBooks)}</View>
                <View>{renderCategoryHeader()}</View>
                <View>{renderCategoryData()}</View>
              </View>
            </> : <Text>Loading Data...</Text>}

          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  
});

export default memo(Home);
