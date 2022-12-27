import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import CuButton from '../components/CuButton';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import CuFullScreenLoader from '../components/CuFullScreenLoader';
import styles from '../styles/global';
import database from '@react-native-firebase/database';
import {checkUser, getData, signOutUser} from '../config/firebasemethods';
import CuModal from '../components/CuModal';

// import logo from '../assets/images.jpg'
// import main from '../assets/pizza.jpg'
// import logo from '../assets/pizza2.webp'
import main from '../assets/giphy7.gif';
import LinearGradient from 'react-native-linear-gradient';

function Home({navigation, route}) {
  const [modal, setModal] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [fullScreenLoader, setFullScreenLoader] = useState(false);
  const [list, setList] = useState([]); // List of Available Orders

  const fullWidth = Dimensions.get('screen').width;
  const fullHeight = Dimensions.get('screen').height;

  // User Details
  const userData = route.params;
  // console.log(userData);

  const getTheMenu = () => {
    getData(`menu`)
      .then(res => {
        setList([...res]);
      })
      .catch(err => {
        setList(err);
        setShowError(true);
        setErrorMsg(err);
      });
  };

  const logOut = () => {
    signOutUser()
      .then(success => {
        navigation.navigate('Splash');
        console.log(success);
        ToastAndroid.show('Signed Out', ToastAndroid.SHORT);
      })
      .catch(errMsg => {
        Alert.alert(`Request Failed`, `${errMsg} Please try again!`, [
          {text: 'got it'},
        ]);
      });
  };

  const checkUserType = () => {
    setFullScreenLoader(true);
    checkUser()
      .then(resUid => {
        setFullScreenLoader(false);
        console.log(resUid);
      })
      .catch(err => {
        setFullScreenLoader(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getTheMenu();
    checkUserType();
  }, []);

  return fullScreenLoader ? (
    <CuFullScreenLoader />
  ) : (
    <ScrollView>
      <View
        style={[
          styles.p1,
          styles.alignItemsCenter,
          styles.bgBlack,
          {height: fullHeight, paddingTop: 0},
        ]}>
        {/* <Image source={main} style={{width: Dimensions.get('screen').width, height: 360, resizeMode:'contain'}} /> */}

        <View style={[styles.flexRow, styles.flexCenter, styles.flexWrap]}>
            <CuButton label='Add to menu' touchableStyle={{ width: '45%' }} moreStyles={{ paddingHorizontal: 0, padding: 10, marginRight: 8 }} onPress={() => navigation.navigate('Add to menu')} />
            <CuButton label='Orders' touchableStyle={{ width: '30%' }} moreStyles={{ paddingHorizontal: 0, padding: 10, marginRight: 8 }} onPress={() => navigation.navigate('Orders')} />
        </View>

        <View style={[styles.flexWrap, {width: Dimensions.get('screen').width, } ]}>
          {list && list.length > 0
            ? list.map((e, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    navigation.navigate('Item Details', e);
                  }}
                  style={[
                    styles.rounded,
                    styles.bgWhite,
                    {width: '48%', margin: 7, padding: 15},
                  ]}>

                    <Image source={{uri: e.image}} style={{ alignSelf: 'center', width: 135, height: 135, resizeMode: 'contain' }} />
                  <Text style={[styles.fs3, styles.textBold, styles.textBlack, {marginVertical: 2}]}>
                  {e.title.slice(0, 12) + (e.title.length > 12 ? "..." : "")}
                  </Text>
                  <Text style={[styles.fs, styles.textBlack, {marginVertical: 2}]}>
                    {e.classification}
                  </Text>


                  <View style={[ styles.flexRow, styles.flexCenter, styles.justifyContentBetween ]}>
                    <Text style={[styles.fs3, styles.textBold, styles.textBlack, {marginVertical: 2}]}>
                        Rs.{e.price}
                    </Text>

                    <LinearGradient
                      colors={[styles._light, styles._dark]}
                      style={[ styles.roundedPill, styles.flexCenter, { width: 40, height: 40 } ]}>
                        <Icon name='add' color='white' size={23} />
                      </LinearGradient>
                  </View>
                </TouchableOpacity>
              ))
            : null}
        </View>

        <CuButton
          label="Log out"
          touchableStyle={{width: 105}}
          onPress={() => logOut()}
        />
      </View>
    </ScrollView>
  );
}


export default Home;