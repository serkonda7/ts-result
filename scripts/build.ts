import { type BuildConfig, build } from 'bun'

const cfg: BuildConfig = {
	entrypoints: ['src/result.ts'],
	outdir: 'dist',
	target: 'node',
}

await build(cfg)
