import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
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
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import styles from '../styles/global';
import database from '@react-native-firebase/database';
import {checkUser, getData, signOutUser} from '../config/firebasemethods';
import LinearGradient from 'react-native-linear-gradient';
import CuChip from '../components/CuChip';
import CuModal from '../components/CuModal';
import CuButton from '../components/CuButton';
import CuTextInput from '../components/CuTextInput';
import CuFullScreenLoader from '../components/CuFullScreenLoader';

// Import Images
import avatar from '../assets/avatar.png'
import roundPizza from '../assets/round-pizza.png'
import pizzaIcon from '../assets/icon4.png'
import addGif from '../assets/add.gif';


function Home({navigation, route}) {
  
  const [modal, setModal] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [fullScreenLoader, setFullScreenLoader] = useState(false);
  const [list, setList] = useState([]); // List of Available Orders
  const [classification, setClassification] = useState([]);
  const [selectedClassArr, setSelectedClassArr] = useState([]);
  const [filterList, setFilterList] = useState([]); //  List of items filtered by the user
  // const [showChips, setShowChips] = useState(false);
  
  const fullWidth = Dimensions.get('screen').width;
  const fullHeight = Dimensions.get('screen').height;

  // User Details
  const userData = route.params;
  console.log(userData);

  const getTheMenu = () => {
    getData(`menu`)
      .then(res => {
        setList([...res]);
        getClassification();
      })
      .catch(err => {
        setList(err);
        setShowError(true);
        setErrorMsg(err);
      });
  };

  // Extract Unique classification from main list
  const getClassification = e => {
    let li = list.map(x => x.classification);
    li = [...new Set([...li])];
    // li.replace('Beef, Chicken, Salami (Halal), Ham (Halal)', 'Mix')
    setClassification([...li]);
    // console.log(classification);
  };

  // Set selected Categories in selectedClassArr and Update Filtered List
  const selectChip = e => {
    let arr = [...selectedClassArr];
    arr.push(e);
    arr = [...new Set([...arr])]; // Set unique values of Multiple Selected Classification

    let arr2 = [];

    arr.forEach(y => {
      arr2 = [...arr2, ...list.filter(x => x.classification == y)];
    });

    setFilterList([...arr2]); // Update the filtered Products (also for Multiple Categories)
    setSelectedClassArr([...arr]); // Pin the Selected Classification to the Start of the Classification Slider
  };

  const removeChip = ind => {
    // Remove the current Pinned Chip with index
    selectedClassArr.splice(ind, 1);
    setSelectedClassArr([...selectedClassArr]);

    // Create a new array and Update the Filtered Products
    let arr2 = [];

    selectedClassArr.forEach(y => {
      arr2 = [...arr2, ...list.filter(x => x.classification == y)];
    });

    setFilterList([...arr2]);
  };

  // Search Input functionality
  const searchItems = inputVal => {
    let filteredItems = [];
    {
      inputVal
        ? (filteredItems = [
            ...list.filter(x =>
              x.title.toLowerCase().includes(inputVal.toLowerCase()),
            ),
          ])
        : null;
    }
    setFilterList([...filteredItems]);
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

  useEffect(() => {
    getTheMenu();
    checkUserType();

    // setTimeout(() => {
    //   setShowChips(true)
    //   console.log('working');
    // }, 9000);
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
          {
            // height: fullHeight,
            height: '100%',
            paddingTop: 0,
          },
        ]}>

        {/* Header */}
        <Image
          source={addGif}
          style={{
            width: Dimensions.get('screen').width,
            height: 360,
            resizeMode: 'contain',
          }}
        />

        <View style={[styles.pt2, {width: fullWidth, padding: 13}]}>
          <View
            style={[styles.flexRow, styles.py1, styles.justifyContentBetween]}>
            <View>
              <Text style={[styles.textWhite, styles.fs2, styles.ml1]}>
                Hey, 
                {/* {userData.name} */}
              </Text>
              <Text style={[styles.textWhite, styles.fs, styles.ml1, {marginTop: 5}]}>
                What do you wanna eat today?
              </Text>
            </View>

            <View
              style={[
                styles.roundedPill,
                {
                  width: 55,
                  height: 55,
                  resizeMode: 'contain',
                  backgroundColor: 'blue',
                },
              ]}>
              <Image
                source={avatar}
                style={[
                  styles.roundedPill,
                  {width: 60, height: 60, resizeMode: 'contain'},
                ]}
              />
            </View>
          </View>

          {/* Search Input */}
          <View>
            <CuTextInput
              label="Search"
              icon={<Icon color={styles._black} size={25} name="search" />}
              onChangeText={e => searchItems(e)}
            />
          </View>


          {/* Chips Box */}
          <ScrollView horizontal={true} style={[styles.pt1, styles.flexRow]}>
            
            {/* Selected Chips */}
            {selectedClassArr && selectedClassArr.length > 0
              ? selectedClassArr.map((x, i) => (
                  <View key={i}>
                    <CuChip
                      source={pizzaIcon}
                      imgStyle={{width: 25, height: 25}}
                      label={x}
                      onPress={() => removeChip(i)}
                      touchableStyle={{backgroundColor: styles._dark}}
                      />
                  </View>
                ))
                : null}


            {/* Mapping all Chips */}
            {
            classification && classification.length > 0
            // showChips
              ? classification.map((e, i) => {
                return (
                    <View key={i}>
                      <CuChip source={roundPizza} label={e} onPress={() => selectChip(e)} />
                    </View>
                  );
                })
              : null
                // <View style={[{width: fullWidth}]}>
                //   <ActivityIndicator size={25} color={'#ddd'} />
                // </View>
            }
          </ScrollView>
        </View>

        {/* <View style={[styles.flexRow, styles.flexCenter, styles.flexWrap]}>
            <CuButton label='Add to menu' touchableStyle={{ width: '45%' }} moreStyles={{ paddingHorizontal: 0, padding: 10, marginRight: 8 }} onPress={() => navigation.navigate('Add to menu')} />
            <CuButton label='Orders' touchableStyle={{ width: '30%' }} moreStyles={{ paddingHorizontal: 0, padding: 10, marginRight: 8 }} onPress={() => navigation.navigate('Orders')} />
            <CuButton label='Track your order' touchableStyle={{ width: '50%' }} moreStyles={{ paddingHorizontal: 0, padding: 10, marginRight: 8 }} onPress={() => navigation.navigate('Map')} />
        </View> */}


        {/* Filtered Cards */}
        {filterList && filterList.length > 0 ? (
          <View>
            <Text style={[styles.fs4, styles.textWhite, styles.textBold, styles.ml2]}>
              Filtered Items
            </Text>
            <View
              style={[
                styles.flexRow,
                styles.flexWrap,
                styles.justifyContentBetween,
                { width: fullWidth, padding: 8, paddingHorizontal: 15},
              ]}>
              {filterList.map((e, i) => (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate('Item Details', e);
                  }}
                  style={[
                    styles.rounded,
                    styles.bgWhite,
                    // styles.p1,
                    {width: '48%', marginVertical: 7, padding: 13},
                  ]}>
                  <Image
                    source={{uri: e.image}}
                    style={{
                      alignSelf: 'center',
                      width: 150,
                      height: 150,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={[
                      styles.fs4,
                      styles.textBold,
                      styles.textBlack,
                      {marginVertical: 2},
                    ]}>
                    {e.title.slice(0, 11) + (e.title.length > 11 ? '...' : '')}
                  </Text>
                  <Text
                    style={[styles.fs, styles.textBlack, {marginVertical: 1}]}>
                    {e.classification.slice(0, 15) +
                      (e.classification.length > 15 ? '...' : '')}
                  </Text>

                  <View
                    style={[
                      styles.flexRow,
                      styles.flexCenter,
                      styles.justifyContentBetween,
                    ]}>
                    <Text
                      style={[
                        styles.fs4,
                        styles.textBold,
                        styles.textBlack,
                        {marginVertical: 1},
                      ]}>
                      Rs.{e.price}
                    </Text>

                    <LinearGradient
                      colors={[styles._light, styles._dark]}
                      style={[
                        styles.roundedPill,
                        styles.flexCenter,
                        {width: 35, height: 35},
                      ]}>
                      <Icon name="add" color="white" size={22} />
                    </LinearGradient>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          // Mapping All Cards
          <View
            style={[
              styles.flexWrap,
              styles.flexRow,
              styles.justifyContentBetween,
              {width: fullWidth, padding: 8, paddingHorizontal: 15},
            ]}>
            {list && list.length > 0 ? (
              list.map((e, i) => (
                <TouchableOpacity
                  key={i}
                  activeOpacity={0.8}
                  onPress={() => {
                    navigation.navigate('Item Details', e);
                  }}
                  style={[
                    styles.rounded,
                    styles.bgWhite,
                    // styles.p1,
                    {width: '48%', marginVertical: 7, padding: 13},
                  ]}>
                  <Image
                    source={{uri: e.image}}
                    style={{
                      alignSelf: 'center',
                      width: 150,
                      height: 150,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={[
                      styles.fs4,
                      styles.textBold,
                      styles.textBlack,
                      {marginVertical: 2},
                    ]}>
                    {e.title.slice(0, 11) + (e.title.length > 11 ? '...' : '')}
                  </Text>
                  <Text
                    style={[styles.fs, styles.textBlack, {marginVertical: 1}]}>
                    {e.classification.slice(0, 15) +
                      (e.classification.length > 15 ? '...' : '')}
                  </Text>

                  <View
                    style={[
                      styles.flexRow,
                      styles.flexCenter,
                      styles.justifyContentBetween,
                    ]}>
                    <Text
                      style={[
                        styles.fs4,
                        styles.textBold,
                        styles.textBlack,
                        {marginVertical: 1},
                      ]}>
                      Rs.{e.price}
                    </Text>

                    <LinearGradient
                      colors={[styles._light, styles._dark]}
                      style={[
                        styles.roundedPill,
                        styles.flexCenter,
                        {width: 35, height: 35},
                      ]}>
                      <Icon name="add" color="white" size={22} />
                    </LinearGradient>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={[{width: fullWidth}]}>
                <ActivityIndicator size={35} color={'#ddd'} />
              </View>
            )}
          </View>
        )}

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