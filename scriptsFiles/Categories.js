import React, { Component } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import HeaderDrawer from './HeaderDrawer';
import { Card } from 'react-native-elements';

class Category extends Component {
    state = {
        type: 'data'
    }
    openDraw = () => {
        this.props.navigation.openDrawer()
    }
    getListViewItem = (item) => {
        this.props.navigation.navigate('ServicesType', { 'itemName': item })
    }
    render() {
        const data = [
            { key: 'Automobile Appliances and services', images: require('../Assests/Categories/automobileandservices/Repair.jpg'), },
            { key: 'Agriculture and Services', images: require('../Assests/Categories/agricultureandservices/Nursuries.jpg') },
            { key: 'Beauty and Services', images: require('../Assests/Categories/beautyandservices/Cosmotics.jpg'), },
            { key: 'Construction and Services', images: require('../Assests/Categories/constructionandservices/Iron.jpg') },
            { key: 'Daily Works and Needs and Services', images: require('../Assests/Categories/dailyworksandneeds/General.jpg') },
            { key: 'Electronic and Electric Applications and Services', images: require('../Assests/Categories/electricappliancesandservices/Electrical.jpg') },
            { key: 'Food', value: 'Category', images: require('../Assests/Categories/food/Fruits.jpg') },
            { key: 'Pets', value: 'Category', images: require('../Assests/Categories/pets/Animals.png'), },
            { key: 'Technology and Services', value: 'Category', images: require('../Assests/Categories/technologyandservices/Softwares.jpg'), },
        ];

        return (
            <View style={{ flex: 1, backgroundColor: 'green' }}>
                <HeaderDrawer openDraw={this.openDraw} title='Services' />
                <View style={{ flex: 1, marginBottom: 10 }}>
                    <FlatList
                        data={data}
                        renderItem={({ item }) =>
                            <Card >
                                <TouchableOpacity onPress={this.getListViewItem.bind(this, item)}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                        }}>
                                        <View style={{ alignSelf: 'center' }}>
                                            <Image source={item.images}
                                                style={{
                                                    resizeMode: 'stretch',
                                                    width: Dimensions.get('screen').width / 2.5,
                                                    height: Dimensions.get('screen').height / 6,
                                                    borderRadius: 20
                                                }} />
                                        </View>
                                        <Text
                                            style={{
                                                fontSize: 18,
                                                fontStyle: 'italic',
                                                color: 'red',
                                                alignSelf: 'center',
                                                marginLeft: 10
                                            }}>
                                            {item.key}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </Card>
                        }
                    />
                </View>
            </View>
        );
    }
}

export default Category;