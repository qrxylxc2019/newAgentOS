import {
    BaseComponent,
    listenersManager,
    TriggerNavigate
} from 'orionos-eve-core';
import React from 'react';
import { DeviceEventEmitter, Alert } from 'react-native';
import {
    createAppContainer,
    createStackNavigator
} from 'react-navigation';
import { AppVoice } from './AppVoice';
import { ReadCardScreen } from './tecsun/login/ReadCardScreen';
import { SelectReadCardTypeScreen } from './tecsun/login/SelectReadCardTypeScreen';
import { BusinessInfoConfirmScreen } from './tecsun/login/BusinessInfoConfirmScreen';
import { SscApplyScreen } from './tecsun/biz/SscApplyScreen';
import { MakeCardProgress } from './tecsun/biz/MakeCardProgress';
import { SscFillInCardScreen } from './tecsun/biz/SscFillInCardScreen'
import { CardInfomationScreen } from './tecsun/biz/CardInfomationScreen'
import { CardUnhangScreen } from './tecsun/biz/CardUnhangScreen'
import { CardReportLossScreen } from './tecsun/biz/CardReportLossScreen'
import { CardActivationScreen } from './tecsun/biz/CardActivationScreen'
import { PasswordModifyScreen } from './tecsun/biz/PasswordModifyScreen'
import { AppraiseScreen } from './tecsun/biz/AppraiseScreen'
import { CloseScreen } from './tecsun/biz/CloseScreen'
// import { NavigationScreen } from './tecsun/biz/NavigationScreen'
import { NavigationScreen } from './tecsun/navigation/NavigationScreen'

import { MainScreen } from './main/MainScreen';
import { DemoScreen2 } from './demo/DemoScreen2';
import TabView4 from './tecsun/test/areatest/components/pages/tab/TabView4';
import api from './config/api'

// 全局TC调试函数 - 可以在任何地方直接使用
global.tclog = (msg, data = null) => {
    const timestamp = new Date().toLocaleTimeString();
    if (data !== null) {
        if (typeof data === 'object') {
            console.log(`tc: ${timestamp} - ${msg}`, JSON.stringify(data, null, 2));
        } else {
            console.log(`tc: ${timestamp} - ${msg} - ${data}`);
        }
    } else {
        console.log(`tc: ${timestamp} - ${msg}`);
    }
};

global.tcerror = (msg, error = null) => {
    const timestamp = new Date().toLocaleTimeString();
    if (error) {
        console.error(`tc: ${timestamp} - ERROR: ${msg}`, error);
    } else {
        console.error(`tc: ${timestamp} - ERROR: ${msg}`);
    }
};

global.tcwarn = (msg, data = null) => {
    const timestamp = new Date().toLocaleTimeString();
    if (data !== null) {
        if (typeof data === 'object') {
            console.warn(`tc: ${timestamp} - WARN: ${msg}`, JSON.stringify(data, null, 2));
        } else {
            console.warn(`tc: ${timestamp} - WARN: ${msg} - ${data}`);
        }
    } else {
        console.warn(`tc: ${timestamp} - WARN: ${msg}`);
    }
};


/**
 * 主界面
 */
export default class App extends BaseComponent {

    userText = ''

    constructor(props) {
        super(props);
        // this.setVoice(new AppVoice());
        // this.myLog('>>>>>>>> props  <<<<<<<<<<');
        // this.myLog("主界面", 'constructor', props)

        // this.myLog(">>>>>>>>> props 1  <<<<<<<<<<<<<");
        // console.log('%j', props);

        // this.myLog(">>>>>>>>> props.navigation  <<<<<<<<<<<<<");
        // console.log('%j', props.navigation);
        // this.myLog(">>>>>>>>> props.navigation.state  <<<<<<<<<<<<<");
        // console.log('%j', props.navigation.state);
        // this.myLog(">>>>>>>>> props.navigation.state.params  <<<<<<<<<<<<<");
        // console.log('%j', props.navigation.state.params);
        // this.myLog(">>>>>>>>> props.navigation.state.params.result  <<<<<<<<<<<<<");
        // console.log('%j', props.navigation.state.params.result);
        // this.myLog(">>>>>>>>> props.navigation.state.params.result.userText  <<<<<<<<<<<<<");
        // console.log('%j', props.navigation.state.params.result.userText);
        // this.myLog(">>>>>>>>> props 2 <<<<<<<<<<<<<");
        tclog('App =====================================================');
        this.myLog(">>>>>>>>>  props.navigation.state.params.result.userText  <<<<<<<<<<<");
        this.userText = props.navigation.state.params.result.userText;
        this.myLog(this.userText);

        
    }

    myLog(msg) {
        console.log('>>>>>>>>>  ' + msg + '  <<<<<<<<<<');
    }

