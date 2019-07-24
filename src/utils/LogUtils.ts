module game {
	export class LogUtils {
		public constructor() {
		}

		public static info(msg){
			console.log(DateUtils.dateFormat(new Date().getTime())+" "+msg);
		}
		public static error(msg){
			// console.error(DateUtils.dateFormat(new Date().getTime())+" "+msg);
		}		
	}

	
}