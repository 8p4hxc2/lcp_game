var World = {
	ctx : null,
	Fps : 0,
	realFps : 0,
	newTimer : 0,
	Entities : [],
	Hero : null,
	
	Initialize : function (_ctx) {
		this.ctx=_ctx;
		var get = new XMLHttpRequest();
		get.open("GET", "omg.json", false);
		get.send(null);
		var world = JSON.parse(get.responseText);
		var ts = "";
		
		var y = 0;
		var x = 0;
		
		for (var i = 0, j = world.layers[0].data.length; i < j; i++) {
			
			if (world.layers[0].data[i] != 0) {
				var xt = 0;
				var yt = 0;
				var index = 0;
				for (var o = 0; o < 4; o++) {
					if (world.tilesets[o].firstgid > world.layers[0].data[i]) {
						index = o - 1;
						break;
					}
				}
				
				ts = world.tilesets[index].image;
				var largeur = world.tilesets[index].imagewidth / world.tilesets[index].tilewidth;
				var hauteur = world.tilesets[index].imageheight / world.tilesets[index].tileheight;
				var temp = 0;
				
				for (var h = 0; h < hauteur; h++) {
					for (var l = 0; l < largeur; l++) {
						if (temp == world.layers[0].data[i] - world.tilesets[index].firstgid) {
							xt = l;
							break;
						} else {
							temp++;
						}
					}
					
					if (temp == world.layers[0].data[i] - world.tilesets[index].firstgid) {
						yt = h;
						break;
					}
				}
				
				
				this.Entities.push(new Sprite(world.tilesets[index].image, x * world.tilesets[index].tilewidth, y * world.tilesets[index].tileheight, world.tilesets[index].tilewidth, world.tilesets[index].tileheight, xt, yt));
			}
			
			x++;
			if (x >= world.width) {
				x = 0;
				y++;
			}
		}
		
		this.Entities.push(new Sprite("resources/whitheredtree1.png", 150, 150, 76, 92, 0, 0));
		
		this.Entities.push(new Sprite("resources/building11.png", 0, 300, 325, 177, 0, 0));
		this.Entities.push(new Hero("resources/female_walkcycle.png", 0, 0, 64, 64, 0, 0, 9));
		this.Hero = this.Entities[this.Entities.length - 1];
		
		/*for (var i = 0; i < 50; i++) {
			var im = Math.floor(Math.random() * Resources.Monster.length);
			
			this.Entities.push(new Monster(Resources.Monster[im].Texture, Math.floor(Math.random() * 1900), Math.floor(Math.random() * 1200), Resources.Monster[im].Width, Resources.Monster[im].Height, 0, 0, 3));
		}*/
		
		/*for (var i = 0; i < 100; i++) {
			var temp2 = new AnimatedSprite("resources/coin_silver.png", Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000), 32, 32, 0, 0, 8);
			temp2.m_animate = true;
			this.Entities.push(temp2);
		}*/
		
		var that = this;
		document.addEventListener("keydown", function (e) {
			Keyboard.HandleKeyDown(e);
		}, false);
		
		document.addEventListener("keyup", function (e) {
			Keyboard.HandleKeyUp(e);
		}, false);
		
		requestAnimFrame(function () {
			that.Update();
		});
	},
	Update : function () {
		for (var i = 0, j = this.Entities.length; i < j; i++) {
			this.Entities[i].Update(this.keyboardKeys);
		}
		
		this.Draw();
		
		var that = this;
		requestAnimFrame(function () {
			that.Update();
		});
	},
	Draw : function () {
		this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
		//this.Level.Draw(this.ctx);
		
		for (var i = 0, j = this.Entities.length; i < j; i++) {
			this.Entities[i].Draw(this.ctx);
		}
		
		this.Fps++;
		
		if (new Date().getTime() - this.newTimer >= 1000) {
			this.newTimer = new Date().getTime();
			this.realFps = this.Fps;
			this.Fps = 0;
		}
		
		this.ctx.fillText(this.realFps, 1300, 50);
	},
	HandleKeyDown : function (event) {
		if(this.keyboardKeys.indexOf(event.keyCode)==-1)
		{
			this.keyboardKeys.push(event.keyCode);
		}
		
		console.log(this.keyboardKeys);
	},
	HandleKeyUp : function (event) {
		//console.log(this.keyboardKeys);
		var index=this.keyboardKeys.indexOf(event.keyCode);
		if(index!=-1)
		{
			/*console.log(this.keyboardKeys.splice(0,index));
			console.log(this.keyboardKeys.splice(index,this.keyboardKeys.length-1));
			haha.slice(0,index).concat(haha.slice(index+1,haha.length))*/
			
			this.keyboardKeys=this.keyboardKeys.slice(0,index).concat(this.keyboardKeys.slice(index+1,this.keyboardKeys.length-1));
		}
		
		//console.log(this.keyboardKeys);
	},
	AddEntity:function(entity)
	{
		this.Entities.push(entity);
	}
}
