import { BaseComponent, triggerManager, BaseComponentProps, BlurOverlay, FaceTrackSoundLocalizationComponent } from 'orionos-eve-core';
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Button, Animated, TextInput, FlatList, Modal } from 'react-native';
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
import AreaJson from '../test/Area.json';
import common from '../../config/common';
import MyMonitorView from '../component/MyMonitorView'
import CommitResultView from '../component/CommitResultView'
import api from '../../config/api'



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
},
)


/****  这个界面进来就是关闭opk, 没其他作用*/
@observer
export class CloseScreen extends MyBaseComponent {

    public constructor(props: BaseComponentProps) {
        super(props);

    }


    public componentDidMount() {
        //重写界面的didMount，必须调用super
        super.componentDidMount();
        this.closeCurrentOpk()

    }

    public componentWillMount() {

    }

    public componentWillUnmount() {
        //重写界面的Unmount，必须调用super
        super.componentWillUnmount();
    }

    public render() {
        return (

            <>



            </>
        );
    }
}
