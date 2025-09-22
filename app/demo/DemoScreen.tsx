import ImageViewer from 'react-native-image-zoom-viewer';
import { BaseComponent, triggerManager, BaseComponentProps, speechApi, FaceTrackSoundLocalizationComponent, ComponentEvent, BlurOverlay, TextListener, ComponentResultConst } from 'orionos-eve-core';
import React from 'react';
import { observer } from 'mobx-react';
import { StyleSheet, Button, Text, View, Animated, Image, TouchableOpacity, AlertIOS, FlatList, Dimensions, Modal, ScrollView, NativeModules, TouchableWithoutFeedback } from 'react-native';
import { WebView } from 'react-native-webview';
import { DemoViewModel } from './DemoViewModel';
import { DemoVoice } from './DemoVoice';
import { DemoTrigger } from './DemoTrigger';
import { demoModel } from './DemoModel';
import api, { getInitTopicUrl, getAnswerUrl, getSessionId, getRobotId, getProfessionalNoun } from '../config/api';
import VideoPlayScreen from '../tecsun/VideoPlayScreen'



//注册trigger跳转，必须添加，否则trigger无效
triggerManager.addTrigger(new DemoTrigger());

// //首先要导入Dimensions包
// var Diemnsions = require('Dimensions');
// var width = Diemnsions.get('window').width;
// var cols = 3;
// var cellH = 100;
// var vMargin = (width - cellH * cols) / (cols + 1);
// var HMargin = 25;

var i = 0;

var mStr = "";

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        flex: 1,
        // backgroundColor: 'rgba(52, 52, 52, 0.8)'//这会将其设置为具有 80% 不透明度的灰色，这是从不透明度小数派生的0.8. 该值可以是从0.0到 的任何值1.0。

        position: 'absolute',
        // elevation: 10,
        height: "100%",
        width: "100%",
    },
    containerLeft: {
        // top: 20,
        flex: 1,

        flexDirection: 'column',
        alignItems: 'flex-start',
    },

    containerHorizontal: {
        top: 20,
        // flex: 1,
        // height: 0,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    containerRight: {
        top: 20,
        flex: 1.8,
        right: 10,
        borderRadius: 10,
        borderWidth: 1,
        // borderColor: '#B8D2FF5C',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingHorizontal: 5,
        paddingVertical: 5,
        height: 245
    },
    iconLeft: {
        left: 23,
        top: 0,
        width: 20,
        height: 20,
    },
    iconMessage: {
        left: 0,
        top: -25,
        width: 50,
        height: 50,
    },
    iconClose: {
        top: -12,
        right: -10,
        width: 38,
        height: 38,
    },
    containerMessage: {
        flexDirection: 'row',
        justifyContent: "space-between",
        height: 25
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    // cellViewStyle: {
    //     width: cellH,
    //     height: cellH,
    //     marginLeft: vMargin,
    //     marginTop: HMargin,
    //     alignItems: 'center',
    // },
    itemClickStyle: {
        // borderRadius: 12,
        // marginRight: 50,
        //   width: 0,
        // height: 0,
        // borderWidth: 1,
        // borderColor: '#B8D2FF5C',
        // backgroundColor: 'rgba(255,255,255, 0.3)',
        // paddingHorizontal: 5,
        // paddingVertical: 5,

        marginBottom: 3
    }

});

// const styles = StyleSheet.create({
//     container: {
//         alignItems: 'flex-start',
//         flexDirection: 'row',
//         flex: 1,
//         backgroundColor: 'rgba(52, 52, 52, 0.8)'//这会将其设置为具有 80% 不透明度的灰色，这是从不透明度小数派生的0.8. 该值可以是从0.0到 的任何值1.0。
//     },
//     containerLeft: {
//         top: 20,
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'flex-start',
//     },

//     containerRight: {
//         top: 20,
//         flex: 1.8,
//         right: 10,
//         borderRadius: 10,
//         borderWidth: 1,
//         // borderColor: '#B8D2FF5C',
//         backgroundColor: 'rgba(0, 0, 0, 0.8)',
//         paddingHorizontal: 15,
//         paddingVertical: 17,
//         height: 250
//     },
//     iconLeft: {
//         left: 23,
//         top: 0,
//         width: 20,
//         height: 20,
//     },
//     iconMessage: {
//         left: 0,
//         top: -35,
//         width: 50,
//         height: 50,
//     },
//     iconClose: {
//         top: -22,
//         right: -18,
//         width: 40,
//         height: 40,
//     },
//     containerMessage: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: "space-between",
//     },
//     welcome: {
//         fontSize: 20,
//         textAlign: 'center',
//         margin: 10,
//     },
//     instructions: {
//         textAlign: 'center',
//         color: '#333333',
//         marginBottom: 5,
//     },
// });


//第一板没加延时
const INJECTEDJAVASCRIPT_0 = `
//这是缩放的
document.body.style.userSelect = 'none';
const meta = document.createElement('meta');
meta.setAttribute('content', 'initial-scale=1, maximum-scale=1, user-scalable=0');
meta.setAttribute('name', 'viewport');
document.getElementsByTagName('head')[0].appendChild(meta);
//高度获取
//let webHeight = document.body.getBoundingClientRect().height;
let webHeight = document.body.scrollHeight;
window.ReactNativeWebView.postMessage(webHeight);


`;