    // TC调试打印函数 - 用于adb logcat -s tc:* 过滤
    static tclog(msg, data = null) {
        const timestamp = new Date().toLocaleTimeString();
        if (data !== null) {
            if (typeof data === 'object') {
                console.log(`tc: ${timestamp} - ${msg}`, JSON.stringify(data, null, 2));
            } else {
                console.log(`tc: ${timestamp} - ${msg} - ${data}`);
            }
        } else {
            console.log(`tc: ${timestamp} - ${msg}`);
        }
    }

    // TC错误打印函数
    static tcerror(msg, error = null) {
        const timestamp = new Date().toLocaleTimeString();
        if (error) {
            console.error(`tc: ${timestamp} - ERROR: ${msg}`, error);
        } else {
            console.error(`tc: ${timestamp} - ERROR: ${msg}`);
        }
    }

    // TC警告打印函数
    static tcwarn(msg, data = null) {
        const timestamp = new Date().toLocaleTimeString();
        if (data !== null) {
            if (typeof data === 'object') {
                console.warn(`tc: ${timestamp} - WARN: ${msg}`, JSON.stringify(data, null, 2));
            } else {
                console.warn(`tc: ${timestamp} - WARN: ${msg} - ${data}`);
            }
        } else {
            console.warn(`tc: ${timestamp} - WARN: ${msg}`);
        }
    }

    componentDidMount() {
        super.componentDidMount();
    }

    componentWillMount() {

    }

    componentWillUnmount() {
        super.componentWillUnmount();
    }

    /**
     * 界面配置
     *
     * @return
     */
    initRouterConfig() {
        return {
            // main:SelectReadCardTypeScreen,
            // SelectReadCardTypeScreen: SelectReadCardTypeScreen,
            // SscFillInCardScreen: SscFillInCardScreen,
            // NavigationScreen:NavigationScreen,

            // AppraiseScreen: AppraiseScreen,

            BusinessInfoConfirmScreen: BusinessInfoConfirmScreen,
            SelectReadCardTypeScreen: SelectReadCardTypeScreen,
            ReadCardScreen: ReadCardScreen,
            SscApplyScreen: SscApplyScreen,
            MakeCardProgress: MakeCardProgress,
            SscFillInCardScreen: SscFillInCardScreen,

            CardInfomationScreen: CardInfomationScreen,
            CardUnhangScreen: CardUnhangScreen,
            CardReportLossScreen: CardReportLossScreen,
            CardActivationScreen: CardActivationScreen,
            PasswordModifyScreen: PasswordModifyScreen,
            AppraiseScreen:AppraiseScreen,
            NavigationScreen: NavigationScreen,
            CloseScreen: CloseScreen,


            // SscFillInCardScreen:SscFillInCardScreen,
            TabView4: TabView4,
            main: MainScreen,
            demo: DemoScreen2,

        };
    }

    render() {
        return (
            <>
                {this.initRouter()}
            </>
        );
    }

    /**
     * 初始化界面跳转路由
     *
     * @return {*}
     */
    initRouter() {
        let routes = this.initRouterConfig();
        const workFlowNavigator = createStackNavigator(routes,
            {
                // initialRouteName: 'demo',
                defaultNavigationOptions: ({ navigation }) => {

                    console.log("1459 defaultNavigationOptions  navigation.state.params");
                    console.log(navigation.state.params);
                    console.log('%j', navigation.state.params);

                    // navigation.state.params = {
                    //     userText: this.userText,
                    //     isReadSsc: false,
                    //     plainText: ''
                    // }

                    // navigation.state.ldwParams = {
                    //     userText: this.userText,
                    // }

                    //进入opk的第一个用户语音转出来的文字
                    api.myInfo[0].userSpeakTEXT = this.userText

                    return {
                        headerTransparent: true,
                        header: () => null,
                        gesturesEnabled: true,
                        headerBackTitle: null
                    };
                }

            }
        );
        let AppContainer = createAppContainer(workFlowNavigator);
        return (
            <AppContainer
                onNavigationStateChange={(preState, newState, action) => {
                    //界面变化监听
                }}
            />
        );
    }
}

























// import { BaseComponent } from 'orionos-eve-core';
// import React from 'react';
// import { DemoScreen } from './demo/DemoScreen';
// import {GetUserTextScreen} from './tecsun/GetUserTextScreen'
// import { NavigationScreen } from './tecsun/navigation/NavigationScreen'

// /**
//  * 主界面
//  */
//  const TAG = 'demoApp'
// export default class App extends BaseComponent {

//     constructor(props) {
//         super(props);
//         console.log('>>>>>>>> props  <<<<<<<<<<');
//         console.log(TAG, 'constructor', props)
//     }

//     componentDidMount() {
//         super.componentDidMount();
//     }

//     componentWillMount() {
//         console.log();
//     }

//     componentWillUnmount() {
//         super.componentWillUnmount();
//     }

//     render() {
//         // return (<DemoScreen {...this.props}/>);
//         // return (<GetUserTextScreen {...this.props}/>);
//         return (<NavigationScreen {...this.props}/>);
//     }
// }
