import React, { useState } from 'react';
import { Alert, ScrollView, Text, ToastAndroid, View } from 'react-native';
import CuButton from '../components/CuButton';
import CuTextInput from '../components/CuTextInput';
import { sendData } from '../config/firebasemethods';
import styles from '../styles/global';


function OrderNow({ navigation, route }) {
    
    const vehicleObj = route.params;
    // console.log(vehicleObj);
    const [object, setObject] = useState({});

    let addOrder = () => {
        object.vehicleDetails = vehicleObj;
        console.log(object);
        // console.log(vehicleObj);
        sendData(`orders/`, object)
        .then((res) => {
            console.log(res);
            ToastAndroid.show('Booking Created Successfully', ToastAndroid.SHORT)
            setObject({});
        })
        .catch((err) => {
            // console.log(err);
            Alert.alert(`Request Failed`, `${err} Please try again!`, [{ text: 'got it' }]);
        })
    }

    return (
        <View style={[styles.h100, styles.w100, styles.p1, styles.alignItemsCenter]}>
            <View>
                <Text style={[styles.py1, styles.textBlack, styles.fs1]}>Book Order</Text>
            </View>

            <ScrollView style={[styles.w100, {height: 520}]}>
                <View style={[styles.mb2, styles.py2, styles.rounded, { backgroundColor: '#d8d8d8', padding: 15 }]}>
                    <Text style={[styles.fs3, styles.textBlack, styles.mb1]}>User Details</Text>
                    <CuTextInput label='User Name' onChangeText={e => setObject({...object, userName: e})} />
                    <CuTextInput label='Contact' onChangeText={e => setObject({...object, contact: e})} keyboardType='numeric' />
                    <CuTextInput label='CNIC' onChangeText={e => setObject({...object, cnic: e})} keyboardType='numeric' />
                    <CuTextInput label='Address' onChangeText={e => setObject({...object, address: e})} />
                    <CuTextInput label='Delivery Location' onChangeText={e => setObject({...object, dropPoint: e})} />
                </View>
                <View style={[styles.mb1, styles.py2, styles.rounded, { backgroundColor: '#d8d8d8', padding: 15 }]}>
                    <Text style={[styles.fs3, styles.textBlack, styles.mb1]}>Vehicle Details</Text>
                    <CuTextInput label='Title' value={vehicleObj.title} disabled={true} />
                    <CuTextInput label='Price' value={`Rs. ${vehicleObj.price}`} disabled={true} />
                    <CuTextInput label='Classification' value={vehicleObj.classification} disabled={true} />
                </View>

            </ScrollView>

            <View style={[styles.w100 ]}>
                <CuButton label='Book Order' onPress={() => addOrder()}  />
            </View>
        </View>
    )
}

export default OrderNow;