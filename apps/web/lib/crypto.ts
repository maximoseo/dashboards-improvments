import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';

export type EncryptedPayload = { ciphertext: string; iv: string; wrapped_dek: string };

function getKek(): Buffer {
  const raw = process.env.MASTER_KEK;
  if (!raw) throw new Error('MASTER_KEK is required');
  const key = Buffer.from(raw, 'base64');
  if (key.length !== 32) throw new Error('MASTER_KEK must be base64 encoded 32 bytes');
  return key;
}

export function generateDek(): Buffer { return randomBytes(32); }

export function wrapDek(dek: Buffer): { wrapped_dek: string; iv: string } {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', getKek(), iv);
  const enc = Buffer.concat([cipher.update(dek), cipher.final(), cipher.getAuthTag()]);
  return { wrapped_dek: enc.toString('base64'), iv: iv.toString('base64') };
}

export function unwrapDek(wrapped_dek: string, iv: string): Buffer {
  if (process.env.WORKER !== 'true') throw new Error('DEK unwrap is worker-only');
  const raw = Buffer.from(wrapped_dek, 'base64');
  const tag = raw.subarray(raw.length - 16);
  const data = raw.subarray(0, raw.length - 16);
  const decipher = createDecipheriv('aes-256-gcm', getKek(), Buffer.from(iv, 'base64'));
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(data), decipher.final()]);
}

export function encryptJson(value: unknown, dek = generateDek()): EncryptedPayload {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', dek, iv);
  const plain = Buffer.from(JSON.stringify(value), 'utf8');
  const encrypted = Buffer.concat([cipher.update(plain), cipher.final(), cipher.getAuthTag()]);
  const wrapped = wrapDek(dek);
  return { ciphertext: encrypted.toString('base64'), iv: iv.toString('base64'), wrapped_dek: `${wrapped.iv}:${wrapped.wrapped_dek}` };
}

export function decryptJson<T>(payload: EncryptedPayload): T {
  if (process.env.WORKER !== 'true') throw new Error('Credential decrypt is worker-only');
  const [dekIv, wrapped] = payload.wrapped_dek.split(':');
  const dek = unwrapDek(wrapped, dekIv);
  const raw = Buffer.from(payload.ciphertext, 'base64');
  const tag = raw.subarray(raw.length - 16);
  const data = raw.subarray(0, raw.length - 16);
  const decipher = createDecipheriv('aes-256-gcm', dek, Buffer.from(payload.iv, 'base64'));
  decipher.setAuthTag(tag);
  return JSON.parse(Buffer.concat([decipher.update(data), decipher.final()]).toString('utf8')) as T;
}
