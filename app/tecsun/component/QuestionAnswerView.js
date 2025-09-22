import ImageViewer from 'react-native-image-zoom-viewer';
import React, { Component } from 'react';
import { speechApi } from 'orionos-eve-core';
import { observer } from 'mobx-react';
// import DeviceInfo from 'react-native-device-info';
import { StyleSheet, Button, Text, View, Animated, Image, TouchableOpacity, AlertIOS, FlatList, Dimensions, Modal, ScrollView, NativeModules, TouchableWithoutFeedback } from 'react-native';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';
import { sm4 } from 'sm-crypto';

import api, { getInitTopicUrl, getAnswerUrl, getSessionId, getRobotId, getProfessionalNoun, getSmallConsultationAnswerUrl, consolelog } from '../../config/api';
import common from '../../config/common';
import VideoPlayScreen from '../VideoPlayScreen';


// 添加加密密钥
const SECRET_KEY = 'c24a90d1dc2c42c08abd12fadc0794b5'; // 请使用实际的密钥


export let questionAnswerViewRef = null;
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

const { width } = Dimensions.get('window');
// import {BlurView} from 'react-native-blur'

var cache = [];

// cache = null; 

//首先要导入Dimensions包
var cols = 3;
var cellH = 100;
var vMargin = (width - cellH * cols) / (cols + 1);
var HMargin = 25;

var i = 0;


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

window.updateContent = function(text) {
    document.body.innerHTML = text;
    // 触发高度更新
    if(window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(document.body.scrollHeight);
    }
};

