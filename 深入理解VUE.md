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

- ### 内置指令

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

  - ##### v-for循环

##### 表单域修饰符

```html
<input type="text" v-model.lazy="msg"> //当光标离开时，才会同步信息(将input事件转化为change事件)
<input type="text" v-model.number="age"> //转化格式
<input type="text" v-model.trim="msg">//去掉前后空格
```

- ### 自定义指令

  ##### 	全局指令

```JavaScript
						 //指令名称
Vue.directive('color',{
  					 //必有参数
            inserted:function(el,binding){
              //binding接受data传入的数据
              el.style.backgroundColor=binding.value.bgc
            }
        })
//data数据
msg:{
      bgc:'red'
}
```

## 理解组件

- #### 组件命名

  ##### 当使用 PascalCase (首字母大写命名) 定义一个组件时，你在引用这个自定义元素时两种命名法都可以使用。也就是说 `<my-component-name>`和`<MyComponentName>` 都是可接受的。*<u>**注意，尽管如此，直接在 DOM (即非字符串的模板) 中使用时只有 kebab-case 是有效的。**</u>*

  ```javascript
  Vue.component('HelloWorld',{
              data() {
                  return {
                      msg:'HelloWorld'
                  }
              },   
              template:`<p>{{msg}}</p>`
          })
  Vue.component('button-counter', {
              data() {
                  return {
                      count:0
                  }
              },
    				//这就叫字符串格式下。
              template:`<div>
                  <button @click="handle">鼠标点击了{{count}}</button>
                  <p>你好呀</p>
  								//在模板中的使用了
                  <HelloWorld></HelloWorld>
                      </div>`,
              methods: {
                  handle:function(){
                     this.count+=2
                  }
              },
          })
  ```

  ```html
  //这叫做DOM模式下
  <div id="app">
          <button-counter></button-counter>
          <button-counter></button-counter>
          <button-counter></button-counter>
          //在DOM中直接使用了
          <hello-world></hello-world>
  </div>
  ```

- #### 局部组件

  ##### 局部组件只能用在注册它的父组件中（哪里注册，哪里用）

- #### props属性传值（props传递数据是单向数据流）

  - #### 父组件向子组件传值

  ##### 当模板中的props使用驼峰命名时，在html代码中就要使用短横线分割命名

  ##### 若模板中的props使用了短横线分割命名，则html中就不影响可，依旧使用短横线分割命名

  ##### 在字符串形式中使用驼峰命名是可以的

  - #### 子组件向父组件传值

  ##### $emit和$event

```html
//vue代码
<button @click='$emit("add-font",5)'>扩大文字</button>
//使用模板的代码																					//$event用来接收参数
<props-item :parr='parr' :pmsg='pmsg' @add-font='handle($event)'></props-item>
```

- #### 非父子组件之间的传值

```javascript
//全局中心	
var vm=new Vue()
//第一个兄弟组件
Vue.component('test-yj',{
  data() {
    return {
      num:0
    }
  },
  methods: {
    handle:function(){
      vm.$emit('addYj', 1)
    }
  },
  mounted() {
    //监听事件
    vm.$on('addJs', (val)=>{
      this.num += val
    })
  },
  template:`<div>
<div>YJ:{{num}}</div>
<button @click='handle'>点击</button>
</div>`
});
//第二个兄弟组件
Vue.component('test-js',{
  data() {
    return {
      num:0
    }
  },
  methods: {
    handle:function(){
      vm.$emit('addJs', 2)
    }
  },
  mounted() {
    //监听事件
    vm.$on('addYj', (val)=>{
      this.num += val
    })
  },
  template:`<div>
<div>JS:{{num}}</div>
<button @click='handle'>点击</button>
</div>`
})
```

