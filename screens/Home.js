import React, { memo } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { COLORS, FONTS, SIZES, icons, images } from "../constants";
import URL_IP from "../constants/connect";
import  RenderList  from './RenderList';

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


const getProfile = async () => {

  console.log(user);
  if (user) {
    profileData.name = user.username;
    profileData.point = user.point;
  }
}
//  ₫> =khong dung async mà dung promise, tim hieu cach dung promise và chỉnh lai code

const Home = ({ navigation }) => {
  // Dummy Datas
  let profileData = {
    name: "Guest",
    point: 0,
  };
  const [bookData, setBookData] = React.useState([]);

  const [profile, setProfile] = React.useState(profileData);
  const [myBooks, setMyBooks] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState(1);

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

  const renderHeader = (profile) => {
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
              {profile.username}
            </Text>
          </View>
        </View>

        {/* Points */}
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            height: 40,
            paddingLeft: 3,
            paddingRight: SIZES.radius,
            borderRadius: 20,
          }}
          onPress={() => {
            console.log("Point");
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
              {profile.point} point
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  // function renderButtonSection() {
  //   return (
  //     <View
  //       style={{ flex: 1, justifyContent: "center", padding: SIZES.padding }}
  //     >
  //       <View
  //         style={{
  //           flexDirection: "row",
  //           height: 70,
  //           backgroundColor: COLORS.secondary,
  //           borderRadius: SIZES.radius,
  //         }}
  //       >
  //         {/* Claim */}
  //         <TouchableOpacity
  //           style={{ flex: 1 }}
  //           onPress={() => console.log("Claim")}
  //         >
  //           <View
  //             style={{
  //               flex: 1,
  //               flexDirection: "row",
  //               alignItems: "center",
  //               justifyContent: "center",
  //             }}
  //           >
  //             <Image
  //               source={icons.claim_icon}
  //               resizeMode="contain"
  //               style={{
  //                 width: 30,
  //                 height: 30,
  //               }}
  //             />
  //             <Text
  //               style={{
  //                 marginLeft: SIZES.base,
  //                 ...FONTS.body3,
  //                 color: COLORS.white,
  //               }}
  //             >
  //               Claim
  //             </Text>
  //           </View>
  //         </TouchableOpacity>

  //         {/* Divider */}
  //         <LineDivider />

  //         {/* Get Point */}
  //         <TouchableOpacity
  //           style={{ flex: 1 }}
  //           onPress={() => console.log("Get Point")}
  //         >
  //           <View
  //             style={{
  //               flex: 1,
  //               flexDirection: "row",
  //               alignItems: "center",
  //               justifyContent: "center",
  //             }}
  //           >
  //             <Image
  //               source={icons.point_icon}
  //               resizeMode="contain"
  //               style={{
  //                 width: 30,
  //                 height: 30,
  //               }}
  //             />
  //             <Text
  //               style={{
  //                 marginLeft: SIZES.base,
  //                 ...FONTS.body3,
  //                 color: COLORS.white,
  //               }}
  //             >
  //               Get Point
  //             </Text>
  //           </View>
  //         </TouchableOpacity>

  //         {/* Divider */}
  //         <LineDivider />

  //         {/* My Card */}
  //         <TouchableOpacity
  //           style={{ flex: 1 }}
  //           onPress={() => console.log("My Card")}
  //         >
  //           <View
  //             style={{
  //               flex: 1,
  //               flexDirection: "row",
  //               alignItems: "center",
  //               justifyContent: "center",
  //             }}
  //           >
  //             <Image
  //               source={icons.card_icon}
  //               resizeMode="contain"
  //               style={{
  //                 width: 30,
  //                 height: 30,
  //               }}
  //             />
  //             <Text
  //               style={{
  //                 marginLeft: SIZES.base,
  //                 ...FONTS.body3,
  //                 color: COLORS.white,
  //               }}
  //             >
  //               My Card
  //             </Text>
  //           </View>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   );
  // }

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
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
      {/* Header Section, thêm marginTop để né mấy cái tai thỏ, tai heo, mắt cú, mắt mèo*/}
      <View style={{ height: 200, marginTop: 20 }}>
        {renderHeader(profile)}
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

export default memo(Home);
