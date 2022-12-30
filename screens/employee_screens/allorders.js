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
                <Text style={[styles.textBlack, styles.fs5, styles.mt2, {alignSelf: 'flex-start'}]}>Total Orders: {list.length}</Text>
            
                <View 
                    style={[ styles.w100 ]}>
                        {list && list.length > 0
                            ? list.map((e, i) => (
                                <TouchableOpacity key={i} onPress={() => {}} style={[styles.rounded, styles.shadow2, styles.my1, { padding: 15, backgroundColor: '#fff'}]}>
                                    
                                    <Text style={[styles.fs2, styles.textBlack, {marginVertical: 2}]}>User Details:</Text>
                                    <Text style={[styles.fs5, {color: '#5a5a5a', marginVertical: 2}]}>Name: {e.userName}</Text>
                                    <Text style={[styles.fs5, {color: '#5a5a5a', marginVertical: 2}]}>Contact: {e.contact}</Text>
                                    <Text style={[styles.fs5, {color: '#5a5a5a', marginVertical: 2}]}>CNIC: {e.cnic}</Text>
                                    <Text style={[styles.fs5, {color: '#5a5a5a', marginVertical: 2}]}>Address: {e.address}</Text>
                                    <Text style={[styles.fs5, {color: '#5a5a5a', marginVertical: 2}]}>Latitude: {e.dropPoint.latitude}</Text>
                                    <Text style={[styles.fs5, {color: '#5a5a5a', marginVertical: 2}]}>Longitude: {e.dropPoint.longitude}</Text>

                                    <Text style={[styles.fs2, styles.textBlack, styles.mt1]}>Order Details:</Text>
                                    <Text style={[styles.fs5, {color: '#5a5a5a', marginVertical: 2}]}>Title: {e.orderDetails.title}</Text>
                                    <Text style={[styles.fs5, {color: '#5a5a5a', marginVertical: 2}]}>Price: {e.orderDetails.price} Rs.</Text>
                                    <Text style={[styles.fs5, {color: '#5a5a5a', marginVertical: 2}]}>Classification: {e.orderDetails.classification}</Text>
                                </TouchableOpacity>
                            )) : null}
                    </View>
            </View>
        </ScrollView>
    )
}

export default Orders;