import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import CuButton from '../components/CuButton';
import styles from '../styles/global';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';


function CurrentLocation({ navigation, route }) {

  const userObj = route.params;

  const [currLatitude, setlatitude] = useState();
  const [currLongitude, setlongitude] = useState();

  const getLocation = () => {
    Geolocation.getCurrentPosition(info => {
      // console.log(info);
      setlatitude(info.coords.latitude);
      setlongitude(info.coords.longitude);
      userObj.dropPoint= {latitude: info.coords.latitude, longitude: info.coords.longitude}
    });
  };

  const addLocation = () => {
    navigation.navigate('Order Now', userObj);
    ToastAndroid.show('Location Added', ToastAndroid.SHORT)
  }

  useEffect(() => {
    getLocation();
  }, []);


  return (

    <View style={{ height: Dimensions.get('screen').height, }}>

        {currLatitude && currLongitude ? (
          <View
            style={{
              width: Dimensions.get('screen').width,
              height: Dimensions.get('screen').height,
              
            }}>
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={StyleSheet.absoluteFillObject}
              region={{
                latitude: currLatitude,
                longitude: currLongitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}>
              <Marker
                title="MySelf"
                description="This is my Current Location"
                // pinColor='blue'
                // image={() => <Image source={require('../assets/shadow.jpg')} style={{height: 35, width:35 }} />}
                draggable={true}
                onDragStart={(e) => {
                  // console.log('On Drag Start', e.nativeEvent.coordinate);
                 }}
                 onDragEnd={(e) => 
                  (
                  userObj.dropPoint={latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude}
                  // console.log('On Drag End', e.nativeEvent.coordinate);
                  )
                 }
                coordinate={{
                  latitude: currLatitude,
                  longitude: currLongitude,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                }}></Marker>
            </MapView>

            <View style={{position: 'absolute', bottom: 145, width: '90%', alignSelf: 'center'}}>
            <CuButton label="Add Location" onPress={() => addLocation()} />
            </View>
          </View>
        ) : null}

      </View>
  );
}


export default CurrentLocation;