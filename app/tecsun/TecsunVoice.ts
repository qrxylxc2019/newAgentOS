import { BaseVoice } from 'orionos-eve-core';
import { NativeModules } from 'react-native';
import { DemoViewModel } from '../demo/DemoViewModel';
import { MyBaseComponent } from './base/MyBaseComponent';


const tecsunReadCardModule = NativeModules.TecsunReadCardModule;

/**
 * 语音处理
 */
export class TecsunVoice extends BaseVoice {

    private viewModel: DemoViewModel;

    private objet1: MyBaseComponent;

    public constructor(viewModel: DemoViewModel, objet1: MyBaseComponent) {
        super('DemoVoice');
        this.viewModel = viewModel;
        this.objet1 = objet1
    }


    public toast(msg: any) {
        let obj = {
            id: 1,
            name: msg,
        };
        // tecsunReadCardModule.showGravityShortToast(obj);
        tecsunReadCardModule.Toasts(obj);
    }


    /**
     * 接收语音指令
     *
     * @param intent 语音指令标识
     * @param result 语音识别的数据
     * @param id
     * @param text 语音识别文本
     *
     * @return {boolean}
     *         true 表示该语音指令已被处理，会拦截掉语音指令
     *         false 语音指令未被处理，交给其它opk处理
     */
    public onListenCallback(intent: string, result: any, id: number, text: string): boolean {
        console.log('DemoVoice : ' + text);//  exception&exception // chat&chat//  open_page&open_page //guide&guide// req_speech_wakeup : undefined// DemoVoice Set info text : req_speech_wakeup : undefined
        console.log('intent : ' + intent);

        //MEUI&score //五颗星
        if (this.objet1.getComponentName() == "AppraiseScreen") {

            console.log('进来了>>>>>>>');
            switch (intent) {
                // case 'MEUI&score': //五颗星
                //     return true;
                default:
                    this.objet1.requestAnswerData(text)
                    return true;

            }
        }


        console.log("onListenCallback 2222");


        switch (intent) {

            ////带我去xxx
            // case 'guide&guide':
            //     return true;


            //返回
            case 'general_command&return':
            //退出
            case 'general_command&stop':

                this.viewModel.exit();

                return true;

            case 'req_speech_wakeup':
                return true;

            //不用了:             
            case 'general_command&cancel':
            //在猎户后台自定义的
            case 'operational_&operational':
            case 'other&other':
            case 'chat&chat':
                this.objet1.requestAnswerData(text)
                return true;

            default:

                //20230222 ldw修改: 在咨询界面可以跳到其他opk, 非咨询界面就只是提示个toast
                if (this.objet1.getComponentName() == "BusinessInfoConfirmScreen") {

                    this.viewModel.showSpeechText(`${intent} : ${text}`);
                    this.viewModel.exit();

                    return false;
                }
                else {

                    this.toast("若需其他服务, 请先说退出")
                    return true;
                }
        }
    }

    public speak(): void {
    }

}





// import { BaseVoice } from 'orionos-eve-core';
// import { DemoViewModel } from '../demo/DemoViewModel';
// import { MyBaseComponent } from './base/MyBaseComponent';

// /**
//  * 语音处理
//  */
// export class TecsunVoice extends BaseVoice {

//     private viewModel: DemoViewModel;

//     private objet1: MyBaseComponent;

//     public constructor(viewModel: DemoViewModel, objet1: MyBaseComponent) {
//         super('DemoVoice');
//         this.viewModel = viewModel;
//         this.objet1 = objet1
//     }


//     /**
//      * 接收语音指令
//      *
//      * @param intent 语音指令标识
//      * @param result 语音识别的数据
//      * @param id
//      * @param text 语音识别文本
//      *
//      * @return {boolean}
//      *         true 表示该语音指令已被处理，会拦截掉语音指令
//      *         false 语音指令未被处理，交给其它opk处理
//      */
//     public onListenCallback(intent: string, result: any, id: number, text: string): boolean {
//         console.log('DemoVoice : ' + text);//  exception&exception // chat&chat//  open_page&open_page //guide&guide// req_speech_wakeup : undefined// DemoVoice Set info text : req_speech_wakeup : undefined
//         console.log('intent : ' + intent);


//         //MEUI&score //五颗星
//         if (this.objet1.getComponentName() == "AppraiseScreen") {

//             console.log('进来了>>>>>>>');
//             switch (intent) {
//                 // case 'MEUI&score':
//                 //     return true;
//                 default:
//                     this.objet1.requestAnswerData(text)
//                     return true;

//             }
//         }


//         console.log("onListenCallback 2222");


//         switch (intent) {

//             ////带我去xxx
//             // case 'guide&guide':
//             //     return true;


//             //返回
//             case 'general_command&return':
//                 // if (this.objet1.getComponentName() != "AppraiseScreen") {
//                 //     this.viewModel.exit();
//                 //     console.log(' return  this.viewModel.exit(); ');
//                 // }
//                 // console.log(' return  没进去 this.viewModel.exit(); ');

//                 this.viewModel.exit();

//                 return true;

//             //退出
//             case 'general_command&stop':

//                 // if (this.objet1.getComponentName() != "AppraiseScreen") {
//                 //     this.viewModel.exit();
//                 //     console.log(' stop  this.viewModel.exit(); ');
//                 // }
//                 // console.log(' stop  没进去 this.viewModel.exit(); ');

//                 this.viewModel.exit();

//                 return true;

//             case 'req_speech_wakeup':
//                 return true;

//             //不用了:             
//             case 'general_command&cancel':
//             case 'operational_&operational':
//             case 'other&other':
//             case 'chat&chat':
//                 this.objet1.requestAnswerData(text)
//                 return true;

//             default:
//                 this.viewModel.showSpeechText(`${intent} : ${text}`);
//                 this.viewModel.exit();
//                 return false;


//             // case 'weather&get_weather':
//             // case 'dance&do_dance':
//             // case 'music&start_music':
//             // case 'open_page&open_page':

//             // case 'guide&guide':
//             //     this.viewModel.exit();
//             //     return false;

//             // case 'general_command&stop':
//             //     this.viewModel.exit();
//             //     return true;

//             // case 'chat&chat':
//             // case 'operational_&operational':
//             // case 'other&other':
//             //     this.objet1.requestAnswerData(text)
//             //     return true;

//             // default:
//             //     this.viewModel.showSpeechText(`${intent} : ${text}`);
//             //     return true;
//         }
//     }

//     public speak(): void {
//     }

// }
