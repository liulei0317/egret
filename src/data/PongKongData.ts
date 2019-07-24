module game {
    export class PongKongData {
        private type;
        private provideClientId;
        private value;

        private WBStutre:boolean;

        public constructor(params) {
            this.setType(params.type)
            this.setProvideClientId(params.provideClientId)
            this.setValue(params.value) 
            this.setStutre(params.waiBaoStatus)
        }

         public setStutre(Stutre)
         {
             this.WBStutre = Stutre
         }

         public getStutre()
         {
             return this.WBStutre
         }

        public setType(type) {
            this.type = type
        }

        public getType() {
            return this.type
        }

        public setProvideClientId(pClientId) {
            this.provideClientId = pClientId
        }

        public getProvideClientId() {
            return this.provideClientId
        }

        public setValue(value) {
            this.value = value
        }

        public getValue() {
            return this.value
        }

    }
}