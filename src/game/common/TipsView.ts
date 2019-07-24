module game {
	/**
	 *
	 * @author 
	 *
	 */
	export class TipsView extends game.EComponent
	{
		public info:eui.Label;
		// private arrow:eui.Image;

		private tbX:number = 160;
		private lrY:number = 52;
		public constructor() 
		{
			super();
			this.skinName = "resource/skins/common/TipsViewSkin.exml";
		}

		public onCreateViewComplete():void{
			super.onCreateViewComplete();
		}	

			
		public setInfo(value:string,maxWidth:number = 120,size:number = 28)
		{
			this.info.maxWidth = maxWidth;
			this.info.text = value;
			// this.info.textFlow = Global.getTextFlow(value);
		}

		/**
		 * arrowPosition ：内容的位置 1.上 2.下 3.左 4.右 
		 * 【x,y】为箭头指向的位置坐标
		 */
		public setPopPosition(arrowPosition:number,x:number,y:number)
		{
			this.x = x;
			this.y = y;
			if(arrowPosition == 2)
			{
				// this.arrow.x = 63;
				// this.arrow.top = 0;
				this.anchorOffsetX = 70;
				this.anchorOffsetY = 8;
				// this.arrow.rotation = 0;
			}else if(arrowPosition == 1)
			{
				// this.arrow.x = 63;
				// this.arrow.bottom = 0;
				// this.arrow.rotation = 180;
				this.anchorOffsetX = -20;
				this.anchorOffsetY = 120;
			}else if(arrowPosition == 4)
			{
				// this.arrow.left = 0;
				// this.arrow.y = 63;
				// this.arrow.rotation = 270;
				this.anchorOffsetX = 5;
				this.anchorOffsetY = 54;
			}else if(arrowPosition == 3)
			{
				// this.arrow.right = 0;
				// this.arrow.y = 63;
				// this.arrow.rotation = 90;
				this.anchorOffsetX = this.width;
				this.anchorOffsetY = 70;
			}
		}
	}
}
