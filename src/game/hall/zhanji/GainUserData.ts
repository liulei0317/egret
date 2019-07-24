module game {
	export class GainUserData {
		public userId:string;
		public nickName:string;
		public userChairId:number;

		//本把输赢分
		public curScore:number = 0;
		public waibaoScore:number = 0;
		public faScore = 0;

		public constructor() {
		}

		public parse(data){
			
			this.userId = data.userId;
			this.nickName = data.nickName;
			this.userChairId = data.userChairId;
			this.curScore = data.curScore;
			this.waibaoScore = data.waibaoScore;
			this.faScore = data.faScore;
		}
	}
}