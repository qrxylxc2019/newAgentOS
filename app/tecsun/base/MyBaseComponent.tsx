import { BaseComponent, triggerManager, BaseComponentProps, speechApi, FaceTrackSoundLocalizationComponent, ComponentEvent, BlurOverlay, TextListener, ComponentResultConst } from 'orionos-eve-core';
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Button, Animated } from 'react-native';
import { observer } from 'mobx-react';
import api, { consolelog } from '../../config/api';

import { DemoViewModel } from '../../demo/DemoViewModel';
import { TecsunVoice } from '../TecsunVoice';
import { DemoModel } from '../../demo/DemoModel';
import common from '../../config/common'
import { questionAnswerViewRef } from '../component/QuestionAnswerView';

const { width } = Dimensions.get('window');


export class MyBaseComponent extends BaseComponent<BaseComponentProps, DemoViewModel, TecsunVoice> {

    public viewModel: DemoViewModel;

    public getComponentName() {
        return " "
    }

    public constructor(props: BaseComponentProps) {
        super(props);

        console.log('MainScreen constructor');

        this.viewModel = new DemoViewModel(this.getIsNeedOrionsRecognitionShow());
        let voice = new TecsunVoice(this.viewModel, this);

        //关联ViewModel及Voice的生命周期到当前界面上
        this.setViewModel(this.viewModel);
        this.setVoice(voice);

    }

    /**
     * 
     * @returns 是否展示底部语音监听提示条, 不展示就不监听
     */
    public getIsNeedOrionsRecognitionShow() {
        return true;
    }

    public componentDidMount() {
        //重写界面的didMount，必须调用super
        super.componentDidMount();

        speechApi.setRecognizeMode(true);
    }

    public componentWillMount() {
        speechApi.setRecognizeMode(true);

    }

    public componentWillUnmount() {
        //重写界面的Unmount，必须调用super
        super.componentWillUnmount();
        speechApi.setRecognizeMode(false);

        this.stopTTS()
    }

    public playText(msg: string) {
        let listener = new TextListener();
        listener.setFinish(() => {
            //TODO: 播放完成
            listener.removeListener();
            this.myLog("questionAnswerViewRef?.ttsFinish() ")
            questionAnswerViewRef?.ttsFinish();

        });
        speechApi.playText(listener.getId(), msg);

    }

    public stopTTS() {
        speechApi.stopTTS()
    }

    public myLog(msg: any) {
        // console.log('>>>>>>>>>  ' + msg + '  <<<<<<<<<<');
        let obj = {
            info: msg,
            taskId: 'react_test',
            type: 'MyBaseComponent',
            time: Date.now(),
            level: 1
        };
        consolelog([obj]);
    }

    //todo
    public closeCurrentOpk() {
        this.myLog("colsePagehahha")
        this.viewModel?.exit()// 暂时关掉, 后面要重新打开;
    }

    //todo
    public colsePage() {
        this.myLog("colsePagehahhahahha")

        this.viewModel?.exit()// 暂时关掉, 后面要重新打开;
    }

    public onStatusUpdate = (event?: ComponentEvent): boolean => {
        console.log(">>> onStatusUpdate <<<");
        console.log(event);
        speechApi.setAngleCenterRange(0, 45)
        //TODO: 状态处理
        return true;
    };


    //其实这里不用调用了, 上面的getIsNeedOrionsRecognitionShow会处理, 这里调用后会在整个opk周期生效, 不过也做了处理了;
    public globalRecognitionShow(b: any) {
        //关掉语音提示栏
        global.recognition && global.recognition.setShow(b);
    }





    public onFinish = (result?: ComponentEvent): boolean => {
        speechApi.setAngleCenterRange(0, 90)

        this.myLog(">>> onFinish <<<");
        // this.viewModel.exit();
        // this.viewModel.wakeUp();
        //TODO: 结果处理
        this.myLog(">>> ComponentResultConst.RESULT_TIMEOUT  = " + ComponentResultConst.RESULT_TIMEOUT);
        this.myLog(">>> result?.status  = " + result?.status);
        if (ComponentResultConst.RESULT_TIMEOUT == result?.status) {
            // this.colsePage()
            // this.viewModel.exit()// 暂时关掉, 后面要重新打开;
            // this.viewModel.wakeUp();

        }

        return true;
    };

