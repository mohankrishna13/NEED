import React, { Component } from 'react';
import { View, Image, TouchableOpacity, ScrollView, Dimensions, Text, Picker } from 'react-native';
import HeaderDrawer from './HeaderDrawer';
import { Input } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import * as actions from '../action/actionTypes';
import firebase from './firebaseconfig';
import { Button } from 'react-native-paper';
import { ColorDotsLoader } from 'react-native-indicator';
import Modal from 'react-native-modal';
import AwesomeAlert from 'react-native-awesome-alerts';


class Profile extends Component {
    state = {
        name: '',
        alternate: '',
        email: '',
        number: '',
        Address: '',
        pic: '',
        edit: '',
        district: '',
        Mandal: '',
        State: '',
        shop: '',
        image: '',
        last: '',
        category: '',
        showPic: false,

    }
    async componentWillMount() {
        await this.setState({
            name: this.props.USERDATA.first,
            last: this.props.USERDATA.last,
            email: this.props.USERDATA.email,
            number: this.props.USERDATA.mobile,
            Address: this.props.USERDATA.address,
            State: this.props.USERDATA.State,
            District: this.props.USERDATA.district,
            Mandal: this.props.USERDATA.mandal,
            number: this.props.USERDATA.mobile,
            image: this.props.USERDATA.image,
            category: this.props.USERDATA.category,
            alternate: this.props.USERDATA.alternate,

        });
    }
    Camera() {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            console.log(image);
        });
    }
    Gallery() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
        }).then(async images => {
            this.props.UPDATEPIC(images.path, this.props.USERDATA.id)
            //console.log(images.path)
            this.setState({
                showAlert: false
            });
        }).catch((e) => alert(e));
    }
    picImage = () => {
        this.setState({
            showAlert: true
        })
    }
    openDraw = () => {
        this.props.navigation.openDrawer()
    }
    updatelast = async () => {
        if (this.state.last && this.state.last.trim()) {
            await firebase
                .database()
                .ref('/user/' + this.props.USERDATA.id)
                .update({ last: this.state.last })
                .then(() => {
                    this.props.updateLast(this.state.last)
                })
            alert("SucessFully Updated....")
            this.setState({ edit: '' })
        } else {
            alert('Invalid Data')
        }
    }
    updateMandal = async () => {
        if (this.state.mandal.trim()) {
            await firebase.database().ref('/user/' + this.props.USERDATA.id).update({ mandal: this.state.Mandal }).then(() => {
                this.props.updateMandal(this.state.Mandal)
            })
            alert("SucessFully Updated....")
            this.setState({ edit: '' })
        } else {
            alert('Invalid Data')
        }
    }
    updateDistrict = async () => {
        if (this.state.district.trim()) {
            await firebase
                .database()
                .ref('/user/' + this.props.USERDATA.id)
                .update({ district: this.state.district })
                .then(() => {
                    this.props.updateDistrict(this.state.District)
                })
            alert(this.state.district)
            this.setState({ edit: '' })
        } else {
            alert('Invalid Data')
        }
    }
    updateState = async () => {
        if (this.state.State.trim()) {
            await firebase
                .database()
                .ref('/user/' + this.props.USERDATA.id)
                .update({ State: this.state.State })
                .then(() => {
                    this.props.updateState(this.state.State)

                })
            alert("SucessFully Updated....")
            this.setState({ edit: '' })
        } else {
            alert('Invalid Data')
        }
    }
    updateName = async () => {
        if (this.state.name && this.state.name.trim()) {
            await firebase
                .database()
                .ref('/user/' + this.props.USERDATA.id)
                .update({ first: this.state.name })
                .then(() => {
                    this.props.updateName(this.state.name)
                })
            alert("SucessFully Updated....")
            this.setState({ edit: '' })
        } else {
            alert('Invalid Data')
        }
    }
    updateNumber = async () => {
        var mobileValid = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
        if (mobileValid.test(this.state.number)) {
            await firebase.
                database()
                .ref('/user/' + this.props.USERDATA.id)
                .update({ mobile: this.state.number })
                .then(() => {
                    this.props.updateNumber(this.state.number)

                })
            alert("SucessFully Updated....")
            this.setState({ edit: '' })

        } else {
            alert('Invalid Number')
        }
    }
    updateAlterNumber = async () => {
        var mobileValid = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
        if (mobileValid.test(this.state.alternate)) {
            await firebase.
                database()
                .ref('/user/' + this.props.USERDATA.id)
                .update({ alternate: this.state.alternate })
                .then(() => {
                    this.props.updateAlterNumber(this.state.number)
                })
            alert("SucessFully Updated....")
            this.setState({ edit: '' })

        } else {
            alert('Invalid Number')
        }
    }
    updateAddress = async () => {
        if (this.state.Address.trim()) {
            await firebase.database().ref('/user/' + this.props.USERDATA.id).update({ address: this.state.Address })
            alert("SucessFully Updated....")
            this.setState({ edit: '' })
        } else {
            alert('Invalid Data')
        }
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFA500' }}>
                <HeaderDrawer openDraw={this.openDraw} title={'Profile'} />
                {this.state.edit != '' ?
                    <View style={{ position: 'absolute', right: '2%', top: '1.2%', width: 100 }}>
                        <Button
                            color='black'
                            mode={'contained'}
                            disabled={this.props.isLoading}
                            onPress={() => { this.setState({ edit: '' }) }}
                        >Cancel</Button>
                    </View> : <></>}
                <ScrollView style={{ backgroundColor: 'white', margin: '2%' }}>
                    <TouchableOpacity style={{
                        alignSelf: 'center',
                        width: 150,
                        height: 150,
                        marginTop: '2%',
                    }}
                        disabled={this.props.isLoading}
                        onPress={() => {
                            this.props.navigation.navigate('ProfileImage', { from: 'Profile' })

                        }}>
                        <View>
                            {this.props.USERDATA != undefined && this.props.USERDATA.image != "" ?
                                <Image source={{ uri: this.props.USERDATA.image }}
                                    style={{ alignSelf: 'center', width: 150, height: 150, borderRadius: 150 / 2 }} /> :
                                <Image source={require('../Assests/DrawerImages/mypic.jpg')}
                                    style={{ alignSelf: 'center', width: 150, height: 150, borderRadius: 150 / 2 }} />}
                            <Text style={{
                                position: 'absolute',
                                top: 60,
                                left: 30,
                                fontWeight: 'bold',
                                backgroundColor: 'black',
                                color: 'white',
                                fontSize: 16
                            }}>Click Here</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={this.props.isLoading}
                        style={{
                            position: 'absolute',
                            top: '13%',
                            width: 50,
                            left: 240,

                        }}
                        onPress={() => { this.picImage() }}>
                        <Image
                            source={require('../Assests/DrawerImages/camera.png')}
                            style={{
                                height: 40,
                                width: 40,
                            }}
                        />
                    </TouchableOpacity>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: '13%' }}>
                        <View style={{ flexDirection: 'row', width: '50%' }}>
                            <Input
                                label='Name'
                                labelStyle={{ fontSize: 15, color: 'black' }}
                                value={this.state.name}
                                autoFocus={true}
                                inputContainerStyle={{ marginTop: -10 }}
                                containerStyle={{ width: '95%', marginTop: '-14%' }}
                                disabled={this.state.edit === 'name' ? false : true}
                                onChangeText={value => this.setState({ name: value })}
                            />
                            {this.state.edit === 'name' ? <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    right: 20,
                                    top: -35,
                                }} onPress={() => { this.updateName() }}>
                                <Image source={require('../Assests/DrawerImages/correct.png')}
                                    style={{
                                        width: 30,
                                        height: 30,

                                    }}
                                />
                            </TouchableOpacity> :
                                <TouchableOpacity
                                    style={{
                                        position: 'absolute',
                                        right: 20,
                                        top: -30,
                                    }} onPress={() => { this.setState({ edit: 'name' }); }}>
                                    <Image source={require('../Assests/DrawerImages/text-edit.png')}
                                        style={{
                                            width: 30,
                                            height: 30,

                                        }}
                                    />
                                </TouchableOpacity>}
                        </View>
                        <View style={{ flexDirection: 'row', width: '50%' }}>
                            <Input
                                label='LastName'
                                labelStyle={{ fontSize: 15, color: 'black' }}
                                value={this.state.last}
                                inputContainerStyle={{ marginTop: -10 }}
                                containerStyle={{ width: '95%', marginTop: '-14%' }}
                                disabled={this.state.edit === 'last' ? false : true}
                                onChangeText={value => this.setState({ last: value })}
                            />
                            {this.state.edit === 'last' ? <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    right: 20,
                                    top: -30,

                                }} onPress={() => { this.updatelast() }}>

                                <Image source={require('../Assests/DrawerImages/correct.png')}
                                    style={{
                                        width: 30,
                                        height: 30,

                                    }}
                                />
                            </TouchableOpacity> :
                                <TouchableOpacity
                                    style={{
                                        position: 'absolute',
                                        right: 20,
                                        top: -30,
                                    }} onPress={() => { this.setState({ edit: 'last' }); }}>
                                    <Image source={require('../Assests/DrawerImages/text-edit.png')}
                                        style={{
                                            width: 30,
                                            height: 30,

                                        }}
                                    />
                                </TouchableOpacity>}
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Input
                            label='Email'
                            labelStyle={{ fontSize: 15, color: 'black' }}
                            value={this.state.email}
                            inputContainerStyle={{ marginTop: -10 }}
                            containerStyle={{ width: '95%' }}
                            disabled={true}
                        />

                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Input
                            label='Phone Number'
                            labelStyle={{ fontSize: 15, color: 'black' }}
                            value={this.state.number}
                            maxLength={10}
                            keyboardType={'phone-pad'}
                            inputContainerStyle={{ marginTop: -10 }}
                            containerStyle={{ width: '95%' }}
                            disabled={this.state.edit === 'number' ? false : true}
                            onChangeText={value => this.setState({ number: value })}
                        />
                        {this.state.edit === 'number' ? <TouchableOpacity
                            style={{
                                position: 'absolute',
                                right: 30,
                            }} onPress={() => { this.updateNumber() }}>
                            <Image source={require('../Assests/DrawerImages/correct.png')}
                                style={{
                                    width: 30,
                                    height: 30,

                                }}
                            />
                        </TouchableOpacity> :
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    right: 30,
                                    top: 0,
                                }} onPress={() => { this.setState({ edit: 'number' }); }}>
                                <Image source={require('../Assests/DrawerImages/text-edit.png')}
                                    style={{
                                        width: 30,
                                        height: 30,

                                    }}
                                />
                            </TouchableOpacity>}
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Input
                            label='Alternate Number'
                            labelStyle={{ fontSize: 15, color: 'black' }}
                            value={this.state.alternate}
                            maxLength={10}
                            keyboardType={'phone-pad'}
                            inputContainerStyle={{ marginTop: -10 }}
                            containerStyle={{ width: '95%' }}
                            disabled={this.state.edit === 'alternate' ? false : true}
                            onChangeText={value => this.setState({ alternate: value })}
                        />
                        {this.state.edit === 'alternate' ? <TouchableOpacity
                            style={{
                                position: 'absolute',
                                right: 30,
                            }} onPress={() => { this.updateAlterNumber() }}>
                            <Image source={require('../Assests/DrawerImages/correct.png')}
                                style={{
                                    width: 30,
                                    height: 30,

                                }}
                            />
                        </TouchableOpacity> :
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    right: 30,
                                    top: 0,
                                }} onPress={() => { this.setState({ edit: 'alternate' }); }}>
                                <Image source={require('../Assests/DrawerImages/text-edit.png')}
                                    style={{
                                        width: 30,
                                        height: 30,

                                    }}
                                />
                            </TouchableOpacity>}
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Input
                            label='Street/Village/City'
                            labelStyle={{ fontSize: 15, color: 'black' }}
                            value={this.state.Address}
                            inputContainerStyle={{ marginTop: -10 }}
                            containerStyle={{ width: '95%' }}
                            disabled={this.state.edit === 'Address' ? false : true}
                            onChangeText={value => this.setState({ Address: value })}
                        />
                        {this.state.edit === 'Address' ? <TouchableOpacity
                            style={{
                                position: 'absolute',
                                right: 30,
                                top: 0,
                            }} onPress={() => { this.updateAddress() }}>
                            <Image source={require('../Assests/DrawerImages/correct.png')}
                                style={{
                                    width: 30,
                                    height: 30,

                                }}
                            />
                        </TouchableOpacity> :
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    right: 30,
                                    top: 0,
                                }} onPress={() => { this.setState({ edit: 'Address' }); }}>
                                <Image source={require('../Assests/DrawerImages/text-edit.png')}
                                    style={{
                                        width: 30,
                                        height: 30,

                                    }}
                                />
                            </TouchableOpacity>}
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Input
                            label='Mandal'
                            labelStyle={{ fontSize: 15, color: 'black' }}
                            value={this.state.Mandal}
                            inputContainerStyle={{ marginTop: -10 }}
                            containerStyle={{ width: '95%' }}
                            disabled={this.state.edit === 'Mandal' ? false : true}
                            onChangeText={value => this.setState({ Mandal: value })}
                        />
                        {this.state.edit === 'Mandal' ? <TouchableOpacity
                            style={{
                                position: 'absolute',
                                right: 30,
                                top: 0,
                            }} onPress={() => { this.updateMandal() }}>
                            <Image source={require('../Assests/DrawerImages/correct.png')}
                                style={{
                                    width: 30,
                                    height: 30,

                                }}
                            />
                        </TouchableOpacity> :
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    right: 30,
                                    top: 0,
                                }} onPress={() => { this.setState({ edit: 'Mandal' }); }}>
                                <Image source={require('../Assests/DrawerImages/text-edit.png')}
                                    style={{
                                        width: 30,
                                        height: 30,

                                    }}
                                />
                            </TouchableOpacity>}
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Input
                            label='District'
                            labelStyle={{ fontSize: 15, color: 'black' }}
                            value={this.state.District}
                            inputContainerStyle={{ marginTop: -10 }}
                            containerStyle={{ width: '95%' }}
                            disabled={this.state.edit === 'District' ? false : true}
                            onChangeText={value => this.setState({ District: value })}
                        />
                        {this.state.edit === 'District' ? <TouchableOpacity
                            style={{
                                position: 'absolute',
                                right: 30,
                                top: 0,
                            }} onPress={() => { this.updateDistrict() }}>
                            <Image source={require('../Assests/DrawerImages/correct.png')}
                                style={{
                                    width: 30,
                                    height: 30,

                                }}
                            />
                        </TouchableOpacity> :
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    right: 30,
                                    top: 0,
                                }} onPress={() => { this.setState({ edit: 'District' }); }}>
                                <Image source={require('../Assests/DrawerImages/text-edit.png')}
                                    style={{
                                        width: 30,
                                        height: 30,

                                    }}
                                />
                            </TouchableOpacity>}
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Input
                            label='State'
                            labelStyle={{ fontSize: 15, color: 'black' }}
                            value={this.state.State}
                            inputContainerStyle={{ marginTop: -10 }}
                            containerStyle={{ width: '95%' }}
                            disabled={this.state.edit === 'State' ? false : true}
                            onChangeText={value => this.setState({ State: value })}
                        />
                        {this.state.edit === 'State' ?
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    right: 30,
                                    top: 0,
                                }} onPress={() => { this.updateState() }}>
                                <Image source={require('../Assests/DrawerImages/correct.png')}
                                    style={{
                                        width: 30,
                                        height: 30,

                                    }}
                                />
                            </TouchableOpacity> :
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    right: 30,
                                    top: 0,
                                }} onPress={() => { this.setState({ edit: 'State' }); }}>
                                <Image source={require('../Assests/DrawerImages/text-edit.png')}
                                    style={{
                                        width: 30,
                                        height: 30,

                                    }}
                                />
                            </TouchableOpacity>}

                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ marginBottom: 20 }}>
                            <Button mode='contained' color='#FFA500'
                                labelStyle={{ fontWeight: 'bold' }}
                                style={{ marginLeft: '2%' }}
                                onPress={() => { this.props.navigation.navigate('ChangePassword', { from: 'password' }) }}
                            >update Password</Button>
                        </View>
                        <View style={{ marginBottom: 20, marginRight: '2%' }}>
                            <Button mode='contained' color='#FFA500' labelStyle={{ fontWeight: 'bold' }}
                                onPress={() => { this.props.navigation.navigate('ChangePassword', { from: 'email' }) }}
                            >update Email</Button>
                        </View>
                    </View>
                </ScrollView>
                <AwesomeAlert
                    show={this.state.showAlert}
                    showProgress={false}
                    contentContainerStyle={{ width: '100%', height: '30%' }}
                    title="PIC IMAGE"
                    titleStyle={{ color: 'blue', fontWeight: 'bold' }}
                    message="Choose your Option"
                    messageStyle={{ fontSize: 20, marginTop: '4%', fontWeight: 'bold' }}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelButtonStyle={{ height: 35, width: 100, alignSelf: 'center' }}
                    cancelButtonTextStyle={{ alignSelf: 'center', fontSize: 15 }}
                    cancelButtonColor='#FFA500'
                    cancelText="Camera"
                    confirmText="Gallery"
                    confirmButtonColor="#FFA500"
                    confirmButtonStyle={{  height: 35, width: 100, alignSelf: 'center' }}
                    confirmButtonTextStyle={{ alignSelf: 'center', fontSize: 15 }}
                    onCancelPressed={() => {
                        this.Camera();
                    }}
                    onConfirmPressed={() => {
                        this.Gallery();
                    }}
                />
                <View>
                    <Modal
                        style={{ justifyContent: 'center', alignItems: 'center' }}
                        transparent={true}
                        animationType={"fade"}
                        visible={this.props.isLoading}>
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

                                <Text style={{ fontWeight: 'bold', fontSize: Dimensions.get('window').height / 40 }}>Please wait</Text>
                                <View style={{ alignSelf: 'center', marginLeft: '-55%', marginTop: '3%' }}>
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
const HomeComponent = connect(mapStateToProps, { ...actions })(Profile)
export default HomeComponent;
