import { BaseVoice } from 'orionos-eve-core';
import { DemoViewModel } from './DemoViewModel';
import { DemoScreen } from './DemoScreen';

/**
 * 语音处理
 */
export class DemoVoice extends BaseVoice {

    private viewModel: DemoViewModel;

    private objet1: DemoScreen;

    public constructor(viewModel: DemoViewModel, objet1: DemoScreen) {
        super('DemoVoice');
        this.viewModel = viewModel;
        this.objet1 = objet1
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

        switch (intent) {



            case 'general_command&stop':
                this.viewModel.exit();
                return true;

            case 'req_speech_wakeup':
                return true;

            case 'operational_&operational':
            case 'other&other':
            case 'chat&chat':
                this.objet1.requestAnswerData(text)
                return true;

                //禁止唱歌跳舞, 过滤掉
            case 'interactive&start_dance':
                return true

            default:
                this.viewModel.showSpeechText(`${intent} : ${text}`);
                this.viewModel.exit();
                return false;


            // case 'weather&get_weather':
            // case 'dance&do_dance':
            // case 'music&start_music':
            // case 'open_page&open_page':

            // case 'guide&guide':
            //     this.viewModel.exit();
            //     return false;

            // case 'general_command&stop':
            //     this.viewModel.exit();
            //     return true;

            // case 'chat&chat':
            // case 'operational_&operational':
            // case 'other&other':
            //     this.objet1.requestAnswerData(text)
            //     return true;

            // default:
            //     this.viewModel.showSpeechText(`${intent} : ${text}`);
            //     return true;
        }
    }

    public speak(): void {
    }

}
