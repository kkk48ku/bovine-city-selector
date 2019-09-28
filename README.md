# bovine-city-selector

城市选择器插件



### 优点

1. 体积小，更轻量（最终打包生成的文件12KB，再加上依赖的城市JSON文件一共62KB）；
2. 兼容性好，兼容目前市面上所有有兼容必要的浏览器，包括移动端；
3. 配置项多，更个性化；



### 安装

1.  npm安装：

```
npm install bovine-city-selector --save-dev
```

2.  import引入（目前仅支持一种引入方式）

```
import CitySelector from "bovine-city-selector";
```

3.  引入官方css样式

```html
<link rel="stylesheet" href="../dist/city-selector.css" />
```



### 用法

##### 基本用法：

html：

```html
<div class="city-selector-container">
     <input type="text" 
            data-type="city-selector" 
            class="city-selector-input" 
            placeholder="请选择所在城市" />
</div>
```

js：

```javascript
var citySelectorContainer = document.querySelector(".city-selector-container");
var citySel = new CitySelector(citySelectorContainer);
```



##### 简易展示数据：

html   (input添加自定义属性data-simple="true")

```html
<div class="city-selector-container">
     <input type="text" 
            data-type="city-selector" 
            data-simple="true"
            class="city-selector-input" 
            placeholder="请选择所在城市" />
</div>
```

##### 强制获取地址：

html   (input添加自定义属性data-force="true")

```html
<div class="city-selector-container">
     <input type="text" 
            data-type="city-selector" 
            data-force="true"
            class="city-selector-input" 
            placeholder="请选择所在城市" />
</div>
```

### 参数：

|   参数名    |  类型  |                            默认值                            |    备注    |
| :---------: | :----: | :----------------------------------------------------------: | :--------: |
| defaultData | Object |          province(省份)，city(城市)，district(地区)          |  默认城市  |
| actionName  | Object | title(选择器名称)，cancelBtn(取消按钮)，confirmBtn(确认按钮) | 自定义信息 |
|    tabs     | Array  |                      [] (tabs三个标签)                       | tab栏标签  |
|  errorTips  | Object |      noPro(未选省份)，noCity(未选城市)，noDis(未选区域)      |  错误提示  |

### API：

confirm()：参数：data。点击确定后返回用户选择的城市对象，以供作自定义处理。

cancel()：用户点击取消按钮后响应的事件。