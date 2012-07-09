Monster = function (texture, x, y, width, height,currentFrame,currentRow, nbFrame) {
	'use strict';
	Monster.superclass.constructor.call(this, texture, x, y, width, height,currentFrame,currentRow, nbFrame);
	
	this.m_xOffset = 0;
	this.m_yOffset = 0;
	this.m_animate = true;
	
	Monster.prototype.Update = function () {
		var direction = Math.floor(Math.random() * 4);
		var changer = Math.floor(Math.random() * 50);
		if (changer == 3) {
			switch (direction) {
			case 1:
				this.m_xOffset = -1;
				this.m_yOffset = 0;
				this.m_currentRow = 1;
				break;
			case 2:
				this.m_xOffset = 1;
				this.m_yOffset = 0;
				this.m_currentRow = 3;
				break;
			case 3:
				this.m_xOffset = 0;
				this.m_yOffset = 1;
				this.m_currentRow = 2;
				break;
			case 0:
				this.m_xOffset = 0;
				this.m_yOffset = -1;
				this.m_currentRow = 0;
				break;
			}
		} else {
			this.m_x += this.m_xOffset;
			this.m_y += this.m_yOffset;
			if (this.m_x < 0) {
				this.m_x = 0;
			}
			if (this.m_y < 0) {
				this.m_y = 0;
			}
		}
	}
}

Utils.Extend(Monster, AnimatedSprite);
