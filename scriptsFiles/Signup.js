import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity, BackHandler, Image, ScrollView,Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Modal from 'react-native-modal';
import { ColorDotsLoader } from 'react-native-indicator';
import HeaderScreen from './HeaderScreen';
import firebase from './firebaseconfig';
import { ToastAndroid } from 'react-native';
import { Card } from 'react-native-elements';


class Signup extends Component {
    static navigationOptions = {
        header: false
    }
    constructor() {
        super();
        this.state = {
            first: '',
            last: '',
            email: '',
            mobile: '',
            password: '',
            isloading: false

        }
    }
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", () => {
            this.props.navigation.goBack()
        })
    }
    setdata = () => {
        var emailValid = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
        var mobileValid = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/
        if (this.state.first.trim(' ')) {
            if (this.state.last.trim(' ')) {
                if (this.state.password.length >= 6) {
                    if (emailValid.test(this.state.email)) {
                        if (mobileValid.test(this.state.mobile)) {
                            this.setState({ isloading: true });
                            let data = {
                                first: this.state.first,
                                last: this.state.last,
                                email: this.state.email,
                                mobile: this.state.mobile,
                                pwd: this.state.password,
                                id: '',
                                image: '',
                                mandal: '',
                                state: '',
                                district: '',
                                alternate: '',
                            }
                            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                                .then(() => {
                                    firebase.auth().currentUser.sendEmailVerification({
                                        //handleCodeInApp: true,
                                        //url: 'https://mmsfirebase-8f388.firebaseapp.com/__/auth/action',
                                    }).then(() => {
                                        this.setState({ isloading: false });
                                        ToastAndroid.showWithGravityAndOffset(
                                            "Email Verification has sent to our email,Please Verify",
                                            ToastAndroid.LONG,
                                            ToastAndroid.CENTER,
                                            25,
                                            50
                                        )
                                        data.id = firebase.auth().currentUser.uid;
                                        firebase.database().ref('/user/' + firebase.auth().currentUser.uid).set(data).then(() => {
                                            this.props.navigation.goBack()
                                        })
                                    })
                                }).catch(err => {
                                    this.setState({ isloading: false });
                                    alert(err)
                                })
                        } else {
                            console.log(this.state.mobile)
                            alert('Invalid Phone Number')
                        }
                    } else {
                        alert('Invalid Email Address')
                    }
                } else {
                    alert('Password Length shoulb be greater than or equal to 6')
                }
            } else {
                alert('Invalid Last Name')
            }
        } else {
            alert('Invalid First Name')
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{
                    alignContent: 'center',
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#FFA500'
                }}>
                    <HeaderScreen />
                    <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}
                        style={{ position: 'absolute', left: 10, top: 10, width: 50 }}>
                        <Image source={require('../Assests/DrawerImages/left-arrow.png')}
                            style={{ width: 40, height: 40 }} />
                    </TouchableOpacity>
                    <ScrollView style={{ height: Dimensions.get('window').height, marginBottom: '3%' }}>
                        <Card containerStyle={{
                            borderTopLeftRadius: 60,
                            borderTopRightRadius: 60,
                            paddingVertical: '15%',
                            marginTop: '4%',
                            borderWidth: 5,
                            borderColor: 'white',
                            backgroundColor: 'white',
                        }}>
                            <TextInput
                                style={styles.textInput}
                                mode='flat'
                                label="First Name"
                                onChangeText={(text) => this.setState({ first: text })}
                            />
                            <TextInput
                                style={styles.textInput}
                                mode='flat'
                                label="Last Name"
                                onChangeText={(text) => this.setState({ last: text })}
                            />
                            <TextInput
                                style={styles.textInput}
                                mode='flat'
                                label="Email"
                                onChangeText={(text) => this.setState({ email: text })}
                            />
                            <TextInput
                                style={styles.textInput}
                                mode='flat'
                                keyboardType={'phone-pad'}
                                label="PhoneNumber"
                                maxLength={10}
                                onChangeText={(text) => this.setState({ mobile: text })}
                            />
                            <TextInput
                                style={styles.textInput}
                                mode='flat'
                                label="Password"
                                onChangeText={(text) => this.setState({ password: text })}
                            />
                            <Button
                                style={{
                                    marginTop: '7%',
                                    height: 40,
                                    borderRadius: 50,
                                    alignSelf: 'flex-end',
                                    marginBottom: '4%'
                                }}
                                uppercase={false}
                                color='#FFA500'
                                mode={'contained'}
                                labelStyle={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}
                                onPress={() => { this.setdata() }}
                            >
                                Submit</Button>
                        </Card>

                    </ScrollView>
                </View>
                <View>
                    <Modal
                        style={{ justifyContent: 'center', alignItems: 'center' }}
                        transparent={true}
                        animationType={"fade"}
                        visible={this.state.isloading}>
                        <View style={{
                            backgroundColor: 'rgba(100,100,100,0.5)',
                            alignItems: 'center',
                            alignSelf: 'center',
                            width: '130%',
                            height: '130%',
                            justifyContent: 'center'
                        }}>
                            <View style={{
                                alignItems: 'center',
                                backgroundColor: "#fff",
                                height: 100,
                                paddingVertical: 10,
                                width: '80%',
                                borderRadius: 10,
                                borderWidth: 1,
                                flexDirection: 'row',
                                borderColor: 'black',
                                justifyContent: 'space-around'
                            }}>

                                <Text
                                    style={{ fontWeight: 'bold', fontSize: Dimensions.get('window').height / 40 }}>
                                    Creating Account</Text>
                                <View style={{ alignSelf: 'center', marginLeft: '-30%', marginTop: '3%' }}>
                                    <ColorDotsLoader size={8} betweenSpace={10}
                                        color1={"blue"}
                                        color2={'#fc0303'}
                                        color3={'#32e63e'} />
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    textInput: {
        width: '100%',
        height: Dimensions.get('window').height / 12,
        marginBottom: '1%',
        backgroundColor: 'white',

    }
})

export default Signup;
