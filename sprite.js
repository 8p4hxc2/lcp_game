Sprite = function (texture, x, y, width, height,currentFrame,currentRow) {
	'use strict';

	this.m_texture = new Image();
	this.m_texture.src = texture;
	this.m_x = x;
	this.m_y = y;
	this.m_width = width;
	this.m_height = height;
	this.m_currentFrame = currentFrame;
	this.m_currentRow = currentRow;
	
	Sprite.prototype.Update = function () {}
	Sprite.prototype.Draw = function (ctx) {
		ctx.drawImage(this.m_texture, this.m_currentFrame * this.m_width, this.m_currentRow * this.m_height, this.m_width, this.m_height, this.m_x, this.m_y, this.m_width, this.m_height);
	}
	Sprite.prototype.DrawRect = function (ctx) {
		ctx.strokeStyle = "black";
		ctx.strokeRect(this.m_x, this.m_y, this.m_width, this.m_height);
	}
}
