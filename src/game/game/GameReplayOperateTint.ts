class GameReplayOperateTint extends game.EComponent
{
    private params:any;
    private data:any[];
    private unitNodeSet:GameReplayOperateTintNode[]

    private boundW:number = 20;
    private perUnitW:number = 40;
    private perGap :number= 40;
    private originalP:egret.Point; 
    private dir:number;
    public constructor(data:any)
    {
        super();
        this.params = data;
        this.skinName = "resource/skins/game/gameReplayOperateNode.exml"
    }

    public onCreateViewComplete()
    {
        super.onCreateViewComplete();
        this.init();
    }

    private init()
    {
        this.unitNodeSet = []
        this.originalP = this.params.position
        this.dir = this.params.dir
        if (this.dir == GameConst.PLAY_DIR.down || this.dir == GameConst.PLAY_DIR.left)
        {
            this.originalP.x = this.originalP.x + 50
        }
        else
        {
            this.originalP.x = this.originalP.x - 50
        }
        this.x = this.originalP.x
        this.y = this.originalP.y + 60
    }

    public setData(data:number[])
    {
        for (var i = 0; i < this.unitNodeSet.length; i ++) 
        {
            var unitNode = this.unitNodeSet[i]
            unitNode.visible = false;
        }
        this.data = data
        var bgWidth =0
        var len = data.length + 1
        for(var i = 0; i < len; i++)
        {
            var unitNode = this.unitNodeSet[i]
            var operateType = 0
            if (i < data.length)
            {
                operateType = data[i]
            }else
            {
                operateType = GameConst.OPERATE_TYPE.pass
            }
            if (unitNode == null)
            {
                var unitNode = new GameReplayOperateTintNode();
                this.unitNodeSet[i] = unitNode
                this.addChild(unitNode)
            }
            unitNode.setData(operateType);
            unitNode.visible = true
            unitNode.x = this.boundW + bgWidth
            unitNode.y = -5
            bgWidth = bgWidth + this.perUnitW
            if (i < len)
            {
                 bgWidth = bgWidth + this.perGap
            }
        }
        bgWidth = bgWidth + this.boundW * 2
        this.width = bgWidth
        if (this.dir == GameConst.PLAY_DIR.up || this.dir == GameConst.PLAY_DIR.right)
        {
            this.x = this.originalP.x - bgWidth
        }
    }

    public runClickFunc(operateType)
    {
        var idx:number = -1
        for (var i = 0; i < this.data.length; i ++)
        {
            if (this.data[i] == operateType)
            {
                idx = i;
                break
            }  
            
        }
        //点过默认播放最后一个
        if (operateType == GameConst.OPERATE_TYPE.pass)
        {
            idx = this.data.length
        }

         if (idx != -1)
         {
             this.unitNodeSet[idx].runClickAction()
         }

    }
}

class  GameReplayOperateTintNode extends game.EComponent
{
    private Image_type:eui.Image;
    private Image_effect:eui.Image;

    private operateType:number;
    public constructor()
    {
        super();
        this.skinName = "resource/skins/game/gameReplayOperateUnit.exml"
    }

    public setData(operateType:number)
    {
        
        this.operateType = operateType;
        this.Image_type.source = "img_replay_operate_"+this.operateType+"_png";
    }

    public onCreateViewComplete()
    {
        this.Image_effect.visible = false
    }

    public runClickAction()
    {
        egret.Tween.removeTweens(this.Image_type)
        egret.Tween.removeTweens(this.Image_effect)

        var tw_Image_type = egret.Tween.get(this.Image_type, { loop: false });
        tw_Image_type.to({ scaleX:1.5,scaleY:1.5 }, 200)
        tw_Image_type.to({ scaleX:1,scaleY:1 }, 200)
        var self = this
        var tw_Image_effect = egret.Tween.get(this.Image_effect, { loop: false });
        this.Image_effect.alpha = 0;
        this.Image_effect.visible = true;
        tw_Image_effect.to({ scaleX:2,scaleY:2,alpha:1 }, 200)
        tw_Image_effect.to({ scaleX:1,scaleY:1,alpha:0}, 200)
        tw_Image_effect.call(function () {
            game.EAppFacade.getInstance().sendNotification(game.GameCmd.REPLAYER_ACTION_FINISH)
            self.parent.visible = false
            self.Image_effect.visible = false
        })
    }
}