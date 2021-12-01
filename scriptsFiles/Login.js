import React, { Component } from 'react';
import Modal from 'react-native-modal';
import * as actions from '../action/actionTypes';
import { ColorDotsLoader } from 'react-native-indicator';
import { View, Text, Image, TouchableOpacity, AsyncStorage, TextInput, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import firebase from './firebaseconfig';
import { connect } from 'react-redux'
import { Card } from 'react-native-elements';


class Login extends Component {
    static navigationOptions = {
        header: false
    }
    constructor() {
        super();
        this.state = {
            userid: '',
            password: '',
            isloading: false,
            forgot: false,
            secure: true
        }
    }
    forgotPassword = async () => {
        var emailValid = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailValid.test(this.state.userid)) {
            await this.props.forgotPassword(this.state.userid)
            if (this.props.forgotPass === 'success') {
                this.setState({
                    forgot: false
                });
            }
        } else {
            alert('Invalid Email')
        }
    }
    getData = async () => {
        this.setState({
            isloading: true
        });
        let userid = this.state.userid;
        let pwd = this.state.password;
        if (userid) {
            if (pwd) {
                firebase
                    .auth()
                    .signInWithEmailAndPassword(userid, pwd)
                    .then(async (result) => {
                        if (result.user.emailVerified === false) {
                            this.setState({
                                isloading: false
                            });
                            firebase.auth().signOut().then(() => {
                                alert("Your Email is not verified");
                            })

                        } else {
                            let id = result.user.uid
                            await AsyncStorage.setItem('id', id);
                            this.props.navigation.navigate('Dashboard');
                            this.setState({
                                isloading: false
                            });
                        }
                    })
                    .catch((err) => {
                        this.setState({
                            isloading: false
                        });
                        alert(err)
                    })
            } else {
                this.setState({
                    isloading: false
                });
                alert('Invalid pwd')
            }
        } else {
            this.setState({
                isloading: false
            });
            alert('Invalid Userid')
        }
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFA500' }}>
                <View style={{ flexDirection: 'column' }}>
                    <View>
                        <Image source={require('../Assests/images/logo.jpg')}
                            style={{
                                height: 150,
                                width: 150,
                                alignSelf: 'center',
                                marginTop: '3%',
                                borderRadius: 50
                            }}
                        />
                        <Text
                            style={{
                                marginTop: '4%',
                                textAlign: 'center',
                                textDecorationLine: 'underline',
                                color: 'black',
                                paddingVertical: '2%',
                                fontSize: 20,
                                fontStyle: 'italic',
                                fontWeight: 'bold'
                            }}>Get Everything While You Stay Home</Text>
                    </View>
                    <Card
                        containerStyle={{
                            borderTopLeftRadius: 60,
                            backgroundColor: 'white',
                            borderWidth: 4,
                            borderBottomRightRadius: 60,
                            width: Dimensions.get('window').width - 10,
                            height: Dimensions.get('window').width - 10,
                            paddingVertical: '10%',
                            borderColor: 'white',
                            marginLeft: '1%'
                        }}>
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
                        {this.state.forgot ?
                            <Button
                                style={{
                                    marginTop: 10,
                                    margin: '3%',
                                    borderRadius: 50,
                                    width: '50%',
                                    marginLeft: '50%'
                                }}
                                color='#FFA500'
                                mode={'contained'}
                                labelStyle={{ fontSize: 20, color: 'white' }}
                                uppercase={false}
                                onPress={() => { this.forgotPassword() }}
                            >Submit</Button> : <Button
                                style={{
                                    marginTop: 10,
                                    margin: '3%',
                                    height: 50,
                                    borderRadius: 50,
                                    alignContent: 'center'
                                }}
                                color='#FFA500'
                                mode={'contained'}
                                labelStyle={{ fontSize: 23, color: 'white' }}
                                onPress={() => { this.getData() }}
                            >Login</Button>}
                        {this.state.forgot ?
                            <Text
                                style={{
                                    textAlign: 'right',
                                    marginRight: '10%',
                                    fontSize: 20,
                                    color: 'red',
                                    marginTop: '-2%',
                                    textDecorationLine: 'underline'
                                }}
                                onPress={() => { this.setState({ forgot: false }); }}
                            >{'<-'}Cancel</Text>
                            : <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <Text onPress={() => { this.props.navigation.navigate('SignUp') }}
                                    style={{
                                        fontSize: 18,
                                    }}>
                                    Create Account
                         </Text>
                                <Text
                                    style={{ fontSize: 18 }}
                                    onPress={() => { this.setState({ forgot: true }); }}
                                >Forgot Password?
                        </Text>
                            </View>
                        }
                    </Card>
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
                                Checking Credentials</Text>
                                <View style={{ alignSelf: 'center',marginLeft:'-30%' ,marginTop: '3%' }}>
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
function mapStateToProps(state) {
    return {
        ...state
    }
}
const LoginComponent = connect(mapStateToProps, { ...actions })(Login);
export default LoginComponent;
