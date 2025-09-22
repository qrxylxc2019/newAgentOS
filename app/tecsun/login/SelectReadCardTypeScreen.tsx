import { BaseComponent, triggerManager, BaseComponentProps, speechApi, FaceTrackSoundLocalizationComponent, ComponentEvent, BlurOverlay, TextListener, ComponentResultConst } from 'orionos-eve-core';
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Button, Animated } from 'react-native';
import { observer } from 'mobx-react';

import ViewUtils from '../util/ViewUtils'
import TimeCountTopView from '../component/TimeCountTopView'
import TitleTopView from '../component/TitleTopView'
import { MyBaseComponent } from '../base/MyBaseComponent'
import api from '../../config/api'

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',//水平轴
        // flexDirection: 'row',//声明水平为主轴
        // alignItems: 'center',//交叉轴对齐方式//左右
        // backgroundColor: 'rgba(52, 52, 52, 0.3)',

        // // backgroundColor: 'red',
        // position: 'absolute',
        // elevation: 10,
        // height: "100%",
        // width: "100%",

        // alignItems: 'flex-start',
        alignContent: 'center',
        flexDirection: 'row',
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
        flexDirection: 'column',
        justifyContent: 'flex-start',
        position: 'absolute',
        elevation: 1000,
        alignItems: 'center',
        flex: 1,
        height: "100%",
        width: "100%",
        marginLeft: 10,
        marginRight: 10,
        zIndex: 1000,
    },

    containerHorizontal: {
        width: "100%",
        justifyContent: 'flex-end',

        flexDirection: 'row',
        alignItems: 'baseline',
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
},
)


@observer
export class SelectReadCardTypeScreen extends MyBaseComponent {

    public constructor(props: BaseComponentProps) {
        super(props);
        this.state = {
            //@ts-ignore
            timerCount: this.props.timerCount || ViewUtils.getTimerCount() || 60,
            isSkipPageSuccess: false,
            // userText: this.props.userText || this.props.navigation.state.params.userText || '',
            plainText: this.props.plainText || this.props.navigation.state.params.plainText || '',
            // userText: '1513 哈哈哈测试userText',
            // plainText: '1513 哈哈哈测试plainText',
        };

        // console.log("1513 SelectReadCardTypeScreen  >>>>>>> plainText");
        // console.log(this.state.plainText);
        // console.log('1513 SelectReadCardTypeScreen this.props.navigation.state.params.plainText');
        // console.log(this.props.navigation.state.params.plainText);


        // console.log('1513 SelectReadCardTypeScreen this.props.navigation.state.params.userText');
        // console.log(this.props.navigation.state.params.userText);

        // console.log('1513  api.myInfo[0].userSpeakTEXT = this.userText');
        // console.log(api.myInfo[0].userSpeakTEXT);

        // console.log('this.state.userText');
        // console.log(this.state.userText);
        console.log('SelectReadCardTypeScreen this.state.plainText');
        console.log(this.state.plainText);

    }

    public getIsNeedOrionsRecognitionShow(): boolean {
        return false
    }

    public componentDidMount() {
        //重写界面的didMount，必须调用super
        super.componentDidMount();

        this.playText("请选择登录方式")
        // let text = this.props.navigation.state.params.result.userText
        // this.myLog('>this.props.navigation.state.params.result.userText <')
        // this.myLog(this.props.navigation.state.params.result.userText)

        // this.globalRecognitionShow(false)
    }

    public componentWillMount() {

    }

    public componentWillUnmount() {
        //重写界面的Unmount，必须调用super
        super.componentWillUnmount();
    }

    public notTimeCount() {
        this.refs['TimeCountTopView'].notTimeCount()
    }



