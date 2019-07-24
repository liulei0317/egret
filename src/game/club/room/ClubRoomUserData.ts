module game {
	export class ClubRoomUserData {
    	public ready = true;
    	public headImgUrl:string;
    	public nickName:string;
		public autoHost:boolean;
		public userStatusType:number;

		public constructor() {
		}

		public parse(jsonData){
			// this.ready = jsonData.ready;
			this.headImgUrl = jsonData.headImgUrl;
			this.nickName = jsonData.nickName;
			this.autoHost = jsonData.autoHost;
			this.userStatusType = jsonData.userStatusType;
		}
	}
}