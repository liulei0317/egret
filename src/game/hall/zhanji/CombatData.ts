module game {
	export class CombatData {

		public roomId: number;
		public endTime: number;
		public curTurnDirection: number;
		public curTurnNum: number;
		public turnNumber: number;
		public roomNumber: string;
		public masterUserId: string;
		public roomType: number;
		public turnMode: number;
		public hasView: boolean;
		public userList: CombatUserData[];
		public templateName: string;
		public calNum: number;
		public gameId: number;
		public constructor() {

		}

		public parse(data) {
			this.gameId = data.gameId;
			this.calNum = data.calNum;
			this.roomId = data.roomId;
			this.endTime = data.endTime;
			this.curTurnDirection = data.curTurnDirection;
			this.curTurnNum = data.curTurnNum;
			this.turnNumber = data.turnNumber;
			this.roomNumber = data.roomNumber;
			this.masterUserId = data.masterUserId;
			this.roomType = data.roomType;
			this.turnMode = data.turnMode;
			this.hasView = data.hasView;
			this.userList = [];
			var jsonUserData = data.userList;
			for (var key in jsonUserData) {
				var itemData = jsonUserData[key];
				var combatUserData = new CombatUserData();
				combatUserData.parse(itemData);
				this.userList.push(combatUserData);
			}
			this.templateName = data.templateName;

		}


	}
}