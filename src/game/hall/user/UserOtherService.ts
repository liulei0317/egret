module game {
	export class UserOtherService {
		private static instance:UserOtherService;


		private constructor() {
		}

		public static getInstance(){
			if(UserOtherService.instance == null){
				UserOtherService.instance = new UserOtherService();
			}
			return UserOtherService.instance;
		}

        // public getDiamondRecord(){
		// 	var element: any = { newTask: true};
		// 	var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL,MsgConstant.CMD_GET_TASK_LIST,element);
		// 	SocketManager.getInstance().send(requestDomain);     
		// 	GameHttpManager.getStoreList
        // }	

        // public getTaskReward(goldType,goldId){
		// 	var element: any = { goldType: goldType,goldId:goldId};
		// 	var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL,MsgConstant.CMD_GET_TASK_REWARD,element);
		// 	SocketManager.getInstance().send(requestDomain);           
        // }		

		

		
	}
}