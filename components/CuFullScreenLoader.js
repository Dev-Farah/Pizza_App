import React from 'react';
import { Image, Text, View } from 'react-native';
import styles from '../styles/global';

function FullScreenLoader() {


    return (
        <View style={[styles.h100, styles.flexCenter]}>
            <Image source={require('../assets/loader.gif')} style={{ width: 110, height: 110, resizeMode: 'contain' }} />
            <Text style={[styles.fs4, styles.mt1]}>Loading...</Text>
            {/* <Text style={[styles.fs4, styles.mt1, styles.w75, styles.textCenter, {fontStyle: 'italic'}]}>Please wait, we are testing your patience</Text> */}
        </View>
    )
}

export default FullScreenLoader;