    public requestAnswerData(questionStr: string) {


    }

    public skipNextPage(name: any, param: any) {
        this.props.navigation.replace(name, param);
    }


    public hideVideo = () => {
        global.recognition && global.recognition.setShow(true);
        console.log(">>>>> hideVideo 关闭了 ")
    }

    public exit() {

    }

    public startJump(plainText: any, params: any) {

        this.myLog("startJump  plainText 1")
        this.myLog(plainText)


        switch (plainText) {
            //社保卡如何申请？
            case common.CONST_SKIP_CARD_APPLICATION_JUMP:

                this.myLog("common.CONST_SKIP_CARD_APPLICATION_JUMP 社保卡如何申请？")
                //
                this.props.navigation.replace('SscApplyScreen', params);
                return true
                break;

            //社保卡补换业务
            case common.CONST_SKIP_CARD_REPLACEMENT_JUMP:
                this.myLog("common.CONST_SKIP_CARD_REPLACEMENT_JUMP 社保卡补换业务")

                this.props.navigation.replace('SscFillInCardScreen', params);
                return true
                break;

            //制卡进度查询业务
            case common.CONST_SKIP_CARD_PROGRESS_JUMP:
                this.myLog("common.CONST_SKIP_CARD_PROGRESS_JUMP 制卡进度查询业务")

                this.props.navigation.replace('MakeCardProgress', params);
                return true
                break;

            //信息查询业务
            case common.CONST_SKIP_CARD_INFORMATION_JUMP:
                this.myLog("common.CONST_SKIP_CARD_INFORMATION_JUMP 社保卡查询业务")
                this.props.navigation.replace('CardInfomationScreen', params);
                return true
                //
                break;

            //解挂业务
            case common.CONST_SKIP_CARD_UNHANG_JUMP:
                this.myLog("common.CONST_SKIP_CARD_UNHANG_JUMP 解挂业务")
                this.props.navigation.replace('CardUnhangScreen', params);
                return true
                //
                break;


            //挂失业务
            case common.CONST_SKIP_CARD_REPORTLOSS_JUMP:
                this.myLog("common.CONST_SKIP_CARD_REPORTLOSS_JUMP 挂失业务")
                this.props.navigation.replace('CardReportLossScreen', params);
                return true
                //
                break;

            //激活业务
            case common.CONST_SKIP_CARD_ACTIVATION_JUMP:
                this.myLog("common.CONST_SKIP_CARD_ACTIVATION_JUMP 激活业务")
                this.props.navigation.replace('CardActivationScreen', params);
                return true
                //
                break;

            //密码修改
            case common.CONST_SKIP_PASSWORD_MODIFY_JUMP:
                this.myLog("common.CONST_SKIP_PASSWORD_MODIFY_JUMP 密码修改")
                this.props.navigation.replace('PasswordModifyScreen', params);

                return true
                //todo
                break;

            //注销
            case common.CONST_SKIP_CARD_LOGOUT_JUMP:
                // card_logout_jump 这里需要跳转到导航那边的opk才行;
                this.jump2CancelLation()
                return true

                break;

            //密码重置
            case common.CONST_SKIP_PASSWORD_RESET_JUMP:
                this.jump2PwdRest()
                return true
                break;

            //服务评价跳转指令
            case common.CONST_SKIP_APPRAISE_JUMP:

                this.myLog("common.CONST_SKIP_APPRAISE_JUMP 服务评价跳转指令")
                this.props.navigation.replace('AppraiseScreen', params);

                return true
                //todo
                break;

            //带路办理指令
            case common.CONST_SKIP_WELCOME_WORDS:
                return true
                //todo
                break;

            //不办了跳回首页指令
            case common.CONST_SKIP_HOME_PAGE:
                this.closeCurrentOpk()
                return true
                break;

            default:
                return false
                return ''
        }
    }

