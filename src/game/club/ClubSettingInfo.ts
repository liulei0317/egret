module game {
	export class ClubSettingInfo {
		public clubId: string;

		public offlineStartType: number = 1;
		public offlineKickTime: number = 30 * 1000;
		public autoHostTime: number = 180 * 1000;

		// public roomType = Constants.ROOM_TYPE.jinYuanZi;
		// public startScore = 100;
		// public oneMaxScore = 300;

		public autoHost = true;
		public autoType = 1;
		public checkCheat = true;
		public openVoice = true;
		public gps = false;

		public haiDiLaoYue = true;
		public dismissSwitch = true;
		public changePlayerNum = true;

		public autoMatch = false;
		public hideRoomUserInfo = false;
		public hideGameUserInfo = false;

		public configDefaultInfo: ClubSettingDefaultInfo;

		public constructor() {

		}
	}

	export class ClubSettingDefaultInfo {
		public minKickTime: number;
		public maxKickTime: number;
		public defaultKickTime: number;

		public minAutoHostTime: number;
		public maxAutoHostTime: number;
		public defaultAutoHostTime: number;

		public minStartScore: number;
		public maxStartScore: number;
		public defaultStartScore: number;

		public minCtkScore: number;
		public maxCtkScore: number;
		public defaultCtkScore: number;
	}
}