import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, Button, Text, View, Animated, Image, TouchableOpacity, AlertIOS, FlatList, Dimensions, ActivityIndicator, Modal, ScrollView, Easing, TouchableWithoutFeedback ,DeviceEventEmitter} from 'react-native';
import PropTypes from 'prop-types';
import ImageViewer from 'react-native-image-zoom-viewer';
import VideoPlayScreen from '../VideoPlayScreen';
import api, { getInitTopicUrl, getAnswerUrl, getSessionId, getRobotId, getProfessionalNoun, getSmallConsultationAnswerUrl } from '../../config/api'
import common from '../../config/common'



const styles = StyleSheet.create({
    // container: {
    //     width: "100%",
    //     justifyContent: 'flex-start',
    //     flexDirection: 'column',
    //     // backgroundColor: 'red'
    // },
    // itemClickStyle: {
    //     // borderRadius: 12,
    //     // marginRight: 50,
    //     //   width: 0,
    //     // height: 0,
    //     // borderWidth: 1,
    //     // borderColor: '#B8D2FF5C',
    //     // backgroundColor: 'rgba(255,255,255, 0.3)',
    //     // paddingHorizontal: 5,
    //     // paddingVertical: 5,

    //     marginBottom: 3
    // },


    container: {
        // zIndex: 2,
        // elevation: 12,
        alignItems: 'flex-start',
        flexDirection: 'row',
        flex: 1,
        // backgroundColor: 'rgba(52, 52, 52, 0.8)',//这会将其设置为具有 80% 不透明度的灰色，这是从不透明度小数派生的0.8. 该值可以是从0.0到 的任何值1.0。
        // backgroundColor: 'rgba(52, 52, 52, 0.5)',
        // backgroundColor: 'white',

        // position: 'absolute',

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
        // top: 10,
        flex: 1.8,
        // right: 10,
        // borderRadius: 10,
        // borderWidth: 1,
        // borderColor: '#B8D2FF5C',
        // backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingHorizontal: 5,
        // paddingVertical: 5,
        // height: 255,
        height: 220,

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
    },
    backgroundVideo: {
        position: 'absolute',
        top: 10,
        left: 10,
        bottom: 10,
        right: 10,
        width: 300,
        height: 200,
    },
    containerColumn: {

        // backgroundColor: 'red',
        flex: 1,
        // borderRadius: 10,
        // borderWidth: 1,
        paddingHorizontal: 5,

        // height: 220,
        flexDirection: 'column'

    },
    itemClickStyle2: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 40,
        width: '100%',
        backgroundColor: 'rgba(145, 147, 159, 0.5)',
        marginBottom: 5,
        borderRadius: 10,
    },

},

)

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








export default class BusinessAnswerView extends Component<Props>{

    static propTypes = {
        // onTimeOut: PropTypes.func,
    }


    constructor(props) {
        super(props)
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
        };


