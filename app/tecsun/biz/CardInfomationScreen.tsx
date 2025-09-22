import { BaseComponent, triggerManager, BaseComponentProps, BlurOverlay, FaceTrackSoundLocalizationComponent } from 'orionos-eve-core';
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Button, Animated, TextInput, FlatList, Modal } from 'react-native';
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
import AreaJson from '../test/Area.json';
import common from '../../config/common';
import MyMonitorView from '../component/MyMonitorView'
import CommitResultView from '../component/CommitResultView'
import api from '../../config/api'




const { width } = Dimensions.get('window');
const textSize = 10
const itemHeight = 20

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
        flexDirection: 'row',
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

},

)





/**** 社保卡信息查询 */
@observer
export class CardInfomationScreen extends MyBaseComponent {

    public constructor(props: BaseComponentProps) {
        super(props);

        console.log('CardInfomationScreen constructor');

        this.state = {
            //@ts-ignore
            // userName: this.props.userName || this.props.navigation.state.params.userName ||  api.myTestInfo.testName,
            // userBirthday: this.props.userBirthday || this.props.navigation.state.params.userBirthday || '',
            // sfzh: this.props.sfzh || this.props.navigation.state.params.sfzh ||  api.myTestInfo.testSfzh,

            userName: this.props.userName || (this.props.navigation.state.params && this.props.navigation.state.params.userName) ? this.props.navigation.state.params.userName : api.myTestInfo[0].testName,
            userBirthday: this.props.userBirthday || (this.props.navigation.state.params && this.props.navigation.state.params.userBirthday) ? this.props.navigation.state.params.userBirthday : '',
            sfzh: this.props.sfzh || (this.props.navigation.state.params && this.props.navigation.state.params.sfzh) ? this.props.navigation.state.params.sfzh : api.myTestInfo[0].testSfzh,

            sscNumber: this.props.sscNumber || '',
            cardState: this.props.cardState || '正常',
            cardActiveState: this.props.cardActiveState || '已激活',
            isOtherPlaces: this.props.isOtherPlaces || '是',
            phoneNumber: this.props.phoneNumber || '',
            receiptNumber: '',
            address:  this.props.address || '',
            time: [],
            showPickAddressView: false,
            isCanShowResult: false,
        };

    }


    public componentDidMount() {
        //重写界面的didMount，必须调用super
        super.componentDidMount();

    }

    public componentWillMount() {

    }

    public componentWillUnmount() {
        //重写界面的Unmount，必须调用super
        super.componentWillUnmount();
    }

    public requestAnswerData(questionStr: string) {
        this.initTimeCount()
        this.refs['BusinessAnswerView'].requestAnswerData(questionStr)

    }
    public initTimeCount() {
        this.refs['TimeCountTopView'].initTimeCount()
    }


    //todo
    public commitData() {
        this.myLog("commitData")
        this.setState({
            isCanShowResult: true,
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

                            <TitleTopView titleText="社保卡信息查询" />


                            <View style={styles.containerCenter2}>


                                {/*** 左边 */}
                                <View style={styles.containerLeft}>

                                    {/* {ViewUtils.getQuestionTitle(30)} */}
                                    {/* <View style={{ height: 'auto' }}>
                                        {ViewUtils.getQuestionTitle(15)}
                                    </View> */}

                                    {/***** todo 加入一个componet来处理知识库返回的结果 */}

                                    <View style={{ flex: 1 }} >
                                        <BusinessAnswerView

                                            style={{ marginTop: 5, flex: 1 }}
                                            ref={'BusinessAnswerView'}
                                            atlasId={common.CONST_ATLAS_ID_SSC_SEARCH}
                                            businessQuestion={common.CONST_BUSINESS_Q_SSC_SEARCH}
                                            businessCompleteQ={common.CONST_BUSINESS_COMPLETE_SSC_SEARCH}

                                            playText={(msg) => this.playText(msg)}
                                            stopTTS={() => this.stopTTS()}
                                            hideVideo={() => this.hideVideo()}
                                            exit={() => this.closeCurrentOpk()}
                                            nextBizName={(plainText) => { return this.nextBizName(plainText) }}
                                            myJump={(routerName, plainText) => this.myJump(routerName, plainText)}
                                        />
                                    </View>

                                </View>




                                {/*** 右边部分边 */}
                                <View style={styles.containerRight}>

                                    {/**** */}
                                    <View style={[styles.containerStyle, { marginTop: 5 }]}>
                                        <Text style={styles.textStyle2} >姓          名:</Text>
                                        <Text style={styles.textStyle3} >{this.state.userName}</Text>

                                        <Text style={styles.textStyle2} >身 份 证 号:</Text>
                                        <Text style={styles.textStyle3} >{ViewUtils.replaceSfzh(this.state.sfzh)}</Text>
                                    </View>


                                    <View style={styles.containerStyle}>
                                        <Text style={styles.textStyle2} >社 保 卡 号:</Text>
                                        <Text style={styles.textStyle3} >{this.state.sscNumber}</Text>

                                        <Text style={[styles.textStyle2, { marginLeft: 10 }]} >卡  状  态:</Text>
                                        <Text style={styles.textStyle3} >{this.state.cardState}</Text>

                                    </View>

                                    <View style={styles.containerStyle}>
                                        <Text style={styles.textStyle2} >卡激活状态:</Text>
                                        <Text style={styles.textStyle3} >{this.state.cardActiveState}</Text>

                                        <Text style={[styles.textStyle2, { marginLeft: 10 }]} >是 否 外 地:</Text>
                                        <Text style={styles.textStyle3} >{this.state.isOtherPlaces}</Text>

                                    </View>

                                    <View style={styles.containerStyle}>
                                        <Text style={styles.textStyle2} >手 机 号 码:</Text>
                                        <Text style={styles.textStyle3} >{this.state.phoneNumber}</Text>

                                        <Text style={[styles.textStyle2, { marginLeft: 10 }]} ></Text>
                                        <Text style={styles.textStyle3} ></Text>

                                    </View>



                                    <View style={styles.containerStyle}>
                                        <Text style={styles.textStyle2} >联 系 地 址:</Text>
                                        <Text
                                            style={[styles.textStyle3, { paddingRight: 50 }]}
                                            numberOfLines={2}>{this.state.address}</Text>
                                    </View>


                                    {/**** */}
                                    <View style={[styles.containerStyle, { marginBottom: 0 }]}>
                                        {/* {ViewUtils.getExitButton2(() => this.closeCurrentOpk())} */}
                                        {ViewUtils.getExitButton2(() =>  this.jump2AnswerPage(common.CONST_BUSINESS_COMPLETE_SSC_SEARCH) )}
                                        {/* {ViewUtils.getConfirmButton(() => this.commitData())} */}
                                    </View>
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
                                this.jump2AnswerPage(common.CONST_BUSINESS_COMPLETE_SSC_SEARCH)
                            } />

                        </View>
                    </Modal>

                    : null}

            </>
        );
    }
}
