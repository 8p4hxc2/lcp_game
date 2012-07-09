AnimatedSprite = function (_config) {
	this.Texture = new Image();
	this.Texture.src = "resources/" + _config.Texture;
	this.Rows = _config.Rows;
	this.Columns = _config.Columns;
	this.currentAnimation = _config.currentAnimation || 0;
	this.TimeAnime = new Date().getTime();
	this.currentDirection = _config.currentDirection || 0;
	this.X = _config.X || 0;
	this.Y = _config.Y || 0;
	this.width = _config.width || 0;
	this.height = _config.height || 0;
	this.d = 1;
	this.dy = 0;
	this.id = _config.id;
	this.color="blue";
}

AnimatedSprite.prototype = {
	Initialize : function () {},
	Update : function (othermonster) {
		var direction = Math.floor(Math.random() * 4);
		var changer = Math.floor(Math.random() * 50);
		if (changer == 3) {
			switch (direction) {
			case 1:
				this.d = -1;
				this.dy = 0;
				this.currentDirection = 1;
				break;
			case 2:
				this.d = 1;
				this.dy = 0;
				this.currentDirection = 3;
				break;
			case 3:
				this.d = 0;
				this.dy = 1;
				this.currentDirection = 2;
				break;
			case 0:
				this.d = 0;
				this.dy = -1;
				this.currentDirection = 0;
				break;
			}
		} else {
			//checkcollision
			var collide = false;
			
			for (var i = 0, j = othermonster.length; i < j; i++) {
				if (othermonster[i].id != this.id) {
					if (this.CheckCollide(this.X + this.d, this.Y + this.dy, othermonster[i])) {
						collide = true;
						break;
					}
				}
			}
			
			//console.log(this.X+","+this.Y+","+(this.X+this.width)+","+(this.Y+this.height));
			if (!collide) {
				this.X += this.d;
				this.Y += this.dy;
				if (this.X < 0) {
					this.X = 0;
				}
				if (this.Y < 0) {
					this.Y = 0;
				}
				this.color="blue";
			}
			else
			{
				this.color="red";
			}
		}
	},
	Draw : function (_ctx) {
		_ctx.drawImage(this.Texture, this.currentAnimation * this.width, this.currentDirection * this.height, this.width, this.height, this.X, this.Y, this.width, this.height);
		_ctx.strokeStyle=this.color;
		_ctx.strokeRect (this.X, this.Y, this.width, this.height);
		var tempTime = (new Date().getTime() - this.TimeAnime) / 1000;
		if (tempTime > 0.1) {
			this.TimeAnime = new Date().getTime();
			if (this.currentAnimation > this.Columns) {
				this.currentAnimation = 0;
			} else {
				this.currentAnimation++;
			}
		}
	},
	HandleKey : function (e) {
		switch (e.keyCode) {
		case 37:
			this.currentDirection = 1;
			break;
		case 38:
			this.currentDirection = 0;
			break;
		case 39:
			this.currentDirection = 3;
			break;
		case 40:
			this.currentDirection = 2;
			break;
		}
	},
	CheckCollide : function (x,y,othermonster) {
		return x >= othermonster.X && x <= othermonster.X + othermonster.width && y >= othermonster.Y && y <= othermonster.Y + othermonster.height
		|| x+this.width >= othermonster.X && x+this.width<= othermonster.X + othermonster.width && y >= othermonster.Y && y <= othermonster.Y + othermonster.height
		|| x >= othermonster.X && x <= othermonster.X + othermonster.width && y+this.height >= othermonster.Y && y+this.height <= othermonster.Y + othermonster.height
		|| x+this.width >= othermonster.X && x+this.width <= othermonster.X + othermonster.width && y+this.height >= othermonster.Y && +this.height <= othermonster.Y + othermonster.height;
	}
}
