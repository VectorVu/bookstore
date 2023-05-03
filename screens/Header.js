import React, {memo} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import { FONTS, SIZES, icons } from "../constants";

const Header = ({title, book, navigation}) => (
    <View style={{ flexDirection: 'row', paddingHorizontal: SIZES.radius, height: 80, alignItems: 'flex-end' }}>
        <TouchableOpacity
            style={{ marginLeft: SIZES.base }}
            onPress={() => navigation.goBack()}
        >
            <Image
                source={icons.back_arrow_icon}
                resizeMode="contain"
                style={{
                    width: 25,
                    height: 25,
                    tintColor: book.navTintColor
                }}
            />
        </TouchableOpacity>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ ...FONTS.h3, color: book.navTintColor }}>{title}</Text>
        </View>

        <TouchableOpacity
            style={{ marginRigth: SIZES.base }}
            onPress={() => console.log("Click More")}
        >
            <Image
                source={icons.more_icon}
                resizeMode="contain"
                style={{
                    width: 30,
                    height: 30,
                    tintColor: book.navTintColor,
                    alignSelf: 'flex-end'
                }}
            />
        </TouchableOpacity>
    </View>
);

export default memo(Header);

