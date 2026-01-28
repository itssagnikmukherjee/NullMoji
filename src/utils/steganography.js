const zeroWidthMap = { '0': '\u200B', '1': '\u200C' };
const reverseMap = { '\u200B': '0', '\u200C': '1' };

export function textToBinary(text) {
    return text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join('');
}

export function binaryToText(binary) {
    let output = '';
    for (let i = 0; i < binary.length; i += 8) output += String.fromCharCode(parseInt(binary.slice(i, i + 8), 2));
    return output;
}

export function injectInvisible(carrier, binary) {
    let invisibleBlock = '';
    for (let bit of binary) invisibleBlock += zeroWidthMap[bit];

    if (carrier.includes(" ")) {
        return carrier.replace(" ", " " + invisibleBlock);
    } else {
        const chars = [...carrier];
        const mid = Math.floor(chars.length / 2);
        return chars.slice(0, mid).join('') + invisibleBlock + chars.slice(mid).join('');
    }
}

export function extractHiddenBinary(text) {
    // Use Array.from to properly handle Unicode characters
    const chars = Array.from(text);
    const invisibleChars = chars.filter(c => c === '\u200B' || c === '\u200C');

    if (invisibleChars.length === 0) return null;

    const binary = invisibleChars.map(c => reverseMap[c]).join('');

    // Validate that we have a complete binary (multiple of 8)
    if (binary.length % 8 !== 0) {
        console.warn('Incomplete binary data detected:', binary.length);
    }

    return binary;
}
