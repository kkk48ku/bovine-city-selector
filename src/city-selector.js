import cityData from "./city-data.json";

export default class citySelector {
    constructor(parentEl, options) {
        this.getParentEl(parentEl);
        this.cityData = cityData;
        this.options = options || {};
        this.els = {};
        this.data = this.options.defaultData || {};
        // 获取节点
        this.init();
    }
    init() {
        // 挂载子元素
        this.renderHtml();
        // 获取节点
        // 绑定事件
        console.log(this)
    }
    // 渲染并挂载子元素
    renderHtml() {
        let htmlBody;
        htmlBody = this.renderBody();
        htmlBody.appendChild(this.renderActions(this.options.actionName));
        htmlBody.appendChild(this.renderTabs(this.options.tabs));
        htmlBody.appendChild(this.renderPanels(this.options.defaultData));
        htmlBody.appendChild(this.renderErrorModal());
        this.parentEl.appendChild(htmlBody);
        this.getEl();
        this.activeAction();
        this.bindEvents();
    }
    // 获取元素
    getEl() {
        this.els = {
            citySelBody: this.parentEl.querySelector(".city-selector-body"),
            citySelAct: this.parentEl.querySelector(".city-selector-action"),
            citySelTabs: this.parentEl.querySelectorAll(".city-selector-tab"),
            citySelPanels: this.parentEl.querySelector(".city-selector-panels"),
            citySelPanel: this.parentEl.querySelectorAll(".city-selector-panel"),
            citySelPro: this.parentEl.querySelector(".city-selector-province"),
            citySelCity: this.parentEl.querySelector(".city-selector-city"),
            citySelDis: this.parentEl.querySelector(".city-selector-district")
        }
    }
    // 改变class为active的元素位置
    activeAction() {
        let i, length;
        this.els.activeEls = this.els.citySelPanels.querySelectorAll(".active");
        console.log(this.els.activeEls)
        length = this.els.activeEls.length;
        for (i = 0; i < length; i++) {
            if (!this.els.activeEls[i]) return;
            this.els.citySelPanel[i].scrollTop = this.els.activeEls[i].offsetTop - 160;
        }
    }
    // 绑定事件
    bindEvents() {
        let proItems, cityItems, disItems, _this = this;
        this.els.citySelTabs[0].innerHTML = this.data.province;
        this.els.citySelTabs[1].innerHTML = this.data.city;
        this.els.citySelTabs[2].innerHTML = this.data.district;
        proItems = this.els.citySelPro.querySelectorAll("a");
        cityItems = this.els.citySelCity.querySelectorAll("a");
        disItems = this.els.citySelDis.querySelectorAll("a");
        proItems.forEach(item => {
            item.addEventListener("click", (e) => {
                proItems.forEach(item => {
                    if (item.classList.contains("active")) {
                        item.classList.remove("active")
                    }
                })
                this.els.citySelTabs[0].innerHTML = this.data.province = e.target.innerHTML;
                item.classList.add("active");
            })
        })
        cityItems.forEach(item => {
            item.addEventListener("click", (e) => {
                cityItems.forEach(item => {
                    if (item.classList.contains("active")) {
                        item.classList.remove("active")
                    }
                })
                this.els.citySelTabs[1].innerHTML = this.data.city = e.target.innerHTML;
                item.classList.add("active");
                this.els.citySelPro.style.display = "none";
                this.els.citySelDis.style.display = "block";
            })
        })
        disItems.forEach(item => {
            item.addEventListener("click", (e) => {
                disItems.forEach(item => {
                    if (item.classList.contains("active")) {
                        item.classList.remove("active")
                    }
                })
                this.els.citySelTabs[2].innerHTML = this.data.district = e.target.innerHTML;
                item.classList.add("active");
            })
        })
    }
    // 渲染body部分
    renderBody() {
        return this.createEle(["city-selector-body"]);
    }
    // 渲染控制台
    renderActions(actionName) {
        let htmlNode = this.createEle(["city-selector-action"]);
        if (!actionName || !actionName.title || !actionName.cancelBtn || !actionName.confirmBtn) {
            actionName = {
                title: "请选择地区",
                cancelBtn: "取消",
                confirmBtn: "确认"
            }
        }
        htmlNode.innerHTML = `
                                <div class="city-selector-title">
                                    ${actionName.title}
                                </div>
                                <a class="city-selector-btn city-selector-cancel">
                                    ${actionName.cancelBtn}
                                </a>
                                <a class="city-selector-btn city-selector-confirm">
                                    ${actionName.confirmBtn}
                                </a>
                            `
        return htmlNode;
    }
    // 渲染tab标签
    renderTabs(tabs) {
        let htmlNode, i, len = tabs.length;
        htmlNode = this.createEle(["city-selector-tabs"]);
        if (!tabs || tabs.length !== 3) {
            tabs = ["请选择", "请选择", "请选择"];
        };
        for (i = 0; i < len; i++) {
            htmlNode.innerHTML +=
                `
                    <a class="city-selector-tab">${tabs[i]}</a>
                `
        }
        return htmlNode;
    }
    // 选择选择界面
    renderPanels() {
        let htmlNode =
            this.createEle(["city-selector-panels"]);
        htmlNode.appendChild(this.renderPro());
        htmlNode.appendChild(this.renderCity());
        htmlNode.appendChild(this.renderDis());
        return htmlNode;
    }
    // 渲染省份选择
    renderPro() {
        let htmlNode =
            this.createEle(["city-selector-panel", "city-selector-province"]),
            frag = document.createDocumentFragment(), aNode;
        for (const item in this.cityData) {
            aNode = document.createElement("a");
            aNode.innerHTML = `${item}`;
            aNode.setAttribute("data-value", `${item}`);
            if (this.data) {
                if (aNode.getAttribute("data-value")
                    === this.data.province) {
                    aNode.classList.add("active");
                }
            }
            frag.appendChild(aNode);
        }
        htmlNode.appendChild(frag);
        return htmlNode;
    }
    // 渲染城市选择
    renderCity() {
        let htmlNode =
            this.createEle(["city-selector-panel", "city-selector-city"]),
            frag = document.createDocumentFragment(), aNode, cityS;
        cityS = this.cityData[this.data.province] || {};
        for (const item in cityS) {
            aNode = document.createElement("a");
            aNode.innerHTML = `${item}`;
            aNode.setAttribute("data-value", `${item}`);
            if (aNode.getAttribute("data-value")
                === this.data.city) {
                aNode.classList.add("active");
            }
            frag.appendChild(aNode);
        }
        htmlNode.appendChild(frag);
        console.log(htmlNode)
        return htmlNode;
    }
    // 渲染区域选择
    renderDis() {
        let htmlNode =
            this.createEle(["city-selector-panel", "city-selector-district"]),
            frag = document.createDocumentFragment(), aNode, districts;
        if (!this.cityData[this.data.province]) return;
        districts = this.cityData[this.data.province][this.data.city] || [];
        for (const item in districts) {
            aNode = document.createElement("a");
            aNode.innerHTML = `${districts[item]}`;
            aNode.setAttribute("data-value", `${districts[item]}`);
            if (aNode.getAttribute("data-value")
                === this.data.district) {
                aNode.classList.add("active");
            }
            frag.appendChild(aNode);
        }
        htmlNode.appendChild(frag);
        console.log(htmlNode)
        return htmlNode;
    }
    // 渲染错误警告模态框
    renderErrorModal() {
        let htmlNode =
            this.createEle(["city-selector-error-tips"]);
        return htmlNode;
    }
    // 显示错误信息
    showErrorModel(errorTips) {
        if (!errorTips || !errorTips.noPro || !errorTips.noCity || !errorTips.noDis) {
            errorTips = {
                noPro: "请选择省份",
                noCity: "请选择城市",
                noDis: "请选择区域"
            }
        }
    }
    // 创建元素
    createEle(classList) {
        if (!(classList instanceof Array)) return console.error("创建元素必须传入class数组");
        let htmlNode = document.createElement("div"), i, length = classList.length;
        for (i = 0; i < length; i++) {
            htmlNode.classList.add(classList[i])
        }
        return htmlNode;
    }
    // 获取父元素
    getParentEl(parentEl) {
        this.parentEl = parentEl instanceof Node ?
            parentEl :
            document.querySelector(parentEl);
    }
}