//第一板没加延时
const INJECTEDJAVASCRIPT_1 = `
document.body.style.userSelect = 'none';
const meta = document.createElement('meta');
meta.setAttribute('content', 'initial-scale=1, maximum-scale=1, user-scalable=0');
meta.setAttribute('name', 'viewport');
document.getElementsByTagName('head')[0].appendChild(meta);
//高度获取
//let webHeight = document.body.getBoundingClientRect().height;
let webHeight = document.body.scrollHeight;
window.ReactNativeWebView.postMessage(webHeight);


`;


////第二版加了延迟, 多个长图能显示完整
const INJECTEDJAVASCRIPT = `
document.body.style.userSelect = 'none';
const meta = document.createElement('meta');
meta.setAttribute('content', 'initial-scale=1, maximum-scale=1, user-scalable=0');
meta.setAttribute('name', 'viewport');
document.getElementsByTagName('head')[0].appendChild(meta);

(function () {
    var height = null;
    function changeHeight() {
      if (document.body.scrollHeight != height) {
        height = document.body.scrollHeight;
        if (window.postMessage) {
          window.ReactNativeWebView.postMessage(height)
        }
      }
    }
    setTimeout(changeHeight, 400);;
} ())
`;

////第二版加了延迟, 多个长图能显示完整
const INJECTEDJAVASCRIPT2 = `

document.body.style.userSelect = 'none';
const meta = document.createElement('meta');
meta.setAttribute('content', 'initial-scale=1, maximum-scale=1, user-scalable=0');
meta.setAttribute('name', 'viewport');
document.getElementsByTagName('head')[0].appendChild(meta);

(function () {
    var height = null;
    function changeHeight() {
      if (document.body.scrollHeight != height) {
        height = document.body.scrollHeight;
        if (window.postMessage) {
          window.ReactNativeWebView.postMessage(height)
        }
      }
    }
    setTimeout(changeHeight, 400);
} ())
`;




// const tecsunReadCardModule = NativeModules.TecsunReadCardModule;


/**
 * 功能UI界面
 */
@observer
export class DemoScreen extends BaseComponent<BaseComponentProps, DemoViewModel, DemoVoice> {

    public viewModel: DemoViewModel;

    public constructor(props: BaseComponentProps) {
        super(props);

        this.myLog(">>>>>>>>> props 1  <<<<<<<<<<<<<");
        console.log('%j', props);

        this.myLog(">>>>>>>>> props.navigation  <<<<<<<<<<<<<");
        console.log('%j', props.navigation);
        this.myLog(">>>>>>>>> props.navigation.state  <<<<<<<<<<<<<");
        console.log('%j', props.navigation.state);
        this.myLog(">>>>>>>>> props.navigation.state.params  <<<<<<<<<<<<<");
        console.log('%j', props.navigation.state.params);
        this.myLog(">>>>>>>>> props.navigation.state.params.result  <<<<<<<<<<<<<");
        console.log('%j', props.navigation.state.params.result);
        this.myLog(">>>>>>>>> props.navigation.state.params.result.userText  <<<<<<<<<<<<<");
        console.log('%j', props.navigation.state.params.result.userText);

        this.myLog(">>>>>>>>> props 2 <<<<<<<<<<<<<");

        // this.myLog(props.navigation.state.params);
        // this.myLog(props);

        this.viewModel = new DemoViewModel();
        let voice = new DemoVoice(this.viewModel, this);

        //关联ViewModel及Voice的生命周期到当前界面上
        this.setViewModel(this.viewModel);
        this.setVoice(voice);

        // global.recognition && global.recognition.setShow(true);
        // global.recognition.setGuideShow(true);

        this.state = {
            webViewHeight: 250,
            myINJECTEDJAVASCRIPT: INJECTEDJAVASCRIPT,
            myINJECTEDJAVASCRIPTForProfessionalNoun: INJECTEDJAVASCRIPT,
            showImgUrl: [],
            isCanShowProfessionalNoun: false,
            isCanShowImg: false,
            isFirstShow: true,
            isCanSound: true,
            speakText: "",
            showVideo: false,
            videoUrl: "",
            mSessionId: getSessionId(),
            // questionStr: "为什么要使用社保卡发养老金",
            answerTitle: "",
            dataSource: [

                { key: 1, value: "什么是电子社保卡？" },
                { key: 2, value: "电子社保卡如何申领？" },
                { key: 3, value: "社保卡有效期有多长？" },
                { key: 4, value: "社保卡有什么功能？" },
                { key: 6, value: "电子社保卡目前实现了哪些功能？" },
                { key: 7, value: "社保卡医疗应用有哪些功能？" },
                { key: 8, value: "社保卡可以做公交吗？" },
                { key: 9, value: "电子社保卡手机号如何修改？" },

                //todo 调试部分
                // { key: 5, value: "1、为什么要使用社保卡发养老金？1、为什么要使用社保卡发养老金？1、为什么要使用社保卡发养老金？1、为什么要使用社保卡发养老金？1、为什么要使用社保卡发养老金？" },
                // { key: 10, value: "2、社保卡卡面有什么？" },
                // { key: 11, value: "为什么要使用社保卡发养老金？" },
                // { key: 12, value: "工伤保险..." },
            ],
            // htmlData: "<p>Hello world</p>"
            htmlData: "<p> </p>",
            htmlDataForProfessionalNoun: "<p></p>"
            // htmlData:"<style>*{color:#fff !important;}</style>" +"Hello world"
        }

        this.myLog("constructor");
        this.initTopicUrl()

    }

