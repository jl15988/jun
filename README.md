# jun
一个基于jquery的函数库

## 一、简单说明
- 本函数库将JQuery原型进行了替换，添加了本函数库的原型，使得本函数库的方法能够直接通过JQuery来调用，使用方便，符合目前javaScript主流
- 本函数库基于JQuery，并在JQuery的基础上添加了新的特性，使得开发者能够更加快捷地实现功能的开发
- 本函数库属于JQuery的扩展函数库，本函数库的诞生是为了针对页面功能的实现便捷性
- 所有方法都能通过jun.来调用，部分方法能够直接使用JQuery选择器来调用
## 二、API
#### 1. typeAll(objs,index)方法，可以使用jq调用

返回一个对象的类型，包括所有类型

- 参数
  + objs 对象
  + index 下标，从1开始，用来获取第几个元素的类型

- 使用方法
  + 直接选取html组件作为传入对象
  ```js
  $("#jun_html").typeAll();
  ```

  + 自定义传入对象
  ```js
  var objes = {
	  'name':'张三',
	  'age':'李四'
  }
  jun.typeAll(objs);
  ```

  + 如果对象有多个，可以传入下标值来表明获取第几个对象的类型
  ```js
  $(".jun_html").typeAll(index);
  ```
#### 2. typeArray(objs)方法，可以使用jq调用

以数组的方式返回多个对象的类型

- 参数
  
+ objs 多个对象的数组
  
- 使用方法
  + 选取html作为传入对象
  ```js
  $(".jun_html").typeArray();
  ```
  + 自定义传入对象
  ```js
  var objes = {
  	  'name':'张三',
  	  'age':'李四'
  }
  jun.typeArray(objs);
  ```

#### 3. getKeyVal(str)方法

以数组的方式返回字符串中的所有键值对

- 参数
  
+ str 字符串
  
- 键值对的形式
  + key(或'key'或"key")='val'(或"val")
  + key(或'key'或"key"):'val'(或"val")

- 使用方法
  ```js
  var str = "这里是干扰,name:'jun'这里是干扰,ver='1.0'这里是干扰";
  jun.getKeyVal(str); //结果：["name:'jun'", "ver='1.0'"]
  ```

4. inputAlert(sor,iden,alertInfo)方法
选中**一个**input来规定规则，若输入的信息与规则不一致，在则失去焦点后提示信息
- sor 选中的input
  + 用jquery来选取input再调用该方法
  + 用jun调用该方法再传入参数
- iden 正则表达式或规则类型
  规则类型有：
  + phone 手机号码格式，/^1[34578]\d{9}$/
  + name 中文姓名格式，/^[\u4E00-\u9FA5]{1,6}$/
  + ID 身份证号格式，/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  + password 密码格式，/^(_|\w+|\d+){6,15}$/
- alertInfo 一个提示信息，或者是回调函数，可以没有，默认提示信息为“格式错误”

```js
//方法一
$("#phone").inputAlert("phone","手机号格式错误");
//方法二
var phoneinput = document.getElementById("phone");
jun.inputAlert(phoneinput,"phone",function(){
	alert("手机号格式错误");
});
```

5. testReg(str,iden)方法
验证一段字符串是否符合正则表达式或规则，符合返回true，否则返回false

- str 需要验证的字符串
- iden 正则表达式或规则，规则与inputAlert()方法中的规则一直，inputAlert()方法就是通过调用该方法实现的正则验证

```js
var phone = 1370665743;
jun.testReg(phone,"phone"); //true
```