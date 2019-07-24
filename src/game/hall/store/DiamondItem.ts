class DiamondItem extends game.EComponent{

		private  dmdImg:eui.Image;
		private  price:eui.Label;
		private  num:eui.Label;

		private diamondData:any;

		public constructor() {
			super();
			this.skinName = "resource/skins/hall/store/diamondItemSkin.exml";
		}

		public onCreateViewComplete():void{
			super.onCreateViewComplete();
			
		}


		public setData(data:any){
			this.diamondData = data;
			this.updateUI();		
		}		

		public updateUI(){
			if(this.diamondData != null){
				this.price.text = this.diamondData.price/100 +"";
				this.num.text = "x"+this.diamondData.itemTotalNum;
				if(this.diamondData.price == 800){
					this.dmdImg.source = "item_diamond_1_png";
				}else if(this.diamondData.price == 2000){
					this.dmdImg.source = "item_diamond_2_png";
				}else if(this.diamondData.price == 5000){
					this.dmdImg.source = "item_diamond_3_png";
				}else if(this.diamondData.price == 10000){
					this.dmdImg.source = "item_diamond_4_png";
				}else if(this.diamondData.price == 30000){
					this.dmdImg.source = "item_diamond_5_png";
				}else if(this.diamondData.price == 100000){
					this.dmdImg.source = "item_diamond_6_png";
				}
				
				
			}
			
		}		


	}
window["DiamondItem"] = DiamondItem