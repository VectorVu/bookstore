import React from "react";
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    ScrollView,
    Animated
} from 'react-native';
import { FONTS, COLORS, SIZES, icons } from "../constants";

const Reading = ({route, navigation}) => {

    const [pages, setPages] = React.useState();

    const [savePage, setSavePage] = React.useState(1);

    // khi nguoi dung bam nut luu trang sach hien tai dang doc => set Save page + luu vao asysnc store
    // noi dung luu bao gom id sach va page dang doc
    // luu store mang gom nhung object [{bookID: 1, page: 5}, {bookID: 2, page: 7}];
    // hoac co the luu vao database dang {userID:..., bookID:...., page: ...};
    
}

export default Reading;