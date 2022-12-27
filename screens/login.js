import React, { useState } from 'react';
import { Keyboard, Modal, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import CuButton from '../components/CuButton';
import CuTextInput from '../components/CuTextInput';
import auth from '@react-native-firebase/auth';
import CuError from '../components/CuError';
import styles from '../styles/global';
import CuLink from '../components/CuLink';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { loginUser } from '../config/firebasemethods';


function Login({ navigation }) {

    const [object, setObject] = useState({});
    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [loader, setLoader] = useState(false);

    const login = () => {
        Keyboard.dismiss();

        if (object.email !== '' && object.password !== '') {

            setLoader(true);
            loginUser(object)
                .then((resUid) => {
                    setLoader(false);
                    setShowError(false);
                    setErrorMsg('');
                    console.log(resUid);
                    navigation.navigate('Home', resUid);
                    ToastAndroid.show('Signed In Successfully', ToastAndroid.SHORT)
                })
                .catch((err) => {
                    setLoader(false);
                    console.log(err);
                    setShowError(true);
                    setErrorMsg(err);

                })

        } else {
            setShowError(true);
            setErrorMsg("Please fill out all Fields")
        }
    
    }

    const fieldFocused = () => {
        setShowError(false);
        setErrorMsg('');
    }

    return (
        <View style={[styles.h100, styles.flexCenter, styles.p2
        // , styles.bgThemeLight
        // , {backgroundColor: styles._secondary}
        ]}>
            <Icon color={styles._medium} size={115} name='account-circle' />
            {/* <Text style={[styles.fs1, styles.mb1]}>Login</Text> */}

            <CuTextInput icon={<Icon style={{ marginRight: 6 }} color={styles._medium} size={24} name='mail' />} label='Email' onChangeText={e => setObject({ ...object, email: e })} autoCapitalize='none' keyboardType='email-address' onFocus={fieldFocused} />
            <CuTextInput icon={<Icon style={{ marginRight: 6 }} color={styles._medium} size={24} name='lock' />} label='Password' onChangeText={e => setObject({ ...object, password: e })} secureTextEntry={true} onFocus={fieldFocused} />
            {errorMsg && errorMsg.length > 0 ? <CuError style={{ marginVertical: 4, marginBottom: 10 }} errorMsg={errorMsg} /> : null}

            <CuLink boxStyles={{ alignSelf: 'flex-end' }} linkStyles={{ marginLeft: 0 }} linkTxt="Forgot Password?" />

            <CuButton loading={loader} label='Login' onPress={() => login()} />

            <CuLink text="Don't have an account?" linkTxt="Sign Up" onPress={() => navigation.navigate('Sign Up')} />

        </View>
    )
}

export default Login;