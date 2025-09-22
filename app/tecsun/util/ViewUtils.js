import React  from 'react';
import {
    TouchableHighlight,
    Image,
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
} from 'react-native';

const styles = StyleSheet.create({
    setting_item_container: {
        backgroundColor: 'white',
        padding: 10, height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    itemClickExitStyle: {
        justifyContent:'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 36,
        width: 110,
        backgroundColor: '#66b0f9',
        borderRadius: 30,
    },
    textStyle1: {
        color:'white',
        width: "100%",
    },

})

export default class ViewUtils {

    // static getSettingItem(callBack, icon, text, tintStyle, expandableIco) {
    //     return (
    //         <TouchableHighlight
    //             onPress={callBack}>
    //             <View style={[styles.setting_item_container]}>
    //                 <View style={{alignItems: 'center', flexDirection: 'row'}}>
    //                     {icon ?
    //                         <Image source={icon} resizeMode='stretch'
    //                                style={[{opacity: 1, width: 16, height: 16, marginRight: 10,}, tintStyle]}/> :
    //                         <View style={{opacity: 1, width: 16, height: 16, marginRight: 10,}}/>
    //                     }
    //                     <Text>{text}</Text>
    //                 </View>
    //                 <Image source={expandableIco ? expandableIco : require('../images/ic_tiaozhuan.png')}
    //                        style={[{
    //                            marginRight: 10,
    //                            height: 22,
    //                            width: 22,
    //                            alignSelf: 'center',
    //                            opacity: 1
    //                        }, tintStyle]}/>
    //             </View>
    //         </TouchableHighlight>
    //     )
    // }

    // static getMoreButton(callBack) {
    //     return <TouchableHighlight
    //         ref='moreMenuButton'
    //         underlayColor='transparent'
    //         style={{padding: 5}}
    //         onPress={callBack}>
    //         <View style={{paddingRight: 8}}>
    //             <Image
    //                 style={{width: 24, height: 24, marginLeft: 5}}
    //                 source={require('../images/ic_more_white.png')}
    //             />
    //         </View>
    //     </TouchableHighlight>
    // }

    // static getShareButton(callBack) {
    //     return <TouchableHighlight
    //         ref='moreMenuButton'
    //         underlayColor='transparent'
    //         style={{padding: 5}}
    //         onPress={callBack}>
    //         <View style={{paddingRight: 8}}>
    //             <Image
    //                 style={{width: 24, height: 24, marginLeft: 5}}
    //                 source={require('../images/icon_share_white.png')}
    //             />
    //         </View>
    //     </TouchableHighlight>
    // }

    // static getShareGreenButton(callBack) {
    //     return <TouchableHighlight
    //         ref='moreMenuButton'
    //         underlayColor='transparent'
    //         style={{padding: 5}}
    //         onPress={callBack}>
    //         <View style={{paddingRight: 8}}>
    //             <Image
    //                 style={{width: 24, height: 24, marginLeft: 5}}
    //                 source={require('../images/icon_share.png')}
    //             />
    //         </View>
    //     </TouchableHighlight>
    // }

    // static getLeftButton(callBack) {
    //     return <TouchableOpacity
    //         style={{padding: 8}}
    //         onPress={callBack}>
    //         <Image
    //             style={{width: 26, height: 26,}}
    //             source={require('../images/ic_back_white.png')}/>
    //     </TouchableOpacity>
    // }

    // static getLeftGreenButton(callBack) {
    //     return <TouchableOpacity
    //         style={{padding: 8}}
    //         onPress={callBack}>
    //         <Image
    //             style={{width: 26, height: 26,}}
    //             source={require('../images/ic_back_green.png')}/>
    //     </TouchableOpacity>
    // }

    // static getLeftBlackButton(callBack) {
    //     return <TouchableOpacity
    //         style={{padding: 8}}
    //         onPress={callBack}>
    //         <Image
    //             style={{width: 26, height: 26,}}
    //             source={require('../images/ic_back.png')}/>
    //     </TouchableOpacity>
    // }

    // static getLeftCircleButton(callBack) {
    //     return <TouchableOpacity
    //         style={{padding: 8}}
    //         onPress={callBack}>
    //         <Image
    //             style={{width: 26, height: 26,}}
    //             source={require('../images/icon_circle_back.png')}/>
    //     </TouchableOpacity>
    // }

    // static getLeftCloseButton(callBack) {
    //     return <TouchableOpacity
    //         style={{padding: 8}}
    //         onPress={callBack}>
    //         <Image
    //             style={{width: 20, height: 20}}
    //             source={require('../images/ic_close_white.png')}/>
    //     </TouchableOpacity>
    // }

    static getExitButton(callBack) {
        return  <TouchableOpacity activeOpacity={0.5} onPress={() => callBack()}>
                    <View style={[styles.itemClickExitStyle,{marginTop:5}]}>
                        <Text style={{ fontSize: 13,color:"white",fontWeight:'bold'}} >退出</Text>                                
                    </View>         
                </TouchableOpacity>
      
    }

    static getExitButton2(callBack) {
        return <TouchableOpacity activeOpacity={0.5} onPress={() => callBack()}>
                    <View style={{justifyContent:'center',alignItems: 'center',marginBottom:5,}}>
                        <Image 
                            style={{
                            width: 87.5,
                            height: 30,                       
                            }}
                            source={require('../../../img/bg_press_blue.png')} >
                        </Image>

                         <View style={{position: 'absolute',justifyContent:'center',flexDirection: 'row',alignItems:'center',}}>
                            <Text style={{ fontSize: 13,color:"white",fontWeight:'bold'}} >退  出</Text>
                        </View>

                    </View>
                </TouchableOpacity>
    }

    static getConfirmButton(callBack,buttonText) {
        return <TouchableOpacity activeOpacity={0.5} onPress={() => callBack()}>
                    <View style={{justifyContent:'center',alignItems: 'center',marginBottom:5,}}>
                        <Image 
                            style={{
                            width: 87.5,
                            height: 30,                       
                            }}
                            source={require('../../../img/bg_press_light_blue.png')} >
                        </Image>

                         <View style={{position: 'absolute',justifyContent:'center',flexDirection: 'row',alignItems:'center',}}>
                            <Text style={{ fontSize: 13,color:"white",fontWeight:'bold'}} >{buttonText?buttonText:"确认提交"}</Text>
                        </View>

                    </View>
                </TouchableOpacity>
    }



    static getQuestionTitle(marginL) {
        return  <View style={[styles.textStyle1,{marginTop:2,marginLeft:marginL?marginL:50}]}>
                    <Text style={{ fontSize: 8,color:"white",fontWeight:'bold'}} >您好, 您是否需要了解以下问题:</Text>                                
                </View> 
    }

    static getImageArrowDown() {
        return  <Image 
                    style={{
                    width: 8,
                    height: 8,                                       
                    marginRight:3,   
                    }}
                    source={require('../../../img/icon_down_arrow.png')} >
                </Image>
    }

    static getTimerCount() {
        return  60
    }

    static IdCard(IdCard, type) {
        if (type === 1) {
            //获取出生日期
            let birthday = IdCard.substring(6, 10) + "-" + IdCard.substring(10, 12) + "-" + IdCard.substring(12, 14)
            return birthday
        }
        if (type === 2) {
            //获取性别
            if (parseInt(IdCard.substr(16, 1)) % 2 === 1) {
                return "男"
            } else {
                return "女"
            }
        }
        if (type === 3) {
            //获取年龄
            var ageDate = new Date()
            var month = ageDate.getMonth() + 1
            var day = ageDate.getDate()
            var age = ageDate.getFullYear() - IdCard.substring(6, 10) - 1
            if (IdCard.substring(10, 12) < month || IdCard.substring(10, 12) === month && IdCard.substring(12, 14) <= day) {
                age++
            }
            if (age <= 0) {
                age = 1
            }
            return age
        }
    }

    static replaceSfzh(sfzh){

        return sfzh.replace(/^(.{6})(?:\d+)(.{4})$/, "$1********$2")
    }

}

