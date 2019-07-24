module game {
	export class TaskData {
		public json:any;
		
		public id:number;
		public lastId:number;
		public eventType:string;
		public  curLevel:string;
		public eventNum:number;
		public curEventNum:number;  //当前完成条件数量
		public rewardType:number;
		public rewardNum:number;
		public goalType:number;
		public takeStatus:number;
		public goalDesc:string = "";

		public eventTypeDesc:string;		

		public constructor(json:JSON) {
			this.json = json;
			this.parse();
		}

		public parse(){
			this.id = this.json.id;
			this.lastId = this.json.lastId;
			this.eventType = this.json.eventType;
			this.curLevel = this.json.curLevel;

			this.eventNum = this.json.eventNum;
			this.curEventNum = this.json.curEventNum;
			this.rewardType = this.json.rewardType;
			this.rewardNum = this.json.rewardNum;

			this.goalType = this.json.goalType;
			this.takeStatus = this.json.takeStatus;
			this.goalDesc = this.json.goalDesc;
			this.eventTypeDesc = this.json.eventTypeDesc;
		}	
	}
}