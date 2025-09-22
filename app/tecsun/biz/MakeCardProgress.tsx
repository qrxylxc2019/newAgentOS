import { BaseComponent, triggerManager, BaseComponentProps, BlurOverlay, FaceTrackSoundLocalizationComponent } from 'orionos-eve-core';
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Button, Animated, TextInput, FlatList, Modal } from 'react-native';
import { observer } from 'mobx-react';

import { DemoViewModel } from '../../demo/DemoViewModel';
import { DemoVoice } from '../../demo/DemoVoice';
import { DemoModel } from '../../demo/DemoModel';
import ViewUtils from '../util/ViewUtils'
import TimeCountTopView from '../component/TimeCountTopView'
import TitleTopView from '../component/TitleTopView'
import { MyBaseComponent } from '../base/MyBaseComponent'
import MyMonitorView from '../component/MyMonitorView'
import CommitResultView from '../component/CommitResultView'
import common from '../../config/common';
import BusinessAnswerView from '../component/BusinessAnswerView'
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





@observer
export class MakeCardProgress extends MyBaseComponent {

    //todo 讲话的时候时间初始化
    public constructor(props: BaseComponentProps) {
        super(props);

        console.log('MakeCardProgress constructor');

        this.state = {
            // //@ts-ignore
            // userName: this.props.userName || this.props.navigation.state.params.userName || api.myTestInfo[0].testName,
            // //@ts-ignore
            // sfzh: this.props.sfzh || this.props.navigation.state.params.sfzh || api.myTestInfo[0].testSfzh,

            userName: this.props.userName || (this.props.navigation.state.params && this.props.navigation.state.params.userName) ? this.props.navigation.state.params.userName : api.myTestInfo[0].testName,
            userBirthday: this.props.userBirthday || (this.props.navigation.state.params && this.props.navigation.state.params.userBirthday) ? this.props.navigation.state.params.userBirthday : '',
            sfzh: this.props.sfzh || (this.props.navigation.state.params && this.props.navigation.state.params.sfzh) ? this.props.navigation.state.params.sfzh : api.myTestInfo[0].testSfzh,





            // //@ts-ignore
            // userName: this.props.userName ||  api.myTestInfo.testName,
            // //@ts-ignore
            // sfzh: this.props.sfzh ||  api.myTestInfo.testSfzh,
            //@ts-ignore
            nowStep: this.props.nowStep || 4,
            dataSource: [
                { key: 1, value: ['受理', '20210104'] },
                { key: 2, value: ['预开户', '20210104'] },
                { key: 3, value: ['制卡', '20210104'] },
                { key: 4, value: ['省中心寄出', '20210104'] },
                { key: 5, value: ['市中心接收', '20210104'] },
                { key: 6, value: ['银行接收', '20210104'] },
                { key: 7, value: ['领卡启用', '20210104'] },
                { key: 7, value: ['银行激活', '20210104'] },

            ],
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

    public myLog(msg: any) {
        console.log('>>>>>>>>> ' + msg + '  <<<<<<<<<<');
    }

    //todo
    public commitData() {
        this.myLog("commitData")
        this.setState({
            isCanShowResult: true,
        })
    }

    public getCilrclePath(index: any) {
        var icon = (this.state.nowStep >= index) ? require('../../../img/icon_one_circle_blue.png') : require('../../../img/icon_one_circle_white.png')
        return icon
    }

    public getArrowPath(index: any) {
        //@ts-ignore
        var icon = (this.state.nowStep >= index) ? require('../../../img/icon_arrow_right_blue.png') : require('../../../img/icon_arrow_right_white.png')
        //@ts-ignore
        if (this.state.dataSource.length == (index + 1)) {
            return ''
        }
        return icon
    }

    public getTextColor(index: any) {
        //@ts-ignore
        var icon = (this.state.nowStep >= index) ? '#5496f6' : 'white'
        return icon
    }

    public getBottomText(index: any) {
        //@ts-ignore
        var icon = (this.state.nowStep >= index) ? '已完成' : ''
        return icon
    }

    public showContentImage(index: any, item: any) {
        return (
            //添加手势
            //@ts-ignore
            <View style={{ flexDirection: 'column', justifyContent: 'flex-end', marginLeft: index == 0 ? 35 : 0, }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 44, height: 20 }}>

                    <Image
                        style={{
                            width: 10,
                            height: 10,

                        }}
                        source={this.getCilrclePath(index)} >

                    </Image>
                    <Image
                        style={{
                            width: 31,
                            height: 5,
                            marginLeft: 1,
                            marginRight: 1,
                        }}
                        source={this.getArrowPath(index)} >

                    </Image>


                </View>
            </View>
        )
    }



    public showCell(index: any, item: any) {
        return (
            //@ts-ignore
            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', marginTop: 0, marginLeft: index == 0 ? 18 : 0, }}>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 44 }}>

                    <Text style={{ fontSize: 7, color: this.getTextColor(index), marginTop: 0 }}>{item.value[0]}</Text>
                    <Text style={{ fontSize: 5, color: this.getTextColor(index), marginTop: 0 }}>{item.value[1]}</Text>
                    <Text style={{ fontSize: 5, color: this.getTextColor(index), marginTop: 0 }}>{this.getBottomText(index)}</Text>

                </View>

            </View>

        )
    }

    public requestAnswerData(questionStr: string) {
        this.initTimeCount()
        this.refs['BusinessAnswerView'].requestAnswerData(questionStr)

    }

    public initTimeCount() {
        this.refs['TimeCountTopView'].initTimeCount()
    }

    public render() {
        console.log('MainScreen render');
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

                            <TitleTopView titleText="制卡进度查询" />


                            <View style={styles.containerCenter2}>


                                {/*** 左边 */}
                                <View style={styles.containerLeft}>

                                    {/* {ViewUtils.getQuestionTitle(20)} */}

                                    {/***** todo 加入一个componet来处理知识库返回的结果 */}

                                    <View style={{ flex: 1 }} >
                                        <BusinessAnswerView
                                            style={{ marginTop: 5, flex: 1 }}
                                            ref={'BusinessAnswerView'}
                                            atlasId={common.CONST_ATLAS_ID_SSC_APPLY}
                                            businessQuestion={common.CONST_BUSINESS_Q_SSC_PROGRESS}
                                            businessCompleteQ={common.CONST_BUSINESS_COMPLETE_SSC_APPLY}

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

                                    <View style={{ flex: 1, justifyContent: 'center' }}>

                                        <View>
                                            <FlatList
                                                style={{ width: '100%', height: 5 }}
                                                // style={styles.cellViewStyle2}
                                                //加载数据源
                                                data={this.state.dataSource}
                                                //展示数据
                                                renderItem={({ index, item }) => this.showContentImage(index, item)}
                                                //默认情况下每行都需要提供一个不重复的key属性
                                                // keyExtractor={(item, index) => (index)}
                                                horizontal={true}
                                                //设置水平的排列的个数（只有垂直布局才起作用）
                                                numColumns={1}
                                                scrollEnabled={false} />


                                            <FlatList
                                                style={{ width: '100%', height: 20 }}
                                                // style={styles.cellViewStyle2}
                                                //加载数据源
                                                data={this.state.dataSource}
                                                //展示数据
                                                renderItem={({ index, item }) => this.showCell(index, item)}
                                                //默认情况下每行都需要提供一个不重复的key属性
                                                // keyExtractor={(item, index) => (index)}
                                                horizontal={true}
                                                //设置水平的排列的个数（只有垂直布局才起作用）
                                                numColumns={1}
                                                scrollEnabled={false} />
                                        </View>

                                    </View>

                                    <View style={{ marginLeft: '30%', marginBottom: '10%' }}>
                                        {/**** */}
                                        <View style={[styles.containerStyle, { marginTop: 5 }]}>
                                            <Text style={styles.textStyle2} >姓      名:</Text>
                                            <Text style={styles.textStyle3} >{this.state.userName}</Text>
                                        </View>

                                        {/**** */}
                                        <View style={styles.containerStyle}>
                                            <Text style={styles.textStyle2} >身份证号:</Text>
                                            <Text style={styles.textStyle3} >{ViewUtils.replaceSfzh(this.state.sfzh)}</Text>
                                        </View>
                                    </View>





                                    {/**** */}
                                    <View style={[styles.containerStyle, { marginBottom: 10 }]}>
                                        {/* {ViewUtils.getExitButton2(() => this.colsePage())} */}
                                        {/* {ViewUtils.getConfirmButton(() => this.commitData())} */}
                                        {ViewUtils.getExitButton2(() =>  this.jump2AnswerPage(common.CONST_BUSINESS_COMPLETE_SSC_PROGRESS) )}
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
                                this.jump2AnswerPage(common.CONST_BUSINESS_COMPLETE_SSC_PROGRESS)
                            } />

                        </View>
                    </Modal>

                    : null}
            </>




        );

    }
}
