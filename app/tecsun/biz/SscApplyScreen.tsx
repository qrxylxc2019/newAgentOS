import { BaseComponent, triggerManager, BaseComponentProps, BlurOverlay, FaceTrackSoundLocalizationComponent } from 'orionos-eve-core';
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

const tecsunReadCardModule = NativeModules.TecsunReadCardModule;

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





/**** 社保卡申请 */
@observer
export class SscApplyScreen extends MyBaseComponent {

    public constructor(props: BaseComponentProps) {
        super(props);

        console.log('SscApplyScreen constructor');

        this.state = {
            //@ts-ignore
            // userName: this.props.userName || this.props.navigation.state.params.userName || api.myTestInfo[0].testName,
            // userBirthday: this.props.userBirthday || this.props.navigation.state.params.userBirthday || '',
            // sfzh: this.props.sfzh || this.props.navigation.state.params.sfzh || api.myTestInfo[0].testSfzh,


            userName: this.props.userName || (this.props.navigation.state.params && this.props.navigation.state.params.userName) ? this.props.navigation.state.params.userName : api.myTestInfo[0].testName,
            userBirthday: this.props.userBirthday || (this.props.navigation.state.params && this.props.navigation.state.params.userBirthday) ? this.props.navigation.state.params.userBirthday : '',
            sfzh: this.props.sfzh || (this.props.navigation.state.params && this.props.navigation.state.params.sfzh) ? this.props.navigation.state.params.sfzh : api.myTestInfo[0].testSfzh,




            phoneNumber: '',
            receiptNumber: '',
            addressInput: '',
            address: [],
            time: [],
            isCanShowResult: false,
            isCanShowAddressSelectPage: false,
            // showPickAddressView: false,
        };
        //下面两条语句将两个回调函数和成员方法绑定
        this.handleInputReceiptNumber = this.handleInputReceiptNumber.bind(this);
        this.handleInputPhoneNumber = this.handleInputPhoneNumber.bind(this);
        this.handleInputAddress = this.handleInputAddress.bind(this);

    }

    //相片回执号
    public handleInputReceiptNumber(text: any) {

        this.setState({ receiptNumber: text });
    }

    //联系方式
    public handleInputPhoneNumber(text: any) {

        this.setState({ phoneNumber: text });
    }
    //详细地址
    public handleInputAddress(text: any) {

        this.setState({ addressInput: text });
    }


    public componentDidMount() {
        //重写界面的didMount，必须调用super
        super.componentDidMount();

        //打开地址选择器
        // this.open()
    }

    public componentWillMount() {

    }

    public componentWillUnmount() {
        //重写界面的Unmount，必须调用super
        super.componentWillUnmount();
    }

    public open() {
        // this.setState({
        //     showPickAddressView: true,
        // })
        //this.refs.SelectAddressOrDate.showAddress(this.state.address)
        // this.refs['SelectAddressOrDate'].showAddress(this.state.address)

        // this.AreaPicker.show()
        this.setState({
            isCanShowAddressSelectPage: true
        },
            () => {
                this.refs['AreaPicker'].show()
            }
        )
        // this.refs['AreaPicker'].show()
    }


    public openTime() {
        this.refs.SelectAddressOrDate.showDate(this.state.time)
    }

    public callBackDateValue(value: any) {
        this.setState({
            time: value
        })
    }

    public callBackAddressValue(value: any) {
        this.setState({
            address: value
        })
    }


    public requestAnswerData(questionStr: string) {
        this.initTimeCount()
        this.refs['BusinessAnswerView'].requestAnswerData(questionStr)

    }

    public initTimeCount() {
        this.refs['TimeCountTopView'].initTimeCount()
    }



    public toast(msg: any) {
        let obj = {
            id: 1,
            name: msg,
        };
        tecsunReadCardModule.Toasts(obj);
    }

    public isEmpty(content: any) {
        if (content == null || content == "null" || content == '' || content == "undefined") {
            return true
        }
        else {
            return false
        }
    }

    public checkMobile(str: any) {
        var re = /^1\d{10}$/
        if (re.test(str)) {
            return true
        } else {
            return false
        }
    }


