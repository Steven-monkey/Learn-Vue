# 							深入理解VUE

- ### VUE代码

```JavaScript
var app = new Vue({
            el: '#app',
            data() {
                return {
                    msg: '在学一次，能不能毕业'
                }
            }
        })
```

- ### 差值表达式

```html
<div id="app">{{message}}</div>
```

- ### 指令

  ##### v-cloak：防抖（闪烁）

```css
 [v-cloak] {
            display: none;
        }
```

```html
<div id="app" v-cloak>{{message}}</div>
```

##### 		v-text：更新文本内容

```html
<div v-text="msg"></div>
```

##### 		v-html：跟新文本内容的样式

```html
<div v-html="msg1"></div>
```

```vue
msg1: '<h1>在学一次，就可以毕业了</h1>'
```

##### 		v-pre:不编译，显示原本文本内容

```html
<div id="app" v-pre>{{message}}</div>
```

- #### 双向数据绑定
  - #### v-model

```html
<input v-model="msg" type="text" />
```

- #### 事件绑定

  - ##### v-on

```html
<button v-on:click="add">点击</button>
<button @click='add'>点击</button>
<button @click='(arg,event)'>点击</button>
```

- #### 属性绑定

  - ##### v-bind

```html
<div v-bind:href='url'>跳转</div>
<div :bind:href='url'>跳转</div>
```

- #### 样式绑定

  - ##### v-bind:class   对象方式添加（可以随意添加和删除类名）

```html
<!--html代码-->
<div v-bind:class="{active:isActive}"></div>
<!--vue代码-->
data() {
                return {
                    isActive: true
                }
            },
<!--vue控制代码-->
methods: {
                handle: function () {
										<!--两个值互相改变时，取反，最简单-->
                    this.isActive = !this.isActive
                }
            }
```

##### 				v-bind：class  数组方式添加（可以添加多个类名）

```javascript
//html代码
<div v-bind:class="[activeClass,errorClass]"></div>
//vue代码
 data() {
                return {
                    activeClass: 'active',
                    errorClass: 'error'
                }
            },
//VUE控制代码
methods: {
                handle: function () {
                    this.activeClass = ''
                }
            }
```

##### 			 v-bind：style（数组和对象两种添加方式）

- #### 分支循环结构

  - ##### v-if和v-show区别

    - ##### v-if控制元素是否渲染到了页面

    - ##### v-show控制元素是否显示到了页面

  - ##### v-for