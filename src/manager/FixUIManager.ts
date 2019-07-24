module game {

    export class FixUIManager 
    {   
        private offx = 0
        private posMap:game.HashMap = new game.HashMap() 

        private static instance:FixUIManager

        public static getInstance()
        {
            if(this.instance == null)
            {
                this.instance = new FixUIManager();
            }
            return  this.instance
        }

        public addPosData(key,value)
        {
            this.posMap.put(key,value)
        }

        private  getPosData(key):any
        {
            return this.posMap.get(key)
        }

        public  setBoarderNode(obj:egret.DisplayObject)
        {
            var _x = obj.x
            var _y = obj.y
            if(!this.posMap.containsKey(obj.hashCode))
            {
                this.posMap.put(obj.hashCode,{x:_x,y:_y})
            }else
            {
                var temp = this.getPosData(obj.hashCode)
                _x = temp.x
                _y = temp.y
            }
            obj.x = this.convertX(_x)
        }
        
        public convertBoarderPos(x,y)
        {
            return {x:x,y:y}
        }

        public convertX(x:number)
        {
            if(x > GameConfig.ScreenW/2)
            {
                return x + this.offx
            }else
            {
                return x - this.offx
            }
        }

        public setOffX(x)
        {
            this.offx = x
        }

    }


    
}