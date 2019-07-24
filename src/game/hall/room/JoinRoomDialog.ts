module game {
	export class JoinRoomDialog extends EDialog{
		private btnClose:EButton;
		private inputNumberUI:InputNumberUI;

		// private numbers:string = "";


		public constructor() {
			super(Constants.UI_PANEL_DATA_SET.join_room.index);
			this.skinName = "resource/skins/hall/room/joinRoomSkin.exml";
		}

		public onCreateViewComplete():void{
			super.onCreateViewComplete();
			this.addTapEvent(this.btnClose,this.close);

			this.inputNumberUI.setNumberFullFunc(this.numberFullFunc.bind(this));
			// ObserverCmd.getInstance().addObject(MsgConstant.CMD_ZHANJI_LIST,this.createRoomCallBack,this);
			this.updateUI();
		}	

		private numberFullFunc(data)
        {
			if(this.inputNumberUI.checkInput()){
				var sendData = { roomNumber: parseInt(this.inputNumberUI.getInpuNumbers()) }
				SocketManager.getInstance().sendMsg(MsgConstant.HALL, MsgConstant.CMD_JOIN_ROOM, sendData);
			}
        }		


		protected updateUI_(){

		}

	}
}