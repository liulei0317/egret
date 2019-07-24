module game {
	export class ClubCancelRoomConfirmDialog extends EDialog{

		private inputNumberUI:InputNumberUI;
		private btnCancel:EButton;
		private btnOK:EButton;

		private roomNumber:string;

		public constructor(roomNumber) {
			super();
			this.roomNumber = roomNumber;
			this.skinName = "resource/skins/club/room/clubCancelRoomConfirmSkin.exml";
		}

		public onCreateViewComplete():void{
			super.onCreateViewComplete();
			
			this.addTapEvent(this.btnCancel,this.close);
			this.addTapEvent(this.btnOK,this.clickOK);

			EAppFacade.getInstance().registerCommand(GameCmd.getCmdFromNet(MsgConstant.CMD_CLUB_forceCancelRoom),this.cancelRoomCallback,this);

			// ObserverCmd.getInstance().addObject(MsgConstant.CMD_ZHANJI_LIST,this.createRoomCallBack,this);
			this.updateUI();

		}	
	

		protected updateUI_(){
			
		}

		private clickOK(){
			if(this.inputNumberUI.checkInput()){
				if(this.roomNumber == this.inputNumberUI.getInpuNumbers()){
					ClubService.getInstance().forceCancelRoom(this.roomNumber);
				}else{
					CommonView.showToast("输入的房间号不正确！");
				}
			}
		}		

		private cancelRoomCallback(event:egret.Event){
			var msgDomain:MsgDomain = event.data;
            if(msgDomain.code == CmdResultType.SUCCESS){
                
                CommonView.showToast("房间解散成功");
				this.close();
            }
		}	
		
				
	}
}