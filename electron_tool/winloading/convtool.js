export function bytes2hexstr(data) {
    let hexstr = "";
    for (let i = 0; i < data.length; i++) {
        let b = data[i];
        let hexb = b.toString(16);
        if (hexb.length == 1) {
            hexstr += "0";
        }
        hexstr += hexb;
    }
    return hexstr;
}
