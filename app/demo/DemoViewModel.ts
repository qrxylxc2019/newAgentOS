import { BaseViewModel } from 'orionos-eve-core';
import { demoModel } from './DemoModel';

/**
 * 业务逻辑
 */
export class DemoViewModel extends BaseViewModel {

    private needOrionsRecognitionShow: boolean = true;

    public constructor(needOrionsRecognitionShow: boolean) {
        //super参数为ViewModel与Trigger相互通信的标识，必须保证与Trigger的一致
        super('Demo');
        this.needOrionsRecognitionShow = needOrionsRecognitionShow;
    }

    public onStart() {
        if (this.needOrionsRecognitionShow) {
            global.recognition && global.recognition.setShow(true);
            global.recognition && global.recognition.setGuideShow(true);
        }
        else{
            global.recognition && global.recognition.setShow(false);
            global.recognition && global.recognition.setGuideShow(false);
        }

    }

    public onStop() {

    }

    public exit() {
        //发送消息到Trigger中，eventId为消息id, data为携带的数据
        this._apiTrigger(1001, '');
    }

    // public dance() {
    //     // todo 
    //     this._apiTrigger(1002, '');
    // }

    // public weather() {
    //     //todo 
    //     // this._apiTrigger(1001, '');
    // }

    public wakeUp() {
        //todo 
        this._apiTrigger(1003, '');
    }

    public showSpeechText(text: string) {
        console.log('DemoVoice :  >>> ' + text);
        demoModel.setInfoText(text);
    }







    
}
