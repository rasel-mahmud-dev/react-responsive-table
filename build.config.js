const esbuild = require("esbuild");

esbuild
    .build({
        entryPoints: ["./src/lib/index.ts"],
        bundle: true,
        minify: false,
        sourcemap: false,
        allowOverwrite: true,
        outdir: "dist",
        // target: ["chrome90"],
        format: "esm",
        incremental: false,
        external: ["react"],
        splitting: true,
    })
    .then((r) => {
        console.log("client build sucess");
    })
    .catch((ex) => {
        process.exit(1);
        console.log(ex);
    });
