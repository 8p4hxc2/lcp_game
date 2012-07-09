Keyboard = {
    m_keyboardState:[],
    HandleKeyDown:function(event) {
        if(this.m_keyboardState.indexOf(event.keyCode)==-1)
    	{
			this.m_keyboardState.push(event.keyCode);
		}
    },
    HandleKeyUp:function(event) {
        var index=this.m_keyboardState.indexOf(event.keyCode);
        
		if(index!=-1)
		{			
			this.m_keyboardState=this.keyboardKeys.slice(0,index).concat(this.keyboardKeys.slice(index+1,this.keyboardKeys.length-1));
		}
    },
    IsPressed:function(keyCode) {
        return this.m_keyboardState.indexOf(keyCode)!=-1; 
    }
}