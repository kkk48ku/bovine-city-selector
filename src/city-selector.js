import cityData from "./city-data.json";

export default class citySelector {
    constructor(parentEl, options) {
        // 获取节点
        this.getEl(parentEl);
        this.options = options || {};
        this.el = {};
        this.init();
    }
    init() {
        // 挂载子元素
        // 渲染样式
        // 绑定事件
    }
    getEl(parentEl) {
        // 获取父节点
        this.parentEl = document.querySelector(parentEl);
        // 获取城市选择节点
        this.citySel = this.parentEl.querySelector("input[data-type='city-selector']");
    }
}