    public render() {
        console.log('MainScreen render');
        return (

            <>
                {/**** @ts-ignore */}
                <FaceTrackSoundLocalizationComponent
                    onStatusUpdate={this.onStatusUpdate}
                // onFinish={
                //     this.onFinish
                // }
                />

                <View style={styles.container} >

                    <>
                        <BlurOverlay
                            style={{ flex: 1, justifyContent: 'center', alignContent: 'center', position: 'absolute', zIndex: -10, elevation: -10 }}
                            showBlurOverlay={true}
                            hasFaceParticle={false}>
                        </BlurOverlay>
                    </>

                    {/***@ts-ignore */}
                    <View style={styles.containerCenter}>

                        {/***@ts-ignore 倒计时 */}
                        <TimeCountTopView ref={'TimeCountTopView'} timerCount={this.state.timerCount} onTimeOut={
                            () => {
                                {/***@ts-ignore */ }
                                if (!this.state.isSkipPageSuccess) {
                                    this.closeCurrentOpk()
                                }
                            }


                        } />

                        {/*** 选择登录方式 */}
                        <TitleTopView titleText="选择登录方式" />

                        {/***@ts-ignore 文字提示 */}
                        <Text style={styles.textStyle1} >1.您可以通过二代身份证、社保卡办理社保卡相关业务;</Text>
                        <Text style={styles.textStyle1} >2.登录成功后, 请及时取走您的身份证或社保卡, 以免遗失;</Text>
                        <Text style={styles.textStyle1} >3.业务办理成功后, 请及时退出, 以防个人隐私信息泄露;</Text>
                        <Text style={styles.textStyle1} >4.如有疑问请咨询相关人员, 或者拨打电话: 12333;</Text>

                        {/***@ts-ignore 身份证登录 */}
                        <TouchableOpacity activeOpacity={0.5} onPress={() => {
                            //  this.props.navigation.navigate('demo');

                            this.setState({
                                //@ts-ignore
                                isSkipPageSuccess: true,
                                timerCount: 0,
                            })
                            this.notTimeCount()

                            // this.props.navigation.push('ReadCardScreen', { isReadSsc: false });
                            this.props.navigation.replace('ReadCardScreen', {
                                isReadSsc: false,
                                plainText: this.state.plainText,
                                // userText: this.state.userText
                            });



                        }}>
                            <View style={[styles.itemClickStyle, { marginTop: 3 }]}>
                                <Image
                                    style={{
                                        width: 25,
                                        height: 25,
                                    }}
                                    source={require('../../../img/icon_sfzh.png')} >

                                </Image>

                                <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', }}>
                                    <Text style={{ fontSize: 20, color: "white", fontWeight: 'bold', marginLeft: 10 }} >身份证登录</Text>
                                </View>

                            </View>
                        </TouchableOpacity>

                        {/***@ts-ignore 社保卡登录 */}
                        <TouchableOpacity activeOpacity={0.5} onPress={() => {
                            // this.props.navigation.navigate('demo'); 
                            this.setState({
                                //@ts-ignore
                                isSkipPageSuccess: true,
                                timerCount: 0,
                            })
                            this.notTimeCount()
                            this.props.navigation.replace('ReadCardScreen', {
                                isReadSsc: true,
                                plainText: this.state.plainText,
                                // userText: this.state.userText
                            });

                        }}>
                            <View style={[styles.itemClickStyle, { marginTop: 2 }]}>
                                <Image
                                    style={{
                                        width: 25,
                                        height: 25,
                                    }}
                                    source={require('../../../img/icon_ssc.png')} >

                                </Image>

                                <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', }}>
                                    <Text style={{ fontSize: 20, color: "white", fontWeight: 'bold', marginLeft: 10 }} >社保卡登录</Text>
                                </View>

                            </View>
                        </TouchableOpacity>

                        {/*** 退出 */}
                        {/* {ViewUtils.getExitButton(() => this.props.navigation.goback())} */}
                        {ViewUtils.getExitButton(() => this.closeCurrentOpk())}

                    </View>
                </View>

            </>
        );

    }
}







// import { BaseComponent, triggerManager, BaseComponentProps } from 'orionos-eve-core';
// import React from 'react';
// import { Button, Text, View } from 'react-native';
// import { observer } from 'mobx-react';
// import { MainViewModel } from '../../main/MainViewModel';
// import { MainVoice } from '../../main/MainVoice';
// import { mainModel } from '../../main/MainModel';

// /**
//  * 功能UI界面
//  */
// @observer
// export class SelectReadCardTypeScreen extends BaseComponent<BaseComponentProps, MainViewModel, MainVoice> {

//     public viewModel: MainViewModel;

//     public constructor(props: BaseComponentProps) {
//         super(props);

//         console.log('SelectReadCardTypeScreen constructor');

//         this.viewModel = new MainViewModel();
//         let voice = new MainVoice(this.viewModel);

//         //关联ViewModel及Voice的生命周期到当前界面上
//         this.setViewModel(this.viewModel);
//         this.setVoice(voice);
//     }

//     public componentDidMount() {
//         //重写界面的didMount，必须调用super
//         super.componentDidMount();
//     }

//     public componentWillMount() {

//     }

//     public componentWillUnmount() {
//         //重写界面的Unmount，必须调用super
//         super.componentWillUnmount();
//     }

//     public render() {
//         console.log('MainScreen render');
//         return (
//             <View>
//                 <Text style={{ fontSize: 17, color: 'red'}}> {mainModel.getInfoText()}</Text>
//                 <Button title={'SelectReadCardTypeScreen 跳转Demo'} onPress={
//                     () => {
//                         this.props.navigation.navigate('demo');
//                     }
//                 }/>
//             </View>
//         );

//     }
// }




























// import { BaseComponent, triggerManager, BaseComponentProps } from 'orionos-eve-core';
// import React from 'react';
// import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Button, Animated } from 'react-native';
// import { observer } from 'mobx-react';

// import { DemoViewModel } from '../../demo/DemoViewModel';
// import { DemoVoice } from '../../demo/DemoVoice';
// import { DemoModel } from '../../demo/DemoModel';
// import ViewUtils from '../util/ViewUtils'
// import TimeCountTopView from '../component/TimeCountTopView'
// import TitleTopView from '../component/TitleTopView'

// const { width } = Dimensions.get('window');

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',//水平轴
//         flexDirection: 'row',//声明水平为主轴
//         alignItems: 'center',//交叉轴对齐方式//左右
//         backgroundColor: 'rgba(52, 52, 52, 0.1)',
//         // backgroundColor: 'red',

