module Utils {
	export class TextUtils {
		public constructor() {
		}


		public static getOutLineStr(str:string): Array<egret.ITextElement> {
			return <Array<egret.ITextElement>>[
				// { text: str, style: { "textColor": 0xff0000,"underline":true } },
				{ text: str, style: {"underline":true } },
			];
    	}
	}

	
}