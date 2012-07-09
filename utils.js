Utils = {
	Extend : function (subClass, superClass) {
		var F = function () {};
		F.prototype = superClass.prototype;
		subClass.prototype = new F();
		subClass.prototype.constructor = subClass;
		subClass.superclass = superClass.prototype;
	},
	CreateElement : function (_params) {
		var newItem = document.createElement(_params.Balise || "div");
		
		if (_params.Id) {
			newItem.setAttribute("id", _params.Id);
		}
		
		if (_params.Class) {
			newItem.setAttribute("class", _params.Class);
		}
		
		if (_params.Style) {
			newItem.setAttribute("style", _params.Style);
		}
		
		newItem.innerHTML = _params.Html || "";
		
		_params.Parent.appendChild(newItem);
		
		return newItem;
	},
	Filter : function (_id, _array) {
		for (var i = 0, j = _array.length; i < j; i++) {
			if (_array[i].Id == _id) {
				return {
					index : i,
					object : _array[i]
				};
				break;
			}
		}
	}
}