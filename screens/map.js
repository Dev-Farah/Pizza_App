// import { Image, StyleSheet, Text, View } from 'react-native';
// import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
// // import img from '../assets/loader.gif'

// const styles = StyleSheet.create({
//     container: {
//         ...StyleSheet.absoluteFillObject,
//         height: 400,
//         width: 400,
//         justifyContent: 'flex-end',
//         alignItems: 'center',
//     },
//     map: {
//         ...StyleSheet.absoluteFillObject,
//     },
// });

// function Map() {

//     return (
//         <View style={styles.container}>
//             <MapView
//                 provider={PROVIDER_GOOGLE} // remove if not using Google Maps
//                 style={styles.map}
//                 region={{
//                     latitude: 37.78825,
//                     longitude: -122.4324,
//                     latitudeDelta: 0.015,
//                     longitudeDelta: 0.0121,
//                 }}
//             >
//                 <Marker
//                     title='ABC Title'
//                     description='ABC'
//                     // image={() => <Image source={require('../assets/shadow.jpg')} style={{height: 35, width:35 }} />}
//                     coordinate={{
//                         latitude: 37.78825,
//                         longitude: -122.4324,
//                         latitudeDelta: 0.015,
//                         longitudeDelta: 0.0121,
//                     }}
//                 >
//                     {/* <Image source={require('../assets/pizza2.webp')} style={{height: 35, width:35, resizeMode:"contain" }} /> */}
//                     {/* <Image source={{ uri: '../assets/shadow.jpg' }} style={{ height: 35, width: 35 }} /> */}
//                     <Callout tooltip>
//                         <View
//                         // style={{width: 500}}
//                         >
//                             <Text>Again Title</Text>
//                         </View>
//                     </Callout>
//                 </Marker>
//                 <Marker
//                     title='ABC Title'
//                     description='ABC'
//                     // image={() => <Image source={require('../assets/shadow.jpg')} style={{height: 35, width:35 }} />}
//                     coordinate={{
//                         latitude: 37.801945,
//                         longitude: -122.418892,
//                         latitudeDelta: 0.015,
//                         longitudeDelta: 0.0121,
//                     }}
//                 >

//                 </Marker>
//             </MapView>
//         </View>
//     )
// };

// export default Map

import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import styles from '../styles/global';
import CuButton from '../components/CuButton';
import database from '@react-native-firebase/database';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker} from 'react-native-maps';
import {PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import pizza from '../assets/pizza.jpg';

function LiveLocation() {
  const GOOGLE_MAPS_APIKEY = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

  const mapRef = useRef();
  const [coordinates, setCoordinates] = useState({
    employeeCords: {
      latitude: 24.8589,
      longitude: 67.0174,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    },
    clientCords: {
      latitude: 24.9165,
      longitude: 67.0576,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    },
  });

  const {employeeCords, clientCords} = coordinates;
  const [currLatitude, setLatitude] = useState();
  const [currLongitude, setLongitude] = useState();

  let getLocation = () => {
    Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition(info => {
      console.log(info);
      setLatitude(info.coords.latitude);
      setLongitude(info.coords.longitude);
    });
  };

  return (
    <View>
      <View style={[styles.h100, styles.bgThemeLight]}>
        <View style={styles.p2}>
          <Text style={[styles.fs2, styles.textPrimary]}>GEO LOCATION API</Text>
        </View>
        <View style={styles.p2}>
          <View style={styles.py1}>
            <CuButton label="Get Location" onPress={getLocation} />
          </View>
        </View>
        {console.log(currLatitude, currLongitude)}

        {employeeCords && clientCords ? (
          <View style={styles1.container}>
            <MapView
              ref={mapRef}
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles1.map}
              initialRegion={employeeCords}>
              <Marker
                // image={pizza}
                // width={10}
                // heigth={10}
                pinColor="blue"
                coordinate={employeeCords}>
                {/* <Image source={pizza}
                style={{width: 20, height: 20, resizeMode: 'contain'}}
              /> */}
              </Marker>

              <Marker coordinate={clientCords}
                 draggable={true}
                 onDragStart={(e) => {
                  console.log('On Drag Start', e.nativeEvent.coordinate);
                 }}
                 onDragEnd={(e) => {
                  setCoordinates({...coordinates, clientCords: {latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude},
                  })
                  // console.log('On Drag End', e.nativeEvent.coordinate);
                 }}

                />
              <MapViewDirections
                origin={employeeCords}
                destination={clientCords}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeColor="hotpink"
                strokeWidth={3}
                optimizeWaypoints={true}
                onReady={result => {
                  mapRef.current.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      top: 100,
                      right: 30,
                      bottom: 300,
                      left: 10,
                    },
                  });
                }}
              />
            </MapView>
          </View>
        ) : null}
      </View>
    </View>
  );
}
export default LiveLocation;

const styles1 = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    marginTop: 200,
    //   justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