    //todo
    public commitData() {
        this.myLog("commitData")

        let receiptNumber = this.state.receiptNumber
        if (this.isEmpty(receiptNumber)) {
            this.toast('请输入相片回执号')
            return
        }

        let phoneNumber = this.state.phoneNumber
        if (this.isEmpty(phoneNumber)) {
            this.toast('请输入手机号')
            return
        }

        if (!this.checkMobile(phoneNumber)) {
            this.toast("请输入正确的手机号");
            return
        }

        if (this.state.address.length == 0) {
            this.toast("请选择邮寄区域");
            return
        }

        let addressInput = this.state.addressInput
        if (this.isEmpty(addressInput)) {
            this.toast("请填入详细地址");
            return
        }

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

                            <TitleTopView titleText="社保卡申请" />


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
                                            atlasId={common.CONST_ATLAS_ID_SSC_PROGRESS}
                                            businessQuestion={common.CONST_BUSINESS_Q_SSC_APPLY}
                                            businessCompleteQ={common.CONST_BUSINESS_COMPLETE_SSC_PROGRESS}

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
                                        <Text style={styles.textStyle2} >出生日期:</Text>
                                        <Text style={styles.textStyle3} >{ViewUtils.IdCard(this.state.sfzh, 1)}</Text>
                                    </View>

                                    {/**** */}
                                    <View style={styles.containerStyle}>
                                        <Text style={styles.textStyle2} >身 份 证 号:</Text>
                                        <Text style={styles.textStyle3} >{ViewUtils.replaceSfzh(this.state.sfzh)}</Text>
                                    </View>

                                    {/**** */}
                                    <View style={styles.containerStyle}>
                                        <Text style={styles.textStyle2} >相片回执号:</Text>
                                        <View style={styles.containerStyle2}>
                                            <TextInput
                                                style={styles.inputStyle}
                                                placeholder="请输入相片回执号"
                                                placeholderTextColor={'#b4b4b4'}
                                                value={this.state.receiptNumber}
                                                maxLength={50}
                                                onChangeText={newText => this.handleInputReceiptNumber(newText)}>

                                            </TextInput>
                                        </View>

                                        <Text style={[styles.textStyle2, { width: 45, marginLeft: 10 }]} >联系方式:</Text>
                                        <View style={styles.containerStyle2}>
                                            <TextInput
                                                style={styles.inputStyle}
                                                placeholder="请输入手机号码"
                                                placeholderTextColor={'#b4b4b4'}
                                                value={this.state.phoneNumber}
                                                maxLength={11}
                                                keyboardType='number-pad'
                                                onChangeText={newText => this.handleInputPhoneNumber(newText)}>

                                            </TextInput>
                                        </View>

                                    </View>


                                    {/**** */}

                                    <TouchableOpacity onPress={() => this.open()}>
                                        <View style={styles.containerStyle}>
                                            <Text style={styles.textStyle2} >邮 寄 区 域:</Text>

                                            <View style={styles.containerStyle2}>
                                                <TextInput
                                                    style={styles.inputStyle}
                                                    placeholder="选择省"
                                                    placeholderTextColor={'#b4b4b4'}
                                                    value={this.state.address[0]}
                                                    editable={false}
                                                    maxLength={20}
                                                >
                                                </TextInput>

                                                {ViewUtils.getImageArrowDown()}
                                            </View>

                                            <View style={[styles.containerStyle2, { marginLeft: 10, marginRight: 10 }]}>
                                                <TextInput
                                                    style={styles.inputStyle}
                                                    placeholder="选择市"
                                                    placeholderTextColor={'#b4b4b4'}
                                                    value={this.state.address[1]}
                                                    editable={false}
                                                    maxLength={20}
                                                >

                                                </TextInput>
                                                {ViewUtils.getImageArrowDown()}
                                            </View>

                                            <View style={styles.containerStyle2}>
                                                <TextInput
                                                    style={styles.inputStyle}
                                                    placeholder="选择区/县"
                                                    placeholderTextColor={'#b4b4b4'}
                                                    value={this.state.address[2]}
                                                    editable={false}
                                                    maxLength={20}
                                                >
                                                </TextInput>
                                                {ViewUtils.getImageArrowDown()}
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                    {/**** */}
                                    <View style={styles.containerStyle}>
                                        <Text style={styles.textStyle2} >详 细 地 址:</Text>
                                        <View style={styles.containerStyle2}>
                                            <TextInput
                                                style={styles.inputStyle}
                                                placeholder="请输入详细地址"
                                                placeholderTextColor={'#b4b4b4'}
                                                value={this.state.addressInput}
                                                maxLength={150}
                                                onChangeText={newText => this.handleInputAddress(newText)}>

                                            </TextInput>
                                        </View>

                                    </View>

                                    {/**** */}
                                    <View style={[styles.containerStyle, { marginBottom: 0 }]}>
                                        {ViewUtils.getExitButton2(() => this.colsePage())}
                                        {ViewUtils.getConfirmButton(() => this.commitData())}
                                    </View>
                                </View>

                            </View>




                            {/* {ViewUtils.getConfirmButton(() => this.commitData())} */}



                            {/* <TouchableOpacity activeOpacity={0.5} onPress={() => {
                    
                }}>
                <View style={{justifyContent:'center',
        alignItems: 'center',
        marginBottom:5,}}>
                    <Image 
                        style={{
                            width: 87.5,
                            height: 30,                       
                        }}
                        source={require('../../images/bg_press_blue.png')} >

                    </Image>

                    <View style={{position: 'absolute',justifyContent:'center',flexDirection: 'row',alignItems:'center',}}>
                            <Text style={{ fontSize: 15,color:"white"}} >关闭</Text>
                    </View>

                </View>
            </TouchableOpacity> */}





                            {this.state.isCanShowAddressSelectPage ?
                                <AreaPicker
                                    areaJson={AreaJson}
                                    onPickerCancel={() => {
                                        // if (this.state.address.length > 2) {
                                        //     value[0] = this.state.address[0]
                                        //     value[1] = this.state.address[1]
                                        //     value[2] = this.state.address[2]
                                        // }

                                        this.setState({
                                            isCanShowAddressSelectPage: false
                                        })

                                    }}
                                    onPickerConfirm={(value) => {
                                        // alert(JSON.stringify(value));
                                        this.myLog(value[0])
                                        this.myLog(value[1])
                                        this.myLog(value[2])
                                        // alert(value[0]);
                                        // alert(value[1]);
                                        // alert(value[2]);

                                        this.setState({
                                            address: value,
                                        })

                                    }}
                                    selectedValue={
                                        this.state.address.length > 2 ?
                                            [this.state.address[0], this.state.address[1], this.state.address[2]] :
                                            ['河北省', '石家庄市', '长安区']}
                                    // selectedValue={['河北省', '石家庄市', '长安区']}
                                    // ref={ref => this.AreaPicker = ref} 
                                    ref={'AreaPicker'}
                                /> : null}

                            {/* <AreaPicker
                                areaJson={AreaJson}
                                onPickerCancel={() => { }}
                                onPickerConfirm={(value) => {
                                    // alert(JSON.stringify(value));
                                    this.myLog(value[0])
                                    this.myLog(value[1])
                                    this.myLog(value[2])
                                    // alert(value[0]);
                                    // alert(value[1]);
                                    // alert(value[2]);

                                    this.setState({
                                        address: value,
                                    })

                                }}
                                selectedValue={['河北省', '石家庄市', '长安区']}
                                // ref={ref => this.AreaPicker = ref} 
                                ref={'AreaPicker'}
                            /> */}

                        </View>

                    </View>

                </MyMonitorView>

                {/* <View style={{
                    elevation: 1000,
                    zIndex: 1000,
                    alignItems: 'flex-start',
                    flexDirection: 'row',
                    flex: 1,
                    position: 'absolute',
                    height: "100%",
                    width: "100%",
                }
                }>
                    <AreaPicker
                        areaJson={AreaJson}
                        onPickerCancel={() => { }}
                        onPickerConfirm={(value) => {
                            // alert(JSON.stringify(value));
                            this.myLog(value[0])
                            this.myLog(value[1])
                            this.myLog(value[2])
                            // alert(value[0]);
                            // alert(value[1]);
                            // alert(value[2]);

                            this.setState({
                                address: value,
                            })

                        }}
                        selectedValue={['河北省', '石家庄市', '长安区']}
                        // ref={ref => this.AreaPicker = ref} 
                        ref={'AreaPicker'}
                    />

                </View> */}

                {/* 不能用这个, 涉及reactPackage <SelectAddressOrDate ref='SelectAddressOrDate' callBackAddressValue={this.callBackAddressValue.bind(this)} callBackDateValue={this.callBackDateValue.bind(this)} /> */}

                {/* {<View style={{
                    elevation: 999,
                    zIndex: 999,
                    alignItems: 'flex-start',
                    flexDirection: 'row',
                    flex: 1,
                    position: 'absolute',
                    height: "100%",
                    width: "100%",
                }
                }>
                    <SelectAddressOrDate ref={'SelectAddressOrDate'} callBackAddressValue={this.callBackAddressValue.bind(this)} callBackDateValue={this.callBackDateValue.bind(this)} />

                </View>
                } */}


                {/* {this.state.showPickAddressView ? <View style={{
                    elevation: 1001,
                    zIndex: 1001,
                    alignItems: 'flex-start',
                    flexDirection: 'row',
                    flex: 1,
                    // backgroundColor: 'rgba(52, 52, 52, 0.8)',//这会将其设置为具有 80% 不透明度的灰色，这是从不透明度小数派生的0.8. 该值可以是从0.0到 的任何值1.0。
                    // backgroundColor: 'rgba(52, 52, 52, 0.5)',
                    position: 'absolute',

                    height: "100%",
                    width: "100%",
                }
                }>
                    <SelectAddressOrDate ref={'SelectAddressOrDate'} callBackAddressValue={this.callBackAddressValue.bind(this)} callBackDateValue={this.callBackDateValue.bind(this)} />

                </View>:null
                } */}





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
                                this.jump2AnswerPage(common.CONST_BUSINESS_COMPLETE_SSC_APPLY)
                            } />

                        </View>
                    </Modal>

                    : null}

            </>
        );
    }
}
