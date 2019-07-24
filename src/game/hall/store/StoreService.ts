module game {
	export class StoreService {
		private static instance:StoreService;


		private constructor() {
		}

		public static getInstance(){
			if(StoreService.instance == null){
				StoreService.instance = new StoreService();
			}
			return StoreService.instance;
		}

        public getStoreList(callback:Function){
			GameHttpManager.getStoreList(callback);
        }
	}
}