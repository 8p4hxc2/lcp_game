AnimatedSprite = function (texture, x, y, width, height, currentFrame, currentRow, nbFrame) {
	'use strict';
	AnimatedSprite.superclass.constructor.call(this, texture, x, y, width, height,currentFrame,currentRow);
	
	this.m_nbFrame = nbFrame - 2;
	
	this.m_animeTimer = 0;
	this.m_animate = false;
	
	AnimatedSprite.prototype.Update = function () {}
	
	AnimatedSprite.prototype.Draw = function (ctx) {
		this.DrawRect(ctx);
		ctx.drawImage(this.m_texture, this.m_currentFrame * this.m_width, this.m_currentRow * this.m_height, this.m_width, this.m_height, this.m_x, this.m_y, this.m_width, this.m_height);
		
		if (this.m_animate) {
			var currentTime=Date.now();

			if ((currentTime - this.m_animeTimer) / 1000 > 0.1) {
				this.m_animeTimer = currentTime;
				if (this.m_currentFrame > this.m_nbFrame) {
					this.m_currentFrame = 0;
				} else {
					this.m_currentFrame++;
				}
			}
		} else {
			this.m_currentFrame = 0;
		}
	}
}

Utils.Extend(AnimatedSprite, Sprite);
