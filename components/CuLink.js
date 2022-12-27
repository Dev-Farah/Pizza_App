import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles/global';


function CuLink(props) {

    const { text, linkTxt, onPress, boxStyles, textStyles, linkStyles } = props;

    return (
        <View style={[styles.flexRow, { ...boxStyles }]}>
            <Text style={[styles.fs,  { color: styles._link, ...textStyles }]}>{text}</Text><TouchableOpacity onPress={onPress} activeOpacity={0.6} style={[styles.ml1, { ...linkStyles }]}><Text style={[styles.link]}>{linkTxt}</Text></TouchableOpacity>
        </View>
    )
}


export default CuLink;