    public componentDidMount() {
        //重写界面的didMount，必须调用super
        super.componentDidMount();
        speechApi.setRecognizeMode(true);

        this.myLog("!!componentDidMount");
        // this.myLog("this.props.navigation.state.param.result.userText = " + this.props.navigation.state.param.result.userText);
        // this.requestAnswerData(this.props.navigation.state.param.result.userText)
        // this.requestAnswerData("为什么要使用社保卡发养老金")
        // this.requestAnswerData("使用社保卡发养老金")
        // this.requestAnswerData("社保卡咨询")
        //社保卡卡面有什么？
        // this.requestAnswerData("社保卡卡面有什么？")
        this.initTopicUrl()

        let text = this.props.navigation.state.params.result.userText


        setTimeout(
            () => {
                if (text != "" && text != null && text != undefined) {
                    console.log("不为空");
                    this.requestAnswerData(text)
                }
                else {
                    console.log("为空");
                    this.requestAnswerData("欢迎语")
                }
            }, 300
        )


        // if (text != "" && text != null && text != undefined) {
        //     console.log("不为空");
        //     this.requestAnswerData(text)
        // }
        // else {
        //     console.log("为空");
        //     this.requestAnswerData("欢迎语")
        // }

        // tecsunReadCardModule.createReadIDCardBuilderAndInit((err: string) => {
        //     console.log('createReadIDCardBuilderAndInit err ', err);
        // }, (result: object) => {
        //     console.log('createReadIDCardBuilderAndInit result ', result);
        // })
    }

    public componentWillMount() {
        this.myLog("componentWillMount");
    }

    public componentWillUnmount() {
        //重写界面的Unmount，必须调用super
        super.componentWillUnmount();
        this.myLog("componentWillUnmount");

        this.stopTTS()
    }

    public onStatusUpdate = (event?: ComponentEvent): boolean => {

        console.log(">>> onStatusUpdate <<<");

        speechApi.setAngleCenterRange(0,45)
        //TODO: 状态处理
        return true;
    };

    public onFinish = (result?: ComponentEvent): boolean => {


        speechApi.setAngleCenterRange(0,90)

        console.log(">>> onFinish <<<");
        // this.viewModel.exit();
        // this.viewModel.wakeUp();
        //TODO: 结果处理
        console.log(">>> ComponentResultConst.RESULT_TIMEOUT  = " + ComponentResultConst.RESULT_TIMEOUT);
        console.log(">>> result?.status  = " + result?.status);
        if (ComponentResultConst.RESULT_TIMEOUT == result?.status) {
            this.viewModel.exit()// 暂时关掉, 后面要重新打开;
            // this.viewModel.wakeUp();
        }

        return true;
    };

    /// 点击了工具栏上的播放按钮
    public onControlSound() {

        let obj1 = this.state.isCanSound
        this.setState({
            isCanSound: !obj1,
        })

        if (obj1) {
            this.playText("好的, 我闭嘴,暂时就不闲聊啦")
            // this.stopTTS()      
        }
        else {
            this.playText(this.state.speakText)
        }

    }

    public scrollToTop() {
        this.refs['scrollView'].scrollWithoutAnimationTo(0, 0)
    }


