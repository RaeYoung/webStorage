window.onload = init;

function init() {
	var addButton = document.getElementById("add_button");
	addButton.onclick = createSticky;

	var stickiesArray = getStickiesArray();

	for (var i=0; i<stickiesArray.length; i++) {
		//得到存储在数组stickiesArray中的键名
		var key = stickiesArray[i];
		//从localstorage中获取相应的值
		var value = localStorage[key];
		//添加到dom中
		addStickyToDOM(key, value);
	}
}

function addStickyToDOM(key, value) {
	var stickies = document.getElementById("stickies");
	var sticky = document.createElement("li");
	var span = document.createElement("span");
	span.setAttribute("class", "sticky");
	span.innerHTML = value;
	var deleteButton = document.createElement("input");	
	deleteButton.setAttribute("type", "button");
	deleteButton.setAttribute("value", "Delete");
	deleteButton.setAttribute("class", "delete_button");
	deleteButton.setAttribute("id", key);
	sticky.appendChild(span);
	sticky.appendChild(deleteButton);
	stickies.appendChild(sticky);
	deleteButton.onclick = deleteSticky;	
}

function createSticky() {
	var stickiesArray = getStickiesArray();
	//用时间方法来创建唯一的键
	var key = "sticky_" + (new Date()).getTime();
	var value = document.getElementById("note_text").value;
	//键值对保存在localstorage中
	localStorage.setItem(key, value);
	//使用push方法，将key追加到数组的末尾
	stickiesArray.push(key);
	//将数组转换为json字符串格式为键“stickiesArray”的值，保存在localstorage中
	localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));

	addStickyToDOM(key, value);
}

function getStickiesArray() {
	//从本地存储中取出数据项,保存在变量stickiesArray中
	var stickiesArray = localStorage["stickiesArray"];
	if(!stickiesArray) {
		//若没有该数据项，则创建一个空数组，并转换成字符串形式存入localstorage中
		stickiesArray = [];
		localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
	} else {
		//若有数据项，则转换为数组形式
		stickiesArray = JSON.parse(stickiesArray);
	}
	return stickiesArray;
}

function deleteSticky(e) {
	//target是所点击并生成事件的元素
	var key = e.target.id;
	//从localstorage中删除要删除的键值对
	localStorage.removeItem(key);
	var stickiesArray = getStickiesArray();
	//确保有一个stickiesArray数组
	if (stickiesArray) {
		for (var i=0; i<stickiesArray.length; i++) {
			if (key == stickiesArray[i]) {
				//splice(i, 1), 从i指定的位置开始的元素删除1个元素
				stickiesArray.splice(i, 1);
			}
		}
	}
	localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
	deleteStickyFromDOM(key);
}

function deleteStickyFromDOM(key) {
	var deleteButton = document.getElementById(key);
	var sticky = deleteButton.parentNode;
	sticky.parentNode.removeChild(sticky);
}