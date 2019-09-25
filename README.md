# bovine-city-selector

城市选择器插件



### 优点

1. 体积小，更轻量（最终打包生成的文件12KB，再加上依赖的城市JSON文件一共62KB）；
2. 兼容性好，兼容目前市面上所有有兼容必要的浏览器；
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

1. 引入官方css样式

```html
<link rel="stylesheet" href="../dist/city-selector.css" />
```



### 用法

#### 基本用法

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



