import citySelector from "./city-selector";

const selector = document.querySelector("#city-selector-container")

const city = new citySelector(selector, {
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
    tabs: ["请选择", "请选择", "请选择"],
});

city.confirm = (data) => {
    console.log(data)
    const citySelector = document.getElementById("city-selector");
    if (data.province && data.city && data.district) {
        citySelector.value = `${data.province} / ${data.city} / ${data.district}`;
    } else if (data.province && data.city && !data.district) {
        citySelector.value = `${data.province} / ${data.city}`;
    } else if (data.province && !data.city && !data.district) {
        citySelector.value = `${data.province}`;
    } else {
        citySelector.value = ``;
    }
    console.log(citySelector.value)
}
city.cancel = () => {
    console.log("用户取消了选择位置")
}
