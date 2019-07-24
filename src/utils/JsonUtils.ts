module game {
	/**
	 *
	 * @author 
	 *
	 */
	export class JsonUtils {
		public constructor() {
		}
		
        public static getStringFromJson(json:JSON,key: string) :string{
            var s: string = json[key];
            if(s == null) {
                return "";
            } else {
                return s;
            }
        }
                
        public static getNumberFromJson(json:JSON,key: string) :number{
            var s: string = json[key];
            if(s == null) {
                return 0;
            } else {
                return Number(s);
            }
        }  
	}
}
