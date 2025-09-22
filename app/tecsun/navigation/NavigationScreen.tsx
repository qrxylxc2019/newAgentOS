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

import React from 'react';
import {
    BaseComponent,
    BaseComponentProps,
    BaseVoice,
    NavigationComponent
} from 'orionos-eve-core';
import { observer } from 'mobx-react';
import { NavigationViewModel } from './NavigationViewModel';
import { NavigationView } from './NavigationView';

@observer
export class NavigationScreen
    extends BaseComponent<BaseComponentProps, NavigationViewModel, BaseVoice> {


    public closeCurrentOpk() {
        this.props.navigation.replace('CloseScreen');
    }

    /**
     * 构造函数
     */
    public constructor(props: BaseComponentProps) {
        super(props);

        this.setViewModel(new NavigationViewModel());

        this.state = {
            tragetPlace: this.props.tragetPlace || (this.props.navigation.state.params && this.props.navigation.state.params.tragetPlace) ? this.props.navigation.state.params.tragetPlace : '重置地点',
            backPlace: this.props.backPlace || (this.props.navigation.state.params && this.props.navigation.state.params.backPlace) ? this.props.navigation.state.params.backPlace : '接待点',
            businessQuestion: this.props.businessQuestion || (this.props.navigation.state.params && this.props.navigation.state.params.businessQuestion) ? this.props.navigation.state.params.businessQuestion : '到达重置密码窗口的温馨提示',
            businessCompleteQ: this.props.businessCompleteQ || (this.props.navigation.state.params && this.props.navigation.state.params.businessCompleteQ) ? this.props.navigation.state.params.businessCompleteQ : '到达重置密码窗口的温馨提示',
        };


    }

    public componentDidMount(): void {
        super.componentDidMount();
        this.globalRecognitionShow(false)
    }

    //其实这里不用调用了, 上面的getIsNeedOrionsRecognitionShow会处理, 这里调用后会在整个opk周期生效, 不过也做了处理了;
    public globalRecognitionShow(b: any) {
        //关掉语音提示栏
        global.recognition && global.recognition.setShow(b);
    }


    public requestAnswerData(questionStr: string) {
        //         // this.refs['BusinessAnswerView'].requestAnswerData(questionStr)
        //         //TODO 这里处理语音识别
    }

    /**
     * 执行
     */
    public render(): React.ReactNode {
        if (!this.viewModel) {
            return null;
        }
        return (
            <>
                {/*导航*/}
                {this.viewModel.isRunning() ? (
                    <NavigationComponent
                        param={this.viewModel.getParam()}
                        onStatusUpdate={this.viewModel && this.viewModel.onStatusUpdate}
                        onFinish={this.viewModel && this.viewModel.onFinish} />
                ) : null}
                {/*界面*/}
                <NavigationView
                    viewModel={this.viewModel}
                    place={this.state.tragetPlace}
                    backPlace={this.state.backPlace}
                    businessQuestion={this.state.businessQuestion}
                    businessCompleteQ={this.state.businessCompleteQ}
                    closeCurrentOpk={() => { this.closeCurrentOpk()}}
                  

                />
            </>
        );
    }
}