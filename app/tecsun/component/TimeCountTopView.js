import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Button, Animated } from 'react-native';
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


export default class TimeCountTopView extends Component {

    static propTypes = {
        onTimeOut: PropTypes.func,
    }


    constructor(props) {
        super(props)
        this.state = {
            timerCount: this.props.timerCount || 60,
            notNeedTimeCount: false,
        };
    }

    componentDidMount() {
        this.countDownAction()
    }

    //todo 20230220新增:
    componentWillUnmount() {
        this.interval && clearInterval(this.interval);
    }


    countDownAction() {
        const codeTime = this.state.timerCount;
        this.interval = setInterval(() => {
            const timer = this.state.timerCount - 1
            this.myLog(timer);



            if (timer === 0) {

                this.interval && clearInterval(this.interval);
                this.setState({
                    timerCount: codeTime,
                })
                if (this.props.onTimeOut) {
                    this.props.onTimeOut()
                }

            } else {
                this.setState({
                    timerCount: timer,
                })
            }

            if (this.state.notNeedTimeCount) {
                this.interval && clearInterval(this.interval);
            }

        }, 1000)
    }

    myLog(msg) {
        console.log('>>>>>>>>> ' + msg + '  <<<<<<<<<<');
    }

    notTimeCount() {
        this.setState({
            notNeedTimeCount: true,
        })
    }


    initTimeCount() {
        this.setState({
            timerCount: this.props.timerCount || 60,
        })
    }


    // //todo
    // colsePage() {
    //     // this.onTimeOut()

    //      this.props.onTimeOut()
    // }

    render() {
        return (
            <View style={styles.containerHorizontal}>

                <Image
                    style={{
                        width: 18,
                        height: 18,
                    }}
                    source={require('../../../img/icon_time.png')} >


                </Image>
                <Text style={{ fontSize: 15, marginTop: 3, color: "white", marginRight: 1, marginLeft: 5, fontWeight: 'bold' }}>剩余时间: </Text>
                <Text style={{ fontSize: 20, marginTop: 3, color: "#59c6eb", fontWeight: 'bold' }}>{this.state.timerCount}</Text>
                <Text style={{ fontSize: 15, marginTop: 3, color: "white", marginLeft: 1, fontWeight: 'bold', marginRight: 20 }}> 秒</Text>
            </View>
        );
    }
}



