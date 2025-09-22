import { BaseComponent, triggerManager, BaseComponentProps, BlurOverlay, FaceTrackSoundLocalizationComponent, speechApi, TextListener } from 'orionos-eve-core';
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Button, Animated, TextInput, FlatList, Modal, NativeModules } from 'react-native';
import { observer } from 'mobx-react';
import {
    BaseDialog,
    AreaPicker,
    CustomPicker,
    DatePicker,
    InputDialog,
    PickerView,
    SimpleChooseDialog,
    SimpleItemsDialog,
    AlertDialog,
    DownloadDialog,
    ToastComponent
} from 'react-native-pickers';

import { DemoViewModel } from '../../demo/DemoViewModel';
import { DemoVoice } from '../../demo/DemoVoice';
import { DemoModel } from '../../demo/DemoModel';
import ViewUtils from '../util/ViewUtils'
import TimeCountTopView from '../component/TimeCountTopView'
import TitleTopView from '../component/TitleTopView'
import SelectAddressOrDate from '../test/areatest/components/common/SelectAddressOrDate'
import { MyBaseComponent } from '../base/MyBaseComponent'
import BusinessAnswerView from '../component/BusinessAnswerView'
import CommitResultView from '../component/CommitResultView'
import AreaJson from '../test/Area.json';
import common from '../../config/common';
import MyMonitorView from '../component/MyMonitorView'
import api from '../../config/api'

const { width } = Dimensions.get('window');
const textSize = 10
const itemHeight = 20

const imageHeight = 30

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',//水平轴
        // flexDirection: 'row',//声明水平为主轴
        // alignItems: 'center',//交叉轴对齐方式//左右
        // backgroundColor: 'rgba(52, 52, 52, 0.1)',

        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        position: 'absolute',
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
        // flexDirection: 'column',
        // justifyContent: 'flex-start',
        // alignItems: 'center',
        // flex: 1,
        // height: "100%",
        // width: "100%",
        // marginLeft: 10,
        // marginRight: 10,

        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        height: "100%",
        width: "100%",
        position: 'absolute',
        zIndex: 1000,
        elevation: 1000,



    },

    containerCenter2: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        height: "100%",
        width: "100%",

    },

    containerHorizontal: {
        width: "100%",
        height: "100%",
        justifyContent: 'flex-end',

        flexDirection: 'row',
        alignItems: 'baseline',
    },
    containerLeft: {
        flex: 1,
        flexDirection: 'column',
        width: "100%",
        height: "100%",
        alignItems: 'flex-start',
        marginLeft: 10,
    },
    containerRight: {
        flex: 1.8,
        borderRadius: 10,
        width: "100%",
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent:'flex-end',
        justifyContent: 'space-between',
        height: 210,
        borderWidth: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingHorizontal: 5,
        paddingVertical: 5,
        marginBottom: 70,
        marginTop: 30,
        marginRight: 10,

    },


    itemClickStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 60,
        width: 200,
        backgroundColor: 'rgba(145, 147, 159, 0.5)',
        marginBottom: 5,
        borderRadius: 10,
    },
    textStyle1: {
        color: 'white',
        width: "100%",
        fontSize: 13,
        fontWeight: 'bold',
        marginLeft: 50
    },

    itemClickExitStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 36,
        width: 110,
        backgroundColor: '#66b0f9',
        borderRadius: 30,
    },

    containerStyle: {
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 5,
    },

    containerStyle2: {
        flex: 1,
        height: itemHeight,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
    },


    textStyle2: {
        fontSize: textSize,
        color: "#69B6F9",
        fontWeight: 'bold',
        marginLeft: 1,
        marginRight: 5,
        width: 55,
        textAlign: 'center'
    },

    textStyle3: {
        fontSize: textSize,
        color: "white",
        fontWeight: 'bold',
        flex: 1
    },

    inputStyle: {
        flex: 1,
        // backgroundColor: 'white',
        // borderRadius: 5,
        // height:20,
        fontSize: textSize,
        paddingBottom: 0,
        paddingTop: 0,
        color: "black",
    },

    textItemStyle: {
        justifyContent: 'center', alignItems: 'center', width: 120, height: 30, marginBottom: 5, backgroundColor: '#80e5fb', borderRadius: 10
    },

    textItemFontStyle: {
        fontSize: 13, color: "white", fontWeight: 'bold'
    }

},)



