/** @format */

import { AppRegistry } from 'react-native';
import App from './app/App';
import { appid } from './package';
import { name as appName } from './app.json';
import AppDebug from './app/AppDebug';

//关闭其中某些yellow警告
console.ignoredYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.','source.uri should not be an empty string','Invalid props.style key'];
// 关闭全部yellow警告
console.disableYellowBox = true;


//robot_navigation&stop_cruise  hotel_room_number&room_number
//上线使用 
AppRegistry.registerConfig([{
    appKey: 'project_orion_star_opk',//TODO 如果代替咨询(上个opk), 这里的appkey需要修改;
    component: () => App,                                           //chat&chat //：operational_&operational //operational_&operational
    intent: ["operational_&operational","other&other","chat&chat", 'profile&lover'],//todo,记得去掉weather&get_weather //例如:'weather&get_weather' //  intent: 'open_page&open_page',//robot_navigation&stop_cruise //tell_me_why&common
    appId: appid,
    priority: 1
}]);

//Debug调试使用
AppRegistry.registerComponent(appName, () => AppDebug);
