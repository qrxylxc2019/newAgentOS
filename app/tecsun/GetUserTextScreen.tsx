// import { BaseComponent, triggerManager, BaseComponentProps } from 'orionos-eve-core';
// import React from 'react';
// import { observer } from 'mobx-react';
// import { Text, View, NativeModules, Button } from 'react-native';
// import { DemoViewModel } from '../demo/DemoViewModel';
// import { DemoVoice } from '../demo/DemoVoice';

// import StackNavigatorPage from './test/AppNavigator'

// /**
//  * 功能UI界面
//  */
// @observer
// export class GetUserTextScreen extends BaseComponent<BaseComponentProps, DemoViewModel, DemoVoice> {

//     public constructor(props: BaseComponentProps) {
//         super(props);

//         this.myLog(">>>>>>>>> props 1  <<<<<<<<<<<<<");
//         console.log('%j', props);

//         this.myLog(">>>>>>>>> props.navigation  <<<<<<<<<<<<<");
//         console.log('%j', props.navigation);
//         this.myLog(">>>>>>>>> props.navigation.state  <<<<<<<<<<<<<");
//         console.log('%j', props.navigation.state);
//         this.myLog(">>>>>>>>> props.navigation.state.params  <<<<<<<<<<<<<");
//         console.log('%j', props.navigation.state.params);
//         this.myLog(">>>>>>>>> props.navigation.state.params.result  <<<<<<<<<<<<<");
//         console.log('%j', props.navigation.state.params.result);
//         this.myLog(">>>>>>>>> props.navigation.state.params.result.userText  <<<<<<<<<<<<<");
//         console.log('%j', props.navigation.state.params.result.userText);

//         this.myLog(">>>>>>>>> props 2 <<<<<<<<<<<<<");


//     }

//     public myLog(msg: any) {
//         console.log('>>>>>>>>> GetUserTextScreen ' + msg + '  <<<<<<<<<<');
//     }

//     render() {
//         return (
//             <StackNavigatorPage />
//         );
//     }

// }
