# THE WORLD — Thursday 19 November 2026

[![make.fun](https://make.fun/badge/news-image-20261119.svg)](https://make.fun/bounty/news-image-20261119)
[![make.fun rank](https://make.fun/badge/news-image-20261119/rank.svg)](https://make.fun/bounty/news-image-20261119)
[![make.fun reward](https://make.fun/badge/news-image-20261119/reward.svg)](https://make.fun/bounty/news-image-20261119)

A one-image newspaper front page summing up the world's news of **Thursday 19 November 2026** — 55 stories in a single 1024×1024 image.

## The image

`THE WORLD` is a dense broadsheet front page with our signature crimson-red masthead band:

- **Lead feature** — Trump, Xi and Putin hold their historic trilateral summit in Shenzhen (large photorealistic photo, the day's biggest and most eye-catching story)
- **Markets feature** — Anthropic debuts on Nasdaq at $83 a share, $1.5 trillion valuation
- **Photo stories** — US–Iran fire exchanged again in the Gulf; GTA VI begins its global rollout
- **8 text stories** — Nvidia pay raises, Google Gemini 4 Neon, Fed minutes, BAAJA cloture 65–31, Tencent Q3, Dow's third straight fall, oil at $83.26, Liu Yunping elected House Democratic Caucus chair
- **The Day in Numbers** — a navy strip with the day's key figures ($83 IPO, $1.5T, 65–31, $83.26 oil, 133 Duckett runs)
- **The Day in Brief** — 43 more one-line topics in four columns, from the Vance–Iran rift to Xi's call for free and open trade

55 stories in total, all real news of 19 November 2026, verified against that day's reporting.

## How it is built

`frontpage.html` is the front page as HTML/CSS (Noto Serif Display masthead, DejaVu/Noto Serif body), rendered to a 1024×1024 PNG with headless Chromium. The four photorealistic photos live in `assets/` and are embedded in the page. `main.ts` (Node 22, standard library only) reads `entry.png` from the repository, validates it (PNG signature, IHDR, 1024×1024, 8-bit RGB, at most 1 MiB), and writes it to the output directory.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Two runs write byte-identical files.

## Bounty

Built for the [news-image-20261119](https://make.fun/bounty/news-image-20261119) bounty on make.fun ($250, top 50 paid). Referral: `s11m3687`.

## License

MIT — see LICENSE.
