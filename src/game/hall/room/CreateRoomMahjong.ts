class CreateRoomMahjong extends game.EComponent {
	private payModeAA: ERadioButton;
	private payModeMaster: ERadioButton;
	private payModeDaiKai: ERadioButton;

	private roomTypeJYZ: ERadioButton;
	private roomTypeCKT: ERadioButton;

	private jieSuanNoLimit: ERadioButton;
	private jieSuan300: ERadioButton;

	private turnModeBa: ERadioButton;
	private turnModeQuan: ERadioButton;

	private turn1: TurnNumberRadioButton;
	private turn2: TurnNumberRadioButton;
	private turn3: TurnNumberRadioButton;
	private turn4: TurnNumberRadioButton;

	private modeFaZa2: ERadioButton;
	private modeSiFeng: ERadioButton;
	private modeJieZhuang: ERadioButton;
	private modeBaoMi: ERadioButton;
	private modeAutoHost: ERadioButton;

	private labelJieSuanScore: eui.Label;

	private groupMainMode_JYZ: eui.Group;
	private groupJieSuan: eui.Group
	private groupTurnNum: eui.Group
	private groupMainMode: eui.Group

	private jinyuanzi_club: eui.Group
	private changkaitou_club: eui.Group
	private labelMainMode_CKT: eui.Label;
	private scoreInput: eui.EditableText
	private jinyuanziScoreInput: eui.EditableText
	private changkaitouScoreInput: eui.EditableText

	private roomInfo: any;
	private clubId: string = null;
	private hasInited: boolean = false;
	private isNoLimit: boolean;

	public constructor() {
		super();
		this.skinName = "resource/skins/hall/room/createRoomMahjongSkin.exml";
	}

	public onCreateViewComplete(): void {
		super.onCreateViewComplete();

		this.addTapEvent(this.payModeAA, this.clickPayModeAA);
		this.addTapEvent(this.payModeMaster, this.clickPayModeMaster);
		this.addTapEvent(this.payModeDaiKai, this.clickPayModeDaiKai);

		this.addTapEvent(this.roomTypeJYZ, this.clickRoomTypeJYZ);
		this.addTapEvent(this.roomTypeCKT, this.clickRoomTypeCKT);
		this.addTapEvent(this.jieSuanNoLimit, this.clickJieSuanNoLimit);
		this.addTapEvent(this.jieSuan300, this.clickjieSuan300);
		this.addTapEvent(this.turnModeBa, this.clickTurnModeBa);
		this.addTapEvent(this.turnModeQuan, this.clickTurnModeQuan);
		this.addTapEvent(this.turn1, this.clickTurn1);
		this.addTapEvent(this.turn2, this.clickTurn2);
		this.addTapEvent(this.turn3, this.clickTurn3);
		this.addTapEvent(this.turn4, this.clickTurn4);
		this.addTapEvent(this.modeFaZa2, this.clickTurnmodeFaZa2);
		this.addTapEvent(this.modeSiFeng, this.clickModeSiFeng);
		this.addTapEvent(this.modeJieZhuang, this.clickModeJieZhuang);
		this.addTapEvent(this.modeBaoMi, this.clickModeBaoMi);
		this.addTapEvent(this.modeAutoHost, this.clickModeAutoHost);
		this.updateUI();
	}

	protected updateUI_() {
		if (!this.hasInited) {
			return;
		}
		if (this.clubId != null) {
			this.jinyuanzi_club.visible = true
			this.changkaitou_club.visible = true
		}
		else {
			this.jinyuanzi_club.visible = false
			this.changkaitou_club.visible = false
		}
		this.modeFaZa2.setText("花砸2");
		this.modeSiFeng.setText("东南西北罚分");
		this.modeJieZhuang.setText("接庄比");
		this.modeBaoMi.setText("保米");
		this.modeAutoHost.setText("自动托管");

		this.payModeAA.setText("AA付费");
		this.payModeMaster.setText("房主付费");
		this.payModeDaiKai.setText("会长付费");




		this.roomTypeJYZ.setText("进园子");
		this.roomTypeCKT.setText("敞开头");

		this.turnModeBa.setText("按把付费");
		this.turnModeQuan.setText("按圈付费");

		this.jieSuan300.setText("300");
		this.jieSuanNoLimit.setText("无限制");

		var roomInfo = this.getRoomInfo();

		this.payModeMaster.visible = (this.clubId == null);
		this.payModeDaiKai.visible = (this.clubId != null);

		this.resetRadioFalse();

		var roomType = roomInfo.roomType;
		if (roomType == Constants.ROOM_TYPE.jinYuanZi) {
			this.roomTypeJYZ.setSelected(true);
			this.labelJieSuanScore.text = "携带积分：";
			this.jieSuanNoLimit.visible = false;
			this.jieSuan300.setText("100");
			this.jieSuan300.setSelected(true);
			this.groupMainMode_JYZ.visible = true;
			this.labelMainMode_CKT.visible = !this.groupMainMode_JYZ.visible;
			this.groupJieSuan.visible = false
			this.groupTurnNum.y = 140
			this.modeAutoHost.x = 140
			this.modeAutoHost.y = 80
			this.groupMainMode.y = 310
		} else {
			this.roomTypeCKT.setSelected(true);
			this.labelJieSuanScore.text = "单把上限：";
			this.jieSuanNoLimit.visible = true;
			this.jieSuan300.setText("");
			this.groupMainMode_JYZ.visible = false;
			this.labelMainMode_CKT.visible = !this.groupMainMode_JYZ.visible;
			this.groupJieSuan.visible = true
			this.groupTurnNum.y = 210
			this.modeAutoHost.x = 550
			this.modeAutoHost.y = 10
			this.groupMainMode.y = 380
		}
		if (this.clubId != null) {
			this.modeAutoHost.visible = false
		}
		else {
			this.modeAutoHost.visible = true
		}
		var payMode = roomInfo.payMode;
		if (payMode == Constants.ROOM_PAY_MODE.AA) {
			this.payModeAA.setSelected(true);
		} else if (payMode == Constants.ROOM_PAY_MODE.creator) {
			this.payModeMaster.setSelected(true);
		} else {
			this.payModeDaiKai.setSelected(true);
		}

		var turnMode = roomInfo.turnMode;
		if (turnMode == Constants.ROOM_TIME_MODE.ba) {
			this.turnModeBa.setSelected(true);
		} else {
			this.turnModeQuan.setSelected(true);
		}

		var roomScore = roomInfo.roomScore;
		if (this.isNoLimit) {
			this.jieSuanNoLimit.setSelected(true);
			this.jieSuan300.setSelected(false);

		} else {
			this.jieSuanNoLimit.setSelected(false);
			this.jieSuan300.setSelected(true);
		}

		var turnNumber = roomInfo.turnNumber;
		if (turnMode == Constants.ROOM_TIME_MODE.ba) {
			if (turnNumber == 4) {
				this.turn1.setSelected(true);
			} else if (turnNumber == 12) {
				this.turn3.setSelected(true);
			} else if (turnNumber == 16) {
				this.turn4.setSelected(true);
			} else {
				this.turn2.setSelected(true);
			}
		} else {
			if (turnNumber == 1) {
				this.turn1.setSelected(true);
			} else if (turnNumber == 3) {
				this.turn3.setSelected(true);
			} else if (turnNumber == 4) {
				this.turn4.setSelected(true);
			} else {
				this.turn2.setSelected(true);
			}
		}
		this.modeFaZa2.setSelected(roomInfo.huaZa);
		this.modeSiFeng.setSelected(roomInfo.faFen);
		this.modeJieZhuang.setSelected(roomInfo.jieZhuangBi);
		this.modeBaoMi.setSelected(roomInfo.baoMi);
		this.modeAutoHost.setSelected(roomInfo.autoHost);

		var diamondCosts = game.CreateRoomCost.getDiamondCostNums();
		var turnNumberRate = 1;
		var turnInfo = "圈"
		if (turnMode == Constants.ROOM_TIME_MODE.ba) {
			turnNumberRate = 4;
			turnInfo = "把";
		}
		this.turn1.setText(1 * turnNumberRate + turnInfo, game.CreateRoomCost.getDiamondCostNum(diamondCosts, roomType, payMode, turnMode, 1 * turnNumberRate));
		this.turn2.setText(2 * turnNumberRate + turnInfo, game.CreateRoomCost.getDiamondCostNum(diamondCosts, roomType, payMode, turnMode, 2 * turnNumberRate));
		this.turn3.setText(3 * turnNumberRate + turnInfo, game.CreateRoomCost.getDiamondCostNum(diamondCosts, roomType, payMode, turnMode, 3 * turnNumberRate));
		this.turn4.setText(4 * turnNumberRate + turnInfo, game.CreateRoomCost.getDiamondCostNum(diamondCosts, roomType, payMode, turnMode, 4 * turnNumberRate));
	}

	private resetRadioFalse() {
		this.payModeAA.setSelected(false);
		this.payModeMaster.setSelected(false);
		this.payModeDaiKai.setSelected(false);
		this.roomTypeJYZ.setSelected(false);
		this.roomTypeCKT.setSelected(false);
		this.jieSuanNoLimit.setSelected(false);
		this.jieSuan300.setSelected(false);
		this.turnModeBa.setSelected(false);
		this.turnModeQuan.setSelected(false);
		this.turn1.setSelected(false);
		this.turn2.setSelected(false);
		this.turn3.setSelected(false);
		this.turn4.setSelected(false);
		this.modeFaZa2.setSelected(false);
		this.modeSiFeng.setSelected(false);
		this.modeJieZhuang.setSelected(false);
		this.modeBaoMi.setSelected(false);
		this.modeAutoHost.setSelected(false);
	}

	private clickPayModeAA() {
		var roomInfo = this.getRoomInfo();
		roomInfo.payMode = Constants.ROOM_PAY_MODE.AA;
		this.updateUI();
	}
	private clickPayModeMaster() {
		var roomInfo = this.getRoomInfo();
		roomInfo.payMode = Constants.ROOM_PAY_MODE.creator;
		this.updateUI();
	}
	private clickPayModeDaiKai() {
		var roomInfo = this.getRoomInfo();
		roomInfo.payMode = Constants.ROOM_PAY_MODE.other;
		this.updateUI();
	}
	private clickRoomTypeJYZ() {
		var roomInfo = this.getRoomInfo();
		roomInfo.roomType = Constants.ROOM_TYPE.jinYuanZi;
		roomInfo.roomScore = 100;
		this.updateUI();
	}
	private clickRoomTypeCKT() {
		var roomInfo = this.getRoomInfo();
		roomInfo.roomType = Constants.ROOM_TYPE.changKaiTou;
		roomInfo.roomScore = 100;
		this.updateUI();
	}
	private clickJieSuanNoLimit() {
		var roomInfo = this.getRoomInfo();
		this.isNoLimit = true;
		this.updateUI();
	}
	private clickjieSuan300() {
		var roomInfo = this.getRoomInfo();
		this.isNoLimit = false;
		this.updateUI();
	}
	private clickTurnModeBa() {
		var roomInfo = this.getRoomInfo();
		roomInfo.turnMode = Constants.ROOM_TIME_MODE.ba;
		roomInfo.turnNumber = 8;
		this.updateUI();
	}
	private clickTurnModeQuan() {
		var roomInfo = this.getRoomInfo();
		roomInfo.turnMode = Constants.ROOM_TIME_MODE.quan;
		roomInfo.turnNumber = 2;
		this.updateUI();
	}
	private clickTurn1() {
		var roomInfo = this.getRoomInfo();
		var rate = 1;
		if (roomInfo.turnMode == Constants.ROOM_TIME_MODE.ba) {
			rate = 4;
		}
		roomInfo.turnNumber = 1 * rate;
		this.updateUI();
	}
	private clickTurn2() {
		var roomInfo = this.getRoomInfo();
		var rate = 1;
		if (roomInfo.turnMode == Constants.ROOM_TIME_MODE.ba) {
			rate = 4;
		}
		roomInfo.turnNumber = 2 * rate;
		this.updateUI();
	}
	private clickTurn3() {
		var roomInfo = this.getRoomInfo();
		var rate = 1;
		if (roomInfo.turnMode == Constants.ROOM_TIME_MODE.ba) {
			rate = 4;
		}
		roomInfo.turnNumber = 3 * rate;
		this.updateUI();
	}
	private clickTurn4() {
		var roomInfo = this.getRoomInfo();
		var rate = 1;
		if (roomInfo.turnMode == Constants.ROOM_TIME_MODE.ba) {
			rate = 4;
		}
		roomInfo.turnNumber = 4 * rate;
		this.updateUI();
	}
	private clickTurnmodeFaZa2() {
		var roomInfo = this.getRoomInfo();
		roomInfo.huaZa = this.modeFaZa2.isSelected();
		this.updateUI();
	}
	private clickModeSiFeng() {
		var roomInfo = this.getRoomInfo();
		roomInfo.faFen = this.modeSiFeng.isSelected();
		this.updateUI();
	}
	private clickModeJieZhuang() {
		var roomInfo = this.getRoomInfo();
		roomInfo.jieZhuangBi = this.modeJieZhuang.isSelected();
		this.updateUI();
	}
	private clickModeBaoMi() {
		var roomInfo = this.getRoomInfo();
		roomInfo.baoMi = this.modeBaoMi.isSelected();
		this.updateUI();
	}
	private clickModeAutoHost() {
		var roomInfo = this.getRoomInfo();
		roomInfo.autoHost = this.modeAutoHost.isSelected();
		this.updateUI();
	}
	private getRoomInfo() {
		if (!this.hasInited) {
			return null;
		}
		if (this.roomInfo == null) {
			var localRoomInfo = this.getLocalRoomInfo();
			if (localRoomInfo != null) {
				this.roomInfo = localRoomInfo;
			} else {
				var roomInfo: any = {};
				roomInfo.roomType = Constants.ROOM_TYPE.jinYuanZi;
				roomInfo.roomScore = 100;
				roomInfo.turnMode = 0;//房间把数类型 0.把 1.圈
				roomInfo.turnNumber = 8;//
				roomInfo.payMode = Constants.ROOM_PAY_MODE.AA;//支付付费 1.房主付费 2.AA付
				roomInfo.huaZa = true;//是否花砸
				roomInfo.faFen = true;//是否罚分
				roomInfo.jieZhuangBi = true;//是否接庄比
				if (this.clubId != null) {
					roomInfo.clubId = this.clubId;
				}
				roomInfo.calNum = 0;
				roomInfo.autoHost = true;
				roomInfo.baoMi = false;
				this.roomInfo = roomInfo;
			}

		}
		return this.roomInfo;
	}
	public getAdjustRoomInfo() {
		var roomInfo = this.getRoomInfo();
		if (roomInfo.roomType == Constants.ROOM_TYPE.changKaiTou) {
			roomInfo.huaZa = true;
			roomInfo.faFen = true;
			roomInfo.jieZhuangBi = true;
			roomInfo.baoMi = false;
			if (this.isNoLimit)
				roomInfo.roomScore = 0
			else
				roomInfo.roomScore = Number(this.scoreInput.text);
			if (this.clubId != null) {
				let initScoreStr = this.changkaitouScoreInput.text.trim()
				if (isNaN(Number(initScoreStr))) {
					game.DialogManager.getInstance().popUp1("初始分数只能为数字")
					return
				}
				roomInfo.initScore = Number(initScoreStr) || 0
				roomInfo.rv = 1
				roomInfo.calNum = 1
				roomInfo.autoHost = true
				if (roomInfo.initScore < -10 || roomInfo.initScore > 0) {
					game.DialogManager.getInstance().popUp1("初始分数不符合要求")
					return
				}
			}
		}
		else if (roomInfo.roomType == Constants.ROOM_TYPE.jinYuanZi) {
			roomInfo.roomScore = 100;
			if (this.clubId != null) {
				let score = this.jinyuanziScoreInput.text.trim()
				if (isNaN(Number(score))) {
					game.DialogManager.getInstance().popUp1("初始分数只能为数字")
					return
				}
				roomInfo.roomScore = Number(score)
				roomInfo.rv = 1
				roomInfo.calNum = 1
				roomInfo.autoHost = true
				if (roomInfo.roomScore < 90 || roomInfo.roomScore > 100) {
					game.DialogManager.getInstance().popUp1("初始分数不符合要求")
					return
				}
			}
		}
		return roomInfo;
	}
	private getLocalRoomInfo() {
		var clubId = (this.clubId == null) ? "0" : this.clubId;
		var roomInfoString = DataStorage.readLocalData("roomInfo_clubId+" + clubId);
		if (roomInfoString.length > 0) {
			return JSON.parse(roomInfoString);
		} else {
			return null;
		}
	}
	public saveLocalRoomInfo() {
		var roomInfo = this.getRoomInfo();
		var clubId = (this.clubId == null) ? "0" : this.clubId;
		DataStorage.writeLocalData("roomInfo_clubId+" + clubId, JSON.stringify(roomInfo));
	}
	public setClubId(clubId) {
		this.clubId = clubId;
		var roomInfo = this.getRoomInfo();
		this.hasInited = true;
		this.updateUI();
	}
}
window["CreateRoomMahjong"] = CreateRoomMahjong