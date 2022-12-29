import React, { useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import CuButton from '../components/CuButton';
import styles from '../styles/global';

function ItemDetails({ navigation, route }) {

    let itemDetails = route.params;
    console.log(route.params);
    let [reviewList, setReviewList] = useState([
        {
            name: 'Alex',
            feedback: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            name: 'Alex',
            feedback: 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.'
        },
        {
            name: 'Alex',
            feedback: 'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        },
        {
            name: 'Alex',
            feedback: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            name: 'Alex',
            feedback: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            name: 'Alex',
            feedback: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
    ])

    return (
        <>
            <View style={[styles.h100, styles.px2, styles.bgWhite, {paddingTop: 15}]}>
                    <Image source={{ uri: itemDetails.image }} style={[ { width: 300, height: 300, resizeMode: 'contain', alignSelf: 'center', marginBottom: 15 }]} />

            <ScrollView style={{ height: 300 }}>

                <View style={[styles.pb2]}>
                    <Text style={[styles.fs1, styles.mt1, styles.textBlack, styles.textBold]}>{itemDetails.title}</Text>
                    <Text style={[styles.fs3, styles.mt1, styles.textBlack, styles.textBold]} >Rs. {itemDetails.price}</Text>
                    <Text style={[styles.fs5, styles.textBlack, {marginVertical: 5} ]} >Classification: {itemDetails.classification}</Text>
                    <Text style={[styles.fs5, styles.textBlack ]} >Description: {itemDetails.description}</Text> 
                </View>

                <View>
                    <Text style={[styles.fs2, styles.textBlack, styles.mb1]} >Reviews:</Text>

                        <View>
                            {reviewList && reviewList.length > 0
                                ? reviewList.map((e, i) => (
                                    <View key={i} style={[styles.my1, styles.rounded, { backgroundColor: '#d8d8d850', padding: 15 }]}>
                                        <Text style={[styles.fs4, styles.textBlack, { marginBottom: 3 }]}>{e.name}:</Text>
                                        <Text style={[styles.fs]}>{e.feedback}</Text>
                                    </View>
                                )) : null}
                        </View>

                </View>
                </ScrollView>

                <View>
                    <CuButton label='Order Now' onPress={() => { navigation.navigate('Order Now', itemDetails) }} />
                </View>

            </View>
        </>
    )
}

export default ItemDetails;