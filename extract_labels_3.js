import { readdirSync, statSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import wav from 'node-wav';

const rootDir = process.argv[2] ?? 'sound/4805749';
const labelsDir = join(rootDir, 'labels');

if (!existsSync(labelsDir)) {
    mkdirSync(labelsDir, { recursive: true });
}

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

function parseCsv(filePath) {
    const text = readFileSync(filePath, 'utf8');
    const lines = text.split(/\r?\n/);
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const parts = line.split(',');
        if (parts.length < 3) continue;
        const onset = parseFloat(parts[0]);
        const offset = parseFloat(parts[1]);
        const label = parts.slice(2).join(',').trim();
        if (Number.isNaN(onset) || Number.isNaN(offset)) continue;
        rows.push({ onset, offset, label });
    }
    return rows;
}

function sanitizeLabel(label) {
    return label.replace(/[^A-Za-z0-9_-]/g, '_');
}

function parseWavBaseName(csvFileName) {
    // csvFileName: birdid_yyMMdd_hhmm.someid.wav.csv
    const wavName = csvFileName.replace(/\.csv$/, '');
    const m = wavName.match(/^([^_]+)_(\d{6})_(\d{4})\./);
    if (!m) return null;
    return {
        wavFileName: wavName,
        birdid: m[1],
        yyMMdd: m[2],
        hhmm: m[3],
    };
}

const counters = new Map();

function nextId(key) {
    const n = (counters.get(key) ?? 0) + 1;
    counters.set(key, n);
    return n;
}

const birdDirs = listDirs(rootDir).filter((d) => d !== 'labels');

let totalSegments = 0;
let totalFiles = 0;

for (const birdId of birdDirs) {
    const birdPath = join(rootDir, birdId);
    if (!statSync(birdPath).isDirectory()) continue;
    const dateDirs = listDirs(birdPath);

    for (const dateDir of dateDirs) {
        const datePath = join(birdPath, dateDir);
        const csvFiles = listCsvFiles(datePath);

        for (const csvFile of csvFiles) {
            const csvPath = join(datePath, csvFile);
            const parsed = parseWavBaseName(csvFile);
            if (!parsed) {
                console.warn(`Skipping ${csvPath}: cannot parse name`);
                continue;
            }
            const wavPath = join(datePath, parsed.wavFileName);
            if (!existsSync(wavPath)) {
                console.warn(`Missing WAV file for ${csvPath}: ${wavPath}`);
                continue;
            }

            const rows = parseCsv(csvPath);
            if (rows.length === 0) continue;

            const wavBuffer = readFileSync(wavPath);
            const decoded = wav.decode(wavBuffer);
            const sampleRate = decoded.sampleRate;
            const channelData = decoded.channelData;
            const totalSamples = channelData[0].length;

            const sessionDirName = `${parsed.yyMMdd}_${parsed.hhmm}`;
            const outDir = join(labelsDir, parsed.birdid, sessionDirName);
            if (!existsSync(outDir)) {
                mkdirSync(outDir, { recursive: true });
            }

            for (const row of rows) {
                const startSample = Math.max(0, Math.floor(row.onset * sampleRate));
                const endSample = Math.min(totalSamples, Math.ceil(row.offset * sampleRate));
                if (endSample <= startSample) continue;

                const segmentChannels = channelData.map((ch) => ch.slice(startSample, endSample));

                const safeLabel = sanitizeLabel(row.label);
                const counterKey = `${parsed.birdid}/${sessionDirName}/${safeLabel}`;
                const id = nextId(counterKey);
                const idStr = String(id).padStart(6, '0');
                const outName = `${safeLabel}.${idStr}.wav`;
                const outPath = join(outDir, outName);

                const encoded = wav.encode(segmentChannels, {
                    sampleRate,
                    float: false,
                    bitDepth: 16,
                });
                writeFileSync(outPath, encoded);
                totalSegments++;
            }

            totalFiles++;
            console.log(`Processed ${csvPath} (${rows.length} segments)`);
        }
    }
}

console.log(`\nDone. Processed ${totalFiles} files, extracted ${totalSegments} segments to ${labelsDir}`);
