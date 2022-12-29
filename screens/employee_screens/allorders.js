import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { getData } from '../../config/firebasemethods';
import styles from '../../styles/global';


function Orders({ navigation, route }) {

    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [fullScreenLoader, setFullScreenLoader] = useState(false);
    const [list, setList] = useState([]);   // List of All Orders


    const getAllOrders = () => {
        getData(`orders`)
            .then((res) => {
                setList([...res]);
                console.log([...res]);
            })
            .catch((err) => {
                setList(err);
                setShowError(true)
                setErrorMsg(err);
            })
    }


    useEffect(() => {
        getAllOrders();
    }, [])


    return (
        <ScrollView>
            <View style={[styles.p2, styles.alignItemsCenter]}>
                <Text style={[styles.textBlack, styles.fs1]}>Orders</Text>
            
            
                <View 
                    style={[ styles.w100 ]}>
                        {list && list.length > 0
                            ? list.map((e, i) => (
                                <TouchableOpacity key={i} onPress={() => {}} style={[styles.rounded, {margin: 7, padding: 15, backgroundColor: '#d8d8d880'}]}>
                                    
                                    <Text style={[styles.fs4, styles.textBlack, {marginVertical: 2}]}>User Details:</Text>
                                    <Text style={[styles.textBlack, styles.fs2, {marginVertical: 2}]}>{e.userName}</Text>
                                    <Text style={[styles.fs, {marginVertical: 2}]}>{e.contact}</Text>
                                    <Text style={[styles.fs, {marginVertical: 2}]}>{e.cnic}</Text>
                                    <Text style={[styles.fs, {marginVertical: 2}]}>{e.address}</Text>
                                    <Text style={[styles.fs, {marginVertical: 2}]}>{e.pickUpPoint}</Text>
                                    <Text style={[styles.fs, {marginVertical: 2}]}>{e.dropPoint}</Text>

                                    <Text style={[styles.fs4, styles.textBlack, {marginVertical: 10}]}>Order Details:</Text>
                                    <Text style={[styles.fs, {marginVertical: 2}]}>{e.orderDetails.title}</Text>
                                    <Text style={[styles.fs, {marginVertical: 2}]}>{e.orderDetails.price}</Text>
                                    {/* <Text style={[styles.fs, {marginVertical: 2}]}>{e.orderDetails.}</Text>
                                    <Text style={[styles.fs, {marginVertical: 2}]}>{e.orderDetails.startingDestination} to {e.orderDetails.finalDestination}</Text> */}
                                </TouchableOpacity>
                            )) : null}
                    </View>
            </View>
        </ScrollView>
    )
}

export default Orders;