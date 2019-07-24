
module game {
	export class RoomUtils {
		public constructor() {
		}
		public static getRulesInfo(roomJson: JSON) {
			var roomInfos: any = roomJson;
			var s = ConstantUtils.getRoomTypeName(roomInfos.roomType) + "  ";
			s += ConstantUtils.getPayModeName(roomInfos.payMode, true) + "  ";
			s += ("对局数：" + roomInfos.turnNumber + ConstantUtils.getTurnModeName(roomInfos.turnMode)) + "  ";
			if (roomInfos.roomType == Constants.ROOM_TYPE.jinYuanZi) {
				s += ("携带积分：" + roomInfos.roomScore + "分") + "  ";
			} else {
				if (roomInfos.roomScore > 0) {
					s += ("单把上限：" + roomInfos.roomScore + "分") + "  ";
				} else {
					s += ("单把上限：无限制") + "  ";
				}
			}
			if (roomInfos.huaZa) {
				s += "花砸2" + "  ";
			}
			if (roomInfos.jieZhuangBi) {
				s += "接庄比" + "  ";
			}
			if (roomInfos.faFen) {
				s += "东南西北罚分" + "  ";
			}

			if (roomInfos.autoHost) {
				s += "超时托管" + "  ";
			}
			if (roomInfos.calNum > 0) {
				s += "记分:" + roomInfos.calNum + "/100"
			}
			if (roomInfos.blessSwitch) {
				s = "防沉迷 " + s
			}
			return s;
		}
	}
}