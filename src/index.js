import citySelector from "./city-selector";

// const selector = document.querySelector("#city-selector")

const city = new citySelector("#city-selector-container", {
    defaultData: {
        province: "广东省",
        city: "深圳市",
        district: "南山区"
    },
    actionName: {
        title: "请选择地区",
        cancelBtn: "取消",
        confirmBtn: "确认"
    }
});
