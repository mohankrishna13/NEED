import React, { Component } from 'react';
import { View, Text, Dimensions, Button } from 'react-native';
import * as actions from '../action/actionTypes';
import { connect } from 'react-redux'
import { Card, } from 'react-native-paper';
import { AsyncStorage, TouchableOpacity, Image } from 'react-native';
import { ColorDotsLoader } from 'react-native-indicator';
import { FlatList, StyleSheet } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import Auto from './Auto';


class Home extends Component {
    state = {
        query: '',
        films: [
            { key: 'Hotels' },
            { key: 'Restaraunts' },
            { key: 'Lodges' },
            { key: 'Resorts' },
            { key: 'Meat' },
            { key: 'Fruits' },
            { key: 'sea food' },
            { key: 'Vegetables' },
            { key: 'Pests' },
            { key: 'Fertilizers' },
            { key: 'Organic' },
            { key: 'Seeds' },
            { key: 'Nursuries' },
            { key: 'Tools and spares' },
            { key: 'Camera' },
            { key: 'Computers and laptop' },
            { key: 'Electric and Electronic Spares' },
            { key: 'Fridge' },
            { key: 'Home Electric Appliances' },
            { key: 'Kitchen' },
            { key: 'Tv' },
            { key: 'Washing Machine' },
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
            { key: 'Outdoor decors' },
            { key: 'Indoor decors' },
            { key: 'Plastic Items' },
            { key: 'Glass Structures' },
            { key: 'Photo frame Works' },
            { key: 'Pop Works' },
            { key: 'Wood Works' },
            { key: 'Plant Decors' },
            { key: 'Saloons' },
            { key: 'beauty Parlour' },
            { key: 'Cosmotics' },
            { key: 'Ladies Corneres' },
            { key: 'Clothing' },
            { key: 'Massage Centers' },
            { key: 'Animals' },
            { key: 'Birds' },
            { key: 'Aqua' },
            { key: 'Automobile Repair' },
            { key: 'Bike and car Spares' },
            { key: 'Hydraulic Traders' },
            { key: 'Rented Vehicles' },
            { key: 'Lubricants' },
            { key: 'Petrol and Diesel' },
            { key: 'Vehicle Transport' },
            { key: 'Mobiles' },
            { key: 'Laptops' },
            { key: 'Computers' },
            { key: 'Sound Systems' },
            { key: 'HardWares' },
            { key: 'Softwares' },
            { key: 'Pendrives/cd/dvd' },
            { key: 'Electronic Technologies' },
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
            { key: 'Nursury' },
            { key: 'Suppliers' },
            { key: 'Doctors' },
            { key: 'Medicals' },
            { key: 'PhotoShop' },
            { key: 'Xerox' },
            { key: 'Quarium' },
            { key: 'Clocks and Watches' },
            { key: 'Shoe Mart' },
            { key: 'Drinks' },
            { key: 'Others' },
        ]
    }
    findFilm(query) {
        if (query === '') {
            return [];
        }
        const { films } = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        return films.filter(film => film.key.search(regex) >= 0);
    }
    openDraw = () => {
        this.props.navigation.openDrawer()
    }