/**** 评价界面 */
@observer
export class AppraiseScreen extends MyBaseComponent {

    public getComponentName(): string {
        return "AppraiseScreen"
    }

    public constructor(props: BaseComponentProps) {
        super(props);

        console.log('SscApplyScreen constructor');

        this.state = {
            //@ts-ignore
            userName: this.props.userName || (this.props.navigation.state.params && this.props.navigation.state.params.userName) ? this.props.navigation.state.params.userName : api.myTestInfo[0].testName,
            sfzh: this.props.sfzh || (this.props.navigation.state.params && this.props.navigation.state.params.sfzh) ? this.props.navigation.state.params.sfzh : api.myTestInfo[0].testSfzh,

            phoneNumber: '',
            sscPwd: '',
            isCanShowResult: false,

            isStarPress1: false,
            isStarPress2: false,
            isStarPress3: false,
            isStarPress4: false,
            isStarPress5: false,


            isDeficiencyPress1: false,
            isDeficiencyPress2: false,
            isDeficiencyPress3: false,
            isDeficiencyPress4: false,
            isDeficiencyPress5: false,
            isDeficiencyPress6: false,
        };

        this.bindThisBiz()

    }


    private bindThisBiz() {

        this.star1Press = this.star1Press.bind(this);
        this.star2Press = this.star2Press.bind(this);
        this.star3Press = this.star3Press.bind(this);
        this.star4Press = this.star4Press.bind(this);
        this.star5Press = this.star5Press.bind(this);

        this.contentClick1 = this.contentClick1.bind(this);
        this.contentClick2 = this.contentClick2.bind(this);
        this.contentClick3 = this.contentClick3.bind(this);
        this.contentClick4 = this.contentClick4.bind(this);
        this.contentClick5 = this.contentClick5.bind(this);
        this.contentClick6 = this.contentClick6.bind(this);

        this.tipsAppraise = this.tipsAppraise.bind(this);
        this.commitData = this.commitData.bind(this);
        this.closeCurrentOpk = this.closeCurrentOpk.bind(this);

    }


    public componentDidMount() {
        //重写界面的didMount，必须调用super
        super.componentDidMount();

        this.playText('您对我本次服务满意吗')
    }

    public componentWillMount() {

    }

    public componentWillUnmount() {
        //重写界面的Unmount，必须调用super
        super.componentWillUnmount();
    }

    public initTimeCount() {
        this.refs['TimeCountTopView'].initTimeCount()
    }

    public requestAnswerData(questionStr: string) {
        // this.refs['BusinessAnswerView'].requestAnswerData(questionStr)
        //TODO 这里处理语音识别
        this.initTimeCount()
        this.compare(questionStr)
    }

    private isSpeaking = false
    public playText2(msg: string) {
        let listener = new TextListener();
        listener.setFinish(() => {
            //TODO: 播放完成
            listener.removeListener();
            this.isSpeaking = false
        });
        this.isSpeaking = true
        speechApi.playText(listener.getId(), msg);

    }

    private star1Arr = ["很不满意", "非常不满意", "一颗星", "一星", "很差", "1星"]
    private star2Arr = ["不满意", "两颗星", "两星", "2星", "二星"]
    private star3Arr = ["一般", "三颗星", "三星", "3星"]
    private star4Arr = ["满意", "四颗星", "四星", "4星"]
    private star5Arr = ["非常满意", "很满意", "五颗星", "五星", "5星"]

    //好评部分
    private positiveAppraise1 = ["语速适中", "音量适中", "语速音量适中", "语速、音量适中"]
    private positiveAppraise2 = ["可办业务多"]
    private positiveAppraise3 = ["反应速度快", "速度快"]
    private positiveAppraise4 = ["主动提供指引帮助", "提供指引帮助"]
    private positiveAppraise5 = ["内容简洁清晰", "简洁清晰", "内容简洁", "内容清晰"]
    private positiveAppraise6 = ["答案准确"]

    //批评部分
    private negativeAppraise1 = ["语速太快听不清", "语速太快", "听不清"]
    private negativeAppraise2 = ["可办业务少"]
    private negativeAppraise3 = ["反应速度慢", "速度慢"]
    private negativeAppraise4 = ["未主动提供指引帮助", "提供指引帮助"]
    private negativeAppraise5 = ["内容看不懂", "看不懂"]
    private negativeAppraise6 = ["答案不准确", "不准确"]


