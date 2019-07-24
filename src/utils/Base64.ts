module Base64 {
    // For the base64 encoding pieces.
    // const alphabet = [

    //     'p', 'q', 'a', 'b', 'c', 'd', 'e', 'A',
    //     'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
    //     'J', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
    //     'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
    //     'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    //     'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
    //     'w', 'x', 'y', 'z', '0', '1', '2', '3',
    //     '4', '5', '6', '7', '8', '9', '+', '/'
    // ];

    const alphabet: string = "pqabcdeABCDEFGHIJKLklmMNOPQRS34TUVWX8YZfghijnor+stuvwxyz0125679/"

    const values = {};
    for (let i = 0; i < alphabet.length; ++i) {
        // values[alphabet.charCodeAt(i)] = i;
        values[alphabet[i]] = i;
    }

    export function stringToUint(string) {
        // 首先将字符串转为16进制
        let val = ""
        for (let i = 0; i < string.length; i++) {
            if (val === '') {
                val = string.charCodeAt(i).toString(16)
            } else {
                val += ',' + string.charCodeAt(i).toString(16)
            }
        }
        // 将16进制转化为ArrayBuffer
        return new Uint8Array(val.match(/[\da-f]{2}/gi).map(function (h) {
            return parseInt(h, 16)
        })).buffer
    }

    // export function encode(str: String): string {
    //     var bytes: ArrayBuffer = stringToUint(str)
    //     const array = new Uint8Array(bytes);
    //     const base64 = [];
    //     let index = 0;
    //     let quantum;
    //     let value;
    //     /* tslint:disable:no-bitwise */
    //     // Grab as many sets of 3 bytes as we can, that form 24 bits.
    //     while (index + 2 < array.byteLength) {
    //         quantum = (array[index] << 16) | (array[index + 1] << 8) | array[index + 2];
    //         // 24 bits will become 4 base64 chars.
    //         value = (quantum >> 18) & 0x3f;
    //         base64.push(alphabet[value]);
    //         value = (quantum >> 12) & 0x3f;
    //         base64.push(alphabet[value]);
    //         value = (quantum >> 6) & 0x3f;
    //         base64.push(alphabet[value]);
    //         value = quantum & 0x3f;
    //         base64.push(alphabet[value]);
    //         index += 3;
    //     }
    //     // At this point, there are 0, 1 or 2 bytes left.
    //     if (index + 1 === array.byteLength) {
    //         // 8 bits; shift by 4 to pad on the right with 0s to make 12 bits total.
    //         quantum = array[index] << 4;
    //         value = (quantum >> 6) & 0x3f;
    //         base64.push(alphabet[value]);
    //         value = quantum & 0x3f;
    //         base64.push(alphabet[value]);
    //         base64.push('==');
    //     } else if (index + 2 === array.byteLength) {
    //         // 16 bits; shift by 2 to pad on the right with 0s to make 18 bits total.
    //         quantum = (array[index] << 10) | (array[index + 1] << 2);
    //         value = (quantum >> 12) & 0x3f;
    //         base64.push(alphabet[value]);
    //         value = (quantum >> 6) & 0x3f;
    //         base64.push(alphabet[value]);
    //         value = quantum & 0x3f;
    //         base64.push(alphabet[value]);
    //         base64.push('=');
    //     }
    //     /* tslint:enable:no-bitwise */
    //     return base64.join('');
    // }

    export function Utf8ArrayToStr(array): string {
        var out:string, i, len, c;
        var char2, char3;

        out = "";
        len = array.length;
        i = 0;
        while (i < len) {
            c = array[i++];
            switch (c >> 4) {
                case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                    // 0xxxxxxx
                    out += String.fromCharCode(c);
                    break;
                case 12: case 13:
                    // 110x xxxx   10xx xxxx
                    char2 = array[i++];
                    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                    break;
                case 14:
                    // 1110 xxxx  10xx xxxx  10xx xxxx
                    char2 = array[i++];
                    char3 = array[i++];
                    out += String.fromCharCode(((c & 0x0F) << 12) |
                        ((char2 & 0x3F) << 6) |
                        ((char3 & 0x3F) << 0));
                    break;
            }
        }
        var subStr=new RegExp('[%$]+','ig');//创建正则表达式对象
        out=out.replace(subStr,"");//把'is'替换为空字符串
        var encodedString = decodeURIComponent(out);
        return encodedString;
    }

    export function arrayBufferToString(buffer) {

        var bufView = new Uint16Array(buffer);
        var length = bufView.length;
        var result = '';
        var addition = Math.pow(2, 16) - 1;

        for (var i = 0; i < length; i += addition) {

            if (i + addition > length) {
                addition = length - i;
            }
            result += String.fromCharCode.apply(null, bufView.subarray(i, i + addition));
        }

        return decodeURIComponent(result);

    }

    export function decode(string: string): String {
        let size = string.length;
        if (size === 0) {
            return "";
        }
        if (size % 4 !== 0) {
            throw new Error('Bad length: ' + size);
        }
        if (!string.match(/^[a-zA-Z0-9+/]+={0,2}$/)) {
            throw new Error('Invalid base64 encoded value');
        }
        // Every 4 base64 chars = 24 bits = 3 bytes. But, we also need to figure out
        // padding, if any.
        let bytes = 3 * (size / 4);
        let numPad = 0;
        if (string.charAt(size - 1) === '=') {
            numPad++;
            bytes--;
        }
        if (string.charAt(size - 2) === '=') {
            numPad++;
            bytes--;
        }
        const buffer = new Uint8Array(new ArrayBuffer(bytes));
        let index = 0;
        let bufferIndex = 0;
        let quantum;
        if (numPad > 0) {
            size -= 4; // handle the last one specially
        }
        /* tslint:disable:no-bitwise */
        while (index < size) {
            quantum = 0;
            for (let i = 0; i < 4; ++i) {
                quantum = (quantum << 6) | values[string.charAt(index + i)];
            }
            // quantum is now a 24-bit value.
            buffer[bufferIndex++] = (quantum >> 16) & 0xff;
            buffer[bufferIndex++] = (quantum >> 8) & 0xff;
            buffer[bufferIndex++] = quantum & 0xff;
            index += 4;
        }
        if (numPad > 0) {
            // if numPad == 1, there is one =, and we have 18 bits with 2 0s at end.
            // if numPad == 2, there is two ==, and we have 12 bits with 4 0s at end.
            // First, grab my quantum.
            quantum = 0;
            for (let i = 0; i < 4 - numPad; ++i) {
                quantum = (quantum << 6) | values[string.charAt(index + i)];
            }
            if (numPad === 1) {
                // quantum is 18 bits, but really represents two bytes.
                quantum = quantum >> 2;
                buffer[bufferIndex++] = (quantum >> 8) & 0xff;
                buffer[bufferIndex++] = quantum & 0xff;
            } else {
                // quantum is 12 bits, but really represents only one byte.
                quantum = quantum >> 4;
                buffer[bufferIndex++] = quantum & 0xff;
            }
        }
        /* tslint:enable:no-bitwise */
        return Base64.Utf8ArrayToStr(buffer);
    }
}