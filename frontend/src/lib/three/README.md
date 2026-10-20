# Vendored three.js (r186 / 0.186.1)

`three-solar.js` is a tree-shaken ESM bundle of the three.js core plus the addons the
landing-page solar system uses: `EffectComposer`, `RenderPass`, `UnrealBloomPass`,
`ShaderPass`, `OutputPass`, `Lensflare`/`LensflareElement` and `OrbitControls`.
It is MIT licensed (see `LICENSE`).

It is vendored rather than installed from npm so the frontend lockfile stays untouched.
To switch to the npm package instead:

```bash
pnpm add three@0.186.1
```

and change the import in `src/components/home/SolarSystem.vue` from
`@/lib/three/three-solar.js` to `three` / `three/addons/...` — the API surface is identical.
Then delete `three-solar.d.ts` (a hand-written subset of the types) and install `@types/three`.
