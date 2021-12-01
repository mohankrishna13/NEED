import React, { Component } from 'react';
import { View, Image, TouchableOpacity, ScrollView, Button, Dimensions, Text, Picker } from 'react-native';
import { Input, AirbnbRating, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../action/actionTypes';
import { Card } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import AwesomeAlert from 'react-native-awesome-alerts';
import Modal from 'react-native-modal';
import { ColorDotsLoader } from 'react-native-indicator';
import { RadioButton } from 'react-native-paper';



//#84C225
class AddShopComponent extends Component {
    state = {
        pic: '',
        from: 'new',
        edit: '',
        image: '',
        shopName: '',
        shopSource: '',
        extraInfo: '',
        shopImage: '',
        shopAddress: '',
        shopCity: '',
        shopMandal: '',
        shopDistrict: '',
        shopState: '',
        shopCategory: 'Daily Works and Needs and Services',
        shopSubCategory: '',
        shopNumber: '',
        shopAlter: '',
        user: '',
        delivery: '',
        ShopId: '',
        allow: '',
        showAlert: false
    }
    updateCategory = (data) => {
        this.setState({ shopCategory: data })
    }
    updateSubCategory = (data) => {
        this.setState({ shopSubCategory: data })
    }
    async componentWillMount() {
        if (this.props.navigation.getParam('From', 'Edit3') === 'Edit') {
            await this.setState({
                ...(this.props.navigation.getParam('data', 'Edit3')),
                shopId: this.props.navigation.getParam('index', 'Edit3'),
                from: 'Edit',
                edit: 'yes'

            });
        } else {
            this.setState({
                edit: 'yes'
            });
        }
    }
    picImage = () => {
        this.setState({
            showAlert: true
        })
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
            multiple: true,
        }).then(images => {
            this.setState({
                image: null,
                shopImage: images.map((i) => {
                    return {
                        uri: i.path,
                    };
                }),
            });
            this.setState({
                showAlert: false
            });
        }).catch((e) => alert(e));
    }
    openDraw = () => {
        this.props.navigation.openDrawer()
    }
    updateShopDetails = async () => {
        var mobileValid = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
        if (this.state.shopImage) {
            if (this.state.shopName && this.state.shopName.trim()) {
                if (this.state.shopCategory) {
                    if (this.state.shopSubCategory) {
                        if (this.state.shopAddress.trim()) {
                            if (mobileValid.test(this.state.shopNumber)) {
                                if (mobileValid.test(this.state.shopAlter)) {
                                    if (this.state.shopCity.trim()) {
                                        if (this.state.shopMandal.trim()) {
                                            if (this.state.shopDistrict.trim()) {
                                                if (this.state.shopState.trim()) {
                                                    if (this.state.allow) {
                                                        if (this.state.delivery) {
                                                            if (this.state.shopSubCategory === 'Others') {
                                                                if (this.state.extraInfo && this.state.extraInfo.trim()) {
                                                                    let data = {
                                                                        shopImage:
                                                                            this.props.navigation.getParam('From', 'Edit3') === 'Edit'
                                                                                ? { ...this.props.SHOP[this.props.navigation.getParam('index', 'Edit3')].shopImage }
                                                                                : this.state.shopImage ? { ...this.state.shopImage } : 'Mohan',
                                                                        shopName: this.state.shopName,
                                                                        shopCategory: this.state.shopCategory,
                                                                        shopSubCategory: this.state.shopSubCategory,
                                                                        shopAddress: this.state.shopAddress,
                                                                        shopCity: this.state.shopCity,
                                                                        shopMandal: this.state.shopMandal,
                                                                        shopNumber: this.state.shopNumber,
                                                                        shopAlter: this.state.shopAlter,
                                                                        shopDistrict: this.state.shopDistrict,
                                                                        shopState: this.state.shopState,
                                                                        shopUid: this.props.USERDATA.id,
                                                                        delivery: this.state.delivery,
                                                                        extraInfo: this.state.extraInfo,
                                                                        allow: this.state.allow
                                                                    }
                                                                    if (this.state.from === 'Edit') {
                                                                        await this.
                                                                            props
                                                                            .UpdateShop(data,
                                                                                this.props.SHOPKEYS[0][this.state.shopId],
                                                                                this.props.USERDATA.id)
                                                                        this.setState({
                                                                            edit: 'no',
                                                                            from: ''
                                                                        });
                                                                    } else {
                                                                        await this.props.CreateShop(data, this.props.USERDATA.id)
                                                                        this.setState({
                                                                            edit: 'no',
                                                                            from: ''
                                                                        });
                                                                    }
                                                                    setTimeout(() => {
                                                                        this.props.navigation.goBack()
                                                                        this.props.navigation.state.params.onBack();
                                                                    }, 2000)
                                                                } else {
                                                                    alert('Invalid Extra Info')
                                                                }
                                                            } else {
                                                                let data = {
                                                                    shopImage:
                                                                        this.props.navigation.getParam('From', 'Edit3') === 'Edit'
                                                                            ? { ...this.props.SHOP[this.props.navigation.getParam('index', 'Edit3')].shopImage }
                                                                            : this.state.shopImage ? { ...this.state.shopImage } : 'Mohan',
                                                                    shopName: this.state.shopName,
                                                                    shopCategory: this.state.shopCategory,
                                                                    shopSubCategory: this.state.shopSubCategory,
                                                                    shopAddress: this.state.shopAddress,
                                                                    shopCity: this.state.shopCity,
                                                                    shopMandal: this.state.shopMandal,
                                                                    shopNumber: this.state.shopNumber,
                                                                    shopAlter: this.state.shopAlter,
                                                                    shopDistrict: this.state.shopDistrict,
                                                                    shopState: this.state.shopState,
                                                                    shopUid: this.props.USERDATA.id,
                                                                    delivery: this.state.delivery,
                                                                    extraInfo: this.state.extraInfo,
                                                                    allow: this.state.allow
                                                                }
                                                                if (this.state.from === 'Edit') {
                                                                    await this.
                                                                        props
                                                                        .UpdateShop(data,
                                                                            this.props.SHOPKEYS[0][this.state.shopId],
                                                                            this.props.USERDATA.id
                                                                        )
                                                                    this.setState({
                                                                        edit: 'no',
                                                                        from: ''
                                                                    });
                                                                } else {
                                                                    await this.props.CreateShop(data, this.props.USERDATA.id)
                                                                    this.setState({
                                                                        edit: 'no',
                                                                        from: ''
                                                                    });
                                                                }
                                                                setTimeout(() => {
                                                                    this.props.navigation.goBack()
                                                                    this.props.navigation.state.params.onBack();
                                                                }, 2000)
                                                            }
                                                        } else {
                                                            alert('Delivery is not Valid.....')
                                                        }
                                                    } else {
                                                        alert('Select Allow Other ToMessage')
                                                    }
                                                } else {
                                                    alert('Invalid State')
                                                }
                                            } else {
                                                alert('Invalid District')
                                            }
                                        } else {
                                            alert('Invalid Mandal')
                                        }
                                    } else {
                                        alert('Invalid City')
                                    }
                                } else {
                                    alert('Invalid Alternate Mobile number')
                                }
                            } else {
                                alert('Invalid MobileNumber')
                            }
                        } else {
                            alert('Invalid Street/Village')
                        }
                    } else {
                        alert('Invalid SubCategory')
                    }
                } else {
                    alert('Invalid Category')
                }
            } else {
                alert('Invalid Name')
            }
        } else {
            alert('Select Image')
        }
    }
    render() {
        const Category = [
            'Automobile Appliances and services',
            'Agriculture and Services',
            'Beauty and Services',
            'Construction and Services',
            'Daily Works and Needs and Services',
            'Electronic and Electric Applications and Services',
            'Food',
            'Infrastructure and Services',
            'Pets',
            'Technology and Services',
        ];
        const SubCategory = {
            Food: [
                { key: '' },
                { key: 'Hotels' },
                { key: 'Restaraunts' },
                { key: 'Lodges' },
                { key: 'Resorts' },
                { key: 'Meat' },
                { key: 'Fruits' },
                { key: 'sea food' },
                { key: 'Vegetables' },
                { key: 'Others' },
            ],
            Agriculture: [
                { key: '' },
                { key: 'Pests' },
                { key: 'Fertilizers' },
                { key: 'Organic' },
                { key: 'Seeds' },
                { key: 'Nursuries' },
                { key: 'Tools and spares' },
                { key: 'Others' },
            ],
            Electronic: [
                { key: '' },
                { key: 'Camera' },
                { key: 'Computers and laptop' },
                { key: 'Electric and Electronic Spares' },
                { key: 'Fridge' },
                { key: 'Home Electric Appliances' },
                { key: 'Kitchen' },
                { key: 'Tv' },
                { key: 'Washing Machine' },
                { key: 'Others' },
            ],
            Construction: [
                { key: '' },
                { key: 'Cement' },
                { key: 'Steel and iron Suppliers' },
                { key: 'Hydra' },
                { key: 'Cranes' },
                { key: 'Manlift' },
                { key: 'Forklifts' },
                { key: 'jcb' },
                { key: 'Trucks' },
                { key: 'Tractors' },
                { key: 'Mini auto' },
                { key: 'Eichers and Lorries' },
                { key: 'Water Suppliers' },
                { key: 'Sand' },
                { key: 'Paints' },
                { key: 'Others' },
            ],
            Infrastructure: [
                { key: '' },
                { key: 'Outdoor decors' },
                { key: 'Indoor decors' },
                { key: 'Plastic Items' },
                { key: 'Glass Structures' },
                { key: 'Photo frame Works' },
                { key: 'Pop Works' },
                { key: 'Wood Works' },
                { key: 'Plant Decors' },
                { key: 'Other' },
            ],
            Beauty: [
                { key: '' },
                { key: 'Saloons' },
                { key: 'beauty Parlour' },
                { key: 'Cosmotics' },
                { key: 'Ladies Corneres' },
                { key: 'Clothing' },
                { key: 'Massage Centers' },
            ],
            Pets: [
                { key: '' },
                { key: 'Animals' },
                { key: 'Birds' },
                { key: 'Aqua' },
                { key: 'Others' },
            ],
            Automobile: [
                { key: '' },
                { key: 'Automobile Repair' },
                { key: 'Bike and car Spares' },
                { key: 'Hydraulic Traders' },
                { key: 'Rented Vehicles' },
                { key: 'Lubricants' },
                { key: 'Petrol and Diesel' },
                { key: 'Vehicle Transport' },
                { key: 'Others' },
            ],
            Technology: [
                { key: '' },
                { key: 'Mobiles' },
                { key: 'Laptops' },
                { key: 'Computers' },
                { key: 'Sound Systems' },
                { key: 'HardWares' },
                { key: 'Softwares' },
                { key: 'Pendrives/cd/dvd' },
                { key: 'Electronic Technologies' },
                { key: 'Others' },
            ],

            Daily: [
                { key: '' },
                { key: 'Plumber' },
                { key: 'Carpenter' },
                { key: 'Tailor' },
                { key: 'Moter Repair' },
                { key: 'General Sores' },
                { key: 'Drivers' },
                { key: 'Internet Cafe' },
                { key: 'Welding' },
                { key: 'Turning and Lathe' },
                { key: 'Hdpe Sheets' },
                { key: 'Water Plants' },
                { key: 'Furniture' },
                { key: 'Nursing Home' },
                { key: 'Suppliers' },
                { key: 'Doctors' },
                { key: 'Medicals' },
                { key: 'PhotoShop' },
                { key: 'Stationary' },
                { key: 'Quarium' },
                { key: 'Clocks and Watches' },
                { key: 'Shoe Mart' },
                { key: 'Drinks' },
                { key: 'Others' },
            ]
        }
        let cate = '';
        if (this.state.shopCategory.length >= 5) {
            cate = this.state.shopCategory.split(' ')
            cate = cate[0]
        } else {
            cate = this.state.shopCategory
        }
        return (
            <View style={{ flex: 1, backgroundColor: '#FFA500' }}>
                <View style={{
                    height: 50, margin: '2%', backgroundColor: '#FFA500'
                }}>
                    <Card
                        style={{
                            backgroundColor: '#FFA500'

                        }}
                        containerStyle={{
                            margin: '1%', marginTop: '4%', padding: 8,
                        }}>
                        <View style={{
                            flexDirection: 'row', height: '100%', backgroundColor: 'white', borderWidth: 2, borderColor: 'black'
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.goBack()
                                }}
                                style={{ position: 'absolute', left: 0, height: '100%', width: '15%' }}>
                                <Image
                                    source={require('../Assests/DrawerImages/left-arrow.png')}
                                    style={{ width: 45, height: 45, marginLeft: '3%', marginTop: '3%', borderWidth: 2 }} />
                            </TouchableOpacity>
                            <Text style={{ marginLeft: '30%', alignSelf: 'center', fontSize: 20 }}>
                                New Shop
                                </Text>
                        </View>
                    </Card>
                </View>
                {this.state.edit === 'yes' ?
                    <View style={{ width: 80, position: 'absolute', right: 14, top: 15 }}>
                        <Button
                            title="Save"
                            color='black'
                            disabled={this.props.isLoading}
                            onPress={() => { this.updateShopDetails() }}
                        />
                    </View>
                    :
                    <View style={{ width: 80, position: 'absolute', right: 10, top: 15 }}>
                        <Button
                            title="Edit"
                            color='black'
                            disabled={this.props.isLoading}
                            onPress={() => {
                                this.setState({ edit: 'yes' })
                            }}
                        />
                    </View>
                }
                <ScrollView
                    style={{
                        backgroundColor: '#FFA500',
                        marginBottom: '2%'
                    }}>
                    <Card style={{ margin: '2%', }}>

                        {this.props.navigation.getParam('from', 'edit') === 'new' ?
                            <Image source={{ uri: this.state.shopImage ? this.state.shopImage[0].uri : '' }}
                                style={{
                                    alignSelf: 'center', width: 150, height: 150,
                                    backgroundColor: '#FFA500',
                                    borderRadius: 150 / 2
                                }} />
                            : <Image source={{ uri: this.state.shopImage[Object.keys(this.state.shopImage)[0]] }}

                                style={{
                                    alignSelf: 'center', width: 150, height: 150,
                                    backgroundColor: 'white',
                                    borderRadius: 150 / 2
                                }} />}
                        {this.props.navigation.getParam('From', 'fd') === 'Edit' ? <></> :
                            <TouchableOpacity
                                disabled={this.state.edit === 'yes' ? false : true}
                                style={{
                                    position: 'absolute',
                                    top: '10%',
                                    left: '58%'

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
                        }
                        <View style={{ marginTop: '25%', }}>
                            <Input
                                label='ShopName'
                                labelStyle={{ fontSize: 15, color: 'black' }}
                                value={this.state.shopName}
                                inputContainerStyle={{}}
                                containerStyle={{ width: '95%', marginTop: '-17%' }}
                                autoFocus={this.state.edit ? false : true}
                                disabled={this.state.edit === 'yes' ? false : true}
                                onChangeText={value => this.setState({ shopName: value })}
                            />
                        </View>
                        <View
                            style={{
                                borderWidth: 1,
                                height: '5%',
                                marginLeft: '2%',
                                marginTop: '-3%',
                                marginBottom: '4%',
                                marginRight: '6%'

                            }}>
                            <Text style={{
                                fontSize: 20,
                                position: 'relative',
                                top: -15,
                                left: 5,
                                width: 80,
                                color: 'black',
                                backgroundColor: 'white'
                            }}>Category</Text>
                            <Picker
                                enabled={this.state.edit === 'yes' ? true : false}
                                onValueChange={this.updateCategory}
                                selectedValue={this.state.shopCategory}
                                style={{ width: '100%', marginTop: -17 }}>
                                {Category.map((item, index) => {
                                    return (<Picker.Item label={item} value={item} key={item} />)
                                })
                                }
                            </Picker>
                        </View>
                        <View style={{
                            borderWidth: 1,
                            height: '5%',
                            marginLeft: '2%',
                            marginBottom: '4%',
                            marginRight: '6%'

                        }}>
                            <Text style={{
                                fontSize: 20,
                                position: 'relative',
                                top: -15,
                                left: 5,
                                width: 130,
                                color: 'black',
                                backgroundColor: 'white'
                            }}>Sub Category</Text>
                            <Picker
                                enabled={this.state.edit === 'yes' ? true : false}
                                onValueChange={this.updateSubCategory}
                                selectedValue={this.state.shopSubCategory}
                                style={{ width: '100%', marginTop: -17 }}>

                                {Object.keys(SubCategory[cate]).map((key) => {
                                    //if you have a bunch of keys value pair
                                    return (
                                        <Picker.Item label={SubCategory[cate][key].key}
                                            value={SubCategory[cate][key].key}
                                            key={SubCategory[cate][key].key}
                                        />
                                    )
                                })}
                            </Picker>
                        </View>
                        <View style={{}}>
                            <Input
                                label='If SubCategory is not Found'
                                labelStyle={{ fontSize: 15, color: 'black' }}
                                value={this.state.extraInfo}
                                inputContainerStyle={{}}
                                containerStyle={{ width: '95%' }}
                                disabled={this.state.edit === 'yes' && this.state.shopSubCategory === 'Others' ? false : true}
                                onChangeText={value => this.setState({ extraInfo: value })}
                            />
                        </View>
                        <View>
                            <Input
                                label='Phone Number'
                                labelStyle={{ fontSize: 15, color: 'black' }}
                                value={this.state.shopNumber}
                                maxLength={10}
                                keyboardType={'phone-pad'}
                                containerStyle={{ width: '95%' }}
                                disabled={this.state.edit === 'yes' ? false : true}
                                onChangeText={value => this.setState({ shopNumber: value })}
                            />
                        </View>
                        <View>
                            <Input
                                label='Alternate Number'
                                labelStyle={{ fontSize: 15, color: 'black' }}
                                value={this.state.shopAlter}
                                maxLength={10}
                                keyboardType={'phone-pad'}
                                containerStyle={{ width: '95%' }}
                                disabled={this.state.edit === 'yes' ? false : true}
                                onChangeText={value => this.setState({ shopAlter: value })}
                            />
                        </View>
                        <View >
                            <Input
                                label='Street/Village'
                                labelStyle={{ fontSize: 15, color: 'black' }}
                                value={this.state.shopAddress}
                                inputContainerStyle={{}}
                                containerStyle={{ width: '95%' }}
                                disabled={this.state.edit === 'yes' ? false : true}
                                onChangeText={value => this.setState({ shopAddress: value })}
                            />
                        </View>
                        <View>
                            <Input
                                label='City'
                                labelStyle={{ fontSize: 15, color: 'black' }}
                                value={this.state.shopCity}
                                inputContainerStyle={{ marginTop: -10 }}
                                containerStyle={{ width: '95%' }}
                                disabled={this.state.edit === 'yes' ? false : true}
                                onChangeText={value => this.setState({ shopCity: value })}
                            />

                        </View>
                        <View >
                            <Input
                                label='Mandal'
                                labelStyle={{ fontSize: 15, color: 'black' }}
                                value={this.state.shopMandal}
                                inputContainerStyle={{ marginTop: -10 }}
                                containerStyle={{ width: '95%' }}
                                disabled={this.state.edit === 'yes' ? false : true}
                                onChangeText={value => this.setState({ shopMandal: value })}
                            />
                        </View>
                        <View>
                            <Input
                                label='District'
                                labelStyle={{ fontSize: 15, color: 'black' }}
                                value={this.state.shopDistrict}
                                inputContainerStyle={{ marginTop: -10 }}
                                containerStyle={{ width: '95%' }}
                                disabled={this.state.edit === 'yes' ? false : true}
                                onChangeText={value => this.setState({ shopDistrict: value })}
                            />

                        </View>
                        <View >
                            <Input
                                label='State'
                                labelStyle={{ fontSize: 15, color: 'black' }}
                                value={this.state.shopState}
                                containerStyle={{ width: '95%' }}
                                disabled={this.state.edit === 'yes' ? false : true}
                                onChangeText={value => this.setState({ shopState: value })}
                            />
                        </View>
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Home Service/Home Delivery</Text>
                            <RadioButton.Group onValueChange={(value) => this.setState({ delivery: value })}
                                value={this.state.delivery}>
                                <View style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <RadioButton value="Yes" />
                                        <Text style={{ alignSelf: 'center', fontSize: 16 }}>Yes</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <RadioButton value="No" />
                                        <Text style={{ alignSelf: 'center', fontSize: 16 }}>No</Text>
                                    </View>
                                </View>
                            </RadioButton.Group>
                        </View>
                        <View style={{ marginTop: '2%' }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', flexShrink: 1 }}>Allow Others To Message through Whatsapp</Text>
                            <RadioButton.Group onValueChange={(value) => this.setState({ allow: value })}
                                value={this.state.allow}>
                                <View style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <RadioButton value="Yes" />
                                        <Text style={{ alignSelf: 'center', fontSize: 16 }}>Yes</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <RadioButton value="No" />
                                        <Text style={{ alignSelf: 'center', fontSize: 16 }}>No</Text>
                                    </View>
                                </View>
                            </RadioButton.Group>


                        </View>
                    </Card>
                </ScrollView>
                <AwesomeAlert
                    show={this.state.showAlert}
                    showProgress={false}
                    contentContainerStyle={{ width: '100%', height: '30%'}}
                    title="PIC IMAGE"
                    titleStyle={{color:'blue',fontWeight:'bold'}}
                    message="Choose your Option"
                    messageStyle={{ fontSize: 20,marginTop:'4%',fontWeight:'bold' }}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelButtonStyle={{ height: 35, width: 100, alignSelf: 'center'  }}
                    cancelButtonTextStyle={{ alignSelf: 'center', fontSize: 15 }}
                    cancelButtonColor='#FFA500'
                    cancelText="Camera"
                    confirmText="Gallery"
                    confirmButtonColor="#FFA500"
                    confirmButtonStyle={{height: 35, width: 100, alignSelf: 'center' }}
                    confirmButtonTextStyle={{alignSelf: 'center', fontSize: 15 }}
                    onCancelPressed={() => {
                        console.log('cam')
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
            </View >
        );
    }

}

function mapStateToProps(state) {
    return {
        ...state
    }
}
const AddShop = connect(mapStateToProps, { ...actions })(AddShopComponent)
export default AddShop;

