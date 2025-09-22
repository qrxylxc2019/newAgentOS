/*
 *  Copyright (C) 2017 OrionStar Technology Project
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import React, { Component } from 'react';
import {
    BaseComponent,
    triggerManager,
    BaseComponentProps,
    BlurOverlay,
    FaceTrackSoundLocalizationComponent,
    BaseVoice,
    NavigationComponent,
    speechApi,
    TextListener
} from 'orionos-eve-core';
import {
    Button,
    StyleSheet,
    View,
    Text,
    ScrollView,
    SafeAreaView,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { DeviceEventEmitter } from 'react-native';
import { NavigationViewModel } from './NavigationViewModel';
import { DemoTrigger } from '../../demo/DemoTrigger';
import QuestionAnswerView from '../component/QuestionAnswerView'
import common from '../../config/common'

const { width, height } = Dimensions.get('window');

// triggerManager.addTrigger(new DemoTrigger());


/**
 * 传入参数
 */
export interface NavigationViewProp {
    viewModel?: NavigationViewModel;
}

/**
 * 界面样式
 */
const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        width: width,
        height: height
    },
    button: {
        width: '50%',
        marginBottom: 10
    },
    resultArea: {
        flex: 1,
        width: '90%',
        marginBottom: 20,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'dodgerblue',
        alignItems: 'center'
    },
    resultScroll: {
        width: '90%',
        height: '100%',
    },
    resultText: {
        fontSize: 3,
        alignSelf: 'center',
        width: '100%',
        height: '100%',

    },
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        position: 'absolute',
        height: "100%",
        width: "100%",
    },
    containerCenter: {

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
});

@observer
export class NavigationView extends Component<NavigationViewProp> {

    private mScroll?: ScrollView;


    public static propTypes = {
        place: PropTypes.string,
        backPlace: PropTypes.string,
        closeCurrentOpk: PropTypes.func,
    }

    public closeCurrentOpk() {
        this.props.closeCurrentOpk()
    }

    public constructor(props) {
        super(props)
        this.state = {
            tragetPlace: this.props.place || '',
            businessQuestion: this.props.businessQuestion || '',
            businessCompleteQ: this.props.businessCompleteQ || '',
            isCanShowTipsContent: false,
            isNeedTestButton: false,
        };


    }

    public componentDidMount() {
        this.myLog("6 this.state.tragetPlace")
        this.myLog(this.state.tragetPlace)

        this.myLog("6 this.props.backPlace")
        this.myLog(this.props.backPlace)

        this.myLog("6 this.state.businessQuestion")
        this.myLog(this.state.businessQuestion)
        this.myLog("6 this.state.businessCompleteQ")
        this.myLog(this.state.businessCompleteQ)



        speechApi.setRecognizeMode(true)
        this.props.viewModel?.setBackPlace(this.props.backPlace)

        // 添加监听者
        this.listener = DeviceEventEmitter.addListener('bizState', (type, moveErrorMsg) => {

            //到达目标地点(非接待点)
            if (type == common.CONST_TARGET_PLACE_SUCCESS) {

                // 展示那句话 //回调回自动播报我要回去 + 自动返回接待点
                this.setState({
                    tragetPlace: this.props.backPlace,
                    isCanShowTipsContent: true,
                });

                return
            }

            if (type == common.CONST_CLOSE_CURRENT_OPK) {
                this.closeCurrentOpk()
            }

            // //到达初始地点
            // if (type == common.CONST_BACK_SUCCESS) {
            //     //todo 退出到主界面

            //     return
            // }


            // //移动报错
            // if (type == common.CONST_MOVE_ERROR) {

            //     return
            // }

        })



        if (this.state.isNeedTestButton == false) {
            this.startNavigation()
            this.playText2('请跟我来, 我将带你去' + this.props.place, false)
        }

    }

    public componentWillUnmount() {
        this.stopTTS()
        // 销毁监听者
        this.listener.remove();
    }


    public myLog(msg: any) {
        console.log('NavigationView  >>>>>>>>>  ' + msg + '  <<<<<<<<<<');
    }

    public goBackBiz() {

        // if (this.props.viewModel?.isRunning() == false && this.state.isCanShowTipsContent == true) {
        // if (this.props.viewModel?.isRunning() == false) {

        //关闭温馨提示界面
        this.setState({
            isCanShowTipsContent: false,
        });

        this.playText2('我要回去了喔', false)


        setTimeout(
            () => {
                //回到初始点//如果直接调用停止, 然后没加延迟, 这个停止不生效;
                this.props.viewModel?.startGoBack()
            }, 1500
        )


        // }

    }

    public playText2(msg: string, isNeedAfterGoBack: any) {
        this.myLog("1 playText2 : " + msg)
        let listener = new TextListener();
        listener.setFinish(() => {

            this.myLog("2 isNeedAfterGoBack  ")
            this.myLog(isNeedAfterGoBack)

            if (isNeedAfterGoBack) {
                this.goBackBiz()
            }

            this.myLog("3 playText2  ")

            // 播放完成
            listener.removeListener();


        });
        speechApi.playText(listener.getId(), msg);
    }

    public stopTTS() {
        speechApi.stopTTS()
    }

    public stopNavigation() {
        this.props.viewModel?.onPressStopNavigation()
    }

    public startNavigation() {
        this.props.viewModel?.onPressStartNavigation(this.props.place)
    }

