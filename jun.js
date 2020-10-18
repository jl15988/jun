/**
 * The name of this function library is JUN,final revision date is 2020-10-18
 * The name of developer of the JUN is jl15988
 */
!(function(j) {
	var jun = function(e, t) {
		return new jun.n.init(e, t);
	};
	//原型替换为n
	jun.n = jun.prototype = {
		constructor: jun,
		version: "1.0",
		typeAll: function(index) {
			return jun.typeAll(this, index);
		},
		typeArray: function() {
			return jun.typeArray(this);
		},
		inputRegAlert: function(iden, alertInfo) {
			return jun.inputRegAlert(this, iden, alertInfo);
		},
		inputAlert: function(condition, alertInfo) {
			return jun.inputAlert(this, condition, alertInfo);
		},
		checkInputValue: function(value, alertInfo) {
			return jun.checkInputValue(this, value, alertInfo);
		},
		getElemMatrixArray:function(){
			return jun.getElemMatrixArray(this);
		},
		getElemMarginNum:function(){
			return jun.getElemMarginNum(this);
		},
		getElemDeviation:function(){
			return jun.getElemDeviation(this);
		},
		getElemInitPosition:function(){
			return jun.getElemInitPosition(this);
		},
		mouseBlockMove:function(){
			return jun.mouseBlockMove(this);
		},
		PreviewPhoto:function(preimg,scale){
			return jun.PreviewPhoto(this,preimg,scale);
		}
	};
	//为构造函数和原型创建一个e方法，用来容纳方法对象
	jun.e = jun.n.e = function(objs) {
		for (let key in objs) {
			this[key] = objs[key];
		}
	};
	jun.e({
		/**
		 * 返回对象的类型，如果有多个，默认返回第一个
		 * @param {Object} objs 对象
		 */
		typeAll: function(objs, index) {
			//typeof获取类型
			let types = typeof objs;
			//判空
			if (!objs) {
				return objs;
			}
			if (objs.length > 1) {
				objs = objs[0];
			}
			//如果类型为object，继续判断
			if (types == "object") {
				//通过原型获取类型
				let objtypes = Object.prototype.toString.call(objs).toLowerCase();
				//如果为数组类型继续判断
				if (objtypes == "[object array]") {
					if (this.typeAll(objs[0]) == "json") {
						return "array-json";
					} else {
						return "array";
					}
				}
				//如果类型为object并且没有长度，则判断为json格式
				if (objtypes == "[object object]" && !objs.length) {
					return "json";
				}
				//如果是html标签则返回tagName
				if (objtypes.indexOf("object") != -1 && objtypes.indexOf("element") != -1 && objtypes.indexOf("html") != -1) {
					//判断index是否为空，若有值则根据下标来返回结果
					index = !index ? 0 : --index;
					var objElem = objs[index];
					if (!objElem && index >= 0) {
						return objs.tagName.toLowerCase();
					} else {
						return objElem.tagName.toLowerCase();
					}
					// return objtypes.replace(/^\[object\s|html|element|\]$/g,'');
				}
				switch (objtypes) {
					case "[object regexp]":
						return "regExp";
				}
				return objtypes;
			} else {
				return types;
			}
		},
		/**
		 * 获取一组对象元素的标签名
		 * @param {Object} objs 对象组
		 */
		typeArray: function(objs) {
			//判空
			if (!objs || !objs[0]) {
				return objs;
			}
			if (typeof objs == "object") {
				let objtypes = Object.prototype.toString.call(objs).toLowerCase();
				if (objtypes.indexOf("object") && objtypes.indexOf("element") && objtypes.indexOf("html")) {
					var typearr = [];
					for (let i = 0, len = objs.length; i < len; i++) {
						typearr.push(objs[i].tagName.toLowerCase());
					}
					return typearr;
				}
			}
			return typearr;
		},
		/**
		 * 将字符串中的键值对放到数组中
		 * 如果没有或失败返回false
		 * @param {Object} str 字符串
		 */
		getKeyVal: function(str) {
			if (!str) {
				return false;
			};
			try {
				var kvarr = str.match(/(\'|\")?[^\'\"\,]+(\'|\"\,)?(\=|\:)(\'|\"){1}[^\'\"\,]+(\'|\"){1}/g);
				return kvarr.map(function(item){
					let iarr = item.split(/\'|\"/);
					console.log(iarr)
					let obj = {};
					obj[iarr[1]] = iarr[3];
					return obj;
				})[0];
			} catch (err) {
				throw new Error(err);
			}
		},
		/**
		 * 验证输入框内容是否符合规则，符合不显示或去除提示返回true，否则显示提示信息返回false
		 * @param {Object} sor 选中标签
		 * @param {Object} iden 规则（正则或验证关键字）
		 * @param {Object} alertInfo 提示信息
		 */
		inputRegAlert: function(sor, iden, alertInfo) {
			if (!sor.length) {
				sor = $(sor);
			};
			if (!alertInfo) {
				alertInfo = "<span class='inputalertinfo'>格式错误</span>";
			} else {
				alertInfo = "<span class='inputalertinfo'>" + alertInfo + "</span>";
			};
			const val = sor.val();
			if (val == "") {
				return false;
			}
			if (!jun.testReg(val, iden)) {
				if (sor.next() && sor.next().attr("class") != "inputalertinfo") {
					sor.after(alertInfo);
				}
				return false;
			} else {
				if (sor.next() && sor.next().attr("class") == "inputalertinfo") {
					sor.next().remove();
				}
				return true;
			}
		},
		/**
		 * 接受一个Boolean条件值，如果为false在选中元素后提示信息，否则不显示或去除信息
		 * @param {Object} sor 选中元素
		 * @param {Object} condition Boolean条件值
		 * @param {Object} alertInfo 提示信息
		 */
		inputAlert: function(sor, condition, alertInfo) {
			if (!sor.length) {
				sor = $(sor);
			};
			if (!alertInfo) {
				alertInfo = "<span class='inputalertinfo'>格式错误</span>";
			} else {
				alertInfo = "<span class='inputalertinfo'>" + alertInfo + "</span>";
			};
			if (!condition) {
				if (sor.next() && sor.next().attr("class") != "inputalertinfo") {
					sor.after(alertInfo);
				}
			} else {
				if (sor.next() && sor.next().attr("class") == "inputalertinfo") {
					sor.next().remove();
				}
			}
		},
		/**
		 * 判断input中的值是否与传入的值相同，不同则在选中元素后提示信息
		 * @param {Object} sor 选中元素
		 * @param {Object} value 传入的值
		 * @param {Object} alertInfo 提示信息
		 */
		checkInputValue: function(sor, value, alertInfo) {
			var res;
			if (!sor.length) {
				sor = $(sor);
			};
			if (!alertInfo) {
				alertInfo = "<span class='inputalertinfo'>两个值不同</span>";
			} else {
				alertInfo = "<span class='inputalertinfo'>" + alertInfo + "</span>";
			};
			const val = sor.val();
			if (val != value) {
				if (sor.next() && sor.next().attr("class") != "inputalertinfo") {
					sor.after(alertInfo);
				};
				return false;
			} else {
				if (sor.next() && sor.next().attr("class") == "inputalertinfo") {
					sor.next().remove();
				};
				return true;
			}
		},
		/**
		 * 判断字符串是否符合正则表达式
		 * @param {Object} str 字符串
		 * @param {Object} iden 规则（正则或验证关键字）
		 */
		testReg: function(str, iden) {
			var idenType = jun.typeAll(iden);
			if (idenType == "regExp") {
				iden = iden;
			} else if (idenType == "string") {
				switch (iden) {
					case "phone":
						iden = /^1[34578]\d{9}$/;
						break;
					case "name":
						iden = /^[\u4E00-\u9FA5]{1,6}$/;
						break;
					case "ID":
						iden = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
						break;
					case "username":
						iden = /^[a-zA-Z0-9_-]{4,16}$/;
						break;
					case "password":
						iden = /^(_|\w+|\d+){6,15}$/;
						break;
					case "passwordStrong":
						iden = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
						break;
					case "email":
						iden = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
						break;
				}
			}
			try {
				return iden.test(str);
			} catch (err) {
				return false;
			}
		},
		/**
		 * 移动数组中的指定元素到指定位置
		 * @param {Object} arr 数组
		 * @param {Object} iden 移动元素的位置或值
		 * @param {Object} place 移动后的位置
		 */
		moveArrayItem: function(arr, iden, place) {
			const type = typeof iden;
			if(!(type==="number"||type === "string"||type === "object")){
				throw new Error("parameter type error");
			};
			arr.forEach((item,index)=>{
				if(index==iden){
					arr.splice(index,1);
					arr.unshift()
				}
			})
		},
		/**
		 * 返回字符串去除'px'之后的浮点类型
		 * @param {Object} str
		 */
		repx:function(str){
			return parseFloat(str.replace("px","").trim());
		},
		/**
		 * 如果字符串为空返回0，否则返回第一串数字
		 * @param {Object} str 字符串
		 */
		stringRepxNum:function(str){
			return str!=null?parseFloat(str.match(/\-?\d+(\.\d+)?/)[0]):0;
		},
		/**
		 * 返回字符串中数字串组成的数组
		 * @param {Object} str 字符串
		 */
		getStringNumArray:function(str){
			return str.match(/\-?\d+(\.\d+)?/g);
		},
		/**
		 * 返回选中元素的2d矩阵数组
		 * @param {Object} sor
		 */
		getElemMatrixArray:function(sor){
			try{
				var matrix = sor.css("transform");
				return this.getStringNumArray(matrix);
			}catch(err){
				throw new Error(err);
			}
		},
		/**
		 * 返回元素的margin数值数组
		 * @param {Object} sor
		 */
		getElemMarginNum:function(sor){
			var narr = ['','','',''];
			var minit = sor.css("margin");
			var marr = minit.replace(/ /g,"").split("px");
			marr.forEach(function(item,index){
				item!=""?(marr[index] = parseFloat(item)):marr.splice(index,1);
			});
			switch(marr.length){
				case 1:return narr.map(function(item){
					return marr[0];
				});
				case 2:return narr.map(function(item,index){
					return index<=1?marr[0]:marr[1];
				});
				case 3:return narr.map(function(item,index){
					return index==3?marr[1]:marr[index];
				});
			}
			return marr;
		},
		/**
		 * 返回元素的偏移距离
		 * @param {Object} sor 选中的元素
		 */
		getElemDeviation:function(sor){
			var matrixArr = this.getElemMatrixArray(sor);
			var marr = this.getElemMarginNum(sor);
			var tX = 0,tY = 0;
			if(matrixArr!=null){
				tX = matrixArr[4];
				tY = matrixArr[5];
			}
			return {devTop:marr[0]+tY,devLeft:marr[3]+tX};
		},
		/**
		 * 返回元素初始位置（除去margin,translate）
		 * @param {Object} sor
		 */
		getElemInitPosition:function(sor){
			var oX = sor.offset().left;
			var oY  =sor.offset().top;
			var devTop = this.getElemDeviation(sor).devTop;
			var devLeft = this.getElemDeviation(sor).devLeft;
			return {initX:oX-devLeft,initY:oY-devTop};
		},
		/**
		 * 使元素能够通过鼠标移动
		 * @param {Object} sor 选中元素
		 */
		mouseBlockMove:function(sor){
			var junbm = sor.find(".junbm");
			var psor = sor;
			//如果有指定子项则替换sor
			if(junbm.length==1){
				sor = junbm;
			}
			try{
				var devTop = this.getElemDeviation(psor).devTop;
				var devLeft = this.getElemDeviation(psor).devLeft;
				sor.css({"cursor":"move"});
				psor.css({"position":"fixed"});
				//鼠标按下
				sor.mousedown(function(e){
					e.preventDefault();
					let oX = e.clientX - psor[0].offsetLeft;
					let oY = e.clientY - psor[0].offsetTop;
					//鼠标移动
					$(document).mousemove(function(e){
						e.preventDefault();
						let cX = e.clientX;
						let cY = e.clientY;
						cY = cY<=0?0:cY;
						cX = cX<=0?0:cX;
						//修改位置
						psor.css({"top":cY-oY-devTop,"left":cX-oX-devLeft});
					});
					//鼠标松开
					sor.mouseup(function(){
						//移除事件处理
						$(document).off("mousemove");
						sor.off("mouseup");
					});
				});
				//返回选中元素
				return psor!=sor?{psor:psor,sor:sor}:sor;
			}catch(err){
				throw new Error(err);
			}
		},
		/**
		 * 商品预览预览图效果
		 * @param {Object} sor 选中元素（包含slider），不推荐预览图放到sor中
		 * @param {Object} preimg 预览图地址
		 * @param {Object} scale 放大倍数，最小1.5，最大5
		 */
		PreviewPhoto:function(sor,preimg,scale){
			var pb = $(".jun_preview");
			var slider = $(".jun_slider");
			if(pb.length==0){
				throw new Error("no block class is 'jun_preview'");
			};
			if(slider.length==0){
				throw new Error("no block class is 'jun_slider'");
			};
			if(!preimg){
				throw new Error("preimg is null");
			};
			//最小倍数为1.5，默认为2
			if(!scale||scale<1.5||scale>5){
				scale = 2;
			};
			var repx = function(str){return jun.repx(str)};
			var s = scale*100;
			//选取元素的宽高
			var w = sor.css("width");
			var h = sor.css("height");
			//当pb有边框时扩大倍数
			var bw = pb.css("box-sizing")=="border-box"?repx(pb.css("border")):0;
			s = (s*repx(w)+scale*bw*2*100)/repx(w);
			//slider的宽高
			var zw = repx(w)/scale;
			var zh = repx(h)/scale;
			//初始化样式
			slider.css({"width":zw,"height":zh,"cursor":"move"});
			pb.css({"position":"absolute"});
			sor.css({"position":"relative"});
			//鼠标移入移出样式
			sor.hover(function(){
				$(".jun_preview").css("display","block");
				$(".jun_slider").css("display","block");
			},function(){
				$(".jun_preview").css("display","none");
				$(".jun_slider").css({"display":"none"});
			});
			//鼠标移动
			sor.mouseover(function(){
				$(document).mousemove(function(e){
					e.preventDefault();
					//鼠标相对位置
					var x = e.clientX-sor[0].offsetLeft - zw/2;
					var y = e.clientY-sor[0].offsetTop - zh/2;
					//选中元素边框宽度*2
					var sw = sor.css("box-sizing")=="border-box"?repx(pb.css("border"))*2:0;
					//禁止滑块超出范围
					if(x<=0){
						x=0;
					}else if(x>=zw*(scale-1)-sw){
						x=zw*(scale-1)-sw;
					}
					if(y<=0){
						y=0;
					}else if(y>=zh*(scale-1)-sw){
						y=zh*(scale-1)-sw;
					}
					//slider位置
					$(".jun_slider").css({"position":"absolute","top":y,"left":x});
					//背景位置
					var p = "-"+(x*scale)+"px -"+(y*scale)+"px";
					pb.css({"background":"url("+preimg+") "+p+"/"+s+"% "+s+"% no-repeat"});
				});
				//解绑
				sor.mouseout(function(){
					$(document).off("mousemove");
				});
			});
		}
	});
	var init = jun.n.init = function(e, t) {};
	//尝试替换jquery原型
	try {
		jun.n.init = $.fn.init;
		$.fn = Object.assign($.fn, jun.n);
	} catch(err) {
		console.warn("No JQuery file was introduced");
	}finally{
		//将jun构造函数暴露
		j.jun = jun;
	};
})(window)
