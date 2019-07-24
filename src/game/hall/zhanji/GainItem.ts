module game {
	export class GainItem extends EComponent{
		private gainUserItem1:GainUserItem;
		private gainUserItem2:GainUserItem;
		private gainUserItem3:GainUserItem;
		private gainUserItem4:GainUserItem;
		private labelReplayId:eui.Label;
		private btnReplay:EButton;
		private btnCopyReplayId:eui.Rect;
		private labelTurnIndex:eui.Label;
		private imgBxh:eui.Image;
	
		private gainData:GainData;
		public constructor(gainData) {
			super();
			this.skinName = "resource/skins/hall/zhanji/gainItemSkin.exml";
			this.gainData = gainData;
		}

		public onCreateViewComplete():void{
			super.onCreateViewComplete();
			this.addTapEvent(this.btnCopyReplayId,this.copyReplayId);
			this.addTapEvent(this.btnReplay,this.rqsReplayDataEvent);
			this.updateUI();
		}	

		public setData(gainData){
			this.gainData = gainData;
			this.updateUI();
		}		

		public updateUI(){
			if(this.isViewCreated && this.gainData!=null){
				this.labelTurnIndex.text = "第"+this.gainData.turnIndex+"局";
				this.labelReplayId.text = this.gainData.replayId+"";
				this.imgBxh.visible = this.gainData.bxh;
			
				var userItems = [this.gainUserItem1,this.gainUserItem2,this.gainUserItem3,this.gainUserItem4];
				var len = userItems.length;
				var userlen = this.gainData.gainUserInfos.length;
				for(var i=0;i<len;i++){
					if(i<userlen){
						userItems[i].visible = true;
						userItems[i].setData(this.gainData.bankerChairId,this.gainData.gainUserInfos[i]);
					}else{
						userItems[i].visible = false;
					}
				}
			}
		}	

		private copyReplayId(){
			Utils.copyToClipboard(this.gainData.replayId+"");
			// CommonView.showToast("复制回放码成功");
		}

		private rqsReplayDataEvent()
		{
			SocketManager.getInstance().sendMsg(MsgConstant.HALL,MsgConstant.CMD_REPLAY,{ replayId : this.gainData.replayId,gameId : Constants.GAME_ID_SET.nanjing })
		}
	}
}