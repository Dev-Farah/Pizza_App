import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, ToastAndroid, View } from 'react-native';
import CuButton from '../components/CuButton';
import CuChip from '../components/CuChip';
import CuTextInput from '../components/CuTextInput';
import { sendData } from '../config/firebasemethods';
import styles from '../styles/global';


function OrderNow({ navigation, route }) {
    
    let orderObj = route.params;
    const [object, setObject] = useState({});

    const setValues = () => {
        if(object.orderDetails === undefined) {
            object.orderDetails = orderObj;
        };
        console.log(object);
    }

    
    let getCurrLoc = () => {
        navigation.navigate('Current Location', object)
    }
    
    let addOrder = () => {
        // console.log(object);
        sendData(`orders/`, object)
        .then((res) => {
            console.log(res);
            ToastAndroid.show('Order Created Successfully', ToastAndroid.SHORT);
            navigation.navigate('Home')
            setObject({});
        })
        .catch((err) => {
            // console.log(err);
            Alert.alert(`Request Failed`, `${err} Please try again!`, [{ text: 'got it' }]);
        })
    }

    useEffect(() => {
        setValues();
    }, [])

    
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
                    {/* <CuTextInput label='Delivery Location' onChangeText={e => setObject({...object, dropPoint: e})} /> */}
                    
                    {object.dropPoint && Object.keys(object.dropPoint).length > 0
                    ? <Text style={[ styles.fs5, styles.textBold, styles.mx1, {marginTop: 8 }]}>Location Added</Text>
                    : <Text style={[ styles.fs5, styles.textBold, styles.mx1, {marginTop: 8 }]}>Add Delivery Location</Text>}
                    
                    <CuChip label={object.dropPoint && Object.keys(object.dropPoint).length > 0 ? 'Change Location' : 'Get Location'}
                    // touchableStyle={{width: 175}} iconName='pin-drop'
                    touchableStyle={{width: 155, padding: 13}}
                    onPress={() => getCurrLoc()} />
                </View>

                <View style={[styles.mb1, styles.py2, styles.rounded, { backgroundColor: '#d8d8d8', padding: 15 }]}>
                    <Text style={[styles.fs3, styles.textBlack, styles.mb1]}>Order Details</Text>
                    <CuTextInput label='Title' value={orderObj.title || object.orderDetails.title } disabled={true} />
                    <CuTextInput label='Price' value={`Rs. ${orderObj.price || object.orderDetails.price }`} disabled={true} />
                    <CuTextInput label='Classification' value={orderObj.classification || object.orderDetails.classification } disabled={true} />
                </View>

            </ScrollView>

            <View style={[styles.w100 ]}>
                <CuButton label='Book Order' onPress={() => addOrder()}  />
            </View>
        </View>
    )
}

export default OrderNow;