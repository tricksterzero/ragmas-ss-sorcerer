import { Buffer } from "buffer";
import Zlib from "zlib";
import { encode as encodeURLSafe, decode as decodeURLSafe, trim as trimURLSafe } from 'url-safe-base64';

// lv配列を圧縮してBase64にする
export const encodeJobLv = (lv: number[]): string => {
  const lv2text = lv.join(',');
  const compressed = Buffer.from(Zlib.deflateSync(lv2text));
  const base64text = compressed.toString('base64');
  const urlsafe = trimURLSafe(encodeURLSafe(base64text));

  return urlsafe;
};

// Base64をlv配列にする
export const decodeJobLv = (query: string, length: number): number[] => {
  const base64text = decodeURLSafe(query);
  const binary = Buffer.from(base64text, 'base64');

  let decompressed;
  try {
    decompressed = Zlib.inflateSync(binary);
  } catch(e) {
    decompressed = Array(length).fill(0).join(',');
  }

  const lv = decompressed.toString().split(',', length).map(Number);
  return lv;
};