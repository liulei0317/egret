module game {
	export class ClubWatcherData {
		public memberId:string;
		public memberType:number;
		public memberName:string;
		public headImgUrl:string;//头像
		public watcher:boolean;	//是否是值班人
		public constructor() {
		}

		public parse(jsonData){
			this.memberId = jsonData.memberId;
			this.memberType = jsonData.memberType;
			this.memberName = jsonData.memberName;
			this.headImgUrl = jsonData.headImgUrl;
			this.watcher = jsonData.watcher;
		}
	}
}