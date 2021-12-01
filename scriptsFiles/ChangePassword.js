import React, { Component } from 'react';
import { View, ActivityIndicator, Text} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import firebase from './firebaseconfig'
import * as actions from '../action/actionTypes';
import { connect } from 'react-redux'
import { Card } from 'react-native-elements';

class changePass extends Component {
    state = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        show: false,
    }

    async updatePassword() {
        if (this.props.navigation.getParam('from', 'password') === 'password') {
            if (this.state.currentPassword && this.state.currentPassword.length >= 6) {
                if (this.state.newPassword) {
                    if (this.state.newPassword.length >= 6) {
                        if (this.state.confirmPassword) {
                            if (this.state.confirmPassword.length >= 6) {
                                if (this.state.confirmPassword === this.state.newPassword) {
                                    await this.props.updatePassword(this.state.currentPassword, this.state.confirmPassword);
                                    if (this.props.update === 'success') {
                                        this.props.navigation.goBack();
                                        alert('Successfully Updated Password.....\nLogut Your Session and check your Password')
                                    }
                                } else {
                                    alert('Both Password Should be Same')
                                }
                            } else {
                                alert('password length should bew greater than 6')
                            }
                        } else {
                            alert('Password shopuld not be Empty')
                        }
                    } else {
                        alert('password length should bew greater than 6')
                    }
                } else {
                    alert('Password shopuld not be Empty')
                }
            } else {
                alert('Invalid Current password')
            }
        } else {
            var emailValid = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
            if (this.state.currentPassword) {
                if (emailValid.test(this.state.currentPassword)) {
                    if (this.state.newPassword) {
                        if (emailValid.test(this.state.newPassword)) {
                            if (this.state.confirmPassword) {
                                if (this.state.confirmPassword.length >= 6) {
                                    await this.props.updateEmail(this.state.currentPassword, this.state.newPassword, this.state.confirmPassword);
                                    if (this.props.isEmailVerified === 'success') {
                                        console.log('Successs')
                                        this.props.navigation.goBack();
                                        alert('Successfully Updated Email..\nLogut Your Session and check your Password')
                                    }
                                    console.log(this.props.isEmailVerified)

                                } else {
                                    alert('Invalid Password')
                                }
                            } else {
                                alert('password length should bew greater than 6')
                            }
                        } else {
                            alert('Invalid Email')
                        }
                    } else {
                        alert('Invalid Email')
                    }
                } else {
                    alert('Invalid Email')
                }
            } else {
                alert('Invalid Email')
            }
        }
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center',backgroundColor:'#de9e9e' }}>
                <Text style={{fontSize:25,alignSelf:'center'}}>Change {this.props.navigation.getParam('from', 'password')}</Text>
                <View>
                    <Card containerStyle={{paddingVertical:'2%',paddingHorizontal:'2%',height:'60%',backgroundColor:'#de9e9e'}}>
                        <TextInput
                            style={{ width: '100%' }}
                            mode='outlined'
                            label={this.props.navigation.getParam('from', 'password') === 'password' ? "CurrentPassword" : 'Current Email'}
                            secureTextEntry={this.state.show}
                            onChangeText={(text) => this.setState({ currentPassword: text })}
                        />
                        <TextInput
                            style={{ width: '100%' }}
                            mode='outlined'
                            label={this.props.navigation.getParam('from', 'password') === 'password' ? "New Password" : 'New Email'}
                            secureTextEntry={this.state.show}
                            onChangeText={(text) => this.setState({ newPassword: text })}
                        />
                        <TextInput
                            style={{ width: '100%' }}
                            mode='outlined'
                            label={this.props.navigation.getParam('from', 'password') === 'password' ? "Confirm Password" : 'password to change email'}
                            secureTextEntry={this.state.show}
                            onChangeText={(text) => this.setState({ confirmPassword: text })}
                        />
                        <View style={{marginBottom:'2%',marginTop:'5%'}}>
                            <Button
                                disabled={this.props.isLoading}
                                style={{ marginTop: 10, height: 50, borderRadius: 50, alignContent: 'center' }}
                                backgroundColor={'red'}
                                mode={'contained'}
                                color='#f55f78'
                                labelStyle={{ fontSize: 23 }}
                                onPress={() => { this.updatePassword() }}
                            >Update</Button>
                        </View>
                        <ActivityIndicator
                            animating={this.props.isLoading}
                            style={{ position: 'relative', top: '-16%', }}
                            color={'red'} size={60}
                        />
                    </Card>
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
const ChangePassword = connect(mapStateToProps, { ...actions })(changePass)
export default ChangePassword;
