module game {
	export class CombatUserData {

		public roomId: number;
		public userId: string;
		public nickName: string;
		public headUrl: string;
		public score: number;
		public waiBaoScore: number;
		public chairId: number;
		public recordTime: number;
		public calNum: number;
		public gameId: number;
		public id: number;
		public winHome: number;
		public showCalNum: boolean = false;
		public constructor() {
		}

		public parse(data) {
			this.winHome = data.winHome;
			this.id = data.id;
			this.gameId = data.gameId;
			this.calNum = data.calNum;
			this.roomId = data.roomId;
			this.userId = data.userId;
			this.nickName = data.nickName;
			this.headUrl = data.headUrl;
			this.score = data.score;
			this.waiBaoScore = data.waiBaoScore;
			this.chairId = data.chairId;
			this.recordTime = data.recordTime;
		}
	}
}