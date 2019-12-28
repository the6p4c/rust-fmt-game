const path = require('path');

const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');

module.exports = {
	// Deployed at https://the6p4c.github.io/rust-fmt-game/
	publicPath: process.env.NODE_ENV === 'production' ? '/rust-fmt-game' : '/',
	configureWebpack: {
		plugins: [
			new WasmPackPlugin({
				crateDirectory: path.join(__dirname, 'rust-fmt-game-wasm'),
				outDir: path.join(__dirname, 'rust-fmt-game-wasm', 'pkg')
			})
		]
	}
};
