import { describe, expect, it } from 'vitest';
import { decryptJson, encryptJson } from './crypto';

describe('credential envelope crypto', () => {
  it('round trips only when WORKER=true', () => {
    process.env.MASTER_KEK = Buffer.alloc(32, 7).toString('base64');
    const payload = encryptJson({ username: 'owner', password: 'secret' });
    process.env.WORKER = 'false';
    expect(() => decryptJson(payload)).toThrow(/worker-only/);
    process.env.WORKER = 'true';
    expect(decryptJson(payload)).toEqual({ username: 'owner', password: 'secret' });
  });

  it('rejects tampered ciphertext', () => {
    process.env.MASTER_KEK = Buffer.alloc(32, 8).toString('base64');
    process.env.WORKER = 'true';
    const payload = encryptJson({ token: 'secret' });
    const raw = Buffer.from(payload.ciphertext, 'base64');
    raw[0] = raw[0] ^ 1;
    payload.ciphertext = raw.toString('base64');
    expect(() => decryptJson(payload)).toThrow();
  });
});
