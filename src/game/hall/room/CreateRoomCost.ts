module game {
	export class CreateRoomCost {
		public constructor() {

		}

		public static getDiamondCostNum(infos, roomType, payMode, turnMode, turnNumber) {
			var key = CreateRoomCost.getKey(roomType, payMode, turnMode, turnNumber);
			return infos[key];
		}

		public static getDiamondCostNums() {
			var infos = {};

			//进园子,AA,按把
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.jinYuanZi, Constants.ROOM_PAY_MODE.AA, Constants.ROOM_TIME_MODE.ba, 4)] = 10;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.jinYuanZi, Constants.ROOM_PAY_MODE.AA, Constants.ROOM_TIME_MODE.ba, 8)] = 10;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.jinYuanZi, Constants.ROOM_PAY_MODE.AA, Constants.ROOM_TIME_MODE.ba, 12)] = 20;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.jinYuanZi, Constants.ROOM_PAY_MODE.AA, Constants.ROOM_TIME_MODE.ba, 16)] = 20;

			//进园子,AA,按圈
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.jinYuanZi, Constants.ROOM_PAY_MODE.AA, Constants.ROOM_TIME_MODE.quan, 1)] = 10;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.jinYuanZi, Constants.ROOM_PAY_MODE.AA, Constants.ROOM_TIME_MODE.quan, 2)] = 10;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.jinYuanZi, Constants.ROOM_PAY_MODE.AA, Constants.ROOM_TIME_MODE.quan, 3)] = 20;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.jinYuanZi, Constants.ROOM_PAY_MODE.AA, Constants.ROOM_TIME_MODE.quan, 4)] = 20;

			//进园子,房主,按把
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.jinYuanZi, Constants.ROOM_PAY_MODE.creator, Constants.ROOM_TIME_MODE.ba, 4)] = 40;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.jinYuanZi, Constants.ROOM_PAY_MODE.creator, Constants.ROOM_TIME_MODE.ba, 8)] = 40;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.jinYuanZi, Constants.ROOM_PAY_MODE.creator, Constants.ROOM_TIME_MODE.ba, 12)] = 80;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.jinYuanZi, Constants.ROOM_PAY_MODE.creator, Constants.ROOM_TIME_MODE.ba, 16)] = 80;

			//进园子,房主,按圈
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.jinYuanZi, Constants.ROOM_PAY_MODE.creator, Constants.ROOM_TIME_MODE.quan, 1)] = 40;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.jinYuanZi, Constants.ROOM_PAY_MODE.creator, Constants.ROOM_TIME_MODE.quan, 2)] = 40;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.jinYuanZi, Constants.ROOM_PAY_MODE.creator, Constants.ROOM_TIME_MODE.quan, 3)] = 80;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.jinYuanZi, Constants.ROOM_PAY_MODE.creator, Constants.ROOM_TIME_MODE.quan, 4)] = 80;

			//进园子,代开,按把
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.jinYuanZi, Constants.ROOM_PAY_MODE.other, Constants.ROOM_TIME_MODE.ba, 4)] = 25;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.jinYuanZi, Constants.ROOM_PAY_MODE.other, Constants.ROOM_TIME_MODE.ba, 8)] = 35;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.jinYuanZi, Constants.ROOM_PAY_MODE.other, Constants.ROOM_TIME_MODE.ba, 12)] = 40;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.jinYuanZi, Constants.ROOM_PAY_MODE.other, Constants.ROOM_TIME_MODE.ba, 16)] = 40;

			//进园子,代开,按圈
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.jinYuanZi, Constants.ROOM_PAY_MODE.other, Constants.ROOM_TIME_MODE.quan, 1)] = 35;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.jinYuanZi, Constants.ROOM_PAY_MODE.other, Constants.ROOM_TIME_MODE.quan, 2)] = 45;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.jinYuanZi, Constants.ROOM_PAY_MODE.other, Constants.ROOM_TIME_MODE.quan, 3)] = 60;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.jinYuanZi, Constants.ROOM_PAY_MODE.other, Constants.ROOM_TIME_MODE.quan, 4)] = 60;

			//-----------------------------------------------------------------------------------------------------------------------------------------------

			//敞开头,AA,按把
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.changKaiTou, Constants.ROOM_PAY_MODE.AA, Constants.ROOM_TIME_MODE.ba, 4)] = 10;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.changKaiTou, Constants.ROOM_PAY_MODE.AA, Constants.ROOM_TIME_MODE.ba, 8)] = 10;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.changKaiTou, Constants.ROOM_PAY_MODE.AA, Constants.ROOM_TIME_MODE.ba, 12)] = 20;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.changKaiTou, Constants.ROOM_PAY_MODE.AA, Constants.ROOM_TIME_MODE.ba, 16)] = 20;

			//敞开头,AA,按圈
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.changKaiTou, Constants.ROOM_PAY_MODE.AA, Constants.ROOM_TIME_MODE.quan, 1)] = 10;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.changKaiTou, Constants.ROOM_PAY_MODE.AA, Constants.ROOM_TIME_MODE.quan, 2)] = 10;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.changKaiTou, Constants.ROOM_PAY_MODE.AA, Constants.ROOM_TIME_MODE.quan, 3)] = 20;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.changKaiTou, Constants.ROOM_PAY_MODE.AA, Constants.ROOM_TIME_MODE.quan, 4)] = 20;

			//敞开头,房主,按把
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.changKaiTou, Constants.ROOM_PAY_MODE.creator, Constants.ROOM_TIME_MODE.ba, 4)] = 40;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.changKaiTou, Constants.ROOM_PAY_MODE.creator, Constants.ROOM_TIME_MODE.ba, 8)] = 40;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.changKaiTou, Constants.ROOM_PAY_MODE.creator, Constants.ROOM_TIME_MODE.ba, 12)] = 80;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.changKaiTou, Constants.ROOM_PAY_MODE.creator, Constants.ROOM_TIME_MODE.ba, 16)] = 80;

			//敞开头,房主,按圈
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.changKaiTou, Constants.ROOM_PAY_MODE.creator, Constants.ROOM_TIME_MODE.quan, 1)] = 40;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.changKaiTou, Constants.ROOM_PAY_MODE.creator, Constants.ROOM_TIME_MODE.quan, 2)] = 40;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.changKaiTou, Constants.ROOM_PAY_MODE.creator, Constants.ROOM_TIME_MODE.quan, 3)] = 80;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.changKaiTou, Constants.ROOM_PAY_MODE.creator, Constants.ROOM_TIME_MODE.quan, 4)] = 80;

			//敞开头,代开,按把
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.changKaiTou, Constants.ROOM_PAY_MODE.other, Constants.ROOM_TIME_MODE.ba, 4)] = 25;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.changKaiTou, Constants.ROOM_PAY_MODE.other, Constants.ROOM_TIME_MODE.ba, 8)] = 35;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.changKaiTou, Constants.ROOM_PAY_MODE.other, Constants.ROOM_TIME_MODE.ba, 12)] = 40;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.changKaiTou, Constants.ROOM_PAY_MODE.other, Constants.ROOM_TIME_MODE.ba, 16)] = 40;

			//敞开头,代开,按圈
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.changKaiTou, Constants.ROOM_PAY_MODE.other, Constants.ROOM_TIME_MODE.quan, 1)] = 35;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.changKaiTou, Constants.ROOM_PAY_MODE.other, Constants.ROOM_TIME_MODE.quan, 2)] = 45;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.changKaiTou, Constants.ROOM_PAY_MODE.other, Constants.ROOM_TIME_MODE.quan, 3)] = 60;
			infos[CreateRoomCost.getKey(Constants.ROOM_TYPE.changKaiTou, Constants.ROOM_PAY_MODE.other, Constants.ROOM_TIME_MODE.quan, 4)] = 60;
			return infos;
		}


		private static getKey(roomType, payMode, turnMode, turnNumber) {
			return "key_" + roomType + "_" + payMode + "_" + turnMode + "_" + turnNumber;
		}
	}
}