import React from 'react';
import { TextInput, View } from 'react-native';
import styles from '../styles/global';

function CuTextInput(props) {

    const { icon, label, value, moreStyles, onChangeText, secureTextEntry, autoCapitalize, keyboardType, maxLength, onFocus, onBlur, disabled } = props;

    return (
        <View style={[styles.inputBox]}>
            {icon}
            <TextInput
                // style={style}
                placeholder={label} onChangeText={onChangeText}
                style={[styles.input, { ...moreStyles }]} value={value}
                secureTextEntry={secureTextEntry} autoCapitalize={autoCapitalize}
                keyboardType={keyboardType} maxLength={maxLength}
                onFocus={onFocus} onBlur={onBlur} editable={!disabled}
            />
        </View>
    )
}


export default CuTextInput;