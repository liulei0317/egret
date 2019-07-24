module game {
	export class ClubApplyJoinData {
		public memberId:string;
		public memberName:string;
		public headImgUrl:string;//头像
		public applyInfo:string;



		public constructor() {
		}

		public parse(jsonData){
			this.memberId = jsonData.memberId;
			this.memberName = jsonData.nickName;
			this.headImgUrl = jsonData.headImgUrl;
			this.applyInfo = jsonData.memberWx;
		}
	}
}