    async componentWillMount() {
        const value = await AsyncStorage.getItem('id');
        await this.props.SETDATA(value);
        await this.props.SETSHOP(value);
    }
    getListViewItem = (item) => {
        this.props.navigation.navigate('ServicesType', { 'itemName': item.key })
    }
    search() {
        if (this.state.query) {
            if (this.state.query.trim()) {
                this.props.navigation.navigate('ShowCategory', { from: this.state.query })
                this.setState({ query: '' });
            } else {
                alert('Invalid Text')
                this.setState({ query: '' });

            }
        } else {
            alert('Invalid Text')
            this.setState({ search: '' });
        }
    }
    render() {
        const { query } = this.state;
        const film = this.findFilm(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        const data = [
            { key: 'Automobile and Appliances services' },
            { key: 'Agriculture and Services' },
            { key: 'Beauty and Services' },
            { key: 'Construction and Services' },
            { key: 'Daily Works and Needs and Services' },
            { key: 'Electronic and Electric Applications and Services' },
            { key: 'Food', value: 'Category' },
            { key: 'Infrastructure and Services', value: 'Category' },
            { key: 'Pets', value: 'Category' },
            { key: 'Technology and Services', value: 'Category' },
        ];
        if (this.props.USERDATA != undefined && this.props.USERDATA.State != '') {
            return (
                <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>

                    <View>
                        <Card style={{ margin: '1%', height: 50, padding: 8, backgroundColor: '#de9e9e' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => { this.openDraw() }} style={{ position: 'absolute', left: 0 }}>
                                    <Image source={require('../Assests/DrawerImages/menu.png')} style={{ width: 30, height: 30 }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { this.search() }} style={{ position: 'absolute', right: '1%' }}>
                                    <Image source={require('../Assests/DrawerImages/search.png')} style={{ width: 30, height: 30 }} />
                                </TouchableOpacity>
                                <Autocomplete
                                    listContainerStyle={{
                                        height:200,
                                        width: '60%',
                                        marginLeft: '27%',
                                        marginBottom: 2,
                                    }}
                                    listStyle={{borderWidth:1}}
                                    inputContainerStyle={{ borderWidth: 2, width: '80%',marginLeft:'10%',marginTop:'-2%'}}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    defaultValue={query}
                                    data={film.length === 1 && comp(query, film[0].key) ? [] : film}
                                    onChangeText={text => this.setState({ query: text })}
                                    placeholder="Enter Star Wars film title"
                                    renderItem={({ item, index }) => (
                                        <TouchableOpacity
                                            onPress={() => this.setState({ query: film[index].key })}>
                                            <Text style={{ alignSelf: 'flex-end', fontSize: 15 }}>
                                                {film[index].key}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </Card>

                    </View>
                    <View style={{ flex: 1, margin: '1%' }}>
                        <FlatList
                            data={data}
                            numColumns={2}
                            renderItem={({ item }) =>
                                <Card style={{
                                    backgroundColor: '#de9e9e',
                                    width: '48%',
                                    padding: '3%',
                                    marginLeft: '2%',
                                    marginBottom: '2%',
                                }}>
                                    <TouchableOpacity onPress={this.getListViewItem.bind(this, item)}
                                    >
                                        <View
                                            style={{
                                                flexDirection: 'column'
                                            }}>
                                            <View style={{ alignSelf: 'center' }}>
                                                <Image source={require('../Assests/DrawerImages/mypic.jpg')}
                                                    style={{
                                                        height: 150,
                                                        width: 150,
                                                        borderRadius: 50 / 2
                                                    }} />
                                            </View>
                                            <View style={{ flex: 1, marginTop: '4%' }}>
                                                <Text
                                                    style={{
                                                        fontSize: 18,
                                                        fontStyle: 'italic',
                                                        color: 'black',
                                                        alignSelf: 'center',
                                                        marginLeft: 10,
                                                        flexShrink: 1
                                                    }}>
                                                    {item.key}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </Card>
                            }
                        />
                    </View>
                </View >
            );
        } else {
            return (
                <View style={{ justifyContent: 'center', backgroundColor: '#161b40', height: '100%' }}>
                    <Text style={{ fontSize: 20, color: 'white', alignSelf: 'center' }}>Data is Loading......please Wait</Text>
                    <View style={{ alignSelf: 'center', marginTop: '5%' }}>
                        <ColorDotsLoader size={18} betweenSpace={22}
                            color1={"#fff"}
                            color2={'#fc0303'}
                            color3={'#32e63e'} />
                    </View>
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        paddingTop: 25
    },

});

function mapStateToProps(state) {
    return {
        ...state
    }
}
const HomeComponent = connect(mapStateToProps, { ...actions })(Home)
export default HomeComponent;