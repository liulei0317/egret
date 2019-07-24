module game {
	export class GainData {
		public turnIndex:number;
		public replayId:number;
		public bankerChairId:number;
		//是否是比下胡
		public bxh:boolean;

		public gainUserInfos:GainUserData[];

		public constructor() {
			
		}

		public parse(data){
			this.turnIndex = data.turnIndex;
			this.replayId = data.replayId;
			this.bankerChairId = data.bankerChairId;
			this.bxh = data.bxh;

			this.gainUserInfos = [];
			var jsonUserData = data.gainUserInfos;                
			for(var key in jsonUserData)
			{
				var itemData = jsonUserData[key];
				var gainUserData = new GainUserData();
				gainUserData.parse(itemData);
				this.gainUserInfos.push(gainUserData);
			}

		}


	}
}