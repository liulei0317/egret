module game {
	export class ClubData {
		public gameId: number;
		public clubId: string;
		public clubName: string;
		public onLineNum: string; //在线人数
		public allNum: number; //人数
		public hasShowRedTip: boolean; //是否展示红点提示
		public noticeContent: string;//公告信息
		public hasAutoCreate: boolean;
		public memberType: number;
		public selected: boolean = false;
		public watcherName: string = "";
		public watcherIcon: string;//值班人头像

		public autoMatch = false;
		public hideRoomUserInfo = false;
		public hideGameUserInfo = false;
		public superBlessSwitch = false;//福分总开关		
		public permissions: any;
		public blessNum: number;
		public constructor() {
		}

		public parse(jsonData) {
			this.gameId = jsonData.gameId;
			this.clubId = jsonData.clubId;
			this.clubName = jsonData.name;
			this.onLineNum = jsonData.onLineNum;
			this.allNum = jsonData.allNum;
			this.hasShowRedTip = jsonData.hasShowRedTip;
			this.noticeContent = jsonData.pubContent;
			this.hasAutoCreate = jsonData.hasAutoCreate;
			this.memberType = jsonData.memberType;
			this.watcherName = jsonData.watcherName;

			this.watcherIcon = jsonData.watcherIcon;
			this.autoMatch = jsonData.autoMatch;
			this.hideRoomUserInfo = jsonData.hideRoomUserInfo;
			this.hideGameUserInfo = jsonData.hideGameUserInfo;
			this.superBlessSwitch = jsonData.superBlessSwitch;
			this.permissions = jsonData.permissions;
		}
	}
}