module game {
	export class ClubRoomInfoChangeInfo {
		public userId:string;
		public roomId:number;
		public clubRoomData:ClubRoomData;
		public type:number; //0 加入 1.变更 2.去除（解散，游戏结束）

		public constructor() {
		}
		public parse(data:any){
			this.userId = data.userId;
			this.roomId = data.roomId;
			this.type = data.type;
			var roomData = data.msgDaiKai;
			var clubRoomData = new ClubRoomData();
			clubRoomData.parse(roomData);
			this.clubRoomData = clubRoomData;
		}
	}
}