    private jump2CancelLation() {
        this.props.navigation.replace('NavigationScreen', {
            tragetPlace: '注销地点',
            backPlace: '接待点',
            businessQuestion: common.CONST_BUSINESS_COMPLETE_SSC_CANCELLATION,
            businessCompleteQ: common.CONST_BUSINESS_COMPLETE_SSC_CANCELLATION
        });

    }

    private jump2PwdRest() {

        this.props.navigation.replace('NavigationScreen', {
            tragetPlace: '重置地点',
            backPlace: '接待点',
            businessQuestion: common.CONST_BUSINESS_COMPLETE_PWD_RESET,
            businessCompleteQ: common.CONST_BUSINESS_COMPLETE_PWD_RESET

        });


    }



    public nextBizName(plainText: any) {

        let result = '';

        this.myLog('>>>>>>>>>>>>>>>> checkIsNeedJump 1 <<<<<<<<<<<<<<<<,')
        this.myLog(plainText)

        switch (plainText) {
            //社保卡如何申请？
            case common.CONST_SKIP_CARD_APPLICATION_JUMP:
            //社保卡补换业务
            case common.CONST_SKIP_CARD_REPLACEMENT_JUMP:
            //制卡进度查询业务
            case common.CONST_SKIP_CARD_PROGRESS_JUMP:
            //信息查询业务
            case common.CONST_SKIP_CARD_INFORMATION_JUMP:
            //解挂业务
            case common.CONST_SKIP_CARD_UNHANG_JUMP:
            //挂失业务
            case common.CONST_SKIP_CARD_REPORTLOSS_JUMP:
            //激活业务
            case common.CONST_SKIP_CARD_ACTIVATION_JUMP:
            //密码修改
            case common.CONST_SKIP_PASSWORD_MODIFY_JUMP:
            // //注销
            // case common.CONST_SKIP_CARD_LOGOUT_JUMP:
            // //密码重置
            // case common.CONST_SKIP_PASSWORD_RESET_JUMP:

            //带路办理指令
            case common.CONST_SKIP_WELCOME_WORDS:

                this.myLog('>>>>>>>>>>>>>>>> checkIsNeedJump 2 <<<<<<<<<<<<<<<<,')
                // this.props.navigation.replace('SelectReadCardTypeScreen', { plainText: plainText });
                result = 'SelectReadCardTypeScreen'
                //todo
                break;
            //服务评价跳转指令
            case common.CONST_SKIP_APPRAISE_JUMP:
                //这里直接跳转到评价界面
                this.myLog('>>>>>>>>>>>>>>>> 这里直接跳转到评价界面 <<<<<<<<<<<<<<<<,')
                this.props.navigation.replace('AppraiseScreen');
                result = ''
                break;

            //注销
            case common.CONST_SKIP_CARD_LOGOUT_JUMP:
                this.jump2CancelLation()
                result = ''
                //todo
                break;
            //密码重置
            case common.CONST_SKIP_PASSWORD_RESET_JUMP:
                this.jump2PwdRest()
                result = ''
                //todo
                break;
            //不办了跳回首页指令
            case common.CONST_SKIP_HOME_PAGE:
                this.closeCurrentOpk()
                result = ''
                //todo
                break;



            default:
                result = ''
                break;
        }

        return result
    }


    public myJump(routerName: any, p: any) {

        this.myLog('myJump routerName ')
        this.myLog(routerName)
        this.myLog('myJump plainText')
        this.myLog(p)

        let obj = {
            //这个就是知识库提示要跳转的界面
            plainText: p
        }

        this.props.navigation.replace(routerName, obj);
        // this.props.navigation.navigate(routerName, obj);
        // this.props.navigation.replace('MakeCardProgress', params);
    }

    public jump2AnswerPage(question: any) {

        let obj = {
            businessCompleteQ: question
        }

        this.props.navigation.replace('BusinessInfoConfirmScreen', obj);
    }

}





