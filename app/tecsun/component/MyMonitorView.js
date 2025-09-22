import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Button, Animated } from 'react-native';
import PropTypes from 'prop-types';

const { width } = Dimensions.get('window');

export default class MyMonitorView extends Component<Props>{

    static propTypes = {
        monitorTouch: PropTypes.func,
    }

    constructor(props) {
        super(props)

    }

    componentWillMount() {

        this._gestureHandlers = {
            // //如果返回值为true，则表示这个View能够响应触摸或者滑动手势被激活；
            // onStartShouldSetResponder: () => true,
            // onMoveShouldSetResponder: () => true,
            // onResponderGrant: () => { 
            //     // this.myLog('onResponderGrant 1') 
            // },
            // onResponderMove: () => { 
            //     //this.myLog('onResponderMove 1') 
            // },
            // onResponderRelease: () => { 
            //     //this.myLog('onResponderRelease 1') 
            // },
            //返回false不拦截, 跟Activity的dispathTouchEvent
            onStartShouldSetResponderCapture: () => {
                this.myLog('onStartShouldSetResponderCapture 1')
                this.props.monitorTouch()
                return false
            },
        }
    }

    myLog(msg) {
        console.log('>>>>>>>>> ' + msg + '  <<<<<<<<<<');
    }


    render() {

        return (
            <View style={{ flex: 1 }} {...this._gestureHandlers}    >
                {this.props.children}
            </View>
        );
    }
}

export { MyMonitorView };