    private commitArr = ["确认提交", "提交"]

    private backArr = ["退出", "返回"]

    private tipsAppraise() {
        if (!this.isSpeaking) {
            this.playText2("您还没评价喔")
        }
    }

    public compare(userSpeakText: string) {

        this.performClick(userSpeakText, this.star1Arr, true, this.star1Press)
        this.performClick(userSpeakText, this.star2Arr, true, this.star2Press)
        this.performClick(userSpeakText, this.star3Arr, true, this.star3Press)
        this.performClick(userSpeakText, this.star4Arr, true, this.star4Press)
        this.performClick(userSpeakText, this.star5Arr, true, this.star5Press)


        if (this.state.isStarPress1 == true ||
            this.state.isStarPress2 == true ||
            this.state.isStarPress3 == true ||
            this.state.isStarPress4 == true ||
            this.state.isStarPress5 == true) {

            //好评部分
            if (this.state.isStarPress4 == true ||
                this.state.isStarPress5 == true) {

                this.performClick(userSpeakText, this.positiveAppraise1, false, this.contentClick1)
                this.performClick(userSpeakText, this.positiveAppraise2, false, this.contentClick2)
                this.performClick(userSpeakText, this.positiveAppraise3, false, this.contentClick3)
                this.performClick(userSpeakText, this.positiveAppraise4, false, this.contentClick4)
                this.performClick(userSpeakText, this.positiveAppraise5, false, this.contentClick5)
                this.performClick(userSpeakText, this.positiveAppraise6, false, this.contentClick6)
            }


            //批评部分
            if (this.state.isStarPress4 == false && this.state.isStarPress5 == false
                && (this.state.isStarPress1 == true || this.state.isStarPress2 == true || this.state.isStarPress3 == true)) {


                this.performClick(userSpeakText, this.negativeAppraise1, false, this.contentClick1)
                this.performClick(userSpeakText, this.negativeAppraise2, false, this.contentClick2)
                this.performClick(userSpeakText, this.negativeAppraise3, false, this.contentClick3)
                this.performClick(userSpeakText, this.negativeAppraise4, false, this.contentClick4)
                this.performClick(userSpeakText, this.negativeAppraise5, false, this.contentClick5)
                this.performClick(userSpeakText, this.negativeAppraise6, false, this.contentClick6)
            }





            this.performClick(userSpeakText, this.commitArr, false, this.commitData)
        }
        else {

            // let commitArr = ["确认提交"]
            this.performClick(userSpeakText, this.commitArr, false, this.tipsAppraise)
        }

        //退出
        this.performClick(userSpeakText, this.backArr, true, this.closeCurrentOpk)



        // let backArr = ["退出"]
        // this.performClick(userSpeakText, commitArr, this.colsePage())

        // NativeModules.TecsunReadCardModule.isMatch(
        //     "社保卡",
        //     ["我的社保卡"],
        //     false,
        //     (err: any) => {
        //     console.log(">>>>>>>>>>>.isMatch 11111111");
        // }, (result: any) => {
        //     console.log(">>>>>>>>>>> isMatch 22222222");
        //     console.log(result);
        // });
    }

    private performClick(userSpeakText: string, arr: any, iscompleteMatch: any, callback: () => void) {
        console.log(" performClick userSpeakText ");
        console.log(userSpeakText);
        NativeModules.TecsunReadCardModule.isMatch(
            userSpeakText,
            arr,
            iscompleteMatch,
            (err: any) => {
                console.log(">>>>>>>>>>>.isMatch 11111111");

            }, (result: any) => {
                console.log(">>>>>>>>>>>.isMatch 222222  test1");
                // press()
                // console.log(">>>>>>>>>>>.this.state.isStarPress4 ");
                // console.log(this.state.isStarPress4);

                callback()

                // let newisStarPress4 = !this.state.isStarPress4

                // if (newisStarPress4 == true) {

                //     this.setState({
                //         isStarPress4: newisStarPress4
                //     })


                //     if (newisStarPress4 == true) {
                //         this.setState({
                //             isStarPress1: true,
                //             isStarPress2: true,
                //             isStarPress3: true,
                //         })
                //     }

                //     if (newisStarPress4 == false) {
                //         this.setState({
                //             isStarPress5: false,
                //         })

                //     }

                //     if (!this.isSpeaking) {
                //         this.playText2("满意您就夸一夸，我会继续努力的~")
                //     }
                // }



            });

    }




