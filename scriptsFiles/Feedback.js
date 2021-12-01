import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import HeaderDrawer from './HeaderDrawer';
import { Button } from 'react-native-paper';
import * as actions from '../action/actionTypes'
import { connect } from 'react-redux'
import { Rating, AirbnbRating } from 'react-native-elements';


class FeedbackComponent extends Component {
    state = {
        feedback: '',
        suggestion: '',

    }
    onGood = () => {
        alert('You Select Good...\nPlz click Submit')
        this.setState({
            feedback: 'Good'
        });
    }
    onBad = () => {
        alert('You Select Bad..\nPlz click Submit')
        this.setState({
            feedback: 'Bad'
        });
    }
    onAvg() {
        alert('You Select Average..\nPlz click Submit')
        this.setState({
            feedback: 'Avg'
        });
    }
    onSuper = () => {
        alert('You Select Super...\nPlz click Submit')
        this.setState({
            feedback: 'Super'
        });
    }
    openDraw = () => {
        this.props.navigation.openDrawer()
    }
    suggestion() {
        if (this.state.feedback) {
            let data = {
                feed: this.state.feedback,
                suggestion: this.state.suggestion
            }
            this.props.Suggestion(data, this.props.USERDATA.id)
        }
    }
    ratingCompleted(rating) {
        console.log("Rating is: " + rating)
    }
    render() {
        return (
            <View style={{ backgroundColor: '#FFA500', width: '100%', height: '100%' }}>
                <HeaderDrawer openDraw={this.openDraw} title={'FeedBack'} />
                <View>
                    <View style={{ borderWidth: 1, margin: '3%' }}>
                        <Text style={{ alignSelf: 'center', fontSize: 18 }}>How are you Feeling?</Text>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            margin: '5%',
                            marginBottom: '7%'
                        }}>
                            <View style={{ backgroundColor: this.state.feedback === 'Bad' ? 'black' : 0 }}>
                                <TouchableOpacity style={{ width: 50, height: 50 }} onPress={() => {
                                    this.onBad()
                                }}>
                                    <Image source={require('../Assests/Emojis/bad.png')} style={{ width: 50, height: 50 }} />
                                    <Text style={{ fontSize: 17, alignSelf: 'center' }}>Bad</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ backgroundColor: this.state.feedback === 'Good' ? 'black' : 0 }}>
                                <TouchableOpacity style={{ width: 50, height: 50 }}
                                    onPress={() => { this.onGood() }}
                                >
                                    <Image source={require('../Assests/Emojis/Good.png')} style={{ width: 50, marginLeft: '-1%', height: 50 }} />
                                    <Text style={{ fontSize: 17, alignSelf: 'center' }}>Good</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ backgroundColor: this.state.feedback === 'Avg' ? 'black' : 0 }}>

                                <TouchableOpacity style={{ width: 50, height: 50 }}
                                    onPress={() => { this.onAvg() }}
                                >
                                    <Image source={require('../Assests/Emojis/Average.png')} style={{ width: 50, height: 50 }} />
                                    <Text style={{ fontSize: 17, alignSelf: 'center' }}>Avg</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ backgroundColor: this.state.feedback === 'Super' ? 'black' : 0 }}>

                                <TouchableOpacity style={{ width: 50, height: 50 }}
                                    onPress={() => { this.onSuper() }}
                                >
                                    <Image source={require('../Assests/Emojis/super.png')} style={{ width: 50, height: 50 }} />
                                    <Text style={{ fontSize: 17, alignSelf: 'center' }}>Super</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontSize: 18, marginLeft: '3%' }}>Any Suggestions...</Text>
                        <TextInput
                            multiline={true}
                            value={this.state.suggestion}
                            onChangeText={(text) => { this.setState({ suggestion: text }); }}
                            placeholder={'Please Give Suggestions....'}
                            style={{
                                borderWidth: 1,
                                margin: '3%',
                                height: '35%',
                                flexShrink: 1
                            }}>
                        </TextInput>
                        <Button
                            style={{
                                width: '30%',
                                alignSelf: 'flex-end',
                                marginRight: '3%'

                            }}
                            disabled={this.props.isLoading}
                            color='black'
                            mode={'contained'}
                            onPress={() => { this.suggestion() }}
                        >Submit</Button>
                    </View>
                </View>
                <ActivityIndicator
                    animating={this.props.isLoading}
                    style={{ position: 'absolute', top: '20%', left: '25%' }} color="white" size={100} />
            </View>

        );
    }
}

function mapStateToProps(state) {
    return {
        ...state
    }
}
const FeedBack = connect(mapStateToProps, { ...actions })(FeedbackComponent);
export default FeedBack;