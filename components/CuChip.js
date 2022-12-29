import React from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../styles/global';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';


function CuChip(props) {
  const {label, onPress, touchableStyle, loading, source, imgStyle, iconName, iconSize, iconColor} = props;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[styles.chip, {...touchableStyle}]}
      onPress={onPress}
      loading={loading ?? false}>
      {loading ? (
        <ActivityIndicator color={'#ddd'} animating={true} size={35} />
      ) : (
        <View style={[styles.flexRow, styles.flexCenter, {justifyContent: 'space-around'}]}>
            {source ?
              <View style={[styles.flexCenter, styles.roundedPill, styles.bgWhite, {width: 30, height: 30, marginRight: 6 }]}>
              <Image
              source={source}
              style={[
                styles.roundedPill,
                {width: 30, height: 30, resizeMode: 'cover', ...imgStyle},
              ]}
              />
              </View>
            : iconName ?
                <View style={[styles.flexCenter, styles.roundedPill, styles.bgWhite, {width: 30, height: 30, marginRight: 6 }]}>
            <Icon name={iconName} size={iconSize ?? 25} color={iconColor ?? styles._dark} />
          </View>
            : null}

          <Text style={[styles.textWhite, styles.fs, {textTransform: 'capitalize'}]}>{label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}


export default CuChip;