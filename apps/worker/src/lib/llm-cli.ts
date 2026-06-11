import { spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { z } from 'zod';

type Task = 'design_critique' | 'ux_heuristics' | 'niche_infer' | 'rephrase' | 'code_explain';
export interface CliCall<T> { task: Task; promptPath: string; attachments?: string[]; schema: z.ZodSchema<T>; preferredCli?: string }
const defaultPriority = ['claude', 'codex', 'chatgpt', 'gemini', 'auggie', 'factory', 'droid', 'kiro', 'cursor', 'opencode', 'devin', 'warp', 'kimi', 'minimax', 'grok', 'nvidia', 'manus', 'z.ai', 'openclaw'];

function stripAnsi(text: string) { return text.replace(/\x1b\[[0-9;]*m/g, ''); }
function priority(preferred?: string) { const configured = (process.env.CLI_PRIORITY?.split(',').map(s => s.trim()).filter(Boolean) ?? defaultPriority); return preferred ? [preferred, ...configured.filter(c => c !== preferred)] : configured; }

async function runCli(command: string, prompt: string): Promise<string> {
  return await new Promise((resolve, reject) => {
    const child = spawn(command, [], { stdio: ['pipe', 'pipe', 'pipe'], shell: true, env: { ...process.env, NO_COLOR: '1' } });
    let out = ''; let err = '';
    child.stdout.on('data', d => out += d.toString());
    child.stderr.on('data', d => err += d.toString());
    child.on('error', reject);
    child.on('close', code => code === 0 ? resolve(stripAnsi(out)) : reject(new Error(`${command} failed ${code}: ${err.slice(0, 500)}`)));
    child.stdin.end(`${prompt}\nReturn only JSON.`);
  });
}

export async function llmCli<T>(call: CliCall<T>): Promise<T> {
  const prompt = await readFile(call.promptPath, 'utf8');
  const errors: string[] = [];
  for (const cli of priority(call.preferredCli)) {
    try {
      const text = await runCli(cli, prompt);
      const jsonStart = text.indexOf('{') >= 0 ? text.indexOf('{') : text.indexOf('[');
      if (jsonStart < 0) throw new Error('No JSON in CLI output');
      return call.schema.parse(JSON.parse(text.slice(jsonStart)));
    } catch (error) {
      errors.push(`${cli}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  throw new Error(`No CLI returned valid JSON for ${call.task}: ${errors.join(' | ')}`);
}
