// A simple CSV parser. Does not handle quotes or commas within fields.
// Assumes the first line is the header.
export function parseCsv(csvText: string, fileName: string): Record<string, string>[] {
  const lines = csvText.trim().split(/\r?\n/);
  if (lines.length < 2) {
    return []; // Return empty if no data rows
  }

  const header = lines[0].split(',').map(h => h.trim());
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    
    // BUG FIX: Instead of silently ignoring bad rows, throw a specific error.
    if (values.length !== header.length) {
      throw new Error(`In file '${fileName}', row ${i + 1} is invalid. Expected ${header.length} columns, but found ${values.length}. Please check for extra commas in your text.`);
    }

    const entry: Record<string, string> = {};
    for (let j = 0; j < header.length; j++) {
      entry[header[j]] = values[j].trim();
    }
    data.push(entry);
  }

  return data;
}
