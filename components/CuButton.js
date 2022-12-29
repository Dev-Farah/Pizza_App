import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../styles/global';

function CuButton(props) {

    const { label, moreStyles, onPress, touchableStyle, loading } = props;

    return (
        <TouchableOpacity activeOpacity={0.6} style={[styles.w100, { ...touchableStyle }]} onPress={onPress} loading={loading ?? false}>
            <LinearGradient colors={[styles._light, styles._dark]}
                style={[styles.btn, { ...moreStyles }]}
            >
                {loading ? <ActivityIndicator color={'#ddd'}
                    // style={{ display: 'none', backgroundColor: 'pink'}} 
                    animating={true} size={35} /> : <Text style={[styles.textWhite, styles.fs]}>{label}</Text>}
            </LinearGradient>
        </TouchableOpacity>
    )
}


export default CuButton;