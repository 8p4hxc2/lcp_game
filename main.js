var Main = function () {
	var canvas = document.createElement("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var ctx = canvas.getContext("2d");
	document.body.appendChild(canvas);
	
	/*window.onresize = function () {
		console.log(window.innerWidth);
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}*/
	
	window.requestAnimFrame = (function () {
		return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (
			callback,
			element) {
			window.setTimeout(callback, 1000 / 20);
		};
	})();
	
	World.Initialize(ctx);
}
