import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const rootDir = process.argv[2] ?? 'sound/4805749';

function listDirs(path) {
    return readdirSync(path).filter((entry) => {
        try {
            return statSync(join(path, entry)).isDirectory();
        } catch {
            return false;
        }
    });
}

function listCsvFiles(path) {
    return readdirSync(path).filter((entry) => entry.endsWith('.wav.csv'));
}

function parseCsvDelays(filePath) {
    const text = readFileSync(filePath, 'utf8');
    const lines = text.split(/\r?\n/);
    const rows = [];
    let prevOffset = null;
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const parts = line.split(',');
        if (parts.length < 3) continue;
        const onset = parseFloat(parts[0]);
        const offset = parseFloat(parts[1]);
        const label = parts.slice(2).join(',');
        if (Number.isNaN(onset) || Number.isNaN(offset)) continue;
        if (prevOffset !== null) {
            rows.push({ delay: onset - prevOffset, label });
        }
        prevOffset = offset;
    }
    return rows;
}

const birdDirs = listDirs(rootDir);

for (const birdId of birdDirs) {
    const birdPath = join(rootDir, birdId);
    const dateDirs = listDirs(birdPath);
    const allRows = [];

    for (const dateDir of dateDirs) {
        const datePath = join(birdPath, dateDir);
        const csvFiles = listCsvFiles(datePath);
        for (const csvFile of csvFiles) {
            const csvPath = join(datePath, csvFile);
            allRows.push(...parseCsvDelays(csvPath));
        }
    }

    if (allRows.length === 0) continue;

    const outLines = ['delay,label'];
    for (const row of allRows) {
        outLines.push(`${row.delay.toFixed(5)},${row.label}`);
    }
    const outPath = `${birdId}_delay.csv`;
    writeFileSync(outPath, outLines.join('\n') + '\n');
    console.log(`Wrote ${outPath} (${allRows.length} rows)`);
}
