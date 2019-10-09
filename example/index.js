// import CitySelector from "../src/city-selector"
// 无默认值
var citySelOne = document.getElementsByClassName("city-selector-container")[0]

var cityPickerOne = new CitySelector(citySelOne)

// 有默认值
var citySelTwo = document.getElementsByClassName("city-selector-container")[1]

var cityPickerTwo = new CitySelector(citySelTwo, {
	defaultData: {
		province: "广东省",
		city: "深圳市",
		district: "南山区"
	}
})

// 简易展示地址
var citySelThree = document.getElementsByClassName("city-selector-container")[2]

var cityPickerThree = new CitySelector(citySelThree, {
	defaultData: {
		province: "广东省",
		city: "深圳市",
		district: "南山区"
	}
})

// 简易展示地址
var citySelFour = document.getElementsByClassName("city-selector-container")[3]

var cityPickerFour = new CitySelector(citySelFour, {
	defaultData: {
		province: "",
		city: "",
		district: ""
	}
})
//自定义其它选项
var citySelFive = document.getElementsByClassName("city-selector-container")[4],
	citySelInputFive = document.getElementsByClassName("city-selector-input")[4]

var cityPickerFive = new CitySelector(citySelFive, {
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
})

cityPickerFive.confirm = function(data) {
	if (data.province && data.city && data.district) {
		citySelInputFive.value = data.province + " / " + data.city + " / " + data.district
	} else if (data.province && data.city && !data.district) {
		citySelInputFive.value = data.province + " / " + data.city
	} else if (data.province && !data.city && !data.district) {
		citySelInputFive.value = "" + data.province
	} else {
		citySelInputFive.value = ""
	}
}