    public render() {


        const INJECTEDJAVASCRIPT = `
        //这是缩放的
        const meta = document.createElement('meta');
        meta.setAttribute('content', 'initial-scale=1, maximum-scale=1, user-scalable=0');
        meta.setAttribute('name', 'viewport');
        document.getElementsByTagName('head')[0].appendChild(meta);
        //高度获取
        //let webHeight = document.body.getBoundingClientRect().height;
        let webHeight = document.body.scrollHeight;
        window.ReactNativeWebView.postMessage(webHeight);
    `;




        return (
            <>
                <FaceTrackSoundLocalizationComponent

                    onStatusUpdate={this.onStatusUpdate}
                    onFinish={
                        this.onFinish
                    }

                />

                <BlurOverlay
                    style={{ flex: 1, justifyContent: 'center', alignContent: 'center', position: 'relative' }}
                    showBlurOverlay={true}
                    hasFaceParticle={false}>
                </BlurOverlay>



                <View style={styles.container}>

                    <View style={styles.containerLeft}>
                        {/* <Image
                    source={require('../../img/bg.png')}
                ></Image> */}

                        <View style={styles.containerHorizontal}>
                            <Animated.Image style={styles.iconLeft} source={require('../../img/popup_mic_img.png')}>
                            </Animated.Image>
                            <Text style={{ fontSize: 11, color: 'white', left: 25, top: 2, }}>您还可以问我:</Text>
                        </View>

                        <FlatList

                            style={{ top: 25, left: 30, marginRight: 50, marginBottom: 70 }}
                            // style={styles.cellViewStyle2}
                            //加载数据源
                            data={this.state.dataSource}
                            //展示数据
                            renderItem={({ index, item }) => this.showCell(index, item)}
                            //默认情况下每行都需要提供一个不重复的key属性
                            // keyExtractor={(item, index) => (index)}
                            //设置垂直布局（）
                            horizontal={false}
                            //设置水平的排列的个数（只有垂直布局才起作用）
                            numColumns={1} />

                    </View>


                    <View style={styles.containerRight}>
                        <View style={styles.containerMessage}>
                            <Animated.Image style={styles.iconMessage} source={require('../../img/popup_message_img.png')} />

                            {/* <Animated.Image style={styles.iconClose} source={require('../../img/popup_cancel_btn.png')} /> */}

                            {/* <Button ></Button> */}
                            <TouchableOpacity onPress={() => {
                                this.viewModel.exit()
                                // speechApi.queryByText('退出');
                            }}>
                                <Image style={styles.iconClose} source={require('../../img/popup_cancel_btn.png')} />
                            </TouchableOpacity>
                        </View>


                        <View style={{ flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'baseline' }}>

                            <TouchableOpacity activeOpacity={0.5} onPress={() => {
                                this.onControlSound()
                            }}>
                                {/* <Image
                                    style={{ height: 17.5, width: 50, left: 10, right: 10 }}
                                    source={this.state.isCanSound ? require('../../img/popup_stop_btn.png') : require('../../img/popup_play_btn.png')} /> */}

                                {this.state.isCanSound ? <Image
                                    style={{ height: 17.5, width: 50, left: 10, right: 10 }}
                                    source={require('../../img/popup_stop_btn.png')} /> :
                                    <Image
                                        style={{ height: 17.5, width: 50, left: 10, right: 10 }}
                                        source={require('../../img/popup_play_btn.png')} />

                                }
                            </TouchableOpacity>


                            <Text numberOfLines={1} style={{ fontSize: 13, color: 'white', left: 20, width: 250 }}>{this.state.answerTitle}</Text>

                        </View>



                        {/* <Text style={{ fontSize: 13, color: 'white', top: -5, left: 5 }}>{this.state.answerTitle}</Text> */}






                        {/* <WebView source={{ uri: 'https://reactnative.dev/' }} /> */}

                        {/* <View style={{ flex: 1, flexDirection: 'row', top: -25 }}> */}



                        <ScrollView ref="scrollView" style={{ backgroundColor: 'transparent', width: "100%",flex:1 }}>
                        {/* <ScrollView ref="scrollView" style={{ flex: 1 }}> */}
                            <WebView
                                // style={{ backgroundColor: 'transparent', height: 0, width: "100%", top: 0 }}
                                style={{ backgroundColor: 'transparent', height: this.state.webViewHeight, width: "100%", top: 0 }}
                                javaScriptEnabled={true}
                                originWhitelist={['*']}
                                // source={{ html: this.state.htmlData }}
                                injectedJavaScript={this.state.myINJECTEDJAVASCRIPT}
                                scalesPageToFit={true}//很重要
                                automaticallyAdjustContentInsets={true}
                                source={{ html: this.state.htmlData }}
                                mixedContentMode={'compatibility'}
                                // mediaPlaybackRequiresUserAction={false}//设置页面中的HTML5音视频是否需要在用户点击后再开始播放。默认值为true
                                onMessage={({ nativeEvent: { data } }) => {
                                    console.log(">>>>> ldw data = " + data)
                                    if (data.endsWith("#t=0.1")) {
                                        console.log(">>>>> data.endsWith(\"#t=0.1\") <<<<<<<<<<<")
                                        this.setState({
                                            showVideo: true,
                                            videoUrl: data
                                        })
                                        this.stopTTS()
                                        //  this.refs.videoPlayScreen.playVideo()
                                        global.recognition && global.recognition.setShow(false);

                                    }
                                    //http开头的是连接, 不是视频就是图片了
                                    else if (data.startsWith("http")) {
                                        this.setState({
                                            showImgUrl: [{ url: data, props: {} }],
                                            isCanShowImg: true,
                                        })
                                    }
                                    else if (data.includes('_dataName')) {
                                        // console.log("data.endsWith(_dataName) = " + data)
                                        let newData = data.replace("_dataName", "")
                                        console.log("newData = " + newData)
                                        if(newData != null && newData!="null" && newData!='' && newData !="undefined"){
                                           
                                            this.getProfessionalNoun(newData)
                                        }
                                       
                                        //todo 调用接口
                                    }
                                    else {
                                        console.log("ldw>>>>>typeof(data) == Number")
                                        // this.setState({
                                        //     webViewHeight: parseInt(data)
                                        // });
                                        if(!isNaN(parseFloat(data)) && isFinite(data)){
                                            console.log("进来了 = true" )
                                            this.setState({
                                                webViewHeight: parseInt(data)
                                            });
                                        }
                                    }

                                    console.log(">>>>> his.state.showVideo = " + this.state.showVideo)
                                }}
                            />
                        </ScrollView>



                        {/* </View> */}
                        {/* <View style={{ flex: 1, flexDirection: 'row', top: -25 }}>
                            <WebView
                                style={{ backgroundColor: 'transparent', height: 2500 }}
                                javaScriptEnabled={true}
                                originWhitelist={['*']}
                                // source={{ html: this.state.htmlData }}
                                injectedJavaScript={INJECTEDJAVASCRIPT}
                                scalesPageToFit={false}
                                automaticallyAdjustContentInsets={true}
                                source={{ html: this.state.htmlData }}
                            />

                        </View> */}

                    </View>

                </View>

                {this.state.showVideo ? <View style={{
                    elevation: 18,
                    alignItems: 'flex-start',
                    flexDirection: 'row',
                    flex: 1,
                    // backgroundColor: 'rgba(52, 52, 52, 0.8)',//这会将其设置为具有 80% 不透明度的灰色，这是从不透明度小数派生的0.8. 该值可以是从0.0到 的任何值1.0。
                    // backgroundColor: 'rgba(52, 52, 52, 0.5)',
                    position: 'absolute',

                    height: "100%",
                    width: "100%",
                }} ><VideoPlayScreen videoUrl={this.state.videoUrl} ref="videoPlayScreen" hideVideo={this.hideVideo} /></View> : null}

                {this.state.isCanShowImg ?
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

                            <ImageViewer
                             //todo 下面的style要写死, 不能用100%, 否则偶尔会出现bug不满屏, 但是写死宽高又有偏移, 所以加入-40, 估计是框架的bug
                                 style={{
                                    height: 360,
                                    width: 640,
                                    marginLeft:-40,
                                    marginBottom:-40
                                   }}

                                imageUrls={this.state.showImgUrl}
                                onClick={() => {
                                    this.setState({
                                        isCanShowImg: false,
                                    })

                                }}

                                onLongPress={()=>{}}
                            />

                        {/* </View> */}
                    </Modal>

                    // </View> 
                    : null}

                {this.state.isCanShowProfessionalNoun ?

                    <Modal
                        animationType={"slide"}  //控制弹出框的弹出动画方式'none', 'slide', 'fade'三种方式


                        transparent={true}  //弹出框周边颜色是否透明，一般都是透明，要不一片惨白。。。
                        visible={true}  //控制弹出框是不是显示。。。
                        onRequestClose={() => {  //弹出框消失的时候的回调函数。。。一般没用
                        }}>

                        <View style={{
                            backgroundColor: 'rgba(0, 0, 0, 1)',
                            elevation: 20,
                            alignItems: 'flex-start',
                            flexDirection: 'row',
                            flex: 1,
                            // backgroundColor: 'rgba(52, 52, 52, 0.8)',//这会将其设置为具有 80% 不透明度的灰色，这是从不透明度小数派生的0.8. 该值可以是从0.0到 的任何值1.0。
                            // backgroundColor: 'rgba(52, 52, 52, 0.5)',
                            position: 'absolute',
                            height: "100%",
                            width: "100%",
                        }} >

                            <TouchableWithoutFeedback onPress={() => { this.closeProfessionalNounShow() }}>
                                <Image
                                    style={{
                                        width: 40,
                                        height: 40,
                                        marginLeft: 5,
                                        marginTop: 5
                                    }}
                                    source={require('../../img/popup_cancel_btn.png')}
                                />
                            </TouchableWithoutFeedback>

                            <WebView
                                style={{ backgroundColor: 'transparent', height: "100%", width: "100%", marginTop: 30 }}
                                javaScriptEnabled={true}
                                originWhitelist={['*']}
                                injectedJavaScript={this.state.myINJECTEDJAVASCRIPTForProfessionalNoun}
                                scalesPageToFit={true}//很重要
                                automaticallyAdjustContentInsets={true}
                                source={{ html: this.state.htmlDataForProfessionalNoun }}
                                mixedContentMode={'compatibility'}
                            />
                            <View
                                style={{
                                    width: 40,
                                    height: 40,
                                    marginTop: 5
                                }}

                            />


                        </View></Modal> : null
                }



            </>
        );
        // return (
        //     <View style={styles.container}>

        //         <View style={styles.containerLeft}>
        //             {/* <Image
        //             source={require('../../img/bg.png')}
        //         ></Image> */}
        //             <Animated.Image style={styles.iconLeft} source={require('../../img/popup_mic_img.png')}>
        //             </Animated.Image>
        //             <Text style={{ fontSize: 11, color: 'white', left: 25, top: 2, }}>你还可以问我:</Text>

        //         </View>


        //         <View style={styles.containerRight}>
        //             <View style={styles.containerMessage}>
        //                 <Animated.Image style={styles.iconMessage} source={require('../../img/popup_message_img.png')} />
        //                 <Animated.Image style={styles.iconClose} source={require('../../img/popup_cancel_btn.png')} />
        //             </View>

        //             <Text style={{ fontSize: 13, color: 'white' }}> {demoModel.getInfoText()}</Text>
        //         </View>

        //     </View>

        // );

    }


