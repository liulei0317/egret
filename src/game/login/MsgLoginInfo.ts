module game {
	export class MsgLoginInfo {

		public openId: string = "HHFJIAKAAK";
		public channel: string;
		public platform: string;
		public headImgUrl: string;
		public nickName: string = "老辛";
		public gender: GenderType;
		public unionId: string;
		public hasRegisterInfo: boolean = false;
		public loginUserType: LoginUserType = LoginUserType.NULL;
		public phoneNumber: string;
		public code: string
		public constructor() {

		}

		public toJsonString() {
			return JSON.stringify(this);
		}
	}
}