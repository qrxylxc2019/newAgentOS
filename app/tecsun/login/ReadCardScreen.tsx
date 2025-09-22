import { BaseComponent, triggerManager, BaseComponentProps, BlurOverlay, FaceTrackSoundLocalizationComponent } from 'orionos-eve-core';
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Button, Animated, NativeModules } from 'react-native';
import { observer } from 'mobx-react';

import ViewUtils from '../util/ViewUtils'
import TimeCountTopView from '../component/TimeCountTopView'
import TitleTopView from '../component/TitleTopView'
import { MyBaseComponent } from '../base/MyBaseComponent'
import router from '../../config/router';

const { width } = Dimensions.get('window');

const sm2 = NativeModules.Sm24jkxwModule;

const tecsunReadCardModule = NativeModules.TecsunReadCardModule;

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
export class ReadCardScreen extends MyBaseComponent {

    public constructor(props: BaseComponentProps) {
        super(props);

        console.log('ReadCardScreen constructor');

        this.state = {
            //@ts-ignore
            timerCount: this.props.timerCount || ViewUtils.getTimerCount(),
            //@ts-ignore
            isReadSsc: this.props.isReadSsc || this.props.navigation.state.params.isReadSsc || false,
            resultMsg: '',
            isSkipPageSuccess: false,
            // userText: this.props.userText || this.props.navigation.state.params.userText || '',
            plainText: this.props.plainText || this.props.navigation.state.params.plainText || '',
        };


        // this.myLog("1513 ReadCardScreen this.props.navigation.state.params.plainText")
        // this.myLog(this.props.navigation.state.params.plainText)

        // this.myLog("1459 ReadCardScreen this.props.navigation.state.params.isReadSsc")
        // this.myLog(this.props.navigation.state.params.isReadSsc)

        // this.myLog("1459 ReadCardScreen this.props.navigation.state.params.userText")
        // this.myLog(this.props.navigation.state.params.userText)

        this.myLog("ReadCardScreen this.state.plainText")
        this.myLog(this.state.plainText)

        this.myLog("ReadCardScreen this.state.isReadSsc")
        this.myLog(this.state.isReadSsc)

    }

    public getIsNeedOrionsRecognitionShow(): boolean {
        return false
    }

    public componentDidMount() {
        //重写界面的didMount，必须调用super
        super.componentDidMount();

        this.countDownAction()

        //开始读卡
        this.initAndReadCardSfzhOrSsc()

        let text = this.state.isReadSsc ? '请按照图示将社保卡插到设备社保卡入口内' : "请按照图示将身份证放到设备读卡区域内"
        this.playText(text)

        // this.globalRecognitionShow(false)

    }

    public countDownAction() {
        //@ts-ignore
        const codeTime = this.state.timerCount;
        //@ts-ignore
        this.interval = setInterval(() => {
            //@ts-ignore
            const timer = this.state.timerCount - 1
            this.myLog(timer);

            if (timer === 0) {
                this.closeCurrentOpk()
                //@ts-ignore
                this.interval && clearInterval(this.interval);
                this.setState({
                    //@ts-ignore
                    timerCount: codeTime,
                })

            } else {
                this.setState({
                    //@ts-ignore
                    timerCount: timer,
                })
            }

            if (this.state.isSkipPageSuccess) {
                this.interval && clearInterval(this.interval);
            }


        }, 1000)
    }


    public notTimeCount() {
        this.setState({
            isSkipPageSuccess: true,
        })
    }



    public getImagePath() {
        //@ts-ignore
        var icon = this.state.isReadSsc ? require('../../../img/logo_insert_ssd.gif') : require('../../../img/logo_dqsfz.gif')
        return icon
    }


    public circulationReadCard() {


    }

    public toast(msg: any) {
        let obj = {
            id: 1,
            name: msg,
        };
        tecsunReadCardModule.Toasts(obj);
    }


    //读卡
    public initAndReadCardSfzhOrSsc() {

        //1秒后执行callback, 只会执行一次
        const timeoutID = setTimeout(() => {

            console.log("初始化");
            NativeModules.TecsunReadCardModule.createReadIDCardBuilderAndInit((result: string) => {
                console.log(">>>>>>>>>>>.createReadIDCardBuilderAndInit 1 初始化失败");
                console.log(result);
                this.toast('初始化失败:' + result)

                this.setState({
                    resultMsg: result
                });


            }, (result: string) => {
                console.log(">>>>>>>>>>>.createReadIDCardBuilderAndInit 2 初始化成功");
                console.log(result);

                this.setState({
                    resultMsg: result
                });

                // this.myLog('this.state.timerCount > 1')
                // this.myLog(this.state.timerCount > 1)

                // this.myLog('this.state.isReadSsc')
                // this.myLog(this.state.isReadSsc)

                if (this.state.timerCount > 1 && !this.state.isSkipPageSuccess) {
                    //开始读卡
                    if (this.state.isReadSsc) {
                        //读社保卡
                        this.readCardSSC()
                    }
                    else {
                        //读身份证
                        this.readCardSFZH()
                    }
                }


            });

            //清除
            clearTimeout(timeoutID);

        }, 300)
    }