    public commitData() {
        this.myLog("commitData")

        if (this.state.isStarPress1 == true ||
            this.state.isStarPress2 == true ||
            this.state.isStarPress3 == true ||
            this.state.isStarPress4 == true ||
            this.state.isStarPress5 == true) {

            this.setState({
                isCanShowResult: true,
            })
        }
        else {

            this.tipsAppraise()

        }

    }

    public getBackgroundColor(isPress: any) {
        let r = isPress == true ? '#80e5fb' : 'rgba(128,128,128, 0.4)'
        return r
    }

    public getImagePath(isPress: any) {
        var icon = isPress == true ? require('../../../img/icon_appriase_press.png') : require('../../../img/icon_appriase_unpress.png')
        return icon
    }

    public star1Press() {


        if (this.state.isStarPress5 == true || this.state.isStarPress4 == true) {
            this.setState({
                isDeficiencyPress1: false,
                isDeficiencyPress2: false,
                isDeficiencyPress3: false,
                isDeficiencyPress4: false,
                isDeficiencyPress5: false,
                isDeficiencyPress6: false,

            })
        }


        // let newisStarPress1 = !this.state.isStarPress1

        // if (newisStarPress1 == false) {

        //     this.setState({
        //         isDeficiencyPress1: false,
        //         isDeficiencyPress2: false,
        //         isDeficiencyPress3: false,
        //         isDeficiencyPress4: false,
        //         isDeficiencyPress5: false,
        //         isDeficiencyPress6: false,

        //     })
        // }




        // this.setState({
        //     isStarPress1: newisStarPress1
        // })



        // if (newisStarPress1 == false) {
        //     this.setState({
        //         isStarPress2: false,
        //         isStarPress3: false,
        //         isStarPress4: false,
        //         isStarPress5: false,

        //     })
        // }

        /////////////////////////////////////////////////////////////////////////////////

        this.setState({
            isStarPress1: true,
            isStarPress2: false,
            isStarPress3: false,
            isStarPress4: false,
            isStarPress5: false,

        })

        if (!this.isSpeaking) {
            this.playText2("您觉得我哪里做得不好啦，请您直说，激励我做得更好~")
        }



    }
    public star2Press() {

        if (this.state.isStarPress5 == true || this.state.isStarPress4 == true) {

            this.setState({
                isDeficiencyPress1: false,
                isDeficiencyPress2: false,
                isDeficiencyPress3: false,
                isDeficiencyPress4: false,
                isDeficiencyPress5: false,
                isDeficiencyPress6: false,

            })
        }

        // let newisStarPress2 = !this.state.isStarPress2

        // this.setState({
        //     isStarPress2: newisStarPress2
        // })

        // if (newisStarPress2 == true) {
        //     this.setState({
        //         isStarPress1: true,

        //     })
        // }

        // if (newisStarPress2 == false) {
        //     this.setState({
        //         isStarPress3: false,
        //         isStarPress4: false,
        //         isStarPress5: false,

        //     })

        // }


        this.setState({
            isStarPress1: true,
            isStarPress2: true,
            isStarPress3: false,
            isStarPress4: false,
            isStarPress5: false,

        })


        if (!this.isSpeaking) {
            this.playText2("您觉得我哪里做得不好啦，请您直说，激励我做得更好~")
        }


    }

    public star3Press() {


        if (this.state.isStarPress5 == true || this.state.isStarPress4 == true) {

            this.setState({
                isDeficiencyPress1: false,
                isDeficiencyPress2: false,
                isDeficiencyPress3: false,
                isDeficiencyPress4: false,
                isDeficiencyPress5: false,
                isDeficiencyPress6: false,

            })
        }


        // let newisStarPress3 = !this.state.isStarPress3


        // this.setState({
        //     isStarPress3: newisStarPress3
        // })

        // if (newisStarPress3 == true) {
        //     this.setState({
        //         isStarPress1: true,
        //         isStarPress2: true,

        //     })
        // }

        // if (newisStarPress3 == false) {
        //     this.setState({

        //         isStarPress4: false,
        //         isStarPress5: false,

        //     })
        // }


        this.setState({
            isStarPress1: true,
            isStarPress2: true,
            isStarPress3: true,
            isStarPress4: false,
            isStarPress5: false,

        })



        if (!this.isSpeaking) {
            this.playText2("您觉得我哪里做得不好啦，请您直说，激励我做得更好~")
        }



    }

