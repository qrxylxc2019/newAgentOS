import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Button, Animated } from 'react-native';
import PropTypes from 'prop-types';

const { width } = Dimensions.get('window');
const mySpace = " "

const styles = StyleSheet.create({
    containerHorizontal: {
        minWidth: "40%",
        minHeight: "25%",
        backgroundColor: "white",
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
    },

},

)

export default class CommitResultView extends Component<Props>{

    static propTypes = {
        onTimeOut: PropTypes.func,
    }

    constructor(props) {
        super(props)
        this.state = {
            timerCount: this.props.timerCount || 3,
            isFaile: this.props.isFaile || false,
            titleText: this.props.titleText || (this.props.isFaile ? "提交失败" : "提交成功"),
            faileReason: this.props.faileReason || '',
        };
    }

    componentDidMount() {
        this.countDownAction()
    }

    countDownAction() {
        const codeTime = this.state.timerCount;
        this.interval = setInterval(() => {
            const timer = this.state.timerCount - 1
            this.myLog(timer);

            if (timer === 0) {

                this.setState({
                    timerCount: codeTime,
                })
                if (this.props.onTimeOut) {
                    this.props.onTimeOut()
                }

                this.colsePage()
                this.interval && clearInterval(this.interval);

            } else {
                this.setState({
                    timerCount: timer,
                })
            }


            
        }, 1000)
    }


    myLog(msg) {
        console.log('>>>>>>>>> ' + msg + '  <<<<<<<<<<');
    }

    //todo
    colsePage() {

    }

    getImagePath() {
        var icon = this.state.isFaile ? require('../../../img/icon_commit_fail.png') : require('../../../img/icon_commit_success.png')
        return icon
    }

    render() {
        return (
            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center', width: '100%' ,backgroundColor:'rgba(0,0,0, 0.5)'}}>

                <View style={[styles.containerHorizontal]}>

                    <Image
                        style={{
                            width: 30,
                            height: 30,
                        }}
                        source={this.getImagePath()} >

                    </Image>

                    <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column', marginLeft: 5 }}>
                        <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 15, marginTop: 0, color: "black", marginRight: 1, fontWeight: 'bold' }}>{this.state.titleText} </Text>
                            <Text style={{ fontSize: 15, marginTop: 0, color: "#5ac7ec", marginRight: 1, fontWeight: 'bold' }}>({mySpace}{this.state.timerCount}s{mySpace})</Text>
                        </View>
                        {this.state.isFaile ?
                            <Text style={{ fontSize: 8, marginTop: 0, color: "#e43d36", marginRight: 1, fontWeight: 'bold', maxWidth: 150 }}>失败原因:{mySpace}{this.state.faileReason} </Text>
                            : <></>
                        }
                    </View>
                </View>
            </View>
        );
    }
}




