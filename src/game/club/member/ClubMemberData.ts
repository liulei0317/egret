module game {
	export class ClubMemberData {
		public memberId: string;
		public memberType: number;
		public memberName: string;
		public headImgUrl: string;//头像
		public hasOnline: boolean;
		public achieveNum: number;//完成局数
		public todayAchieveNum: boolean;//今日完成局数
		public forbidGame: boolean;	//是否禁止游戏
		public watcher: boolean;	//是否是值班人
		public permissions: any[];
		public constructor() {
		}

		public parse(jsonData) {
			this.memberId = jsonData.memberId;
			this.memberType = jsonData.memberType;
			this.memberName = jsonData.memberName;
			this.headImgUrl = jsonData.headImgUrl;
			this.hasOnline = jsonData.hasOnline;
			this.achieveNum = jsonData.achieveNum;
			this.todayAchieveNum = jsonData.todayAchieveNum;
			this.forbidGame = jsonData.forbidGame;
			this.watcher = jsonData.watcher;
			this.permissions = jsonData.permissions || [];
		}
	}
}