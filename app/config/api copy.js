/**
 * https://github.com/facebook/react-native
 * @flow api数据
 */
import md5 from "react-native-md5";
// import { fetchEventSource } from '@microsoft/fetch-event-source'

function myLog(msg) {
    let obj = {
        info: msg,
        taskId:'reactOS',
        type:'QuestionAnswerView',
        time:Date.now(),
        level:1
    }; 
    fetch('https://fwzdsb-test.e-tecsun.com/api/logging/api/logging/saveBatch',
        {
            method:'post',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify([obj])
        }
    );
}

export function getRobotId() {
    return 'bzc408cb7fbd6c39faffa8488167d11738z2cd3328e23fe5d855662662f8f79d426'; // 广安
    // return 'bz355b67998ed5ba2553b76a618cdc4618z82f1f38d90e8dbbfcf54f86d17c0f903'; // 标准版

    
    // return '1582280713745600512'
    //南京 1554656368881963008 
    //金交会 1402829993645576192 
    //增城 1571763567768768512 
    //河北 工商 1554001916416102400 //appid: 9779a0dfa6bd2fb001f5c0216bd447a9
    //河北 人社 1582280713745600512 //appid: b284a8776d25130a6c3aabd2cc24e99b

    //江门 江门市的居民服务中心 1602531072212602880 //appid: 7ead032f3c2520983502be522babe15e
}
const RobotId = getRobotId();

export function getSessionId() {
    // var date = new Date();
    // var year = date.getFullYear().toString();
    // var month = (date.getMonth() + 1).toString();
    // var day = date.getDate().toString();
    // var hour = date.getHours().toString();
    // var minute = date.getMinutes().toString();
    // // return year+'年'+month+'月'+day+'日'+hour+':'+minute
    // return year + month + day + hour + minute

    let hex_md5v = md5.hex_md5(Date.now() + "");
    console.log(">>>>hex_md5:", hex_md5v);
    return hex_md5v;
}

export function getInitTopicUrl() {
    return 'https://zhiliao.e-tecsun.com' + '/api/api/robot/' + RobotId + '/session/init';
}



export default {
    //首页推荐列表
    recommend: 'https://api.meituan.com/group/v1/recommend/homepage/city/1?__skck=40aaaf01c2fc4801b9c059efcd7aa146&__skcy=mrUZYo7999nH8WgTicdfzaGjaSQ=&__skno=51156DC4-B59A-4108-8812-AD05BF227A47&__skts=1434530933.303717&__skua=bd6b6e8eadfad15571a15c3b9ef9199a&__vhost=api.mobile.meituan.com&ci=1&client=iphone&limit=40&movieBundleVersion=100&msid=48E2B810-805D-4821-9CDD-D5C9E01BC98A2015-06-17-14-50363&offset=0&position=39.983497,116.318042&userId=10086&userid=10086&utm_campaign=AgroupBgroupD100Fab_chunceshishuju__a__a___b1junglehomepagecatesort__b__leftflow___ab_gxhceshi__nostrategy__leftflow___ab_gxhceshi0202__b__a___ab_pindaochangsha__a__leftflow___ab_xinkeceshi__b__leftflow___ab_gxtest__gd__leftflow___ab_gxh_82__nostrategy__leftflow___ab_pindaoshenyang__a__leftflow___i_group_5_2_deallist_poitype__d__d___ab_b_food_57_purepoilist_extinfo__a__a___ab_trip_yidizhoubianyou__b__leftflow___ab_i_group_5_3_poidetaildeallist__a__b___ab_waimaizhanshi__b__b1___a20141120nanning__m1__leftflow___ab_pind',



    myInfo: [
        { userSpeakTEXT: '美食' },
    ],

    myTestInfo: [
        { testName: '令狐振华' ,testSfzh:'330782200912292718'},
    ],
};

export function recommendUrlWithId(id) {
    return 'http://api.meituan.com/group/v1/deal/recommend/collaborative?__skck=40aaaf01c2fc4801b9c059efcd7aa146&__skcy=hWCwhGYpNTG7TjXWHOwPykgoKX0%3D&__skno=433ACF85-E134-4FEC-94B5-DA35D33AC753&__skts=1436343274.685593&__skua=bd6b6e8eadfad15571a15c3b9ef9199a&__vhost=api.mobile.meituan.com&cate=0&ci=1&cityId=1&client=iphone&did=' + id + '&district=-1&fields=id%2Cslug%2Cimgurl%2Cprice%2Ctitle%2Cbrandname%2Crange%2Cvalue%2Cmlls%2Csolds&hasbuy=0&latlng=0.000000%2C0.000000&movieBundleVersion=100&msid=48E2B810-805D-4821-9CDD-D5C9E01BC98A2015-07-08-15-36746&offset=0&scene=view-v4&userId=10086&userid=10086&utm_campaign=AgroupBgroupD100Fab_i550poi_ktv__d__j___ab_i_group_5_3_poidetaildeallist__a__b___ab_gxhceshi0202__b__a___ab_pindaoquxincelue0630__b__b1___ab_i_group_5_6_searchkuang__a__leftflow___i_group_5_2_deallist_poitype__d__d___ab_i550poi_xxyl__b__leftflow___ab_b_food_57_purepoilist_extinfo__a__a___ab_waimaiwending__a__a___ab_waimaizhanshi__b__b1___ab_i550poi_lr__d__leftflow___ab_i_group_5_5_onsite__b__b___ab_xinkeceshi__b__leftflowGhomepage_guess_27774127&utm_content=4B8C0B46F5B0527D55EA292904FD7E12E48FB7BEA8DF50BFE7828AF7F20BB08D&utm_medium=iphone&utm_source=AppStore&utm_term=5.7&uuid=4B8C0B46F5B0527D55EA292904FD7E12E48FB7BEA8DF50BFE7828AF7F20BB08D&version_name=5.7';
}


