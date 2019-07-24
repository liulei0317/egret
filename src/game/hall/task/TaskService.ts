module game {
	export class TaskService {
		private static instance:TaskService;


		private constructor() {
		}

		public static getInstance(){
			if(TaskService.instance == null){
				TaskService.instance = new TaskService();
			}
			return TaskService.instance;
		}

        public getTaskList(){
			var element: any = { newTask: true};
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL,MsgConstant.CMD_GET_TASK_LIST,element);
			SocketManager.getInstance().send(requestDomain);           
        }	

        public getTaskReward(goalType,goalId){
			var element: any = { goalType: goalType,goalId:goalId};
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL,MsgConstant.CMD_GET_TASK_REWARD,element);
			SocketManager.getInstance().send(requestDomain);           
        }		

		

		
	}
}