import { BaseComponent, triggerManager, BaseComponentProps, BlurOverlay, FaceTrackSoundLocalizationComponent, TextListener, ComponentResultConst, ComponentEvent, speechApi } from 'orionos-eve-core';
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Button, Animated, NativeModules } from 'react-native';
import { observer } from 'mobx-react';

import ViewUtils from '../util/ViewUtils'
import TimeCountTopView from '../component/TimeCountTopView'
import TitleTopView from '../component/TitleTopView'
import { MyBaseComponent } from '../base/MyBaseComponent'
import router from '../../config/router';
import MyMonitorView from '../component/MyMonitorView'
import BusinessAnswerView from '../component/BusinessAnswerView'
import QuestionAnswerView from '../component/QuestionAnswerView'
import api from '../../config/api'

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',//水平轴
        // flexDirection: 'row',//声明水平为主轴
        // alignItems: 'center',//交叉轴对齐方式//左右
        // // backgroundColor: 'rgba(52, 52, 52, 0.1)',
        // position: 'absolute',
        // // backgroundColor: 'red',

        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        // backgroundColor: 'rgba(52, 52, 52, 0.3)',//这会将其设置为具有 80% 不透明度的灰色，这是从不透明度小数派生的0.8. 该值可以是从0.0到 的任何值1.0。
        position: 'absolute',
        // elevation: 10,
        height: "100%",
        width: "100%",


    },
    blurImage: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        // height: 500,
        // width: 500,
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    containerCenter: {
        // elevation: 1,
        // alignItems: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white',

        paddingHorizontal: 5,
        paddingVertical: 5,
        height: "80%",
        width: "60%",
        // marginLeft:"10%",
        // marginRight:"10%",
        // marginBottom: 10,
        // marginTop: 10,
        borderRadius: 10,

        position: 'absolute',
        zIndex: 1000,
        elevation: 1000,
    },

    containerCenter3: {
        // elevation: 1,
        // alignItems: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,

        // paddingHorizontal: 5,
        // paddingVertical: 5,
        height: "100%",
        width: "100%",
        // marginLeft:"10%",
        // marginRight:"10%",
        // marginBottom: 10,
        // marginTop: 10,
        // borderRadius: 10,

        position: 'absolute',
        zIndex: 1000,
        elevation: 1000,
    },

    containerHorizontal: {
        // top: 20,
        // flex: 1,
        // height: 0,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemClickStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
},
)


@observer
export class BusinessInfoConfirmScreen extends MyBaseComponent {
    
    public getComponentName(): string {
        return "BusinessInfoConfirmScreen"
    }

    public constructor(props: BaseComponentProps) {
        super(props);
        this.state = {
            //@ts-ignore
            // timerCount: this.props.timerCount || this.props.navigation.state.params.timerCount || ViewUtils.getTimerCount(),
            //用户讲话的语音的文字
            userText: api.myInfo[0].userSpeakTEXT || '',
          //  businessCompleteQ: this.props.businessCompleteQ ||  (this.props.navigation.state.params && this.props.navigation.state.params.businessCompleteQ) ? this.props.navigation.state.params.businessCompleteQ ： ''
      
            businessCompleteQ: this.props.businessCompleteQ || (this.props.navigation.state.params && this.props.navigation.state.params.businessCompleteQ) ? this.props.navigation.state.params.businessCompleteQ : '',

        };

        this.myLog('BusinessInfoConfirmScreen this.state.userText')
        this.myLog(this.state.userText)

        this.myLog('BusinessInfoConfirmScreen this.state.businessCompleteQ')
        this.myLog(this.state.businessCompleteQ)
    }

    public componentDidMount() {
        //重写界面的didMount，必须调用super
        super.componentDidMount();

        //todo 这里调用后台

    }

    public requestAnswerData(questionStr: string): void {
        // this.refs['BusinessAnswerView'].requestAnswerData(questionStr)
        this.refs['QuestionAnswerView'].requestAnswerData(questionStr)
    }

    public myJump(routerName: any, p: any) {

        this.myLog('myJump routerName ')
        this.myLog(routerName)
        this.myLog('myJump plainText')
        this.myLog(p)

        let obj = {
            //这个就是知识库提示要跳转的界面
            plainText: p
        }

        this.props.navigation.replace(routerName, obj);
        // this.props.navigation.navigate(routerName, obj);
        // this.props.navigation.replace('MakeCardProgress', params);
    }


    public render() {
        console.log('MainScreen render');
        return (

            <>
                <FaceTrackSoundLocalizationComponent
                    onStatusUpdate={this.onStatusUpdate}
                    onFinish={
                        this.onFinish
                    }
                />

                <View style={styles.container} >

                    <>
                        <BlurOverlay
                            style={{ flex: 1, justifyContent: 'center', alignContent: 'center', position: 'absolute', zIndex: -100, elevation: -100 }}
                            showBlurOverlay={true}
                            hasFaceParticle={false}>
                        </BlurOverlay>
                    </>


                    <View style={styles.containerCenter3}>
                        {/* <Button title={'跳转Main'} onPress={
                            () => {
                                // this.props.navigation&&this.props.navigation.navigate('main');
                                this.myJump('SelectReadCardTypeScreen', 'card_progress_jump')
                            }
                        } /> */}


                        <QuestionAnswerView
                            ref='QuestionAnswerView'
                            style={{ flex: 1, justifyContent: 'center', alignContent: 'center', position: 'absolute' }}
                            playText={(msg) => this.playText(msg)}
                            stopTTS={() => this.stopTTS()}
                            hideVideo={() => this.hideVideo()}
                            exit={() => this.closeCurrentOpk()}
                            nextBizName={(plainText) => { return this.nextBizName(plainText) }}
                            myJump={(routerName, plainText) => this.myJump(routerName, plainText)}
                            businessQuestion={this.state.userText}
                            businessCompleteQ = {this.state.businessCompleteQ}
                        />
                    </View>





                    {/* <View style={styles.containerCenter}>
                        *** 倒计时 *
                        <TimeCountTopView timerCount={60} onTimeOut={() => this.colsePage()} ref='TimeCountTopView' />

                        <TitleTopView isCanChangeTitleText={true} />

                        <View style={styles.containerCenter2}>

                            <View style={styles.containerLeft}>

                                <View style={{ flex: 1 }} >
                                    <BusinessAnswerView
                                        ref='BusinessAnswerView'
                                        style={{ marginTop: 5, flex: 1 }}
                                        businessQuestion={this.state.userText}
                                        isBusinessInfoConfirm={true}
                                    />
                                </View>
                            </View>
                        </View> 
                    </View> */}


                </View>
            </>
        );

    }
}
