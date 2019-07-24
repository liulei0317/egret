module game {
	/**
	 *
	 * @author 
	 *
	 */
	export class HashMap {
    	//定义长度  
        private length:number = 0;
        //创建一个对象  
        private obj = new Object();
		public constructor() {
		}
		
    	/** 
        * 判断Map是否为空 
        */  
        public isEmpty():boolean
        {
            return this.length == 0;
        }
        
        public containsKey(key:any):boolean
        {
            return (key in this.obj); 
        }
        
        public containsValue(value:any):boolean
        {
            for(var key in this.obj)
            {
                if(this.obj[key] == value)
                {
                    return true;
                }
            }
            return false;  
        }
        
        /** 
        *向map中添加数据 
        */  
        public put(key:any,value:any)
        {
            if(!this.containsKey(key))
            {
                this.length++;
            }
            this.obj[key] = value;
        }
        
        /** 
        * 根据给定的Key获得Value 
        */  
        public get(key:any)
        {
            return this.containsKey(key) ? this.obj[key] : null;
        }
        
        /** 
        * 根据给定的Key删除一个值 
        */  
        public remove(key:any)
        {
            if(this.containsKey(key) && (delete this.obj[key]))
            {
                this.length--;
            }
        }
        
        /** 
        * 获得Map中的所有Value 
        */  
        public values()
        {
            var _values = new Array();
            for(var key in this.obj)
            {
                _values.push(this.obj[key]);
            }
            return _values;
        }

        /** 
        * 获得Map中的所有Key 
        */
        public keySet()
        {
            var _keys = new Array();
            for(var key in this.obj)
            {
                _keys.push(key);
            }
            return _keys;
        }

        /** 
        * 获得Map的长度 
        */
        public size()
        {
            return this.length;
        }

        /** 
        * 清空Map 
        */
        public clear()
        {
            this.length = 0;
            this.obj = new Object();
        }  
	}
}