    public readCardSSC() {
        console.log("readCardSSC");
        NativeModules.TecsunReadCardModule.iReadCardBas((result: string) => {
            console.log(">>>>>>>>>>> iReadCardBas 1 失败");
            console.log(result);
            //{"iRet":"0","resultMessage":"For input string: \"汉\"","name":"刘栋文","idCardNo":"440782199012292617"}
            let jsonObjectResult = JSON.parse(result)
            console.log('开始下一次读卡>>>>>>>>>');

            this.initAndReadCardSfzhOrSsc();

        }, (result: string) => {
            //{"iRet":"0","resultMessage":"读社保卡基本信息成功！输出信息为：440700|440782199012292617|JA334687X|440700D15600000500152947B297502C|刘栋文|00810088378665440700152947|1.00|20140126|20240126|000000000000|FFFFFFFFFFFFFF|","name":"刘栋文","idCardNo":"440782199012292617","sscard_number":"JA334687X"}
            console.log(">>>>>>>>>>>.iReadCardBas 2 成功 ");
            console.log(result);
            let jsonObjectResult = JSON.parse(result)

            this.notTimeCount()


            setTimeout(
                () => {

                    this.startJump(this.state.plainText,
                        {
                            userName: jsonObjectResult.name,
                            sfzh: jsonObjectResult.idCardNo,
                        }
                    )

                    //先跳转到社保卡申请界面
                    // this.skipNextPage(router.readCardNextPage,
                    //     {
                    //         userName: jsonObjectResult.name,
                    //         sfzh: jsonObjectResult.idCardNo,
                    //     }
                    // )


                }, 50
            )


        });
    }

    public readCardSFZH() {
        console.log("readCardSFZH");
        NativeModules.TecsunReadCardModule.iReadIDOrgData((result: string) => {
            console.log(">>>>>>>>>>> iReadIDOrgData 1 失败");
            console.log(result);
            //{"iRet":"0","resultMessage":"For input string: \"汉\"","name":"刘栋文","idCardNo":"440782199012292617"}
            let jsonObjectResult = JSON.parse(result)
            console.log('开始下一次读卡>>>>>>>>>');
            this.initAndReadCardSfzhOrSsc();

        }, (result: string) => {
            //{"iRet":"0","resultMessage":"For input string: \"汉\"","name":"刘栋文","idCardNo":"440782199012292617"}
            console.log(">>>>>>>>>>>.iReadIDOrgData 2 成功 ");
            console.log(result);
            let jsonObjectResult = JSON.parse(result)

            this.notTimeCount()


            setTimeout(
                () => {

                    this.startJump(this.state.plainText,
                        {
                            userName: jsonObjectResult.name,
                            sfzh: jsonObjectResult.idCardNo,
                        }
                    )

                    // 先跳转到社保卡申请界面
                    // this.skipNextPage(router.readCardNextPage,
                    //     {
                    //         userName: jsonObjectResult.name,
                    //         sfzh: jsonObjectResult.idCardNo,
                    //     }
                    // )


                }, 50
            )


        });
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

                <View style={styles.container} >

                    <>
                        <BlurOverlay
                            style={{ flex: 1, justifyContent: 'center', alignContent: 'center', position: 'absolute', zIndex: -100, elevation: -100 }}
                            showBlurOverlay={true}
                            hasFaceParticle={false}>
                        </BlurOverlay>
                    </>



                    {this.state.isSkipPageSuccess == false ?
                        <View style={styles.containerCenter}>

                            <View style={styles.containerHorizontal}>
                                <Text style={{ fontSize: 15, marginTop: 10, color: "black" }}>{this.state.isReadSsc ? '请按照图示将社保卡插到设备' : "请按照图示将身份证放到设备"}</Text>

                                <Text style={{ fontSize: 15, marginTop: 10, color: "#5ac8ec" }}>{this.state.isReadSsc ? '社保卡入口内' : "读卡区域内"}</Text>
                            </View>

                            <Image
                                style={{
                                    width: 227,
                                    height: 150,
                                    marginLeft: 5,
                                    marginTop: 5
                                }}
                                // source={require('../../images/logo_insert_ssd.gif')} 
                                source={this.getImagePath()}
                            />


                            <TouchableOpacity activeOpacity={0.5} onPress={() => {
                                this.closeCurrentOpk()
                            }}>
                                <View style={styles.itemClickStyle}>
                                    <Image
                                        style={{
                                            width: 87.5,
                                            height: 30,
                                        }}
                                        source={require('../../../img/bg_press_blue.png')} >

                                    </Image>

                                    <View style={{ position: 'absolute', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', }}>
                                        <Text style={{ fontSize: 15, color: "white" }} >关闭</Text>
                                        <Text style={{ fontSize: 15, color: "white" }} >({this.state.timerCount}s)</Text>
                                    </View>

                                </View>
                            </TouchableOpacity>
                        </View>
                        :
                        null
                    }
                </View>

            </>
        );

    }
}
