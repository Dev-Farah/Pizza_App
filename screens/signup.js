import React, { useState } from 'react';
import { Image, Keyboard, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import CuButton from '../components/CuButton';
import CuTextInput from '../components/CuTextInput';
import CuError from '../components/CuError';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import styles from '../styles/global';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import CuLink from '../components/CuLink';
import { signUpUser } from '../config/firebasemethods';
// import loader from '../assets/loader.gif'

function SignUp({ navigation }) {

    const [object, setObject] = useState({});
    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [loader, setLoader] = useState(false);

    const signUp = () => {
        Keyboard.dismiss();

        if (object.name !== '' && object.email !== '' && object.contact !== '' && object.password !== '' && object.confirmPassword !== '') {

            if (object.password === object.confirmPassword) {
                setLoader(true);

                signUpUser(object)
                    .then((successUid) => {
                        setLoader(false);
                        setShowError(false);
                        setErrorMsg('');
                        navigation.navigate('Home', successUid);
                        ToastAndroid.show('Signed Up Successfully', ToastAndroid.SHORT)

                        object.name === ''
                        object.email === ''
                        object.contact === ''
                        object.password === ''
                        object.confirmPassword === ''
                    })
                    .catch((error) => {
                        setLoader(false);
                        setShowError(true);
                        setErrorMsg(error);
                        console.log(error);
                    })

            } else {
                setShowError(true);
                setErrorMsg("Passwords don't match")
            }
        } else {
            setShowError(true);
            setErrorMsg("Please fill out all Fields")
        }




    



    }

    const fieldFocused = () => {
        setShowError(false);
        setErrorMsg('');
    }
    
    // const fieldBlurred = () => {
    //     console.log('Field is blurred');;
    // }


    return (
        <View style={[styles.h100, styles.flexCenter, styles.p2]}>
            
            <Icon color={styles._medium} size={115} name='account-circle' />
            {/* <Text style={[styles.fs1, styles.mb2, {fontSize: 38}]}>Sign Up</Text> */}
            <CuTextInput icon={<Icon style={{ marginRight: 6 }} color={styles._medium} size={26} name='account-circle' />} label='Name' onChangeText={e => setObject({ ...object, name: e })} onFocus={fieldFocused} />
            <CuTextInput icon={<Icon style={{ marginRight: 6 }} color={styles._medium} size={24} name='mail' />} label='Email' onChangeText={e => setObject({ ...object, email: e })} autoCapitalize='none' keyboardType='email-address' onFocus={fieldFocused} />
            <CuTextInput icon={<Icon style={{ marginRight: 6 }} color={styles._medium} size={24} name='call' />} label='Contact (0092 1234567890)' onChangeText={e => setObject({ ...object, contact: e })} keyboardType='numeric' maxLength={15} onFocus={fieldFocused} />
            <CuTextInput icon={<Icon style={{ marginRight: 6 }} color={styles._medium} size={24} name='lock' />} label='Password' onChangeText={e => setObject({ ...object, password: e })} secureTextEntry={true} onFocus={fieldFocused} />
            <CuTextInput icon={<Icon style={{ marginRight: 6 }} color={styles._medium} size={24} name='lock' />} label='Confirm Password' onChangeText={e => setObject({ ...object, confirmPassword: e })} secureTextEntry={true} onFocus={fieldFocused} />
            {errorMsg && errorMsg.length > 0 ? <CuError style={{marginVertical: 2}} errorMsg={errorMsg} /> : null}

            <CuButton loading={loader} label='Sign Up' onPress={() => signUp()} />

            <CuLink text='Already have an account?' linkTxt="Login" onPress={() => navigation.navigate('Login')} />
        </View>
    )
}

export default SignUp;