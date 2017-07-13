
/*兼容性 
	IE6-8不支持类名获取
*/
function getClass(classname,range){
	if(range.getElementsByClassName){
		// alert('支持')
		return range.getElementsByClassName(classname)
	}else{
		// alert('不支持')
		var all=range.getElementsByTagName('*')
		var a=[];
		for(var i=0;i<all.length;i++){
			
			if (checkClass(all[i].className,classname)) {
				a.push(all[i])
			}
		}
		return a;
	}
	
}
function checkClass(tagClass,aClass){
	var a= tagClass.split(' ')
	for(var i=0;i<a.length;i++){
		if(a[i]==aClass){
			return true;
		}
		
	}
	return false;
}


function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return window.getComputedStyle(obj,null)[attr];
	}

}

/*兼容性
	操作内容 IE6-8不支持textContent

	1.innerHTML 用来设置或获取
	2.innerText 用来设置或获取(IE)
	  textContent用来设置或获取

*/
function text(obj,val){
	//判断内容是否为空 是空值设置
	if(val==undefined){
		//判断浏览器是否支持这个方法
		if(obj.textContent!=undefined){
			alert('textContent' )
			return obj.textContent;
		}else{
			alert('innerText')
			return obj.innerText;
		}
		//不是空值 把val赋值给它
	}else{
		if(obj.textContent!=undefined){
			 obj.textContent=val;
		}else{
			 obj.innerText=val;
		}
	}
}



/*  1.获取页面元素
		$('#box')	id
		$('.box')	classname
		$('div')	tagname
	2.页面加载
		$(function(){})
*/
function $(selector,range){
	if(typeof selector=='string'){
		// alert('获取')
		var range=range||document;
		if(selector.charAt(0)=='#'){
			return document.getElementById(selector.substr(1))
		}
		else if(selector.charAt(0)=='.'){
			return getClass(selector.substr(1),range)
		}else if(/^[a-zA-Z][a-zA-Z1-6]{0,9}$/.test(selector)){
			return range.getElementsByTagName(selector)
		}
	}else if(typeof selector=='function'){
		// alert('页面加载')
		window.onload=selector;
	}

}


/*
	获取所有子节点
*/

function getChilds(obj){
	var childs=obj.childNodes;
	var newArr=[];
	for(var i=0;i<childs.length;i++){
		//判断不要的元素 取反
		if(!(childs[i].nodeType==8||(childs[i].nodeType==3&&trim(childs[i].nodeValue)==''))){
			newArr[newArr.length]=childs[i];
		}
	}
	return newArr;
}



function trim(str){
	return str.replace(/^\s+|\s+$/g,"");

}

function getFirst(obj){
	return getChilds(obj)[0]
}

function getLast(obj){
	var childs=getChilds(obj)
	return childs[childs.length-1]
}
function getIndex(obj,index){
	return getChilds(obj)[index];
}

/* 获取下一个兄弟元素*/
function getNext(obj){
	var next=obj.nextSibling;
	if(!next){
		return false;
	}
	while(next.nodeType==8||(next.nodeType==3&&trim(next.nodeValue)=='')){
		
		next=next.nextSibling;
		if(!next){
			return false;
		}
	}

	return next;
}

/* 获取上一个兄弟元素*/
function getUp(obj){
	var up=obj.previousSibling;
	if(!up){
		return false;
	}
	while(up.nodeType==8||(up.nodeType==3&&trim(up.nodeValue)=='')){
		
		up=up.previousSibling;
		if(!up){
			return false;
		}
	}

	return up;
}

function insertBefore(obj1,obj2){
	var parent=obj2.parentNode;
	return parent.insertBefore(obj1,obj2)
}