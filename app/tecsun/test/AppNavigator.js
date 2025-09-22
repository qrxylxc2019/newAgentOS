import React from 'react';
import {
    createAppContainer,
    createStackNavigator
} from 'react-navigation';
import { ReadCardScreen } from '../login/ReadCardScreen';
import { SelectReadCardTypeScreen } from '../login/SelectReadCardTypeScreen';
import { SscApplyScreen } from '../biz/SscApplyScreen';
import { MakeCardProgress } from '../biz/MakeCardProgress';
import TabView4 from './areatest/components/pages/tab/TabView4';

const AppNavigator = createStackNavigator({

    SelectReadCardTypeScreen: SelectReadCardTypeScreen,
    ReadCardScreen: ReadCardScreen,
    SscApplyScreen: SscApplyScreen,
    MakeCardProgress: MakeCardProgress,
    TabView4: TabView4,

}, {
    // initialRouteName: 'demo',//ldw todo 这里加入就会报错: InitialRouteName: undefined 不是评估 routeConfigs[InitialRouteName].params 的对象
    defaultNavigationOptions: ({ navigation }) => {
        return {
            headerTransparent: true,
            header: () => null,
            gesturesEnabled: true,
            headerBackTitle: null
        };
    }

}
);
// let StackNavigatorPage = createAppContainer(AppNavigator);
export default createAppContainer(AppNavigator);

