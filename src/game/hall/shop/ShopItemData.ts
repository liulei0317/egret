module game {
	export class ShopItemData {
		public json:any;
		

		public itemTotalNum:number;
		public itemName:string;
		public price:number;
		public itemAddNum:number;
		public itemBaseNum:number;
		public itemGroupId:number;
		public itemId:number;
		public itemType:number;



		public eventTypeDesc:string;		

		public constructor(json:JSON) {
			this.json = json;
			this.parse();
		}

		public parse(){
			this.itemTotalNum = this.json.itemTotalNum;
			this.itemName = this.json.itemName;
			this.price = this.json.price;
			this.itemAddNum = this.json.itemAddNum
			this.itemBaseNum = this.json.itemBaseNum
			this.itemGroupId = this.json.itemGroupId
			this.itemId = this.json.itemId
			this.itemType = this.json.itemType
		}	
	}
}