import CitySelector from "../src/city-selector";

// 无默认值
const citySelOne = document.getElementsByClassName("city-selector-container")[0];

const cityPickerOne = new CitySelector(citySelOne);

// 有默认值
const citySelTwo = document.getElementsByClassName("city-selector-container")[1];

const cityPickerTwo = new CitySelector(citySelTwo, {
    defaultData: {
        province: "广东省",
        city: "深圳市",
        district: "南山区"
    }
});

// 简易展示地址
const citySelThree = document.getElementsByClassName("city-selector-container")[2];

const cityPickerThree = new CitySelector(citySelThree, {
    defaultData: {
        province: "广东省",
        city: "深圳市",
        district: "南山区"
    }
});

// 简易展示地址
const citySelFour = document.getElementsByClassName("city-selector-container")[3];

const cityPickerFour = new CitySelector(citySelFour, {
    defaultData: {
        province: "",
        city: "",
        district: ""
    }
});
//自定义其它选项 
const citySelFive = document.getElementsByClassName("city-selector-container")[4],
    citySelInputFive = document.getElementsByClassName("city-selector-input")[4];

const cityPickerFive = new CitySelector(citySelFive, {
    defaultData: {
        province: "广东省",
        city: "",
        district: ""
    },
    actionName: {
        title: "你从哪来?",
        cancelBtn: "NO",
        confirmBtn: "OK"
    },
    tabs: ["快选", "快选", "快选"],
    errorTips: {
        noPro: "愣着干嘛，快选省份啊！",
        noCity: "愣着干嘛，快选城市啊！",
        noDis: "愣着干嘛，快选区域啊！"
    }
});

cityPickerFive.confirm = (data) => {
    if (data.province && data.city && data.district) {
        citySelInputFive.value = `${data.province} / ${data.city} / ${data.district}`;
    } else if (data.province && data.city && !data.district) {
        citySelInputFive.value = `${data.province} / ${data.city}`;
    } else if (data.province && !data.city && !data.district) {
        citySelInputFive.value = `${data.province}`;
    } else {
        citySelInputFive.value = ``;
    }
}