    public star4Press() {


        if (this.state.isStarPress1 == true || this.state.isStarPress2 == true || this.state.isStarPress3 == true) {
            this.setState({
                isDeficiencyPress1: false,
                isDeficiencyPress2: false,
                isDeficiencyPress3: false,
                isDeficiencyPress4: false,
                isDeficiencyPress5: false,
                isDeficiencyPress6: false,

            })
        }



        // let newisStarPress4 = !this.state.isStarPress4
        // this.setState({
        //     isStarPress4: newisStarPress4
        // })
        // if (newisStarPress4 == true) {
        //     this.setState({
        //         isStarPress1: true,
        //         isStarPress2: true,
        //         isStarPress3: true,
        //     })
        // }

        // if (newisStarPress4 == false) {
        //     this.setState({
        //         isStarPress5: false,
        //     })

        // }


        this.setState({
            isStarPress1: true,
            isStarPress2: true,
            isStarPress3: true,
            isStarPress4: true,
            isStarPress5: false,
        })



        if (!this.isSpeaking) {
            this.playText2("满意您就夸一夸，我会继续努力的~")
        }


    }

    public star5Press() {
        if (this.state.isStarPress1 == true || this.state.isStarPress2 == true || this.state.isStarPress3 == true) {
            this.setState({
                isDeficiencyPress1: false,
                isDeficiencyPress2: false,
                isDeficiencyPress3: false,
                isDeficiencyPress4: false,
                isDeficiencyPress5: false,
                isDeficiencyPress6: false,

            })
        }


        // let newisStarPress5 = !this.state.isStarPress5


        // this.setState({
        //     isStarPress5: newisStarPress5
        // })

        // if (newisStarPress5 == true) {

        //     this.setState({
        //         isStarPress1: true,
        //         isStarPress2: true,
        //         isStarPress3: true,
        //         isStarPress4: true,
        //     })
        // }



        this.setState({
            isStarPress1: true,
            isStarPress2: true,
            isStarPress3: true,
            isStarPress4: true,
            isStarPress5: true,
        })


        if (!this.isSpeaking) {
            this.playText2("满意您就夸一夸，我会继续努力的~")
        }


    }


    private contentClick1() {
        let newisDeficiencyPress1 = !this.state.isDeficiencyPress1
        this.setState({
            isDeficiencyPress1: newisDeficiencyPress1
        })
    }

    private contentClick2() {
        let newisDeficiencyPress2 = !this.state.isDeficiencyPress2
        this.setState({
            isDeficiencyPress2: newisDeficiencyPress2
        })
    }

    private contentClick3() {
        let newisDeficiencyPress3 = !this.state.isDeficiencyPress3
        this.setState({
            isDeficiencyPress3: newisDeficiencyPress3
        })
    }

    private contentClick4() {
        let newisDeficiencyPress4 = !this.state.isDeficiencyPress4
        this.setState({
            isDeficiencyPress4: newisDeficiencyPress4
        })
    }

    private contentClick5() {
        let newisDeficiencyPress5 = !this.state.isDeficiencyPress5
        this.setState({
            isDeficiencyPress5: newisDeficiencyPress5
        })
    }

    private contentClick6() {
        let newisDeficiencyPress6 = !this.state.isDeficiencyPress6
        this.setState({
            isDeficiencyPress6: newisDeficiencyPress6
        })
    }


