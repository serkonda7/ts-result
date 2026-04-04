import process from 'node:process'
import { type BuildConfig, build } from 'bun'

const cfg: BuildConfig = {
	entrypoints: ['src/result.ts'],
	outdir: 'dist',
	target: 'node',
}

const res = await build(cfg)
if (!res.success) {
	console.error(res.logs)
	process.exit(1)
}
