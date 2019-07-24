module game {
	export class ZhanJiColorUtils {
		public constructor() {
		}

		public static getScoreColor(score: number) {
			return ZhanJiColorUtils.getWaiboScoreColor(score);
		}

		public static getFaScoreColor(score: number) {
			if (score < 0) {
				return 0x960129;
			} else if (score > 0) {
				return 0x53910A;
			} else {
				return 0xFFFFFF;
			}
		}

		public static getWaiboScoreColor(score: number) {
			if (score < 0) {
				return 0x83A9E0;
			} else if (score > 0) {
				return 0xFFCC00;
			} else {
				return 0xFFFFFF;
			}
		}
		public static setScoreLabelFormat(lable: eui.Label, score: number) {
			if (score < 0) {
				lable.textColor = 0xE0EAF3
				lable.stroke = 2
				lable.strokeColor = 0x5A60AB
				lable.text = "" + score
			} else if (score > 0) {
				lable.textColor = 0xFFF44C
				lable.stroke = 2
				lable.strokeColor = 0x85561E
				lable.text = "+" + score
			} else {
				lable.textColor = 0xF7F7F7
				lable.stroke = 2
				lable.strokeColor = 0x5E5E5E
				lable.text = "" + score
			}
		}
	}
}