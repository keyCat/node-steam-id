const CDATA_REGEX = /\<\!\[CDATA\[([\s\S]+)\]\]\>/g;

export function extractXMLValue(xml: string = '', tagName: string): string {
    const open = `<${tagName}>`;
    const close = `</${tagName}>`;
    const startPos = xml.indexOf(open) + open.length;
    if (startPos - open.length === -1) { return ''; }
    const endPos = xml.indexOf(close, startPos);
    return removeCDATA(xml.substring(startPos, endPos));
}

export function removeCDATA(str: string = '') {
    return str.replace(CDATA_REGEX, (_$0, $1) => $1);
}
