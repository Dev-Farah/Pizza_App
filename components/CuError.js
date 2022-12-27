import React from 'react';
import { Text } from 'react-native';
import styles from '../styles/global';

function CuError(props) {

    const { errorMsg, style } = props;

    return (
        <Text style={[styles.error, { ...style }]}>{errorMsg}</Text>
    )
}

export default CuError;