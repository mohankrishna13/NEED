import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import HeaderScreen from './HeaderScreen';
import { Button } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';



class Auto extends Component {
    state = {
        userid: '',
        password: '',
        secure: true,
        forgot: false,
    }
    getData() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
        });
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#de9e9e' }}>
                <View style={{ flexDirection: 'column' }}>
                    <HeaderScreen />
                    <View style={{ flexDirection: 'row', borderWidth: 1, margin: '3%', marginTop: '8%', alignSelf: 'center', padding: 3 }}>
                        <Image source={require('../Assests/DrawerImages/userLogin.png')}
                            style={{ width: 25, height: 25, alignSelf: 'center' }}
                        />
                        <View style={{ width: '90%', alignSelf: 'center', marginLeft: '2%' }}>
                            <TextInput
                                placeholder={'Enter Email'}
                                onChangeText={(text) => { this.setState({ userid: text }); }}
                            />
                        </View>
                    </View>
                    {this.state.forgot ?
                        <></>
                        :
                        <View style={{ flexDirection: 'row', borderWidth: 1, margin: '3%', alignSelf: 'center', padding: 3 }}>
                            <Image source={require('../Assests/DrawerImages/lock.png')}
                                style={{ width: 25, height: 25, alignSelf: 'center' }}
                            />
                            <View style={{ width: '80%', alignSelf: 'center', marginLeft: '2%', marginRight: '2%' }}>
                                <TextInput
                                    placeholder={'Enter Password'}
                                    secureTextEntry={this.state.secure}
                                    onChangeText={(text) => { this.setState({ password: text }); }}
                                />
                            </View>
                            <TouchableOpacity style={{ alignSelf: 'center', width: 25, height: 25 }}
                                onPress={() => { this.setState({ secure: !(this.state.secure) }) }}
                            >
                                <Image source={require('../Assests/DrawerImages/eye.png')}
                                    style={{ width: 25, height: 25 }}
                                />
                            </TouchableOpacity>
                        </View>
                    }
                    <Button
                        style={{ marginTop: 10, margin: '3%', height: 50, borderRadius: 50, alignContent: 'center' }}
                        backgroundColor={'red'}
                        mode={'contained'}
                        labelStyle={{ fontSize: 23 }}
                        onPress={() => { this.getData() }}
                    >Login</Button>
                    {this.state.forgot ?
                        <Text

                            style={{
                                textAlign: 'right',
                                marginRight: '10%',
                                fontSize: 20,
                                color: 'red',
                                textDecorationLine: 'underline'
                            }}
                            onPress={() => { this.setState({ forgot: false }); }}
                        >Cancel</Text>
                        : <Text
                            style={{ textAlign: 'right', marginRight: '3%', fontSize: 20 }}
                            onPress={() => { this.setState({ forgot: true }); }}
                        >Forgot Password?
                            <Text onPress={() => { this.props.navigation.navigate('SignUp') }}
                                style={{
                                    fontStyle: 'italic',
                                    textDecorationStyle: 'dashed',
                                    textDecorationLine: 'underline',
                                    fontSize: 20,
                                    color: '#040bd6',
                                    fontWeight: 'bold'
                                }}>
                                SignUp
                                    </Text>
                        </Text>}
                </View>
            </View>
        );
    }
}

export default Auto;
