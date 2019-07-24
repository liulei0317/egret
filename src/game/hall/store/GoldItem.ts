class GoldItem extends game.EComponent {

	private goldImg: eui.Image;
	private price: eui.Label;
	private num: eui.Label;

	private goldData: any;

	public constructor() {
		super();
		this.skinName = "resource/skins/hall/store/goldItemSkin.exml";
	}

	public onCreateViewComplete(): void {
		super.onCreateViewComplete();

		// this.updateUI();
	}


	public setData(data: any) {
		this.goldData = data;
		this.updateUI();
	}

	public updateUI() {
		if (this.goldData != null) {
			this.price.text = this.goldData.price / 100 + "";
			this.num.text = "x" + this.goldData.itemTotalNum;
			if (this.goldData.price == 800) {
				this.goldImg.source = "item_gold_1_png";
			} else if (this.goldData.price == 2000) {
				this.goldData.source = "item_gold_2_png";
			} else if (this.goldData.price == 5000) {
				this.goldImg.source = "item_gold_3_png";
			} else if (this.goldData.price == 10000) {
				this.goldImg.source = "item_gold_4_png";
			} else if (this.goldData.price == 30000) {
				this.goldImg.source = "item_gold_5_png";
			}


		}

	}

}
window["GoldItem"] = GoldItem