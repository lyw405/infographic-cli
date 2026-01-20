# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-01-20

### Added
- Initial release of `infographic-cli`
- Simple command `ifgc` to render infographics from .ifgc files to SVG
- Support for 236+ built-in infographic templates
- `template` command to list all available templates
- Theme support (`--theme` option)
- Background color customization (`--background` option)
- Config file support (`--config` option)
- Stdin input support for AI integration
- Comprehensive test suite (26 tests)

### Features
- Render from file: `ifgc -i input.ifgc -o output.svg`
- Render from stdin: `echo "..." | ifgc -o output.svg`
- List templates: `ifgc template`
- Automatic output file naming (defaults to input.svg)
- Quiet mode for script usage (`--quiet`)

### Dependencies
- `@antv/infographic` ^0.2.11
- `chalk` ^5.4.1
- `commander` ^12.1.0

[0.1.0]: https://github.com/lyw405/infographic-cli/releases/tag/v0.1.0