//     },
//     blurImage: {
//         position: 'absolute',
//         left: 0,
//         right: 0,
//         bottom: 0,
//         top: 0,
//         // height: 500,
//         // width: 500,
//     },
//     absolute: {
//         position: "absolute",
//         top: 0,
//         left: 0,
//         bottom: 0,
//         right: 0
//     },
//     containerCenter: {
//         flexDirection: 'column',
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//         flex: 1,
//         height: "100%",
//         width: "100%",
//         marginLeft: 10,
//         marginRight: 10,
//     },

//     containerHorizontal: {
//         width: "100%",
//         justifyContent: 'flex-end',

//         flexDirection: 'row',
//         alignItems: 'baseline',
//     },
//     itemClickStyle: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         flexDirection: 'row',
//         height: 60,
//         width: 200,
//         backgroundColor: 'rgba(145, 147, 159, 0.5)',
//         marginBottom: 5,
//         borderRadius: 10,
//     },
//     textStyle1: {
//         color: 'white',
//         width: "100%",
//         fontSize: 13,
//         fontWeight: 'bold',
//         marginLeft: 50
//     },

// },

// )


// @observer
// export class SelectReadCardTypeScreen extends BaseComponent<BaseComponentProps, DemoViewModel, DemoVoice> {

//     // public viewModel: DemoViewModel;

//     public constructor(props: BaseComponentProps) {
//         super(props);

//         // console.log('MainScreen constructor');

//         // this.viewModel = new DemoViewModel();
//         // let voice = new DemoVoice(this.viewModel);

//         // //关联ViewModel及Voice的生命周期到当前界面上
//         // this.setViewModel(this.viewModel);
//         // this.setVoice(voice);


//         // this.state = {
//         //     //@ts-ignore
//         //     timerCount: this.props.timerCount || 60
//         // };
//     }

//     public componentDidMount() {
//         //重写界面的didMount，必须调用super
//         super.componentDidMount();
//     }

//     public componentWillMount() {

//     }

//     public componentWillUnmount() {
//         //重写界面的Unmount，必须调用super
//         super.componentWillUnmount();
//     }

//     public  myLog(msg: any) {
//         console.log('>>>>>>>>> ' + msg + '  <<<<<<<<<<');
//     }

//     //todo
//     public colsePage(){
//         this.myLog("colsePage")
//     }

//     public render() {
//         console.log('MainScreen render');
//         return (

//             <View style={styles.container} >


//                 <View style={styles.containerCenter}>

//                     {/*** 倒计时 */}
//                     <TimeCountTopView timerCount={60} onTimeOut={() => this.colsePage()} />

//                     {/*** 选择登录方式 */}
//                     <TitleTopView titleText="选择登录方式" />

//                     {/*** 文字提示 */}
//                     <Text style={styles.textStyle1} >1.您可以通过二代身份证、社保卡办理社保卡相关业务;</Text>
//                     <Text style={styles.textStyle1} >2.登录成功后, 请及时取走您的身份证或社保卡, 以免遗失;</Text>
//                     <Text style={styles.textStyle1} >3.业务办理成功后, 请及时退出, 以防个人隐私信息泄露;</Text>
//                     <Text style={styles.textStyle1} >4.如有疑问请咨询相关人员, 或者拨打电话: 12333;</Text>

//                     {/*** 身份证登录 */}
//                     <TouchableOpacity activeOpacity={0.5} onPress={() => { }}>
//                         <View style={[styles.itemClickStyle, { marginTop: 3 }]}>
//                             <Image
//                                 style={{
//                                     width: 25,
//                                     height: 25,
//                                 }}
//                                 source={require('../../../img/icon_sfzh.png')} >

//                             </Image>

//                             <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', }}>
//                                 <Text style={{ fontSize: 20, color: "white", fontWeight: 'bold', marginLeft: 10 }} >身份证登录</Text>
//                             </View>

//                         </View>
//                     </TouchableOpacity>

//                     {/*** 社保卡登录 */}
//                     <TouchableOpacity activeOpacity={0.5} onPress={() => { }}>
//                         <View style={[styles.itemClickStyle, { marginTop: 2 }]}>
//                             <Image
//                                 style={{
//                                     width: 25,
//                                     height: 25,
//                                 }}
//                                 source={require('../../../img/icon_ssc.png')} >

//                             </Image>

//                             <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', }}>
//                                 <Text style={{ fontSize: 20, color: "white", fontWeight: 'bold', marginLeft: 10 }} >社保卡登录</Text>
//                             </View>

//                         </View>
//                     </TouchableOpacity>

//                     {/*** 退出 */}
//                     {ViewUtils.getExitButton(() => this.props.navigation.goback())}

//                 </View>
//             </View>
//             // <View>
//             //     {/* <Text style={{ fontSize: 17, color: 'red'}}> {mainModel.getInfoText()}</Text> */}
//             //     <Button title={'跳转Demo'} onPress={
//             //         () => {
//             //             this.props.navigation.navigate('demo');
//             //         }
//             //     }/>
//             // </View>
//         );

//     }
// }