        this.myLog("constructor");
        this.initTopicUrl()
    }




    componentDidMount() {
        setTimeout(
            () => {
                this.requestAnswerData(this.state.businessQuestion)
            }, 10)
    }

    scrollToTop() {
        this.refs['scrollView'].scrollWithoutAnimationTo(0, 0)
    }

    initTopicUrl() {
        this.myLog("initTopicUrl");
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
            this.myLog('res: ' + res)
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



    myLog(msg) {
        console.log('BusinessAnswerView >>>>>>>>>>>> ' + msg + '  <<<<<<<<<<');
    }

    //todo
    colsePage() {

    }

    showCell(index, item) {
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

    showCellForBusinessConfirm(index, item) {
        return (

            <TouchableOpacity activeOpacity={0.5} onPress={() => { }}>
                <View style={[styles.itemClickStyle2, { marginTop: 2 }]}>

                    <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', }}>
                        <Text style={{ fontSize: 15, color: "white", fontWeight: 'bold', padding: 2 }} >{item.value}</Text>
                    </View>

                </View>
            </TouchableOpacity>


            //添加手势
            // <View >
            //     <TouchableOpacity activeOpacity={0.5} onPress={() => {
            //         // this.setState({
            //         //     questionStr: item.value
            //         // })
            //         this.requestAnswerData(item.value)

            //     }}>
            //         <View style={styles.itemClickStyle}>
            //             <View style={{ flexDirection: 'column' }}>
            //                 {/* backgroundColor: 'rgba(200,200,200, 0.3)' */}
            //                 <View style={{ backgroundColor: 'rgba(0,0,0, 0.8)', borderRadius: 8, paddingHorizontal: 5, paddingTop: 3, paddingBottom: 3 }}>
            //                     {/* <Text style={{ color: 'white', backgroundColor:"blue",width:90}}>{item.value}</Text> */}
            //                     <Text style={{ fontSize: 12, color: 'white', lineHeight: 15 }}>{item.value}</Text>
            //                 </View>
            //             </View>
            //         </View>
            //     </TouchableOpacity>
            // </View>
        )
    }

    // showCell(index, item) {
    //     return (
    //         //添加手势
    //         <View >
    //             <TouchableOpacity activeOpacity={0.5} onPress={() => {
    //                 // this.setState({
    //                 //     questionStr: item.value
    //                 // })
    //                 this.requestAnswerData(item.value)

    //             }}>
    //                 <View style={styles.itemClickStyle}>
    //                     <View style={{ flexDirection: 'row' }}>
    //                         {/* backgroundColor: 'rgba(200,200,200, 0.3)' */}
    //                         <View style={{ backgroundColor: 'rgba(0,0,0, 0.8)', borderRadius: 8, paddingHorizontal: 5, paddingTop: 3, paddingBottom: 3 }}>
    //                             {/* <Text style={{ color: 'white', backgroundColor:"blue",width:90}}>{item.value}</Text> */}
    //                             <Text style={{ fontSize: 12, color: 'white', lineHeight: 15 }}>{item.value}</Text>
    //                         </View>
    //                     </View>
    //                 </View>
    //             </TouchableOpacity>
    //         </View>
    //     )
    // }

    render() {
        return (
            <View style={styles.container}>





                {this.state.isBusinessInfoConfirm == true ? this.getBusinessInfoConfirmView() :
                    <View style={styles.containerRight}>
                        {/* <View style={styles.containerMessage}>
                        <Animated.Image style={styles.iconMessage} source={require('../../images/popup_message_img.png')} />
                        <Animated.Image style={styles.iconClose} source={require('../../images/popup_cancel_btn.png')} />
                    </View>

                    <View style={{ flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'baseline' }}>


                        <TouchableOpacity activeOpacity={0.5} onPress={() => {

                            // this.setState({
                            //     webViewHeight: 100
                            // });
                            this.scrollToTop()
                            this.onControlSound()
                            // this.refs['mWebview'].scrollTo(0,150)
                            // this.refs.videoPlayScreen.scrollTo(0,150)

                            console.log(">>>>>>> this.refs.videoPlayScreen = " + (this.refs.videoPlayScreen == undefined))
                            // console.log("打印==》"+JSON.stringify(this.refs.videoPlayScreen));
                            // console.log('%j', this.refs.videoPlayScreen);

                            console.log("=================================");

                            var str = JSON.stringify(this.refs.videoPlayScreen, function (key, value) {
                                if (typeof value === 'object' && value !== null) {
                                    if (cache.indexOf(value) !== -1) {
                                        // 移除
                                        return;
                                    }
                                    // 收集所有的值
                                    cache.push(value);
                                }
                                return value;
                            });
                            console.log("=============== str  ==================" + str);

                            console.log("=================================");

                        }}>
                            <Image
                                style={{ height: 17.5, width: 50, left: 10, right: 10 }}
                                source={this.state.isCanSound ? require('../../images/popup_stop_btn.png') : require('../../images/popup_play_btn.png')} />

                        </TouchableOpacity>


                        <Text numberOfLines={1} style={{ fontSize: 13, color: 'white', left: 20, flexWrap: 'wrap', width: 250 }}>{this.state.answerTitle}</Text>

                    </View> */}


                        {
                            this.state.dataSource.length > 0 ?

                                <FlatList

                                    // style={{ top: 5, left: 30, marginRight: 50, marginBottom: 60 }}
                                    style={{ top: 5, marginBottom: 60 }}
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


                                : this.getWebView()




                        }

                    </View>

                }
            </View>
        );
    }

    getWebView() {

        return <ScrollView ref="scrollView" style={{ backgroundColor: 'transparent', width: "100%", flex: 1 }}>
            {/* <ScrollView ref="scrollView" style={{ flex: 1 }}> */}
            {this.getWebView2()}
        </ScrollView>
    }

    getWebView2() {

        return <WebView
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

                        //todo 不展示视频了;
                        // showVideo: true,
                        // videoUrl: data
                    })
                    this.stopTTS()
                    //  this.refs.videoPlayScreen.playVideo()
                    global.recognition && global.recognition.setShow(false);

                }
                //http开头的是连接, 不是视频就是图片了
                else if (data.startsWith("http")) {
                    this.setState({
                        //todo 这里不展示图片了, 减少点工作量
                        // showImgUrl: [{ url: data, props: {} }],
                        // isCanShowImg: true,
                    })
                }
                else if (data.includes('_dataName')) {
                    // console.log("data.endsWith(_dataName) = " + data)
                    let newData = data.replace("_dataName", "")
                    console.log("newData = " + newData)
                    if (newData != null && newData != "null" && newData != '' && newData != "undefined") {

                        //todo 不调用专有名词接口了
                        // this.getProfessionalNoun(newData)
                    }

                    //todo 调用接口
                }
                else {
                    console.log("ldw>>>>>typeof(data) == Number")
                    // this.setState({
                    //     webViewHeight: parseInt(data)
                    // });
                    if (!isNaN(parseFloat(data)) && isFinite(data)) {
                        console.log("进来了 = true")
                        this.setState({
                            webViewHeight: parseInt(data)
                        });
                    }
                }

                console.log(">>>>> his.state.showVideo = " + this.state.showVideo)
            }}
        />
    }


    getBusinessInfoConfirmView() {


        return <ScrollView ref="scrollView" style={{ backgroundColor: 'transparent', width: "100%", flex: 1 }}>
            <View style={styles.containerColumn}>

                <View style={{ flex: 1 }}>

                    {this.getWebView2()}

                </View>
                <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', width: '100%' }}>


                    <FlatList
                        style={{ top: 5, width: 200 }}
                        // style={styles.cellViewStyle2}
                        //加载数据源
                        data={this.state.dataSource}
                        //展示数据
                        renderItem={({ index, item }) => this.showCellForBusinessConfirm(index, item)}
                        //默认情况下每行都需要提供一个不重复的key属性
                        // keyExtractor={(item, index) => (index)}
                        //设置垂直布局（）
                        horizontal={false}
                        //设置水平的排列的个数（只有垂直布局才起作用）
                        numColumns={1} />
                </View>


            </View>
        </ScrollView>
    }






    //1、为什么要使用社保卡发养老金？ 2、社保卡卡面有什么？
    //为什么要使用社保卡发养老金？
    //https://zhiliao.e-tecsun.com/api/cloud/robot/1402829993645576192/answer?question=商业贷款&channel=app&sessionId=100&userId=robot16 
    //https://zhiliao.e-tecsun.com/api/cloud/robot/1402829993645576192/answer?question=%E5%95%86%E4%B8%9A%E8%B4%B7%E6%AC%BE&channel=app&sessionId=100&userId=robot16
    requestAnswerData(questionStr) {

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

            "   mObjectV.addEventListener(\"play\", function(event) {   " +
            "   window.ReactNativeWebView.postMessage(mObjectV.src );" +
            "   mObjectV.pause();" +
            " }, false);" +
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
        // let mUrl = getAnswerUrl(questionStr, this.state.mSessionId)
        // let mUrl = getSmallConsultationAnswerUrl(questionStr, this.state.mSessionId, this.state.atlasId)//todo 社保卡制卡进度须知
        let mUrl = ''
        this.myLog("BusinessAnswerViewBackUp猎户发送的连接: ");
        if (this.state.isBusinessInfoConfirm) {
            mUrl = getAnswerUrl(questionStr, this.state.mSessionId)//大惶恐
        }
        else {
            mUrl = getSmallConsultationAnswerUrl(questionStr, this.state.mSessionId, this.state.atlasId)//todo 社保卡制卡进度须知//小窗口
        }
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
                // if (arr1.length != 0) {
                this.setState({
                    dataSource: arr1,
                })
                // }









                // let newData = jsonData.answers[0].respond
                let newData = jsonData.answers[0].answer
                //拿<p>包裹就会变白色, 不知道为啥
                newData = "<p>" + newData + "</p>"

                let controlStr = "<style> video::-webkit-media-controls-enclosure{ display: none;} </style>";

                let fontSize = 7
                let lineHeight = 17
                if (this.state.isBusinessInfoConfirm) {
                     fontSize = 15
                     lineHeight = 25

                }


                //"<style>* {font-size:14px;line-height:20px;}p {color:#FFFFFF;font-size:14px;} </style>"
                //拼接成一个完成的 HTML，
                let html = controlStr + "<style>* {font-size:"+fontSize+"px;line-height:"+lineHeight+"px;}p {color:#FFFFFF;font-size:"+fontSize+"px;margin:0 auto} </style>" + newData +
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


                    this.questionTitleHasChange(title)


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











    //todo 减少点工作量, 这里不调用了;
    getProfessionalNoun(questionStr) {

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

                let html = "<style>* {font-size:7px;line-height:17px;}p {color:#FFFFFF;font-size:7px;margin:0 auto} </style>" + newData + "<html><head><style type='text/css'>" + "</style>" +
                    // "</head> <body>" + "</body>  <script> " + javascript + " </script> <script>  " + js2 + " </script> <script> " + js3 + "</script><script>" + js4 + "</script></html>"
                    "</head> <body>" + "</body>  <script> " +
                    javascript +
                    " </script> <script>  " +
                    js2 +
                    "</script></html>"


                //todo 这里注释掉, 不展示专有名词了;
                // this.setState({
                //     htmlDataForProfessionalNoun: html,
                //     isCanShowProfessionalNoun: true,
                // })


            })
            .catch((error) => {
                console.log('requestAnswerData fetch error:' + error);
            })

    }


    closeProfessionalNounShow() {
        this.setState({
            isCanShowProfessionalNoun: false,
        })
    }




    questionTitleHasChange(questionTitle){
        DeviceEventEmitter.emit('changeTitle',questionTitle)
    }








}





