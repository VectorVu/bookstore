import React, { memo } from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
} from "react-native";
import RenderList from "./RenderList";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import URL_IP from "../constants/connect";
import { COLORS} from "../constants";


const Search = ({ navigation }) => {

    const [searchKey, setSearchKey] = React.useState({ value: "", error: "" });
    const [books, setBooks] = React.useState([]);
    const querySearch = async (keySearch) => {
        // console.log(keySearch);
        const searchBook = await fetch(`${URL_IP}/book/search/${encodeURIComponent(keySearch)}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        });
        if (searchBook) {
            const result = await searchBook.json();
            // console.log(result);
            setSearchKey('');
            setBooks(result);
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
            <View >
                <TextInput
                    label="Search"
                    returnKeyType="done"
                    value={searchKey.value}
                    onChangeText={(text) => setSearchKey({ value: text, error: "" })}
                    error={!!searchKey.error}
                    errorText={searchKey.error}
                    style={{ marginTop: 30 }}
                />
            </View>
            <Button style={{ width: '30%', marginLeft: 10 }} mode="contained" onPress={() => querySearch(searchKey.value)}>
                Search
            </Button>
            <FlatList
                ListHeaderComponent={
                    <View>
                        {/* result Section */}
                        {books && <RenderList listBook={books} navigation={navigation} ></RenderList>}
                    </View>
                }
            />

        </SafeAreaView>
    )
}

export default memo(Search);