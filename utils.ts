export async function sha256(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hash = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hash));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function writeJsonProperty(
  filePath: string,
  key: string,
  value: unknown,
): Promise<void> {
  let jsonData: Record<string, unknown>;
  try {
    const fileContent = await Deno.readTextFile(filePath);
    jsonData = JSON.parse(fileContent);
  } catch {
    jsonData = {};
  }

  jsonData[key] = value;

  await Deno.writeTextFile(filePath, JSON.stringify(jsonData, null, 2));
}
