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

const images = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Sach_quan_che.pdf/page39-962px-Sach_quan_che.pdf.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVIthBmO8pCZ7tXgeu1o9BkfAGOCH81sLX7w&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUnzKp5o9SfPzjm2OthAx01LHvuD6QfZPz5A&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBS3pIf7CZ7A9jJK2z6GE7EC8yf0bC6Gfe5f-XKuJ6M3sRfcKpEH8goH_h1gOjdKUl4Zw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT70JvaUG0RZDjQt8A-uECvVMXB0P4f0NAh8A&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDTKkDcmvNlSeUuuQfxW6JIIFQZtGkoCG94Q&usqp=CAU',
];

const Reading = ({route, navigation}) => {

    const [pages, setPages] = React.useState();

    const [savePage, setSavePage] = React.useState(1);

    // khi nguoi dung bam nut luu trang sach hien tai dang doc => set Save page + luu vao asysnc store
    // noi dung luu bao gom id sach va page dang doc
    // luu store mang gom nhung object [{bookID: 1, page: 5}, {bookID: 2, page: 7}];
    // hoac co the luu vao database dang {userID:..., bookID:...., page: ...};

    return(  
        <View>
             <ScrollView
             horizontal
             pagingEnabled
             showsHorizontalScrollIndicator={false}
             style={ { width: 350, height: 700, }}
             >
            {
            images.map((img, index)=>(
                <Image
                key={index}
                source ={{ uri:img }}
                style = {{ width: 350, height: 700, resizeMode: 'contain' }} 
                />
            ))
            }</ScrollView>
        </View>
    )
    
}

export default Reading;