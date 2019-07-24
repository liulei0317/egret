module game {
	export class ChargeRecordData {
		public json:any;
		
    	public userId:string;          //用户ID
    	public nickName:string;
    	public itemNum:number;
    	public itemType:number;
    	public info:number;
    	public curNum:number;
    	public chgType:number;
    	public recordTime:number;      //用户注册时间	

		public constructor(json:JSON) {
			this.json = json;
			this.parse();
		}

		public parse(){
			this.userId = this.json.userId;
			this.nickName = this.json.nickName;
			this.itemNum = this.json.itemNum;
			this.itemType = this.json.itemType;
			this.info = this.json.info;
			this.curNum = this.json.curNum;
			this.chgType = this.json.chgType;
			this.recordTime = this.json.recordTime;
		}	
	}
}