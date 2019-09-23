import cityData from "./city-data.json";

export default class citySelector {
    constructor(parentEl, {
        defaultData = {},
        actionName = {
            title: "请选择地区",
            cancelBtn: "取消",
            confirmBtn: "确认"
        },
        tabs = ["请选择", "请选择", "请选择"],
        errorTips = {
            noPro: "请选择省份",
            noCity: "请选择城市",
            noDis: "请选择区域"
        }
    }) {
        this.getParentEl(parentEl);
        this.cityData = cityData;
        this.els = {};
        this.actionName = actionName;
        this.tabs = tabs;
        this.data = defaultData;
        this.errorTips = errorTips;
        this.currentIndex = (this.data.city && !this.data.district) ? 2 : 0;
        this.init();
    }
    init() {
        this.renderBody();
        this.getEl();
        this.inputInit();
        this.renderPro();
        this.renderCity();
        this.renderDis();
        this.activeTab();
        this.tabChange();
        this.bindTabEvent();
        this.bindEvents();
        this.fillData();
    }
    // 渲染body部分
    renderBody() {
        let htmlNode = this._createEle(["city-selector-body"]);
        htmlNode.innerHTML = `
        <div class="city-selector-action">
                    <div class="city-selector-title">
                        ${this.actionName.title}
                    </div>
                    <a class="city-selector-btn city-selector-cancel">
                        ${this.actionName.cancelBtn}
                    </a>
                    <a class="city-selector-btn city-selector-confirm">
                        ${this.actionName.confirmBtn}
                    </a>
                </div>
                <div class="city-selector-tabs">
                    <a class="city-selector-tab">${this.tabs[0]}</a>
                    <a class="city-selector-tab">${this.tabs[1]}</a>
                    <a class="city-selector-tab">${this.tabs[2]}</a>
                </div>
                <div class="city-selector-panels">
                    <div class="city-selector-panel city-selector-province">
                    </div>
                    <div class="city-selector-panel city-selector-city">
                    </div>
                    <div class="city-selector-panel city-selector-district">
                    </div>
                </div>
                <div class="city-selector-error-tips"></div>
            </div>
        `;
        this.parentEl.appendChild(htmlNode);
    }
    // 获取元素
    getEl() {
        this.els = {
            citySelInput: this.parentEl.querySelector("input[data-type='city-selector']"),
            citySelBody: this.parentEl.querySelector(".city-selector-body"),
            citySelAct: this.parentEl.querySelector(".city-selector-action"),
            citySelTabs: Array.prototype.slice.call(this.parentEl.querySelectorAll(".city-selector-tab")),
            citySelPanels: this.parentEl.querySelector(".city-selector-panels"),
            citySelPanel: this.parentEl.querySelectorAll(".city-selector-panel"),
            citySelPro: this.parentEl.querySelector(".city-selector-province"),
            citySelCity: this.parentEl.querySelector(".city-selector-city"),
            citySelDis: this.parentEl.querySelector(".city-selector-district"),
            citySelConfirmBtn: this.parentEl.querySelector(".city-selector-confirm"),
            citySelCancelBtn: this.parentEl.querySelector(".city-selector-cancel"),
            errorTipModal: this.parentEl.querySelector(".city-selector-error-tips")
        }
    }
    inputInit() {
        if (!this.els.citySelInput) return console.error("未获取到城市选择器，可能是没有定义城市选择器的data-type属性")
        // 防止双击文字被选中
        this.parentEl.setAttribute("onselectstart", "return false");
        // 防止直接输入
        this.els.citySelInput.setAttribute("readonly", "");
        // 获取是否简易模式
        this.simple = this.els.citySelInput.getAttribute("data-simple") || "false";
    }
    // 渲染省份选择
    renderPro() {
        let parentNode = document.querySelector(".city-selector-province"),
            frag = document.createDocumentFragment(),
            aNode;
        for (const item in this.cityData) {
            aNode = document.createElement("a");
            aNode.innerHTML = `${item}`;
            aNode.setAttribute("data-value", `${item}`);
            if (this.data) {
                if (aNode.getAttribute("data-value") ===
                    this.data.province) {
                    aNode.classList.add("active");
                }
            }
            frag.appendChild(aNode);
        }
        parentNode.appendChild(frag);
        const proItems = Array.prototype.slice.call(this.els.citySelPro.querySelectorAll("a"));
        proItems.forEach(item => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                if (e.target.getAttribute("data-value") === this.data.province) return;
                proItems.forEach(item => {
                    if (item.classList.contains("active")) {
                        item.classList.remove("active")
                    }
                })
                this.els.citySelTabs[0].innerHTML = this.data.province = e.target.getAttribute("data-value");
                item.classList.add("active");
                this.renderCity();
                this.data.city = this.data.district = "";
                this.tabChange();
                this.currentIndex = 1;
                this.activeTab();
            })
        })
    }
    // 渲染城市选择
    renderCity() {
        let parentNode = document.querySelector(".city-selector-city"),
            frag = document.createDocumentFragment(),
            aNode, cityS;
        this._delAllNodes(parentNode);
        cityS = this.cityData[this.data.province] || {};
        for (const item in cityS) {
            aNode = document.createElement("a");
            aNode.innerHTML = `${item}`;
            aNode.setAttribute("data-value", `${item}`);
            if (aNode.getAttribute("data-value") ===
                this.data.city) {
                aNode.classList.add("active");
            }
            frag.appendChild(aNode);
        }
        parentNode.appendChild(frag);
        const cityItems = Array.prototype.slice.call(this.els.citySelCity.querySelectorAll("a"));
        cityItems.forEach(item => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                console.log()
                if (e.target.getAttribute("data-value") === this.data.city) return;
                cityItems.forEach(item => {
                    if (item.classList.contains("active")) {
                        item.classList.remove("active")
                    }
                })
                this.els.citySelTabs[1].innerHTML = this.data.city = e.target.innerHTML;
                item.classList.add("active");
                this.els.citySelPro.style.display = "none";
                this.els.citySelDis.style.display = "block";
                this.renderDis();
                this.data.district = "";
                this.tabChange();
                this.currentIndex = 2;
                this.activeTab();
            })
        })
    }
    // 渲染区域选择
    renderDis() {
        let parentNode = document.querySelector(".city-selector-district"),
            frag = document.createDocumentFragment(),
            aNode, districts;
        if (!this.cityData[this.data.province]) return;
        districts = this.cityData[this.data.province][this.data.city] || [];
        this._delAllNodes(parentNode);
        for (const item in districts) {
            aNode = document.createElement("a");
            aNode.innerHTML = `${districts[item]}`;
            aNode.setAttribute("data-value", `${districts[item]}`);
            if (aNode.getAttribute("data-value") ===
                this.data.district) {
                aNode.classList.add("active");
            }
            frag.appendChild(aNode);
        }
        parentNode.appendChild(frag);
        const disItems = Array.prototype.slice.call(this.els.citySelDis.querySelectorAll("a"));
        disItems.forEach(item => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                if (e.target.getAttribute("data-value") === this.data.district) return;
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
    // 改变class为active的元素位置
    activeAction() {
        let i, length;
        this.els.activeEls = this.els.citySelPanels.querySelectorAll(".active")
        length = this.els.activeEls.length;
        for (i = 0; i < length; i++) {
            if (!this.els.activeEls[i]) return;
            this.els.citySelPanel[i].scrollTop = this.els.activeEls[i].offsetTop - 160;
        }
    }
    tabChange() {
        this.els.citySelTabs[0].innerHTML = this.data.province || this.tabs[0];
        this.els.citySelTabs[1].innerHTML = this.data.city || this.tabs[1];
        this.els.citySelTabs[2].innerHTML = this.data.district || this.tabs[2];
    }
    bindTabEvent() {
        this.els.citySelTabs[0].addEventListener("click", (e) => {
            e.stopPropagation();
            this.currentIndex = 0;
            this.activeTab();
        })
        this.els.citySelTabs[1].addEventListener("click", (e) => {
            e.stopPropagation();
            e.preventDefault();
            if (!this.data.province) {
                this.showErrorModel()
            } else {
                this.currentIndex = 1;
                this.activeTab();
            }
        })
        this.els.citySelTabs[2].addEventListener("click", (e) => {
            e.stopPropagation();
            if (!this.data.city) {
                this.showErrorModel()
            } else {
                this.currentIndex = 2;
                this.activeTab();
                this.els.citySelPro.style.display = "none";
                this.els.citySelDis.style.display = "block";
            }
        })
    }
    activeTab() {
        this.els.citySelTabs.forEach(item => {
            item.classList.remove("active");
        })
        if (this.currentIndex === 0 || this.currentIndex === 1) {
            this.els.citySelPro.style.display = "block";
            this.els.citySelDis.style.display = "none";
        } else {
            this.els.citySelPro.style.display = "none";
            this.els.citySelDis.style.display = "block";
        }
        this.els.citySelTabs[this.currentIndex].classList.add("active")
    }
    // 显示错误信息
    showErrorModel() {
        this.els.errorTipModal.style.display = "block";
        setTimeout(() => {
            this.els.errorTipModal.style.display = "none";
        }, 1500)
        if (!this.data.province) {
            this.els.errorTipModal.innerHTML = this.errorTips.noPro;
            return false;
        }
        if (!this.data.city) {
            this.els.errorTipModal.innerHTML = this.errorTips.noCity;
            return false;
        }
        if (!this.data.district) {
            this.els.errorTipModal.innerHTML = this.errorTips.noDis;
            return false;
        }
    }
    // 绑定事件
    bindEvents() {
        this.els.citySelConfirmBtn.addEventListener("click", () => {
            this.fillData();
            document.querySelector(".city-selector-body").style.display = "none";
        })
        this.els.citySelCancelBtn.addEventListener("click", () => {
            document.querySelector(".city-selector-body").style.display = "none";
        })
        document.getElementById("city-selector").addEventListener("click", () => {
            document.querySelector(".city-selector-body").style.display = "block";
            this.activeAction();
        })
    }
    // 创建元素
    _createEle(classList) {
        if (!(classList instanceof Array)) return console.error("创建元素必须传入class数组");
        let htmlNode = document.createElement("div"),
            i, length = classList.length;
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
    // 删除元素下素所有子节点
    _delAllNodes(ele) {
        ele.innerHTML = "";
    }
    fillData() {
        let data = this.data;
        // if (this.simple === "true") {
        //     data.province = data.province.replace(/[省,市,自治区,壮族,回族,维吾尔]/g, "");
        //     data.city = data.city.replace(/[市,地区,回族,蒙古,苗族,白族,傣族,景颇族,藏族,彝族,壮族,傈僳族,布依族,侗族]/g, "")
        //         .replace("哈萨克", "")
        //         .replace("自治州", "")
        //         .replace(/自治县/, "");
        //     data.district = data.district.length > 2 ? data.district.replace(/[市,区,县,旗]/g, "") : data.district;
        // }
        // console.log(`简易数据：${data.province || "未选择"} - ${data.city || "未选择"} - ${data.district || "未选择"}`)
        if (data.province && data.city && data.district) {
            this.els.citySelInput.value = `${data.province} - ${data.city} - ${data.district}`;
        } else if (data.province && data.city && !data.district) {
            this.els.citySelInput.value = `${data.province} - ${data.city}`;
        } else if (data.province && !data.city && !data.district) {
            this.els.citySelInput.value = `${data.province}`;
        } else {
            this.els.citySelInput.value = ``;
        }

    }
}
