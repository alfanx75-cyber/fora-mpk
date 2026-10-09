// Cryptographic helpers for private student tracking

export function generateAccessKey(): string {
  // 8 uppercase alphanumeric characters excluding visually ambiguous ones (0, O, 1, I)
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const array = new Uint8Array(8);
  crypto.getRandomValues(array);
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += alphabet[array[i] % alphabet.length];
  }
  return `FORA-${code.slice(0, 4)}-${code.slice(4)}`;
}

export async function hashAccessKey(rawKey: string): Promise<string> {
  const normalized = rawKey.trim().toUpperCase().replace(/[\s-]/g, '');
  const encoder = new TextEncoder();
  const data = encoder.encode(normalized);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyAccessKey(inputKey: string, storedHash: string): Promise<boolean> {
  if (!inputKey || !storedHash) return false;
  const inputHash = await hashAccessKey(inputKey);
  return inputHash === storedHash.toLowerCase();
}
