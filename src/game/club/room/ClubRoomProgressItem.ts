module game {
	export class ClubRoomProgressItem extends EComponent{
		private labelID:eui.Label;
		private labelNickName:eui.Label;
		private labelScore:eui.Label;
		private labelWaiBaoScore:eui.Label;
		private labelStatus:eui.Label;

		private jsonData:any;

		
	
		public constructor(jsonData) {
			super();
			this.jsonData = jsonData;
			this.skinName = "resource/skins/club/room/clubRoomProgressItemSkin.exml";
		}	

		public onCreateViewComplete():void{
			super.onCreateViewComplete();
			this.updateUI();
		}	

		public setData(jsonData){
			this.jsonData = jsonData;
			this.updateUI();
		}

		protected updateUI_(){
			if(this.jsonData!=null){

				this.labelID.text = this.jsonData.msgUser.userId;
				this.labelNickName.text = this.jsonData.msgUser.nickName;
				this.labelScore.text = this.jsonData.score;
				this.labelWaiBaoScore.text = this.jsonData.waiBaoScore;

				var userStatus = this.jsonData.userStatus;
				var autoHost = this.jsonData.autoHost;
				var color = 0xE75D40;
				var status = "在线";
				if(userStatus == GameConst.PLAYER_STATUS.LEAVE || userStatus == GameConst.PLAYER_STATUS.OFFLINE){
					status = "离线";
				}else{
					color = 0x48890C;
				}
				if(autoHost){
					status += "托管";
				}
				this.labelStatus.text = status;
				this.labelStatus.textColor = color;
			}
		}	

					
	}
}