    public render() {
        return (

            <>
                <FaceTrackSoundLocalizationComponent
                    onStatusUpdate={this.onStatusUpdate}
                // onFinish={
                //     this.onFinish
                // }
                />

                <MyMonitorView style={{ flex: 1 }} monitorTouch={() => {
                    // this.refs['TimeCountTopView'].initTimeCount()
                    this.initTimeCount()
                }} >

                    <View style={styles.container} >

                        <>
                            <BlurOverlay
                                style={{ flex: 1, justifyContent: 'center', alignContent: 'center', position: 'absolute', zIndex: -100, elevation: -100 }}
                                showBlurOverlay={true}
                                hasFaceParticle={false}>
                            </BlurOverlay>
                        </>


                        <View style={styles.containerCenter}>

                            {/*** 倒计时 */}
                            <TimeCountTopView timerCount={ViewUtils.getTimerCount()} onTimeOut={() => this.closeCurrentOpk()} ref='TimeCountTopView' />

                            <TitleTopView titleText="您对我本次服务满意吗" />


                            <View style={styles.containerCenter2}>


                                {/*** 左边 */}
                                {/* <View style={styles.containerLeft}> */}

                                {/* <View style={{ height: 'auto' }}>
                                        <View style={[styles.textStyle1, { marginTop: 2, marginLeft: 30 }]}>
                                            <Text style={{ fontSize: 8, color: "white", fontWeight: 'bold' }} >您也可以用语音反馈~</Text>
                                        </View>
                                    </View> */}
                                {/* </View> */}

                                <View style={[styles.containerStyle, { marginBottom: 15, width: '60%', marginTop: 10 }]}>

                                    <TouchableOpacity activeOpacity={0.5} onPress={() => {
                                        this.star1Press()
                                    }}>
                                        <Image
                                            style={{
                                                width: imageHeight,
                                                height: imageHeight,
                                            }}
                                            source={this.getImagePath(this.state.isStarPress1)} />

                                    </TouchableOpacity>

                                    <TouchableOpacity activeOpacity={0.5} onPress={() => {

                                        this.star2Press()
                                    }}>
                                        <Image
                                            style={{
                                                width: imageHeight,
                                                height: imageHeight,
                                            }}
                                            source={this.getImagePath(this.state.isStarPress2)} />
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.5} onPress={() => {
                                        this.star3Press()

                                    }}>
                                        <Image
                                            style={{
                                                width: imageHeight,
                                                height: imageHeight,
                                            }}
                                            source={this.getImagePath(this.state.isStarPress3)} />
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.5} onPress={() => {
                                        this.star4Press()

                                    }}>
                                        <Image
                                            style={{
                                                width: imageHeight,
                                                height: imageHeight,
                                            }}
                                            source={this.getImagePath(this.state.isStarPress4)} />
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.5} onPress={() => {

                                        this.star5Press()

                                    }}>
                                        <Image
                                            style={{
                                                width: imageHeight,
                                                height: imageHeight,
                                            }}
                                            source={this.getImagePath(this.state.isStarPress5)} />

                                    </TouchableOpacity>
                                </View>


                                {/****** 3星 or 以下 */}
                                {(this.state.isStarPress4 == false && this.state.isStarPress5 == false
                                    && (this.state.isStarPress1 == true || this.state.isStarPress2 == true || this.state.isStarPress3 == true)) ?

                                    <View style={[styles.containerStyle, { marginBottom: 5, width: '70%' }]}>

                                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>

                                            <TouchableOpacity activeOpacity={0.5} onPress={() => {
                                                this.contentClick1()
                                                // let newisDeficiencyPress1 = !this.state.isDeficiencyPress1
                                                // this.setState({
                                                //     isDeficiencyPress1: newisDeficiencyPress1
                                                // })

                                            }}>
                                                <View style={[styles.textItemStyle, { backgroundColor: this.getBackgroundColor(this.state.isDeficiencyPress1) }]}>

                                                    <Text style={styles.textItemFontStyle} >语速太快听不清</Text>
                                                </View>
                                            </TouchableOpacity>

                                            <TouchableOpacity activeOpacity={0.5} onPress={() => {

                                                this.contentClick2()
                                                // let newisDeficiencyPress2 = !this.state.isDeficiencyPress2
                                                // this.setState({
                                                //     isDeficiencyPress2: newisDeficiencyPress2
                                                // })
                                            }}>
                                                <View style={[styles.textItemStyle, { backgroundColor: this.getBackgroundColor(this.state.isDeficiencyPress2) }]}>

                                                    <Text style={styles.textItemFontStyle} >可办的业务少</Text>

                                                </View>
                                            </TouchableOpacity>

                                            <TouchableOpacity activeOpacity={0.5} onPress={() => {
                                                this.contentClick3()
                                                // let newisDeficiencyPress3 = !this.state.isDeficiencyPress3
                                                // this.setState({
                                                //     isDeficiencyPress3: newisDeficiencyPress3
                                                // })
                                            }}>
                                                <View style={[styles.textItemStyle, { backgroundColor: this.getBackgroundColor(this.state.isDeficiencyPress3) }]}>
                                                    <Text style={styles.textItemFontStyle} >反应速度慢</Text>
                                                </View>
                                            </TouchableOpacity>

                                        </View>

                                    </View> : null

                                }

                                {/****** 3星 or 以下 */}
                                {(this.state.isStarPress4 == false && this.state.isStarPress5 == false
                                    && (this.state.isStarPress1 == true || this.state.isStarPress2 == true || this.state.isStarPress3 == true)) ?
                                    <View style={[styles.containerStyle, { width: '70%' }]}>

                                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>

                                            <TouchableOpacity activeOpacity={0.5} onPress={() => {
                                                this.contentClick4()
                                                // let newisDeficiencyPress4 = !this.state.isDeficiencyPress4
                                                // this.setState({
                                                //     isDeficiencyPress4: newisDeficiencyPress4
                                                // })
                                            }}>
                                                <View style={[styles.textItemStyle, { backgroundColor: this.getBackgroundColor(this.state.isDeficiencyPress4) }]}>

                                                    <Text style={styles.textItemFontStyle} >未主动指引帮助</Text>
                                                </View>
                                            </TouchableOpacity>

                                            <TouchableOpacity activeOpacity={0.5} onPress={() => {
                                                this.contentClick5()
                                                // let newisDeficiencyPress5 = !this.state.isDeficiencyPress5
                                                // this.setState({
                                                //     isDeficiencyPress5: newisDeficiencyPress5
                                                // })
                                            }}>
                                                <View style={[styles.textItemStyle, { backgroundColor: this.getBackgroundColor(this.state.isDeficiencyPress5) }]}>

                                                    <Text style={styles.textItemFontStyle} >内容看不懂</Text>

                                                </View>
                                            </TouchableOpacity>

                                            <TouchableOpacity activeOpacity={0.5} onPress={() => {
                                                this.contentClick6()

                                                // let newisDeficiencyPress6 = !this.state.isDeficiencyPress6
                                                // this.setState({
                                                //     isDeficiencyPress6: newisDeficiencyPress6
                                                // })

                                            }}>
                                                <View style={[styles.textItemStyle, { backgroundColor: this.getBackgroundColor(this.state.isDeficiencyPress6) }]}>
                                                    <Text style={styles.textItemFontStyle} >答案不准确</Text>
                                                </View>
                                            </TouchableOpacity>

                                        </View>

                                    </View> : null
                                }



                                {/****** 满意 or  很满意 */}
                                {(this.state.isStarPress4 == true || this.state.isStarPress5 == true) ?
                                    <View style={[styles.containerStyle, { marginBottom: 5, width: '70%' }]}>

                                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>

                                            <TouchableOpacity activeOpacity={0.5} onPress={() => {

                                                this.contentClick1()
                                                // let newisDeficiencyPress1 = !this.state.isDeficiencyPress1
                                                // this.setState({
                                                //     isDeficiencyPress1: newisDeficiencyPress1
                                                // })

                                            }}>
                                                <View style={[styles.textItemStyle, { backgroundColor: this.getBackgroundColor(this.state.isDeficiencyPress1) }]}>

                                                    <Text style={styles.textItemFontStyle} >语速、音量适中</Text>
                                                </View>
                                            </TouchableOpacity>

                                            <TouchableOpacity activeOpacity={0.5} onPress={() => {
                                                this.contentClick2()
                                                // let newisDeficiencyPress2 = !this.state.isDeficiencyPress2
                                                // this.setState({
                                                //     isDeficiencyPress2: newisDeficiencyPress2
                                                // })
                                            }}>
                                                <View style={[styles.textItemStyle, { backgroundColor: this.getBackgroundColor(this.state.isDeficiencyPress2) }]}>

                                                    <Text style={styles.textItemFontStyle} >可办的业务多</Text>

                                                </View>
                                            </TouchableOpacity>

                                            <TouchableOpacity activeOpacity={0.5} onPress={() => {
                                                this.contentClick3()
                                                // let newisDeficiencyPress3 = !this.state.isDeficiencyPress3
                                                // this.setState({
                                                //     isDeficiencyPress3: newisDeficiencyPress3
                                                // })
                                            }}>
                                                <View style={[styles.textItemStyle, { backgroundColor: this.getBackgroundColor(this.state.isDeficiencyPress3) }]}>
                                                    <Text style={styles.textItemFontStyle} >反应速度快</Text>
                                                </View>
                                            </TouchableOpacity>

                                        </View>

                                    </View> : null
                                }

                                {/****** 满意 or  很满意 */}
                                {(this.state.isStarPress4 == true || this.state.isStarPress5 == true) ?
                                    <View style={[styles.containerStyle, { width: '70%' }]}>

                                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>

                                            <TouchableOpacity activeOpacity={0.5} onPress={() => {

                                                this.contentClick4()
                                                // let newisDeficiencyPress4 = !this.state.isDeficiencyPress4
                                                // this.setState({
                                                //     isDeficiencyPress4: newisDeficiencyPress4
                                                // })
                                            }}>
                                                <View style={[styles.textItemStyle, { backgroundColor: this.getBackgroundColor(this.state.isDeficiencyPress4) }]}>

                                                    <Text style={styles.textItemFontStyle} >主动提供指引帮助</Text>
                                                </View>
                                            </TouchableOpacity>

                                            <TouchableOpacity activeOpacity={0.5} onPress={() => {
                                                this.contentClick5()
                                                // let newisDeficiencyPress5 = !this.state.isDeficiencyPress5
                                                // this.setState({
                                                //     isDeficiencyPress5: newisDeficiencyPress5
                                                // })
                                            }}>
                                                <View style={[styles.textItemStyle, { backgroundColor: this.getBackgroundColor(this.state.isDeficiencyPress5) }]}>

                                                    <Text style={styles.textItemFontStyle} >内容简洁清晰</Text>

                                                </View>
                                            </TouchableOpacity>

                                            <TouchableOpacity activeOpacity={0.5} onPress={() => {

                                                this.contentClick6()
                                                // let newisDeficiencyPress6 = !this.state.isDeficiencyPress6
                                                // this.setState({
                                                //     isDeficiencyPress6: newisDeficiencyPress6
                                                // })

                                            }}>
                                                <View style={[styles.textItemStyle, { backgroundColor: this.getBackgroundColor(this.state.isDeficiencyPress6) }]}>
                                                    <Text style={styles.textItemFontStyle} >答案准确</Text>
                                                </View>
                                            </TouchableOpacity>

                                        </View>





                                    </View> : null
                                }








                                {(this.state.isStarPress1 == false &&
                                    this.state.isStarPress2 == false &&
                                    this.state.isStarPress3 == false &&
                                    this.state.isStarPress4 == false &&
                                    this.state.isStarPress5 == false) ? <View style={{ height: 30 }} />
                                    : null
                                }
















                                <View style={[styles.containerStyle, { marginBottom: '14%', width: '70%' }]}>
                                    {ViewUtils.getExitButton2(() => this.colsePage())}
                                    {ViewUtils.getConfirmButton(() => this.commitData(), "确定提交")}
                                </View>


                            </View>

                        </View>

                    </View>

                </MyMonitorView>





                {this.state.isCanShowResult ?
                    // <View>

                    <Modal
                        //     style={{
                        //         height: "100%",
                        //         width: "100%",
                        //    }}
                        animationType={"slide"}
                        visible={true}
                        transparent={true}>

                        {/* <View style={{
                            backgroundColor: 'rgba(0, 0, 0, 1)',
                            // elevation: 18,
                            // flex: 1,
                            // position: 'absolute',
                            // height: "100%",
                            //  width: "100%",
                        }} > */}

                        <View
                            //todo 下面的style要写死, 不能用100%, 否则偶尔会出现bug不满屏, 但是写死宽高又有偏移, 所以加入-40, 估计是框架的bug
                            style={{
                                height: '100%',
                                width: '100%',
                            }}
                        >
                            <CommitResultView onTimeOut={() =>
                                // this.jump2AnswerPage(common.CONST_BUSINESS_COMPLETE_SSC_SOLUTION_HANG)
                                //关闭界面
                                this.closeCurrentOpk()
                            } />

                        </View>
                    </Modal>

                    : null}

            </>
        );
    }
}
