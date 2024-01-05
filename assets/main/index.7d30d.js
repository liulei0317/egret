window.__require=function e(t,n,r){function o(a,i){if(!n[a]){if(!t[a]){var l=a.split("/");if(l=l[l.length-1],!t[l]){var u="function"==typeof __require&&__require;if(!i&&u)return u(l,!0);if(c)return c(l,!0);throw new Error("Cannot find module '"+a+"'")}a=l}var s=n[a]={exports:{}};t[a][0].call(s.exports,function(e){return o(t[a][1][e]||e)},s,s.exports,e,t,n,r)}return n[a].exports}for(var c="function"==typeof __require&&__require,a=0;a<r.length;a++)o(r[a]);return o}({CardController:[function(e,t,n){"use strict";cc._RF.push(t,"eb6b0MmpVdNJpyJjCeEqcEk","CardController");var r,o=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),c=this&&this.__decorate||function(e,t,n,r){var o,c=arguments.length,a=c<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r);else for(var i=e.length-1;i>=0;i--)(o=e[i])&&(a=(c<3?o(a):c>3?o(t,n,a):o(t,n))||a);return c>3&&a&&Object.defineProperty(t,n,a),a},a=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,c){function a(e){try{l(r.next(e))}catch(t){c(t)}}function i(e){try{l(r.throw(e))}catch(t){c(t)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(a,i)}l((r=r.apply(e,t||[])).next())})},i=this&&this.__generator||function(e,t){var n,r,o,c,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return c={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(c[Symbol.iterator]=function(){return this}),c;function i(e){return function(t){return l([e,t])}}function l(c){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&c[0]?r.return:c[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,c[1])).done)return o;switch(r=0,o&&(c=[2&c[0],o.value]),c[0]){case 0:case 1:o=c;break;case 4:return a.label++,{value:c[1],done:!1};case 5:a.label++,r=c[1],c=[0];continue;case 7:c=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===c[0]||2===c[0])){a=0;continue}if(3===c[0]&&(!o||c[1]>o[0]&&c[1]<o[3])){a.label=c[1];break}if(6===c[0]&&a.label<o[1]){a.label=o[1],o=c;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(c);break}o[2]&&a.ops.pop(),a.trys.pop();continue}c=t.call(e,a)}catch(i){c=[6,i],r=0}finally{n=o=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}};Object.defineProperty(n,"__esModule",{value:!0});var l=e("./Card"),u=cc._decorator,s=u.ccclass,p=u.property,f=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.cardPrefab=null,t.layout=null,t._selectedCards=[],t}return o(t,e),t.prototype.start=function(){for(var e=this.GenerateNumber({count:36,target:10}),t=0;t<36;t++){var n=cc.instantiate(this.cardPrefab),r=n.getComponent(l.default);null!=r&&(cc.log("\u521b\u5efa\u4e00\u5f20\u5361\u724c\uff0c\u7d22\u5f15\uff1a"+t),r.Init(),r.SetIndex({idx:t+1}),r.SetNumber({num:e[t]}),r.SetDelegate({delegate:this}),this.node.addChild(n))}this.layout.updateLayout(),this.layout.enabled=!1},t.prototype.SelectOneCard=function(e){return a(this,void 0,Promise,function(){return i(this,function(t){switch(t.label){case 0:return this._selectedCards.length<2?[4,e.Show()]:[3,2];case 1:return t.sent(),this._selectedCards.push(e),[3,3];case 2:return[2];case 3:return 2!=this._selectedCards.length?[3,6]:this.CheckCardPair(this._selectedCards[0].GetNumber(),this._selectedCards[1].GetNumber())?(this._selectedCards[0].Destroy(),this._selectedCards[1].Destroy(),this._selectedCards.length=0,[3,6]):[3,4];case 4:return this._selectedCards[0].Hide(),[4,this._selectedCards[1].Hide()];case 5:t.sent(),this._selectedCards.length=0,t.label=6;case 6:return[2]}})})},t.prototype.CheckCardPair=function(e,t){return e+t==10},t.prototype.GenerateNumber=function(e){for(var t=e.count,n=e.target,r=t/2,o=[],c=0;c<r;c++){var a=cc.randomRangeInt(1,n);o.push(a)}for(c=0;c<r;c++)o.push(n-o[c]);return o},c([p(cc.Prefab)],t.prototype,"cardPrefab",void 0),c([p(cc.Layout)],t.prototype,"layout",void 0),c([s],t)}(cc.Component);n.default=f,cc._RF.pop()},{"./Card":"Card"}],Card:[function(e,t,n){"use strict";cc._RF.push(t,"f126ceDOYtI4rCtOQhYqJfw","Card");var r,o=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),c=this&&this.__decorate||function(e,t,n,r){var o,c=arguments.length,a=c<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r);else for(var i=e.length-1;i>=0;i--)(o=e[i])&&(a=(c<3?o(a):c>3?o(t,n,a):o(t,n))||a);return c>3&&a&&Object.defineProperty(t,n,a),a};Object.defineProperty(n,"__esModule",{value:!0});var a=cc._decorator,i=a.ccclass,l=a.property,u=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.label_number=null,t.node_face=null,t.node_back=null,t._number=0,t._index=0,t._delegate=null,t._canTouch=!0,t}return o(t,e),t.prototype.start=function(){},t.prototype.Init=function(){this.node_back.active=!0,this.node_face.active=!1},t.prototype.GetNumber=function(){return this._number},t.prototype.OnClicked=function(){null!=this._delegate&&this._canTouch&&this._delegate.SelectOneCard(this)},t.prototype.SetDelegate=function(e){var t=e.delegate;this._delegate=t},t.prototype.SetIndex=function(e){var t=e.idx;this._index=t},t.prototype.SetNumber=function(e){var t=e.num;this._number=t,this.label_number.string=this._number.toString()},t.prototype.Show=function(){var e=this;return new Promise(function(t){cc.tween(e.node).stop(),e._canTouch=!1;var n=cc.tween().to(.15,{scaleX:0}),r=cc.tween().call(function(){e.node_back.active=!1,e.node_face.active=!0}),o=cc.tween().to(.15,{scaleX:1}),c=cc.tween().delay(.25),a=cc.tween().call(function(){t()});cc.tween(e.node).then(n).then(r).then(o).then(c).then(a).start()})},t.prototype.Hide=function(){var e=this;return new Promise(function(t){cc.tween(e.node).stop();var n=cc.tween().to(.15,{scaleX:0}),r=cc.tween().call(function(){e.node_back.active=!0,e.node_face.active=!1}),o=cc.tween().to(.15,{scaleX:1}),c=cc.tween().call(function(){e._canTouch=!0,t()});cc.tween(e.node).then(n).then(r).then(o).then(c).start()})},t.prototype.Destroy=function(){var e=cc.tween().to(.15,{scale:0}),t=cc.tween().removeSelf();cc.tween(this.node).then(e).then(t).start()},c([l(cc.Label)],t.prototype,"label_number",void 0),c([l(cc.Node)],t.prototype,"node_face",void 0),c([l(cc.Node)],t.prototype,"node_back",void 0),c([i],t)}(cc.Component);n.default=u,cc._RF.pop()},{}],Helloworld:[function(e,t,n){"use strict";cc._RF.push(t,"e1b90/rohdEk4SdmmEZANaD","Helloworld");var r,o=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)},function(e,t){function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),c=this&&this.__decorate||function(e,t,n,r){var o,c=arguments.length,a=c<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r);else for(var i=e.length-1;i>=0;i--)(o=e[i])&&(a=(c<3?o(a):c>3?o(t,n,a):o(t,n))||a);return c>3&&a&&Object.defineProperty(t,n,a),a};Object.defineProperty(n,"__esModule",{value:!0});var a=cc._decorator,i=a.ccclass,l=a.property,u=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.label=null,t.text="hello",t}return o(t,e),t.prototype.start=function(){this.label.string=this.text},c([l(cc.Label)],t.prototype,"label",void 0),c([l],t.prototype,"text",void 0),c([i],t)}(cc.Component);n.default=u,cc._RF.pop()},{}]},{},["Card","CardController","Helloworld"]);