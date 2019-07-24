module game {
	export class Base64Utils {
		public constructor() {

		}

        public static getBytes(str: string): number[]
        {
            var bytes:number[] = [];
            for(var i = 0;i < str.length;++i)
            {
                bytes.push(str.charCodeAt(i));
            }
            return bytes;
        }	

		public static _keyStr:string = "pqabcdeABCDEFGHIJKLklmMNOPQRS34TUVWX8YZfghijnor+stuvwxyz0125679/";

		public static encode(input:string):string{  
			input = input.replace(/\r\n/g,"\n");  
			var output = "";  
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;  
			var i = 0;  
			input = Base64Utils._utf8_encode(input);  
			while (i < input.length) {  
				chr1 = input.charCodeAt(i++);  
				chr2 = input.charCodeAt(i++);  
				chr3 = input.charCodeAt(i++);  
				enc1 = chr1 >> 2;  
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);  
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);  
				enc4 = chr3 & 63;  
				if (isNaN(chr2)) {  
					enc3 = enc4 = 64;  
				} else if (isNaN(chr3)) {  
					enc4 = 64;  
				}  
				output = output +  
				Base64Utils._keyStr.charAt(enc1) + Base64Utils._keyStr.charAt(enc2) +  
				Base64Utils._keyStr.charAt(enc3) + Base64Utils._keyStr.charAt(enc4);  
			}  
			return output;  
		}  	


		// public static decode(input:string):string{ 
		// 	var output = "";  
		// 	var chr1, chr2, chr3;  
		// 	var enc1, enc2, enc3, enc4;  
		// 	var i = 0;  
		// 	input = input.replace(/[=]/g,"");  
		// 	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");  
		// 	while (i < input.length) {  
		// 		enc1 = Base64Utils._keyStr.indexOf(input.charAt(i++));  
		// 		enc2 = Base64Utils._keyStr.indexOf(input.charAt(i++));  
		// 		var hasEnc3 = i<input.length;
		// 		enc3 = Base64Utils._keyStr.indexOf(input.charAt(i++));  
		// 		var hasEnc4 = i<input.length;
		// 		enc4 = Base64Utils._keyStr.indexOf(input.charAt(i++));  
		// 		chr1 = (enc1 << 2) | (enc2 >> 4);  
		// 		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);  
		// 		chr3 = ((enc3 & 3) << 6) | enc4;  
		// 		output = output + String.fromCharCode(chr1);  
		// 		if (hasEnc3) {  
		// 			output = output + String.fromCharCode(chr2);  
		// 		}  
		// 		if (hasEnc4) {  
		// 			output = output + String.fromCharCode(chr3);  
		// 		}  
		// 	}  
		// 	output = Base64Utils._utf8_decode(output);  
		// 	// output = output.replace(/[/n]/,"");  
		// 	return output;  
    	// }  			




		public static _utf8_encode(str:string):string{  
			// str = str.replace("","10");  
			var utftext = "";  
			for (var n = 0; n < str.length; n++) {  
				var c = str.charCodeAt(n);  
				if (c < 128) {  
					utftext += String.fromCharCode(c);  
				} else if((c > 127) && (c < 2048)) {  
					utftext += String.fromCharCode((c >> 6) | 192);  
					utftext += String.fromCharCode((c & 63) | 128);  
				} else {  
					utftext += String.fromCharCode((c >> 12) | 224);  
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);  
					utftext += String.fromCharCode((c & 63) | 128);  
				}  
	
			}  
        	return utftext;  
    	}  	


		public static _utf8_decode(utftext:string):string{  
			var string = "";  
			var i = 0;  
			var c = 0;
			var c1 = 0;
			var c2 = 0;  
			var c3 = 0;
			while ( i < utftext.length ) {  
				c = utftext.charCodeAt(i);  
				if (c < 128) {  
					string += String.fromCharCode(c);  
					i++;  
				} else if((c > 191) && (c < 224)) {  
					c2 = utftext.charCodeAt(i+1);  
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));  
					i += 2;  
				} else {  
					c2 = utftext.charCodeAt(i+1);  
					c3 = utftext.charCodeAt(i+2);  
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));  
					i += 3;  
				}  
			}  
			return string;  
		}			
	}
}