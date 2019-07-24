module game {
	export class ActivityService {
		private static instance: ActivityService;


		private constructor() {
		}

		public static getInstance() {
			if (ActivityService.instance == null) {
				ActivityService.instance = new ActivityService();
			}
			return ActivityService.instance;
		}

		public getActivityShowType() {
			// var element: any = { clubId: clubId,patternType:patternType,patternContent:patternContent};
			var requestDomain = DomainUtils.getRequestDomain(MsgConstant.HALL, MsgConstant.CMD_Activity_ShowType, null);
			SocketManager.getInstance().send(requestDomain);
		}
	}
}