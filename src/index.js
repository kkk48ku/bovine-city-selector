import citySelector from "./city-selector";

const citySelOne = document.getElementsByClassName("city-selector-container")[0];

const cityPickerOne = new citySelector(citySelOne, {
    defaultData: {
        province: "",
        city: "",
        district: ""
    },
    actionName: {
        title: "请选择地区",
        cancelBtn: "取消",
        confirmBtn: "确认"
    },
    tabs: ["请选择", "请选择", "请选择"]
});

cityPickerOne.confirm = (data) => {
    console.log(data)
    if (data.province && data.city && data.district) {
        citySelOne.value = `${data.province} / ${data.city} / ${data.district}`;
    } else if (data.province && data.city && !data.district) {
        citySelOne.value = `${data.province} / ${data.city}`;
    } else if (data.province && !data.city && !data.district) {
        citySelOne.value = `${data.province}`;
    } else {
        citySelOne.value = ``;
    }
    console.log(citySelOne.value)
}

cityPickerOne.cancel = () => {
    console.log("用户取消了选择位置")
}

const citySelTwo = document.getElementsByClassName("city-selector-container")[1];

const cityPickerTwo = new citySelector(citySelTwo, {
    defaultData: {
        province: "广东省",
        city: "深圳市",
        district: ""
    },
    actionName: {
        title: "Where are you from?",
        cancelBtn: "Cancel",
        confirmBtn: "OK"
    },
    tabs: ["快选", "快选", "快选"],
    errorTips: {
        noPro: "愣着干嘛，快选省份啊！",
        noCity: "愣着干嘛，快选城市啊！",
        noDis: "愣着干嘛，快选区域啊！"
    }
});

cityPickerTwo.confirm = (data) => {
    console.log(data)
    if (data.province && data.city && data.district) {
        citySelTwo.value = `${data.province} / ${data.city} / ${data.district}`;
    } else if (data.province && data.city && !data.district) {
        citySelTwo.value = `${data.province} / ${data.city}`;
    } else if (data.province && !data.city && !data.district) {
        citySelTwo.value = `${data.province}`;
    } else {
        citySelTwo.value = ``;
    }
    console.log(citySelTwo.value)
}
cityPickerTwo.cancel = () => {
    console.log("用户取消了选择位置")
}
