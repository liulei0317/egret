module game {
	export class ZhanjiService {
		private static instance:ZhanjiService;


		private constructor() {
		}

		public static getInstance(){
			if(ZhanjiService.instance == null){
				ZhanjiService.instance = new ZhanjiService();
			}
			return ZhanjiService.instance;
		}

        public getCombatList(){
			var element: any = { daiKai: false};
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL,MsgConstant.CMD_ZHANJI_LIST,element);
			SocketManager.getInstance().send(requestDomain);           
        }		
        public getCombatList_Club(clubId:string){
			var element: any = { clubId: clubId};
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL,MsgConstant.CMD_CLUB_ZHANJI_LIST,element);
			SocketManager.getInstance().send(requestDomain);           
        }			

        public getGainList(roomId:number){
			var element: any = { roomId: roomId};
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL,MsgConstant.CMD_ZHANJI_DES_LIST,element);
			SocketManager.getInstance().send(requestDomain);           
        }	


		public getCombatReplayData(roomId:number,fromClub){
			var element: any = { roomId: roomId,hasView:fromClub};
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL,MsgConstant.CMD_Combat_REPLAY_data,element);
			SocketManager.getInstance().send(requestDomain);    
		}	


		public replay(replayId){
			var element: any = { replayId: replayId,gameId:Constants.GAME_ID_SET.nanjing};
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL,MsgConstant.CMD_REPLAY,element);
			SocketManager.getInstance().send(requestDomain);   
		}				
	}

	
}