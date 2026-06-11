import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import sharp from "sharp";
import ffmpegPath from "ffmpeg-static";

const root = process.cwd();
const outDir = path.join(root, "public", "videos");
const frameDir = path.join(root, ".tmp", "sfplayground-intro-frames");
const outFile = path.join(outDir, "sfplayground-intro.mp4");
const posterFile = path.join(outDir, "sfplayground-intro-poster.png");

const W = 1080;
const H = 1920;
const FPS = 30;
const DURATION = 8.4;
const TOTAL_FRAMES = Math.round(FPS * DURATION);

const images = {
  hero1: "public/images/hero1.JPG",
  hero2: "public/images/hero2.png",
  hero3: "public/images/hero3.png",
  hero8: "public/images/hero8.JPG",
  skyline: "public/images/skyline.png",
  demo: "public/images/pitch-playoffs/demo-booth.jpg",
  panel: "public/images/pitch-playoffs/panel-presentation.jpg",
  room: "public/images/pitch-playoffs/presentation-room.jpg",
  logo: "public/images/logo.png",
};

const timeline = [
  { start: 0, end: 1.55, name: "question" },
  { start: 1.55, end: 3.05, name: "request" },
  { start: 3.05, end: 5.15, name: "cuts" },
  { start: 5.15, end: 6.65, name: "stats" },
  { start: 6.65, end: 8.4, name: "lockup" },
];

