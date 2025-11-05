// A simple CSV parser. Does not handle quotes or commas within fields.
// Assumes the first line is the header.
export function parseCsv(csvText: string): Record<string, string>[] {
  const lines = csvText.trim().split(/\r?\n/);
  if (lines.length < 2) {
    return []; // Return empty if no data rows
  }

  const header = lines[0].split(',').map(h => h.trim());
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    if (values.length !== header.length) {
      console.warn(`Row ${i} has a different number of columns than the header.`);
      continue;
    }

    const entry: Record<string, string> = {};
    for (let j = 0; j < header.length; j++) {
      entry[header[j]] = values[j].trim();
    }
    data.push(entry);
  }

  return data;
}
