import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import CuTextInput from '../../components/CuTextInput';
import styles from '../../styles/global';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import CuButton from '../../components/CuButton';
import { sendData } from '../../config/firebasemethods';
import CuError from '../../components/CuError';


function AddToMenu({ navigation, route }) {

    const [object, setObject] = useState({});
    const [showError, setShowError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [loader, setLoader] = useState(false);


    let add = () => {

        if (object.title !== '' && object.price !== '' && object.description !== '' && object.classification !== '' && object.startingDestination !== '' && object.finalDestination !== '') {

            sendData(`menu`, object)
                .then((res) => {
                    console.log(object);
                    console.log(res);
                    setObject({});
                })
                .catch((err) => {
                    console.log(err);
                    setShowError(true);
                    setErrorMsg(err);
                })
        } else {
            setShowError(true);
            setErrorMsg("Please fill out all Fields");
        }

    }

    const fieldFocused = () => {
        setShowError(false);
        setErrorMsg('');
    }

    return (
        <ScrollView>
            <View style={[styles.p2, styles.alignItemsCenter]}>
                <Text style={[styles.textBlack, styles.fs1]}>Add to Menu</Text>

                <View style={[styles.w100, styles.py3]}>
                    <CuTextInput label='Title' onChangeText={e => setObject({ ...object, title: e })} onFocus={fieldFocused} />
                    <CuTextInput label='Price' onChangeText={e => setObject({ ...object, price: e })} onFocus={fieldFocused} />
                    <CuTextInput label='Description' onChangeText={e => setObject({ ...object, description: e })} onFocus={fieldFocused} />
                    <CuTextInput label='Classification' onChangeText={e => setObject({ ...object, classification: e })} onFocus={fieldFocused} />
                    <CuTextInput label='Image' onChangeText={e => setObject({ ...object, image: e })} onFocus={fieldFocused} />
                    
                    {/* <CuTextInput label='Starting Destination' onChangeText={e => setObject({ ...object, startingDestination: e })} onFocus={fieldFocused} />
                    <CuTextInput label='Final Destination' onChangeText={e => setObject({ ...object, finalDestination: e })} onFocus={fieldFocused} /> */}

                    {errorMsg && errorMsg.length > 0 ? <CuError style={{ marginVertical: 4 }} errorMsg={errorMsg} /> : null}

                </View>
                <View style={[styles.w100]}>
                    <CuButton loading={loader} label='Add' onPress={() => add()} />
                </View>

            </View>
        </ScrollView>
    )
}

export default AddToMenu;