const easeOut = (x) => 1 - Math.pow(1 - clamp(x), 3);
const easeInOut = (x) => (clamp(x) < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const clamp = (x, min = 0, max = 1) => Math.max(min, Math.min(max, x));
const lerp = (a, b, t) => a + (b - a) * t;

function sceneAt(t) {
  return timeline.find((scene) => t >= scene.start && t < scene.end) ?? timeline.at(-1);
}

function progressIn(scene, t) {
  return clamp((t - scene.start) / (scene.end - scene.start));
}

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function textLines(text, maxChars) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function svgText({
  x,
  y,
  text,
  size,
  weight = 800,
  fill = "#ffffff",
  width = 22,
  leading = 1.08,
  anchor = "start",
  opacity = 1,
  casing = false,
}) {
  const lines = textLines(casing ? text.toUpperCase() : text, width);
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${fill}" opacity="${opacity}" font-family="Arial Black, Impact, Helvetica, sans-serif" font-size="${size}" font-weight="${weight}" letter-spacing="0">${lines
    .map((line, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : size * leading}">${esc(line)}</tspan>`)
    .join("")}</text>`;
}

function roundedRect(x, y, w, h, r, fill, opacity = 1, stroke = "none", strokeWidth = 0) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" opacity="${opacity}" stroke="${stroke}" stroke-width="${strokeWidth}" />`;
}

function label(x, y, text, opacity = 1) {
  const padX = 25;
  const h = 70;
  const approxW = text.length * 25 + padX * 2;
  return `<g opacity="${opacity}">
    ${roundedRect(x, y, approxW, h, 12, "#050505", 0.94)}
    <text x="${x + padX}" y="${y + 45}" fill="#fff" font-family="Arial, Helvetica, sans-serif" font-size="31" font-weight="800">${esc(text)}</text>
  </g>`;
}

function overlaySvg(t) {
  const scene = sceneAt(t);
  const p = progressIn(scene, t);
  const flash = Math.max(0, Math.sin(t * Math.PI * 8)) * 0.07;
  let body = `
    <rect width="${W}" height="${H}" fill="rgba(0,0,0,${0.08 + flash})" />
    <rect x="0" y="0" width="${W}" height="${H}" fill="url(#vignette)" opacity="0.72" />
  `;

  if (scene.name === "question") {
    const inP = easeOut(p);
    const cardY = lerp(740, 610, inP);
    body += label(110, 360, "What if networking felt playable?", easeOut(p * 1.6));
    body += `
      <g transform="translate(80 ${cardY}) rotate(${lerp(-2, 0, inP)})" opacity="${easeOut(p * 1.4)}">
        ${roundedRect(0, 0, 920, 520, 34, "#f8f6ef", 0.96)}
        ${roundedRect(38, 42, 844, 386, 18, "#ffffff", 1, "#000000", 6)}
        <text x="460" y="224" text-anchor="middle" fill="#151515" font-family="Arial, Helvetica, sans-serif" font-size="35">request a room</text>
        <text x="460" y="273" text-anchor="middle" fill="#151515" font-family="Arial, Helvetica, sans-serif" font-size="35">full of builders</text>
        <rect x="308" y="322" width="${304 * easeInOut(p)}" height="5" fill="#151515" rx="3" />
        <circle cx="462" cy="475" r="16" fill="#151515" opacity="0.22" />
      </g>
    `;
  }

  if (scene.name === "request") {
    const typeP = easeInOut(p);
    const typed = "founders + investors + operators".slice(0, Math.floor(typeP * 31));
    body += `${roundedRect(86, 250, 908, 1010, 34, "#ffffff", 0.95)}
      <text x="140" y="350" fill="#111" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="800">request</text>
      ${roundedRect(135, 406, 810, 156, 24, "#f2f2f2", 1)}
      <text x="176" y="502" fill="#111" font-family="Arial, Helvetica, sans-serif" font-size="43" font-weight="800">${esc(typed)}<tspan opacity="${Math.sin(t * 16) > 0 ? 1 : 0}">|</tspan></text>
      ${roundedRect(135, 640, 810, 380, 26, "#0b0b0b", 1)}
      ${svgText({ x: 176, y: 744, text: "SF Playground", size: 86, fill: "#fff", width: 16 })}
      <text x="176" y="884" fill="#ffffff" opacity="0.7" font-family="Arial, Helvetica, sans-serif" font-size="33">curated startup rooms in San Francisco</text>
      ${roundedRect(176, 932, 266, 62, 31, "#ffffff", 0.95)}
      <text x="309" y="973" text-anchor="middle" fill="#111" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="900">PLAY START</text>
    `;
  }

  if (scene.name === "cuts") {
    const idx = Math.min(2, Math.floor(p * 3));
    const localP = (p * 3) % 1;
    const titles = ["DEMO", "PITCH", "DEALFLOW"];
    const subtitles = ["products in the room", "live feedback", "warm intros"];
    const x = lerp(120, 78, easeOut(localP));
    body += `${roundedRect(x, 235, 924, 1265, 28, "rgba(255,255,255,0)", 1, "#ffffff", 7)}
      ${label(92, 1535, titles[idx], 1)}
      <text x="114" y="1684" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="900">${esc(subtitles[idx])}</text>
      <text x="114" y="1750" fill="#ffffff" opacity="0.72" font-family="Arial, Helvetica, sans-serif" font-size="30">not another passive mixer</text>`;
  }

  if (scene.name === "stats") {
    const entries = [
      ["500+", "guests across rooms"],
      ["VCs", "in the audience"],
      ["AI", "hardware + robotics"],
    ];
    body += `${svgText({ x: 82, y: 245, text: "San Francisco's founder playground", size: 90, fill: "#fff", width: 15 })}
      ${entries
        .map(([big, small], i) => {
          const y = 760 + i * 245;
          const delay = i * 0.16;
          const op = easeOut((p - delay) * 2);
          const shift = lerp(90, 0, easeOut((p - delay) * 2));
          return `<g opacity="${op}" transform="translate(${shift} 0)">
            ${roundedRect(82, y, 916, 172, 20, "#ffffff", 0.93)}
            <text x="130" y="${y + 110}" fill="#050505" font-family="Arial Black, Impact, Helvetica, sans-serif" font-size="87" font-weight="900">${esc(big)}</text>
            <text x="430" y="${y + 102}" fill="#050505" opacity="0.72" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="800">${esc(small)}</text>
          </g>`;
        })
        .join("")}`;
  }

  if (scene.name === "lockup") {
    const scale = lerp(0.9, 1, easeOut(p));
    body += `<g transform="translate(540 835) scale(${scale}) translate(-540 -835)">
        ${roundedRect(122, 520, 836, 635, 36, "#ffffff", 0.94)}
        ${svgText({ x: 540, y: 715, text: "SF Playground", size: 98, fill: "#050505", width: 14, anchor: "middle" })}
        <text x="540" y="870" text-anchor="middle" fill="#050505" opacity="0.72" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="800">founders. investors. operators.</text>
        ${roundedRect(295, 946, 490, 76, 38, "#050505", 1)}
        <text x="540" y="995" text-anchor="middle" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="900">COME PLAY IN SF</text>
      </g>`;
  }

  return Buffer.from(`<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="vignette" cx="50%" cy="45%" r="74%">
        <stop offset="0%" stop-color="rgba(0,0,0,0)" />
        <stop offset="72%" stop-color="rgba(0,0,0,0.2)" />
        <stop offset="100%" stop-color="rgba(0,0,0,0.78)" />
      </radialGradient>
    </defs>
    ${body}
  </svg>`);
}

async function backgroundBuffer(t) {
  const scene = sceneAt(t);
  const p = progressIn(scene, t);
  let file = images.hero1;
  let zoom = 1 + t * 0.012;

  if (scene.name === "request") file = images.hero8;
  if (scene.name === "cuts") {
    const files = [images.demo, images.panel, images.room];
    file = files[Math.min(2, Math.floor(p * 3))];
    zoom = 1.05 + ((p * 3) % 1) * 0.08;
  }
  if (scene.name === "stats") file = images.hero2;
  if (scene.name === "lockup") file = images.skyline;

  const input = path.join(root, file);
  const width = Math.round(W * zoom);
  const height = Math.round(H * zoom);

  const bg = await sharp(input)
    .resize(width, height, { fit: "cover", position: scene.name === "lockup" ? "center" : "attention" })
    .extract({
      left: Math.max(0, Math.round((width - W) * (0.5 + Math.sin(t * 0.5) * 0.08))),
      top: Math.max(0, Math.round((height - H) * (0.45 + Math.cos(t * 0.45) * 0.06))),
      width: W,
      height: H,
    })
    .modulate({ brightness: scene.name === "request" ? 0.72 : 0.82, saturation: 1.05 })
    .toBuffer();

  return sharp(bg)
    .composite([
      {
        input: Buffer.from(
          `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" fill="#000" opacity="${scene.name === "lockup" ? 0.35 : 0.18}"/></svg>`,
        ),
      },
    ])
    .png()
    .toBuffer();
}

async function renderFrame(index) {
  const t = index / FPS;
  const frame = await sharp(await backgroundBuffer(t))
    .composite([{ input: overlaySvg(t), top: 0, left: 0 }])
    .jpeg({ quality: 90 })
    .toBuffer();
  const name = path.join(frameDir, `frame-${String(index).padStart(4, "0")}.jpg`);
  await fs.writeFile(name, frame);
  if (index === Math.round(FPS * 7.05)) {
    await sharp(frame).png().toFile(posterFile);
  }
}

async function runFfmpeg() {
  await new Promise((resolve, reject) => {
    const args = [
      "-y",
      "-framerate",
      String(FPS),
      "-i",
      path.join(frameDir, "frame-%04d.jpg"),
      "-vf",
      "format=yuv420p",
      "-c:v",
      "libx264",
      "-movflags",
      "+faststart",
      "-r",
      String(FPS),
      outFile,
    ];
    const child = spawn(ffmpegPath, args, { stdio: ["ignore", "inherit", "inherit"] });
    child.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`ffmpeg exited ${code}`))));
    child.on("error", reject);
  });
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  await fs.rm(frameDir, { recursive: true, force: true });
  await fs.mkdir(frameDir, { recursive: true });

  for (let i = 0; i < TOTAL_FRAMES; i += 1) {
    await renderFrame(i);
    if (i % FPS === 0) console.log(`rendered ${i}/${TOTAL_FRAMES}`);
  }

  await runFfmpeg();
  console.log(`wrote ${outFile}`);
  console.log(`wrote ${posterFile}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
