import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Button, Animated, DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    containerHorizontal: {
        width: "100%",
        justifyContent: 'flex-end',

        flexDirection: 'row',
        alignItems: 'baseline',


    },
},
)

export default class TitleTopView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            titleText: this.props.titleText || this.props.navigation.state.params.titleText || '',
            isCanChangeTitleText: this.props.isCanChangeTitleText || false,
        };
    }

    componentDidMount() {
       
        // 添加监听者
        this.listener = DeviceEventEmitter.addListener('changeTitle', (text) => {
            if(this.state.isCanChangeTitleText){
                this.setState({
                    titleText: text
                });
            }
        })
    }

    componentWillUnmount() {
       
        // 销毁监听者
        this.listener.remove();
    }


    myLog(msg) {
        console.log('>>>>>>>>> ' + msg + '  <<<<<<<<<<');
    }

    //todo
    colsePage() {

    }

    render() {
        return (
            <View style={[styles.containerHorizontal, { justifyContent: 'flex-start', marginLeft: 10 }]}>

                <Image
                    style={{
                        width: 20,
                        height: 20,
                    }}
                    source={require('../../../img/icon_two_circle.png')} >

                </Image>

                <Text style={{ fontSize: 15, marginTop: 0, color: "#5ac7ec", marginRight: 1, marginLeft: 5, fontWeight: 'bold' }}>{this.state.titleText} </Text>

            </View>
        );
    }
}




