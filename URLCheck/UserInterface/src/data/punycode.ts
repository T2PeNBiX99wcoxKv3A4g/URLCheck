/**
 * Turns a host back into the letters it was written with. A host reaches the web view as
 * `xn--...`, which hides emoji, Chinese and look-alike letters; the interface shows the readable
 * form instead. Invisible characters in the result are spelled out rather than obeyed, so a decoded
 * label cannot reorder the panel around itself.
 */

const BASE = 36;
const TMIN = 1;
const TMAX = 26;
const SKEW = 38;
const DAMP = 700;
const INITIAL_BIAS = 72;
const INITIAL_N = 128;
const MAX_CODE_POINT = 0x10ffff;

/** Control and bidi characters: harmless to read, dangerous to render. */
const INVISIBLE = /[\u0000-\u001f\u007f-\u009f\u200e\u200f\u202a-\u202e\u2066-\u2069]/g;

/** The bias punycode's integer decoder carries between rounds. */
function adapt(delta: number, points: number, first: boolean): number {
    let bias = 0;
    delta = first ? Math.floor(delta / DAMP) : delta >> 1;
    delta += Math.floor(delta / points);

    for (; delta > ((BASE - TMIN) * TMAX) >> 1; bias += BASE) delta = Math.floor(delta / (BASE - TMIN));

    return bias + Math.floor(((BASE - TMIN + 1) * delta) / (delta + SKEW));
}

/** The value of one punycode digit, or BASE when the character is not one. */
function digit(code: number): number {
    if (code >= 48 && code <= 57) return code - 22; // 0-9 -> 26-35
    if (code >= 65 && code <= 90) return code - 65; // A-Z
    if (code >= 97 && code <= 122) return code - 97; // a-z
    return BASE;
}

/** One label decoded, or the label unchanged when it is not `xn--` or is malformed. */
function decodeLabel(label: string): string {
    const lower = label.toLowerCase();
    if (!lower.startsWith("xn--")) return label;

    const data = lower.slice(4);
    if (!data) return label;

    const output: number[] = [];
    const basic = data.lastIndexOf("-");

    // Everything before the last hyphen is plain ASCII and is copied as it is.
    for (let index = 0; index < Math.max(basic, 0); index++) output.push(data.charCodeAt(index));

    let n = INITIAL_N;
    let bias = INITIAL_BIAS;
    let i = 0;

    for (let position = basic > 0 ? basic + 1 : 0; position < data.length;) {
        const previous = i;
        let weight = 1;

        for (let k = BASE; ; k += BASE) {
            if (position >= data.length) return label;

            const value = digit(data.charCodeAt(position++));
            if (value >= BASE) return label;

            i += value * weight;

            const threshold = k <= bias ? TMIN : k >= bias + TMAX ? TMAX : k - bias;
            if (value < threshold) break;

            weight *= BASE - threshold;
        }

        const count = output.length + 1;
        bias = adapt(i - previous, count, previous === 0);
        n += Math.floor(i / count);
        i %= count;

        if (n > MAX_CODE_POINT) return label;
        output.splice(i++, 0, n);
    }

    return String.fromCodePoint(...output);
}

/** The host as people read it: `xn--` labels decoded, invisible characters spelled out. */
export function readableHost(host: string): string {
    return host
        .split(".")
        .map(decodeLabel)
        .join(".")
        .replace(INVISIBLE, (character) => `\\u${character.charCodeAt(0).toString(16).padStart(4, "0")}`);
}