(function () {
    var height = null;
    function changeHeight() {
        if (document.body.scrollHeight != height) {
            height = document.body.scrollHeight;
            if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(height);
            }
        }
    }
    setTimeout(changeHeight, 400);
}())
`;




const sn = 'MC1BCN0D260231137457'
// let sn = SystemInfo.getDeviceSn();
// this.myLog('sn:'+sn);


// 添加全局timer变量
let globalCheckTimer = null;

export default class QuestionAnswerView extends Component<Props>{


    static propTypes = {
        playText: PropTypes.func,
        stopTTS: PropTypes.func,
        hideVideo: PropTypes.func,
        exit: PropTypes.func,
        nextBizName: PropTypes.func,
        myJump: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            logStartTime: Date.now(), // 添加初始时间戳
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

                // { key: 1, value: "什么是电子社保卡？" },
                // { key: 2, value: "电子社保卡如何申领？" },
                // { key: 3, value: "社保卡有效期有多长？" },
                // { key: 4, value: "社保卡有什么功能？" },
                // { key: 6, value: "电子社保卡目前实现了哪些功能？" },
                // { key: 7, value: "社保卡医疗应用有哪些功能？" },
                // { key: 8, value: "社保卡可以做公交吗？" },
                // { key: 9, value: "电子社保卡手机号如何修改？" },

            ],
            // htmlData: "<p>Hello world</p>"
            htmlData: "<p> </p>",
            htmlDataForProfessionalNoun: "<p></p>",

            atlasId: this.props.atlasId || '',
            businessQuestion: this.props.businessQuestion || '',
            businessCompleteQ: this.props.businessCompleteQ || '',

            isBusinessInfoConfirm: this.props.isBusinessInfoConfirm || false,
            currentDisplayText: "",
            completeText: "",
            isTyping: false,
            newTextArray: [],
            ttsNowIndex: 0,
            maxWaitTime: 60000, // 最大等待时间5秒
        };

        this.initTopicUrl();
        
        this.myLog("sn = " + sn);
        var isTest = false
        var fetchUrl = '';
        if(isTest){
            fetchUrl = 'https://fwzdsb-test.e-tecsun.com/api/wechat-bg/api/swipeCard/htmlStartSession';
        }else{
            fetchUrl = 'https://yktdsb.e-tecsun.com/api/wechat-bg/api/swipeCard/htmlStartSession';
        }
        var _this = this;
        this.myLog("fetchUrl = " + fetchUrl);
        let params = this.encryptParams({
            "channel": "robotlhxk",
            "openId": sn,
            "terMac": "",
            "terNo": ""
        })
        this.myLog("加密 = " + params);
        fetch(fetchUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                encryptParams: params
            })
        }).then(function (res) {
            _this.myLog('res: ');
            _this.myLog(res);
            var wsUrl = 'wss://fwzdsb-test.e-tecsun.com/websocket/DSBzky_test_001';
       
            
            if (isTest) {
                wsUrl = 'wss://fwzdsb-test.e-tecsun.com/websocket/DSB';
            } else {
                wsUrl = 'wss://yktdsb.e-tecsun.com/websocket/DSB';
            }
            _this.myLog("wsUrl = " + wsUrl + sn);
            
            // 在构造函数中初始化WebSocket
            _this.ws = new WebSocket(wsUrl + sn);
            
            // 2. 添加WebSocket事件监听器
            _this.ws.onopen = () => {
                _this.myLog('【WebSocket】连接已建立');
                _this.startRequestAnswerData();
            };

            _this.ws.onerror = (error) => {
                _this.myLog('【WebSocket】WebSocket错误:' + JSON.stringify(error));
            };

            _this.ws.onclose = () => {
                _this.myLog('【WebSocket】WebSocket连接已关闭');
            };
        });
    }

    // 3. 在组件卸载时关闭WebSocket连接
    componentWillUnmount() {
        questionAnswerViewRef = null;
        this.myLog("【WebSocket】组件卸载");
        if (this.ws) {
            this.ws.close();
        }
        
        // 清除定时器
        if (globalCheckTimer) {
            clearInterval(globalCheckTimer);
            globalCheckTimer = null;
        }
    }
    


    // 加密函数
    encryptParams(data) {
        try {
            // 将对象转换为字符串
            const jsonStr = typeof data === 'string' ? data : JSON.stringify(data);
            // 使用 sm4 加密
            return sm4.encrypt(jsonStr, SECRET_KEY);
        } catch (error) {
            console.error('加密失败:', error);
            return '';
        }
    }

// 解密函数
    decryptParams(encryptedData) {
        try {
            // 使用 sm4 解密
            return sm4.decrypt(encryptedData, SECRET_KEY);
        } catch (error) {
            console.error('解密失败:', error);
            return '';
        }
    }


    // 4. 添加发送消息的方法
    sendMessage(message) {
        if (this.ws.readyState === WebSocket.OPEN) {
            let encryptStr = this.encryptParams(JSON.stringify(message))
            let encryptStr2 = this.encryptParams(message)
            this.myLog("发送消息加密 = ");
            this.myLog('发送消息 = ' + encryptStr);
            // 对消息进行加密
            this.ws.send(encryptStr);
        } else {
            this.myLog('WebSocket未连接');
        }
    }

    componentDidMount() {
        tclog('QuestionAnswer 开始渲染', { state: this.state });
        questionAnswerViewRef = this;
        

    }

    startRequestAnswerData(){
        this.myLog("【tts】this.state.businessQuestion = " + this.state.businessQuestion);

        let text = this.state.businessQuestion;

        let businessCompleteQ = this.state.businessCompleteQ;

        if (businessCompleteQ != null && businessCompleteQ != "null" && businessCompleteQ != '' && businessCompleteQ != "undefined") {
            text = businessCompleteQ;
        }

        this.myLog("text =  " + text);

        setTimeout(
            () => {
                if (text != "" && text != null && text != undefined) {
                    console.log("不为空");
                    this.requestAnswerData(text);
                }
                else {
                    console.log("为空");
                    this.requestAnswerData("欢迎语");
                }
            }, 300
        );
    }

    /// 点击了工具栏上的播放按钮
    onControlSound() {

        let obj1 = this.state.isCanSound;
        this.setState({
            isCanSound: !obj1,
        });

        if (obj1) {
            this.playText("好的, 我闭嘴,暂时就不闲聊啦");
            // this.stopTTS()      
        }
        else {
            //todo
            this.playText(this.state.speakText);
        }

    }



    scrollToTop() {
        this.refs['scrollView'].scrollWithoutAnimationTo(0, 0);
    }

    initTopicUrl() {
        this.myLog("initTopicUrl");
        let mUrl = getInitTopicUrl();
        this.myLog('getInitTopicUrl  ' + mUrl);

        let mBody = { "robotId": getRobotId(), "userId": this.state.mSessionId, "sessionId": this.state.mSessionId };

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
            this.myLog('res: ' + res);
            this.myLog("fetch request ", JSON.stringify(res.ok));
            if (res.ok) {
                res.json().then(function (json) {
                    this.myLog(json);
                });
            } else {
            }
        }).catch(function (e) {
            this.myLog('报错了:  ' + e);
        });
    }

    requestAnswer1(questionStr){
        if (this.state.isCanShowImg || this.state.showVideo || this.state.isCanShowProfessionalNoun) {

            console.log("过滤了....");
            return;
        }
        
        let html =  "<style>* {font-size:14px;line-height:18px;}p {color:#FFFFFF;font-size:14px;margin:0 auto} </style>" + questionStr +
        "<html><head><style type='text/css'> </style> </head> <body>" + "</body> </html>";
        
        this.scrollToTop();

        var newHtml = "<style> </style>" + html;
        newHtml = newHtml.replace("class='professional'", "style=\"color:#fff;cursor:pointer;text-decoration: underline;font-family: 微软雅黑, &quot;\" ");

        console.log("newHtml = >>> = " + newHtml);


        this.setState({
            webViewHeight: 250
        });

        this.setState({
            myINJECTEDJAVASCRIPT: INJECTEDJAVASCRIPT_1,
        });

        this.setState({
            // dataSource: arr1,
            // htmlData: jsonData.answers[0].respond
            //htmlData: html + "<style>*{color:#fff !important;}</style>",
            htmlData: newHtml,
            isCanShowImg: false,
            myINJECTEDJAVASCRIPT: INJECTEDJAVASCRIPT2,
        });

    }
    showCell(index, item) {
        return (
            //添加手势
            <View >
                <TouchableOpacity activeOpacity={0.5} onPress={() => {
                    // this.setState({
                    //     questionStr: item.value
                    // })
                    this.requestAnswer1(item.content);

                }}>
                    <View style={styles.itemClickStyle}>
                        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                            <View style={{ backgroundColor: 'rgba(128,128,128, 0.8)', borderRadius: 11, paddingHorizontal: 5, paddingVertical: 5 }}>
                                {/* <Text style={{ color: 'white', backgroundColor:"blue",width:90}}>{item.value}</Text> */}
                                {/* <Text style={{ fontSize: 12, color: 'white', paddingHorizontal: 5, paddingVertical: 5, }}>{item.value}</Text> */}
                                <Text style={{ fontSize: 11.5, color: '#F5F5F5', lineHeight: 15 }}>{item.value}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }


    render() {

        return (
            <>

                <View style={styles.container}>

                    <View style={styles.containerLeft}>

                        {/* <View style={styles.containerHorizontal}>
                            <Animated.Image style={styles.iconLeft} source={require('../../../img/popup_mic_img.png')}>
                            </Animated.Image>
                            <Text style={{ fontSize: 11, color: 'white', left: 25, top: 2, }}>您还可以问我:</Text>
                        </View> */}

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
                            <Animated.Image style={styles.iconMessage} source={require('../../../img/popup_message_img.png')} />

                            {/* <Animated.Image style={styles.iconClose} source={require('../../img/popup_cancel_btn.png')} /> */}

                            {/* <Button ></Button> */}
                            <TouchableOpacity onPress={() => {
                                // this.viewModel.exit()
                                this.exit();
                                // speechApi.queryByText('退出');
                            }}>
                                <Image style={styles.iconClose} source={require('../../../img/popup_cancel_btn.png')} />
                            </TouchableOpacity>
                        </View>


                        <View style={{ flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'baseline' }}>

                            <TouchableOpacity activeOpacity={0.5} onPress={() => {
                                this.onControlSound();
                            }}>
                                {/* <Image
                                    style={{ height: 17.5, width: 50, left: 10, right: 10 }}
                                    source={this.state.isCanSound ? require('../../img/popup_stop_btn.png') : require('../../img/popup_play_btn.png')} /> */}

                                {this.state.isCanSound ? <Image
                                    style={{ height: 17.5, width: 50, left: 10, right: 10 }}
                                    source={require('../../../img/popup_stop_btn.png')} /> :
                                    <Image
                                        style={{ height: 17.5, width: 50, left: 10, right: 10 }}
                                        source={require('../../../img/popup_play_btn.png')} />

                                }
                            </TouchableOpacity>


                            <Text numberOfLines={1} style={{ fontSize: 13, color: 'white', left: 20, width: 250 }}>{this.state.answerTitle}</Text>

                        </View>



                        {/* <Text style={{ fontSize: 13, color: 'white', top: -5, left: 5 }}>{this.state.answerTitle}</Text> */}


                        {/* <WebView source={{ uri: 'https://reactnative.dev/' }} /> */}

                        {/* <View style={{ flex: 1, flexDirection: 'row', top: -25 }}> */}


                        <ScrollView ref="scrollView" style={{ backgroundColor: 'transparent', width: "100%", flex: 1 }}>
                            {/* <ScrollView ref="scrollView" style={{ flex: 1 }}> */}
                            <WebView
                                ref={ref => (this.webview = ref)}
                                // style={{ backgroundColor: 'transparent', height: 0, width: "100%", top: 0 }}
                                style={{ backgroundColor: 'transparent', height: this.state.webViewHeight, width: "100%", top: 0 }}
                                javaScriptEnabled={true}
                                originWhitelist={['*']}
                                // source={{ html: this.state.htmlData }}
                                injectedJavaScript={this.state.myINJECTEDJAVASCRIPT}
                                scalesPageToFit={true}//很重要
                                automaticallyAdjustContentInsets={true}
                                source={{ html: this.state.htmlData  }}
                                mixedContentMode={'compatibility'}
                                // mediaPlaybackRequiresUserAction={false}//设置页面中的HTML5音视频是否需要在用户点击后再开始播放。默认值为true
                                onMessage={({ nativeEvent: { data } }) => {
                                    console.log(">>>>> ldw data = " + data);
                                    if (data.endsWith("#t=0.1")) {
                                        console.log(">>>>> data.endsWith(\"#t=0.1\") <<<<<<<<<<<");
                                        this.setState({
                                            showVideo: true,
                                            videoUrl: data
                                        });
                                        this.stopTTS();
                                        //  this.refs.videoPlayScreen.playVideo()
                                        global.recognition && global.recognition.setShow(false);

                                    }
                                    //http头的连接, 不是视频就是图片了
                                    else if (data.startsWith("http")) {
                                        this.setState({
                                            showImgUrl: [{ url: data, props: {} }],
                                            isCanShowImg: true,
                                        });
                                    }
                                    else if (data.includes('_dataName')) {
                                        // console.log("data.endsWith(_dataName) = " + data)
                                        let newData = data.replace("_dataName", "");
                                        console.log("newData = " + newData);
                                        if (newData != null && newData != "null" && newData != '' && newData != "undefined") {

                                            this.getProfessionalNoun(newData);
                                        }

                                        //todo 调用接口
                                    }
                                    else {
                                        console.log("ldw>>>>>typeof(data) == Number");
                                        // this.setState({
                                        //     webViewHeight: parseInt(data)
                                        // });
                                        if (!isNaN(parseFloat(data)) && isFinite(data)) {
                                            console.log("进来了 = true");
                                            this.setState({
                                                webViewHeight: parseInt(data)
                                            });
                                        }
                                    }

                                    console.log(">>>>> his.state.showVideo = " + this.state.showVideo);
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
                    // backgroundColor: 'rgba(52, 52, 52, 0.8)',//这会将其设置为具有 80% 不透明度的灰色，这是不透明度小数派生的0.8. 该值可以是从0.0到 的任何值1.0。
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
                            //todo 下面的style要写死, 不能用100%, 否则偶尔会出现bug不满屏, 但是写死高又有偏移, 所以加入-40, 估计是框架的bug
                            style={{
                                height: 360,
                                width: 640,
                                marginLeft: -40,
                                marginBottom: -40
                            }}

                            imageUrls={this.state.showImgUrl}
                            onClick={() => {
                                this.setState({
                                    isCanShowImg: false,
                                });

                            }}

                            onLongPress={() => { }}
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

                            <TouchableWithoutFeedback onPress={() => { this.closeProfessionalNounShow(); }}>
                                <Image
                                    style={{
                                        width: 40,
                                        height: 40,
                                        marginLeft: 5,
                                        marginTop: 5
                                    }}
                                    source={require('../../../img/popup_cancel_btn.png')}
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
    }


   


    //1、为什么要使用社保卡发养老金？ 2、社保卡卡面有什么？
    //为什么要使用社保卡发养老金？
    //https://zhiliao.e-tecsun.com/api/cloud/robot/1402829993645576192/answer?question=商业贷款&channel=app&sessionId=100&userId=robot16 
    //https://zhiliao.e-tecsun.com/api/cloud/robot/1402829993645576192/answer?question=%E5%95%86%E4%B8%9A%E8%B4%B7%E6%AC%BE&channel=app&sessionId=100&userId=robot16
    requestAnswerData(questionStr) {
        if (this.state.isCanShowImg || this.state.showVideo || this.state.isCanShowProfessionalNoun) {
            console.log("过滤了....");
            return;
        }

        this.myLog("单次语音setRecognizeMode");
        speechApi.setRecognizeMode(false);

        // 重置状态
        this.setState({
            currentDisplayText: "",
            completeText: "",
            htmlData: "<p></p>",
            webViewHeight: 10000,
            isTyping: false,
            myINJECTEDJAVASCRIPT: INJECTEDJAVASCRIPT2
        });

        this.setState({
            newTextArray: []
        });
        // 发送消息到WebSocket
        const message = {
            taskId: sn,
            channel: "TSB",
            messageContent: questionStr,
            channelId: "56b1861a-2cf2-4891-b1d5-c256633e8ba1",
            notTem: "true"
        };
        this.sendMessage(message);

        this.ws.onmessage = (event) => {
            try{
                // 解密
                let res = JSON.parse(this.decryptParams(event.data));
                let receiveData = res;
                if (receiveData.messageType === "1") {
                    // 问题
                    this.myLog('【WebSocket】收到服务器消息receiveData.question: ' + receiveData.question);
                    let newText = receiveData.question + "<br>";
                    if(globalCheckTimer){
                        console.log("【回答】清除定时器");
                        clearInterval(globalCheckTimer);
                        globalCheckTimer = null;
                    }
                    this.appendNewText(newText);
                } else {
                    // 回答
                    this.myLog('【WebSocket】收到服务器消息receiveData.answer: ' + receiveData.answer);
                    let newText = receiveData.answer;
                    if(newText){
                        this.appendNewText(newText);
                        const newTextArray = this.state.newTextArray;
                        newTextArray.push(newText);
                        this.setState({
                            newTextArray: newTextArray
                        });
                        if(this.state.newTextArray.length == 1){
                            this.setState({
                                ttsNowIndex: 0
                            });
                            this.myLog("【tts】念第一段 this.state.newTextArray[0] = " + this.state.newTextArray[this.state.ttsNowIndex]);

                            // 播放第一段
                            this.playText(this.state.newTextArray[this.state.ttsNowIndex]);
                        }
                    }
                }
            }catch(e){
                this.myLog("e = " + JSON.stringify(e));
            }
        };
    }

    ttsFinish() {
        console.log("【回答】ttsFinish this.state.ttsNowIndex = " + this.state.ttsNowIndex);
        const nextIndex = this.state.ttsNowIndex + 1;
        this.setState({
            ttsNowIndex: nextIndex
        });

        if (nextIndex < this.state.newTextArray.length) {
            // 如果已经有,直接念
            this.myLog("【回答】直接念 nextIndex = " + nextIndex + " this.state.newTextArray.length = " + this.state.newTextArray.length + " " + this.state.newTextArray[nextIndex]);
            this.playText(this.state.newTextArray[nextIndex]);
        } else {
            // 启动定时器等待新内容
            if(globalCheckTimer){
                return;
            }
            let startTime = Date.now();
            globalCheckTimer = setInterval(() => {
                this.myLog("【回答】定时器等待新内容 nextIndex = " + nextIndex + " this.state.newTextArray.length = " + this.state.newTextArray.length);
                if (nextIndex < this.state.newTextArray.length) {
                    // 有新内容了,播放并清除定时器
                    clearInterval(globalCheckTimer);
                    globalCheckTimer = null;
                    this.myLog("【回答】新内容已到达: " + this.state.newTextArray[nextIndex]);
                    this.playText(this.state.newTextArray[nextIndex]);
                } 
                // 
                if (Date.now() - startTime > this.state.maxWaitTime) {
                    // 超时,清除定时器并结束
                    clearInterval(globalCheckTimer);
                    globalCheckTimer = null;
                    this.myLog("【回答】等待新内容超时");
                    speechApi.setRecognizeMode(true);
                }
            }, 1000);
        }
    }

    appendNewText(newText) {
        newText = newText.replace(/\n/g, '<br>');
        // 将新文本添加到完整文本中
        this.setState(prevState => ({
            completeText: prevState.completeText + newText
        }), () => {
            // 如果当前没有在打字，开始新的打字效果
            if (!this.state.isTyping) {
                this.startTypewriter();
            }
        });
    }

    startTypewriter() {
        if (this.state.currentDisplayText.length >= this.state.completeText.length) {
            this.setState({ isTyping: false });
            return;
        }

        this.setState({ isTyping: true });

        const typeWriter = setInterval(() => {
            this.setState(prevState => {
                const nextChar = prevState.completeText[prevState.currentDisplayText.length];
                if (!nextChar) {
                    clearInterval(typeWriter);
                    return { isTyping: false };
                }

                const newDisplayText = prevState.currentDisplayText + nextChar;
                
                this.setState(prevState => ({
                    currentDisplayText: prevState.currentDisplayText + prevState.completeText[prevState.currentDisplayText.length]
                }));
                
                if (this.state.currentDisplayText.length >= this.state.completeText.length) {
                    clearInterval(typeWriter);
                    this.setState({ isTyping: false });
                }


                const html = `<p style="color: #FFFFFF; font-size: 14px;">${newDisplayText}</p>`;
                // 使用webview的injectJavaScript方法更新内容
                this.webview.injectJavaScript(`
                    (function() {
                        try {
                            document.body.innerHTML = \`${html}\`;
                        } catch(e) {
                            window.ReactNativeWebView.postMessage('Error: ' + e.message);
                        }
                        true;
                    })();
                `);


                // currentDisplayText: newDisplayText,
                // htmlData: html,        
                // // 更新WebView内容
                // return {
                //     myINJECTEDJAVASCRIPT: INJECTEDJAVASCRIPT2
                // };
            });
        }, 50); // 每50毫秒显示一个新字符
    }

    getProfessionalNoun(questionStr) {

        console.log("getProfessionalNoun");
        let mUrl = getProfessionalNoun(questionStr);
        this.myLog(mUrl);
        fetch(mUrl)
            .then((response) => response.json())
            .then((json) => {


                console.log("requestAnswerData JSON.stringify(json)");
                console.log(json);
                console.log("json._bodyInit=  " + json._bodyInit);
                //<p><img src="http://zhiliao.e-tecsun.com/cloud/file/downloadFile?fullPath=group1/M00/00/40/rBAAL2MO7iyAKH2dAAKAs5KPbdo176.jpg" alt="社保卡（样表）.jpg"/></p>
                // let jsonData = JSON.parse(json._bodyInit)
                let jsonData = json;
                let nounParaphrase = jsonData.data.nounParaphrase;
                console.log("nounParaphrase =  " + nounParaphrase);

                let newData = nounParaphrase;

                //拿<p>包裹就会变白色, 不知道为啥
                newData = "<p>" + newData + "</p>";

                if (newData.includes('img')) {
                    this.setState({
                        myINJECTEDJAVASCRIPTForProfessionalNoun: ''
                    });
                }
                else {
                    this.setState({
                        myINJECTEDJAVASCRIPTForProfessionalNoun: INJECTEDJAVASCRIPT
                    });
                }




                var javascript = "" + "var objs = document.getElementsByTagName('img');" +


                    "for(var i=0;i<objs.length;i++){" +
                    "   let mObject = objs[i];" +
                    "mObject.setAttribute('style', \"position:relative;top:0%;left:20%;width:60%;height:auto\"); " +
                    "objs[i].onclick=function(){" +

                    // "window.postMessage(mObject.src)" +
                    "}}";


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
                    "}";

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

                let html = "<style>* {font-size:7px;line-height:17px;}p {color:#FFFFFF;font-size:7px;margin:0 auto} </style>" + newData + "<html><head><style type='text/css'>" + "</style>" +
                    // "</head> <body>" + "</body>  <script> " + javascript + " </script> <script>  " + js2 + " </script> <script> " + js3 + "</script><script>" + js4 + "</script></html>"
                    "</head> <body>" + "</body>  <script> " +
                    javascript +
                    " </script> <script>  " +
                    js2 +
                    "</script></html>";


                // 这里注释掉, 不展示专有名词了;
                this.setState({
                    htmlDataForProfessionalNoun: html,
                    isCanShowProfessionalNoun: true,
                });


            })
            .catch((error) => {
                console.log('requestAnswerData fetch error:' + error);
            });
    }


    closeProfessionalNounShow() {
        this.setState({
            isCanShowProfessionalNoun: false,
        });
    }

    myLog(msg) {
        let obj = {
            info: msg,
            taskId:'react_test_' + this.state.logStartTime,
            type:'QuestionAnswerView',
            time:Date.now(),
            level:1
        }; 
        consolelog([obj]);
    }

    playText(msg) {

        console.log('播放的音频文字是:  >>>>>>>>> ' + msg + '  <<<<<<<<<<');
        this.myLog('播放的音频是:  >>>>>>>>> ' + msg + '  <<<<<<<<<<');
        this.props.playText(msg);
    }

    stopTTS() {
        this.props.stopTTS();
    }

    hideVideo = () => {
        this.setState({
            showVideo: false,
            isCanShowImg: false,
        });
        this.props.hideVideo();
        console.log(">>>>> hideVideo 关闭了 ");
    }

    exit() {
        // 清除定时器
        if (globalCheckTimer) {
            clearInterval(globalCheckTimer);
            globalCheckTimer = null;
        }
        this.props.exit();
    }


    nextBizName(plainText) {
        return this.props.nextBizName(plainText);
    }

    myJump(routerName, plainText) {
        this.props.myJump(routerName, plainText);
    }
}





