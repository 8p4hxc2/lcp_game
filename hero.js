Hero = function (texture, x, y, width, height, currentFrame, currentRow, nbFrame) {
	'use strict';
	Hero.superclass.constructor.call(this, texture, x, y, width, height, currentFrame, currentRow, nbFrame);
	
	this.m_xOffset = 0;
	this.m_yOffset = 0;
	
	Hero.prototype.Update = function (keys) {
		this.HandleKeys(keys);
		if (this.m_animate) {
			this.m_x += this.m_xOffset;
			this.m_y += this.m_yOffset;
		}
	}
	
	Hero.prototype.HandleKeys = function (keys) {
		var left = Keyboard.IsPressed(37);
		var right = Keyboard.IsPressed(39);
		var up = Keyboard.IsPressed(38);
		var down = Keyboard.IsPressed(40);
		var enter = Keyboard.IsPressed(13);
		
		if (left || right || up || down || enter) {
			if (left) {
				this.Left();
			}
			
			if (up) {
				this.Up();
			}
			
			if (right) {
				this.Right();
			}
			
			if (down) {
				this.Down();
			}
			
			if (enter) {
				this.AddMonster();
			}
		}
		else
		{
			this.m_animate=false;
		}
	}
	
	Hero.prototype.Left = function () {
		this.m_animate = true;
		this.m_currentRow = 1;
		this.m_xOffset = -1;
		this.m_yOffset = 0;
	}
	
	Hero.prototype.Right = function () {
		this.m_animate = true;
		this.m_currentRow = 3;
		this.m_xOffset = 1;
		this.m_yOffset = 0;
	}
	
	Hero.prototype.Up = function () {
		this.m_animate = true;
		this.m_currentRow = 0;
		this.m_xOffset = 0;
		this.m_yOffset = -1;
	}
	
	Hero.prototype.Down = function () {
		this.m_animate = true;
		this.m_currentRow = 2;
		this.m_xOffset = 0;
		this.m_yOffset = 1;
	}
	
	Hero.prototype.AddMonster = function () {
		var im = Math.floor(Math.random() * Resources.Monster.length);
		World.AddEntity(new Monster(Resources.Monster[im].Texture, Math.floor(Math.random() * 1900), Math.floor(Math.random() * 1200), Resources.Monster[im].Width, Resources.Monster[im].Height, 0, 0, 3));
	}
	
	Hero.prototype.HandleKeyUp = function (event) {
		this.m_animate = false;
	}
}

Utils.Extend(Hero, AnimatedSprite);
