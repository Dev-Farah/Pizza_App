import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import CuButton from '../components/CuButton';
import styles from '../styles/global';
import logo from '../assets/logo.png'
import { checkUser } from '../config/firebasemethods';


function Splash({ navigation }) {

  const [fullScreenLoader, setFullScreenLoader] = useState(false);
  const [userUid, setUserUid] = useState('');

    const moveUser = () => {
        if (userUid === '') {
            navigation.navigate('Login');
        } else {
            navigation.navigate('Home', userUid);
            setUserUid('');
        }
    }
    
    const checkUserType = () => {

        setFullScreenLoader(true);
        checkUser()
          .then(resUid => {
            setFullScreenLoader(false);
            setUserUid(resUid);
            console.log(`Someone is logged in ${resUid}`);
          })
          .catch(err => {
            setFullScreenLoader(false);
            console.log(err);
          });
      };

    useEffect(() => {
        checkUserType();
    }, []);


    return (
        // backgroundColor: '#141D24'
        <View style={[styles.flexCenter, styles.h100, styles.p2, styles.bgBlack ]}>
            
            <Image source={logo} style={{width: 220, height: 220, resizeMode:'contain',}} />
            
            <Text style={[styles.pt3, styles.textWhite, styles.textBold, {fontSize: 36}]}>Pizza Palace</Text>
            <Text style={[styles.fs4, styles.pb3, styles.w75, styles.textSecondary, styles.textCenter, {fontStyle: 'italic', padding: 15 }]}>A slice a day keeps the sad away</Text>
            {/* <Text style={[styles.fs5, styles.m1, styles.pb3, styles.textSecondary, {fontStyle: 'italic'}]}>It's time to eat Pizza and Relax</Text> */}
            {/* <Text style={[styles.fs4, styles.p2, styles.textCenter, styles.textSecondary, {fontStyle: 'italic'}]}>Every Pizza is a personal pizza if you try hard and believe in yourself</Text> */}
            <CuButton touchableStyle={{width: "75%"}} label='Get Started' onPress={() => moveUser()} />
            
        </View>
    )
}

export default Splash;