export function groupPurchaseDetailWithId(id) {
    return 'http://api.meituan.com/group/v1/deal/list/id/' + id + '?__skck=40aaaf01c2fc4801b9c059efcd7aa146&__skcy=4NDQ%2BojQ%2BZGArOWQCEgWI19Pzus%3D&__skno=803C28CE-8BA8-4831-B2DE-7BCD484348D9&__skts=1435888257.411030&__skua=bd6b6e8eadfad15571a15c3b9ef9199a&__vhost=api.mobile.meituan.com&ci=1&client=iphone&movieBundleVersion=100&msid=48E2B810-805D-4821-9CDD-D5C9E01BC98A2015-07-03-09-14430&userid=10086&utm_campaign=AgroupBgroupC1080988208017226240_c0_e68cafa9e104898bb8bfcd78b64aef671D100Fab_i_group_5_3_poidetaildeallist__a__b___ab_chunceshishuju__a__a___ab_gxhceshi__nostrategy__leftflow___ab_gxhceshi0202__b__a___ab_pindaochangsha__a__leftflow___ab_xinkeceshi__b__leftflow___ab_gxtest__gd__leftflow___ab_waimaiwending__a__a___ab_gxh_82__nostrategy__leftflow___i_group_5_2_deallist_poitype__d__d___ab_b_food_57_purepoilist_extinfo__a__a___ab_pindaoshenyang__a__leftflow___ab_pindaoquxincelue0630__b__b1___ab_waimaizhanshi__b__b1___a20141120nanning__m1__leftflow___b1junglehomepagecatesort__b__leftflow___ab_i_group_5_5_onsite__b__b___ab_i_group_5_6_searchkuang__a__leftflowGhomepage_guess_27774127&utm_content=4B8C0B46F5B0527D55EA292904FD7E12E48FB7BEA8DF50BFE7828AF7F20BB08D&utm_medium=iphone&utm_source=AppStore&utm_term=5.7&uuid=4B8C0B46F5B0527D55EA292904FD7E12E48FB7BEA8DF50BFE7828AF7F20BB08D&version_name=5.7';
}

export function getAnswerUrl(question, sessionId) {
    // return 'https://zhiliao.e-tecsun.com/api/cloud/robot/' + getRobotId() + '/answer?question=' + question + '&channel=app&sessionId=' + sessionId + '&userId=' + sessionId
    // ?question=${question}&channel=app&key=${RobotId}&sessionId=${sessionId}
    // return `https://fwzpc.e-tecsun.com/api/robot/api/largeModel/answer`; // 测试
    return 'http://192.168.4.38:12001/wechat-bg/api/new/largeModel/testStreamAnswer';
    //  return `https://fwzdsb-test.e-tecsun.com/api/wechat-bg/api/new/largeModel/streamAnswer`; // 流式
   // return `https://yktfwz.e-tecsun.com/api/robot/api/largeModel/answer`; // 生产
}


const isTest = false;
export function getHtmlStartSessionUrl() {
    // https://yktdsb.e-tecsun.com/api
    if (isTest) {
        return 'https://fwzdsb-test.e-tecsun.com/api/wechat-bg/api/swipeCard/htmlStartSession';
    } else {
        return 'https://yktdsb.e-tecsun.com/api/wechat-bg/api/swipeCard/htmlStartSession';
    }
}
export function getWebsocketUrl() {
    if (isTest) {
        return 'wss://fwzdsb-test.e-tecsun.com/websocket/DSB';
    } else {
        return 'wss://yktdsb.e-tecsun.com/websocket/DSB';
    }
}



export function getProfessionalNoun(question) {
    return 'https://zhiliao.e-tecsun.com/api/getProfessionalNoun?robotId=' + getRobotId() + '&nounName=' + question;
}

export function getSmallConsultationAnswerUrl(question, sessionId, atlasId) {
    // return 'https://zhiliao.e-tecsun.com/api/cloud/robot/' + getRobotId() + '/answer?question=' + question + '&channel=app&sessionId=' + sessionId + '&userId=' + sessionId + '&atlasId=' + atlasId
    return `https://fwzpc.e-tecsun.com/api/wechat-bg/api/largeModel/answer?question=${question}&channel=app&key=${RobotId}&sessionId=${sessionId}`;
}


/**
 * 添加日志
 * @param {String} info 日志信息
 * @param {String} taskId 设备号
 * @param {String} type 日志类型 error | warn | info
 * @param {Number} level 日志等级 1 | 2 | 3
 */
export function consolelog(mBody) {
    fetch('https://fwzdsb-test.e-tecsun.com/api/logging/api/logging/saveBatch',
        {
            method:'post',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(mBody)
        }
    );
}
export function getAnswer(question, sessionId) {
    return `https://fwzdsb-test.e-tecsun.com/api/wechat-bg/api/largeModel/streamAnswer?question=${question}&channel=app&key=${RobotId}&sessionId=${sessionId}`;
}