    public showCell(index, item) {
        return (
            //添加手势
            <View >
                <TouchableOpacity activeOpacity={0.5} onPress={() => {
                    // this.setState({
                    //     questionStr: item.value
                    // })
                    this.requestAnswerData(item.value)

                }}>
                    <View style={styles.itemClickStyle}>
                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <View style={{ backgroundColor: 'rgba(128,128,128, 0.4)', borderRadius: 11, paddingHorizontal: 5, paddingVertical: 5 }}>
                                {/* <Text style={{ color: 'white', backgroundColor:"blue",width:90}}>{item.value}</Text> */}
                                {/* <Text style={{ fontSize: 12, color: 'white', paddingHorizontal: 5, paddingVertical: 5, }}>{item.value}</Text> */}
                                <Text style={{ fontSize: 11.5, color: '#F5F5F5', lineHeight: 15 }}>{"\"" + item.value + "\""}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }



    //1、为什么要使用社保卡发养老金？ 2、社保卡卡面有什么？
    //为什么要使用社保卡发养老金？
    //https://zhiliao.e-tecsun.com/api/cloud/robot/1402829993645576192/answer?question=商业贷款&channel=app&sessionId=100&userId=robot16 
    //https://zhiliao.e-tecsun.com/api/cloud/robot/1402829993645576192/answer?question=%E5%95%86%E4%B8%9A%E8%B4%B7%E6%AC%BE&channel=app&sessionId=100&userId=robot16
    public requestAnswerData(questionStr: string) {



        if (this.state.isCanShowImg || this.state.showVideo || this.state.isCanShowProfessionalNoun) {

            console.log("过滤了....")
            return
        }





        // var javascript = "" + "var objs = document.getElementsByTagName('span');" +
        // "for(var i=0;i<objs.length;i++){" +
        // "   let mObject = objs[i];" +
        // "mObject.setAttribute('style', \"position:relative;top:0%;left:10%;width:80%;height:auto\"); " +
        // "objs[i].onclick=function(){" +

        // "   window.ReactNativeWebView.postMessage(mObjectV.src )" +
        // "}}"

        //下面这个是原版
        var javascript = "" + "var objs = document.getElementsByTagName('img');" +


            "for(var i=0;i<objs.length;i++){" +
            "   let mObject = objs[i];" +
            "mObject.setAttribute('style', \"position:relative;top:0%;left:10%;width:80%;height:auto\"); " +
            "objs[i].onclick=function(){" +

            "window.ReactNativeWebView.postMessage(mObject.src)" +
            "}}"



        // let javascript = "" +
        //     "var objs = document.getElementsByTagName('img');" +
        //     "for(var i=0;i<objs.length;i++){" +
        //     // "var mObject = objs[i]"+
        //     "objs[i].onclick=function(){" +
        //     "window.postMessage('111')" +
        //     // " console.log(\"图片被点击了\")" + 
        //     // "window.connect.showImg(this.src,this.getAttribute(\"class\"))" +
        //     "}" +
        //     "}"


        var js2 =

            " window.scrollTo(0,0); " +
            "var objsV = document.getElementsByTagName('video');" +
            "for(var i=0;i<objsV.length;i++){" +
            "let mObjectV = objsV[i];" +
            " mObjectV.src = (mObjectV.src + \"#t=0.1\");" +
            // "mObjectV.removeAttribute('controls');" +

            // "mObjectV.setAttribute('width', '80%'); "+
            // "mObjectV.setAttribute('height', auto); "+

            "mObjectV.setAttribute('controlsList', 'nodownload nofullscreen noremoteplayback noplaybackrate '); " +

            "mObjectV.setAttribute('style', \"position:relative;top:0%;left:10%;width:80%;height:auto\"); " +

            // "objsV[i].onclick=function(){     " +
            // "   window.ReactNativeWebView.postMessage(mObjectV.src )" +
            // " }" +

            "   mObjectV.addEventListener(\"play\", function(event) {   "+
            "   window.ReactNativeWebView.postMessage(mObjectV.src );" +
            "   mObjectV.pause();"+         
            " }, false);"+
            "}"








        // var js3 =
        //     " var objsP = document.getElementsByTagName('p');" +
        //     " for(var i=0;i<objsP.length;i++){" +
        //     "    let mObjectP = objsP[i];" +
        //     "    mObjectP.setAttribute('width', \"add width's attribute\");  " +
        //     "    mObjectP.setAttribute('width', 100);  " +
        //     " }"


        var js4 =
            " var objsSpan = document.getElementsByTagName('span');" +
            " for(var i=0;i<objsSpan.length;i++){" +
            "let mObjsS = objsSpan[i];" +
            "objsSpan[i].onclick=function(){     " +
            "let dataName = mObjsS.getAttribute(\"data-name\");" +
            "   window.ReactNativeWebView.postMessage(dataName + \"_dataName\");" +
            //"   window.ReactNativeWebView.postMessage(\"我在中....\");" +
            " }" +

            " }"





        console.log("requestAnswerData");
        let mUrl = getAnswerUrl(questionStr, this.state.mSessionId)
        this.myLog("猎户发送的连接: " + mUrl)
        fetch(mUrl)
            // fetch('https://zhiliao.e-tecsun.com/api/cloud/robot/1402829993645576192/answer?question=商业贷款&channel=app&sessionId=100&userId=robot16')
            .then((response) => response.json())
            // .then(function (res) {
            //     console.log('猎户 res: ' + res)
            //     console.log("猎户 fetch request ", JSON.stringify(res.ok));
            //     if (res.ok) {

            //         res.json().then(function (json) {
            //             console.info("猎户 json = " + json);
            //             mStr = json

            //         });


            //         // res.json().then(function (json) {

            //         //     console.info("猎户 json = "+json);

            //         // });
            //     } else {
            //         console.log("数据错误");

            //     }
            // }).catch(function (e) {
            //     console.log('报错了:  ' + e);
            // });



            .then((json) => {
                // console.log("\n");
                console.log("猎户 requestAnswerData JSON.stringify(json)");
                console.log(json);
                console.log("猎户 json._bodyInit=  " + json._bodyInit);
                // let jsonData = JSON.parse(json._bodyInit)
                let jsonData = json
                let title = jsonData.answers[0].target_std
                console.log("猎户 title=  " + title);
                // this.setState({
                //     answerTitle: title
                // })

                let number = 0

                let arr1 = []
                //遍历
                let suggestions = jsonData.answers[0].suggestions
                // if(suggestions != false){
                let newArr1 = suggestions.map(function (item, index, arr) { // 第一个参数是数组的当前元素，第二个参数是当前元素下标，第三个参数是操作数组
                    return { key: number += 1, value: item };
                });

                if (newArr1 == false) {
                }
                else {
                    arr1 = newArr1
                }
                // }


                console.log("arr1>>>>> = " + arr1);
                if (arr1.length == 0) {
                    let choices = jsonData.answers[0].choices
                    // if(choices != false){
                    let newArr2 = choices.map(function (item, index, arr) {
                        return { key: number += 1, value: item };
                    });
                    if (newArr2.length != 0) {
                        arr1 = newArr2
                    }
                    // }
                }


                // let content = "<style>*{color:#fff !important;}</style>" + jsonData.answers[0].respond


                // console.log("suggestions.length >>> = " + suggestions.length);

                // console.log("arr1.length >>> = " + arr1.length);

                 //l只有增城 dw  以后的逻辑都是为空也更新上去;
                if (arr1.length != 0) {
                    this.setState({
                        dataSource: arr1,
                    })
                }









                // let newData = jsonData.answers[0].respond
                let newData = jsonData.answers[0].answer
                //拿<p>包裹就会变白色, 不知道为啥
                newData = "<p>" + newData + "</p>"

                let controlStr = "<style> video::-webkit-media-controls-enclosure{ display: none;} </style>";

                //"<style>* {font-size:14px;line-height:20px;}p {color:#FFFFFF;font-size:14px;} </style>"
                //拼接成一个完成的 HTML，
                let html = controlStr + "<style>* {font-size:14px;line-height:18px;}p {color:#FFFFFF;font-size:14px;margin:0 auto} </style>" + newData +
                    "<html><head><style type='text/css'> </style> </head> <body>" + "</body>  <script> " +
                    javascript +
                    " </script> <script>  " +
                    js2 +
                    " </script> <script> " +
                    js4 +
                    "</script></html>"


                // let html = newData + "<html><head><style type='text/css'>" + "</style>" +
                //     "</head>" + "<body> </body>  <script> " + javascript + " </script> <script>  " + js2 + " </script> <script> " + "</script></html>"

                html = html.replace("<P></P>", "")
                html = html.replace("<p></p>", "")

                console.log("html = >>> = " + html);


                //todo  判断当前是否有数据:
                let nowIsFirstShow = this.state.isFirstShow

                //第一次进来, 或者存在答案, 都要读一读;
                if (nowIsFirstShow || jsonData.answers[0].semanticId != "NOT_FOUND") {


                    if (nowIsFirstShow) {
                        this.setState({
                            isFirstShow: false
                        })
                    }

                    if (title != "none") {
                        this.setState({
                            answerTitle: title
                        })
                    }
                    else {
                        this.setState({
                            answerTitle: " "
                        })

                    }




                    if (i == 0) {
                        this.scrollToTop();

                        var newHtml = html
                        newHtml = newHtml.replace("class='professional'", " style=\"color:#048DFF;cursor:pointer;text-decoration: underline;\"")

                        console.log("newHtml = >>> = " + newHtml);


                        //todo 这里不加入这个的话, 默认是拿上一次的高度, 会有问题;
                        this.setState({
                            webViewHeight: 250
                        });

                        this.setState({
                            myINJECTEDJAVASCRIPT: INJECTEDJAVASCRIPT_0,
                        })

                        this.setState({
                            // dataSource: arr1,
                            // htmlData: jsonData.answers[0].respond
                            // htmlData: "<style>*{color:#fff !important;}</style>" + html,
                            htmlData: newHtml,
                            isCanShowImg: false,
                            myINJECTEDJAVASCRIPT: INJECTEDJAVASCRIPT,
                        })
                        i = 1;
                    }
                    else {
                        this.scrollToTop();

                        var newHtml = "<style> </style>" + html
                        newHtml = newHtml.replace("class='professional'", "style=\"color:#048DFF;cursor:pointer;text-decoration: underline;font-family: 微软雅黑, &quot;\" ")

                        console.log("newHtml = >>> = " + newHtml);


                        this.setState({
                            webViewHeight: 250
                        });

                        this.setState({
                            myINJECTEDJAVASCRIPT: INJECTEDJAVASCRIPT_1,
                        })

                        this.setState({
                            // dataSource: arr1,
                            // htmlData: jsonData.answers[0].respond
                            //htmlData: html + "<style>*{color:#fff !important;}</style>",
                            htmlData: newHtml,
                            isCanShowImg: false,
                            myINJECTEDJAVASCRIPT: INJECTEDJAVASCRIPT2,
                        })
                        i = 0;
                    }



                    this.setState({
                        speakText: jsonData.answers[0].plainText
                    })

                    var nowIsCanSouncd = this.state.isCanSound
                    console.log("nowIsCanSouncd = " + nowIsCanSouncd);
                    if (nowIsCanSouncd) {
                        this.playText(this.state.speakText)
                    }
                }

                //非第一次进来, 而且也没答案, 就提示下识别不到吧;
                if (!nowIsFirstShow && jsonData.answers[0].semanticId == "NOT_FOUND") {
                    var nowIsCanSouncd = this.state.isCanSound
                    console.log("nowIsCanSouncd = " + nowIsCanSouncd);
                    if (nowIsCanSouncd) {
                        this.playText(jsonData.answers[0].plainText)
                    }
                }


                console.log("this.state.htmlData >>> = " + this.state.htmlData);


            })
            .catch((error) => {
                console.log('requestAnswerData fetch error:' + error);
            })

    }







    public getProfessionalNoun(questionStr: string) {

        console.log("getProfessionalNoun");
        let mUrl = getProfessionalNoun(questionStr)
        this.myLog(mUrl)
        fetch(mUrl)
            .then((response) => response.json())
            .then((json) => {


                console.log("requestAnswerData JSON.stringify(json)");
                console.log(json);
                console.log("json._bodyInit=  " + json._bodyInit);
                //<p><img src="http://zhiliao.e-tecsun.com/cloud/file/downloadFile?fullPath=group1/M00/00/40/rBAAL2MO7iyAKH2dAAKAs5KPbdo176.jpg" alt="社保卡（样表）.jpg"/></p>
                // let jsonData = JSON.parse(json._bodyInit)
                let jsonData = json
                let nounParaphrase = jsonData.data.nounParaphrase
                console.log("nounParaphrase =  " + nounParaphrase);

                let newData = nounParaphrase

                //拿<p>包裹就会变白色, 不知道为啥
                newData = "<p>" + newData + "</p>"

                if (newData.includes('img')) {
                    this.setState({
                        myINJECTEDJAVASCRIPTForProfessionalNoun: ''
                    })
                }
                else {
                    this.setState({
                        myINJECTEDJAVASCRIPTForProfessionalNoun: INJECTEDJAVASCRIPT
                    })
                }




                var javascript = "" + "var objs = document.getElementsByTagName('img');" +


                    "for(var i=0;i<objs.length;i++){" +
                    "   let mObject = objs[i];" +
                    "mObject.setAttribute('style', \"position:relative;top:0%;left:20%;width:60%;height:auto\"); " +
                    "objs[i].onclick=function(){" +

                    // "window.postMessage(mObject.src)" +
                    "}}"


                var js2 =
                    // "let webHeight = document.body.scrollHeight;" + 
                    // "window.postMessage(152);"+

                    "var objsV = document.getElementsByTagName('video');" +
                    " window.scrollTo(0,0); " +
                    "for(var i=0;i<objsV.length;i++){" +
                    "let mObjectV = objsV[i];" +
                    " mObjectV.src = (mObjectV.src + \"#t=0.1\");" +
                    "mObjectV.removeAttribute('controls');" +

                    // "mObjectV.setAttribute('width', '80%'); "+
                    // "mObjectV.setAttribute('height', auto); "+
                    //  " window.scrollTo(0,0); "+
                    "mObjectV.setAttribute('controlsList', 'nodownload noplaybackrate'); " +
                    "mObjectV.setAttribute('style', \"position:relative;top:0%;left:10%;width:80%;height:auto\"); " +

                    "objsV[i].onclick=function(){     " +
                    // "   window.postMessage(mObjectV.src );" +
                    // "  window.postMessage(100);" +
                    " }" +
                    "}"

                // var js3 = "" + "var objs = document.getElementsByTagName('p');" +


                // "for(var i=0;i<objs.length;i++){" +
                // "   let mObject = objs[i];" +
                // "mObject.setAttribute('style', \"font-size:16px;line-height:25px;\"); " +
                // "objs[i].onclick=function(){" +

                // // "window.ReactNativeWebView.postMessage(mObject.src)" +
                // "}}"

                // let html = "<style>* {font-size:16px;line-height:25px;}p {color:#FFFFFF;font-size:16px;} </style>" + newData + "<html><head><style type='text/css'>" + "</style>" +
                //     // "</head> <body>" + "</body>  <script> " + javascript + " </script> <script>  " + js2 + " </script> <script> " + js3 + "</script><script>" + js4 + "</script></html>"
                //     "</head> <body>" + "</body>  <script> " +
                //     javascript +
                //     " </script> <script>  " +
                //     js2 +
                //     "</script></html>"

                let html = "<style>* {font-size:14px;line-height:18px;}p {color:#FFFFFF;font-size:14px;margin:0 auto} </style>" + newData + "<html><head><style type='text/css'>" + "</style>" +
                    // "</head> <body>" + "</body>  <script> " + javascript + " </script> <script>  " + js2 + " </script> <script> " + js3 + "</script><script>" + js4 + "</script></html>"
                    "</head> <body>" + "</body>  <script> " +
                    javascript +
                    " </script> <script>  " +
                    js2 +
                    "</script></html>"

                this.setState({
                    htmlDataForProfessionalNoun: html,
                    isCanShowProfessionalNoun: true,
                })


            })
            .catch((error) => {
                console.log('requestAnswerData fetch error:' + error);
            })

    }


    public closeProfessionalNounShow() {
        this.setState({
            isCanShowProfessionalNoun: false,
        })
    }






    public initTopicUrl() {
        console.log("initTopicUrl");
        let mUrl = getInitTopicUrl()
        this.myLog('getInitTopicUrl  ' + mUrl)

        let mBody = { "robotId": getRobotId(), "userId": this.state.mSessionId, "sessionId": this.state.mSessionId }

        fetch(mUrl, {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            // body: "{\"robotId\":\"" + getRobotId() + "\",\"userId\":\"" + getSessionId() + "\",\"sessionId\":\"" + getSessionId() + "\"}"
            // body: JSON.stringify(formData)
            body: JSON.stringify(mBody)
        }).then(function (res) {
            console.log('res: ' + res)
            console.log("fetch request ", JSON.stringify(res.ok));
            if (res.ok) {
                res.json().then(function (json) {
                    console.info(json);
                });
            } else {
            }
        }).catch(function (e) {
            console.log('报错了:  ' + e);
        });
    }




    public myLog(msg: any) {
        console.log('>>>>>>>>> ' + msg + '  <<<<<<<<<<');
    }

    public playText(msg: string) {
        let listener = new TextListener();
        listener.setFinish(() => {
            //TODO: 播放完成
            listener.removeListener();
        });
        speechApi.playText(listener.getId(), msg);

    }

    public stopTTS() {
        speechApi.stopTTS()
    }



    public hideVideo = () => {
        this.setState({
            showVideo: false,
            isCanShowImg: false,
        })
        global.recognition && global.recognition.setShow(true);
        console.log(">>>>> hideVideo 关闭了 ")
    }
}