    /**
     * 绘制界面
     */
    public render(): React.ReactNode {
        if (!this.props.viewModel) {
            return null;
        }
        return (



            <View style={styles.container} >

                <>
                    <BlurOverlay
                        style={{ flex: 1, justifyContent: 'center', alignContent: 'center', position: 'absolute', zIndex: -100, elevation: -100 }}
                        showBlurOverlay={true}
                        hasFaceParticle={false}>
                    </BlurOverlay>
                </>

                <View style={styles.containerCenter}>

                    <View style={[styles.containerCenter2, { flex: 1, flexDirection: 'column' }]}>

                        <View style={{ flexDirection: 'row', position: 'absolute', marginTop: 20, justifyContent: 'center' }}>
                            <Image
                                style={{
                                    width: 45,
                                    marginTop: 2.5,
                                    height: 18.5,

                                }}
                                source={require('../../../img/icon_navigation_arrow_right.png')} >

                            </Image>

                            <Image
                                style={{
                                    width: 20,
                                    height: 20,
                                    marginLeft: 10,
                                    marginTop: 1,
                                    marginRight: 10,
                                }}
                                source={require('../../../img/icon_navigation_place.png')} >

                            </Image>
                            <Text style={{ fontSize: 17, color: "white" }} >{this.state.tragetPlace}</Text>

                        </View>


                        <Image
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            source={require('../../../img/bg_navigation.png')} >

                        </Image>

                        {/* <Text style={[styles.resultText, { position: 'absolute' }]}>
                            {this.props.viewModel.getResultText()}
                        </Text> */}



                        {this.state.isCanShowTipsContent == false ?


                            <View style={{ position: 'absolute', marginTop: '47%' }}>

                                {/* <TouchableOpacity activeOpacity={0.5} onPress={
                                // 
                                // this.stopNavigation()
                                this.props.viewModel.onPressStopNavigation

                            }> */}


                                <TouchableOpacity activeOpacity={0.5} onPress={() => {

                                    //todo 正式版这里不要注销, 这里是方案1
                                    this.stopNavigation()
                                    this.goBackBiz()


                                    //todo 正式版这里是方案2
                                    // this.props.viewModel?.closeCurrentOpk()

                                    //todo 测试退出去
                                    // this.setState({
                                    //     isCanShowTipsContent: true,
                                    // });

                                }}>


                                    <View style={{ backgroundColor: '#80e5fb', borderRadius: 20, paddingHorizontal: 65, paddingVertical: 8 }}>
                                        <Text style={{ fontSize: 12, color: 'white', lineHeight: 15, fontWeight: 'bold' }}>点我退出</Text>
                                    </View>

                                </TouchableOpacity>

                            </View> : null

                        }




                        {this.state.isNeedTestButton ?
                            <View style={{ position: 'absolute', marginTop: '25%' }}>

                                <TouchableOpacity activeOpacity={0.5} onPress={() => {
                                    // 
                                    // this.startNavigation()
                                    // this.playText2('请跟我来, 我将带你去' + this.props.place, false)


                                    //展示温馨提示
                                    this.setState({
                                        isCanShowTipsContent: true,
                                    });


                                }}>

                                    <View style={{ backgroundColor: '#80e5fb', borderRadius: 20, paddingHorizontal: 65, paddingVertical: 8 }}>
                                        <Text style={{ fontSize: 12, color: 'white', lineHeight: 15, fontWeight: 'bold' }}>开始导航</Text>
                                    </View>

                                </TouchableOpacity>

                            </View> : null
                        }




                    </View>

                </View>




                {this.state.isCanShowTipsContent ?


                    <View style={[styles.containerCenter3, { flex: 1, width: width, height: height }]}>
                        {/* <Button title={'跳转Main'} onPress={
                            () => {
                                // this.props.navigation&&this.props.navigation.navigate('main');
                                this.myJump('SelectReadCardTypeScreen', 'card_progress_jump')
                            }
                        } /> */}


                        <QuestionAnswerView
                            ref='QuestionAnswerView'
                            style={{ flex: 1, justifyContent: 'center', alignContent: 'center', position: 'absolute' }}
                            playText={(msg) => this.playText2(msg, true)}//TODO 这里不要注释
                            // playText={(msg) => {}}//todo 记得注释
                            stopTTS={() => this.stopTTS()}
                            hideVideo={() => { }}
                            exit={() => { this.goBackBiz() }}

                            nextBizName={(plainText) => { }}
                            myJump={(routerName, plainText) => { }}
                            businessQuestion={this.state.businessQuestion}
                            businessCompleteQ={this.state.businessCompleteQ}
                            
                        />
                    </View> : null

                }




            </View>




            // <View style={styles.rootView}>
            //     <View style={styles.button}>
            //         <Button
            //             color={'dodgerblue'}
            //             title={'开始导航'}
            //             onPress={this.props.viewModel.onPressStartNavigation}/>
            //     </View>
            //     <View style={styles.button}>
            //         <Button
            //             color={'dodgerblue'}
            //             title={'结束导航'}
            //             onPress={this.props.viewModel.onPressStopNavigation}/>
            //     </View>
            //     <SafeAreaView style={styles.resultArea}>
            //         <ScrollView
            //             ref={this.setScroll}
            //             onContentSizeChange={this.onContentSizeChange}
            //             style={styles.resultScroll}
            //             showsVerticalScrollIndicator={false}>
            //             <Text style={styles.resultText}>
            //                 {this.props.viewModel.getResultText()}
            //             </Text>
            //         </ScrollView>
            //     </SafeAreaView>
            // </View>
        );
    }

    private setScroll = (scroll: ScrollView): void => {
        this.mScroll = scroll;
    };

    private onContentSizeChange = (): void => {
        this.mScroll && this.mScroll.scrollToEnd();
    }
}