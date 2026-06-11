import { describe, expect, it } from 'vitest';
import { evidenceSchema } from '../lib/evidence';

describe('evidence schema', () => {
  it('rejects missing evidence refs', () => {
    expect(() => evidenceSchema.parse({ kind: 'screenshot', source: 'browser' })).toThrow();
  });
});
