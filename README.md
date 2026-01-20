# infographic-cli

[![npm version](https://badge.fury.io/js/infographic-cli.svg)](https://www.npmjs.com/package/infographic-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/infographic-cli.svg)](https://www.npmjs.com/package/infographic-cli)

Command-line interface for [AntV Infographic](https://github.com/antvis/Infographic) - instantly create stunning SVG infographics from simple declarative syntax. Render from strings, files, or stdin.

## Quick Start

```bash
# Install
npm install -g infographic-cli

# Render from string (quickest for testing)
ifgc -s "infographic list-row-simple-horizontal-arrow
data
  title My First Infographic
  items
    - label Step 1
    - label Step 2" -o output.svg

# Render from file
ifgc -i input.ifgc -o output.svg

# List available templates
ifgc template
```

## Installation

```bash
npm install -g infographic-cli
```

This installs two commands: `ifgc` (short) and `infographic` (long).

## Usage

### Basic Rendering

```bash
# From string (quickest for testing)
ifgc -s "infographic list-row-simple-horizontal-arrow
data
  title My Chart
  items
    - label Item 1" -o output.svg

# From file (output defaults to input.svg)
ifgc -i input.ifgc

# Specify output file
ifgc -i input.ifgc -o output.svg

# From stdin
echo '...' | ifgc -o output.svg

# From stdin with file input
cat input.ifgc | ifgc -o output.svg
```

### Options

| Option | Description |
|--------|-------------|
| `-s, --string <content>` | Input .ifgc content as a string |
| `-i, --input <file>` | Input .ifgc file |
| `-o, --output <file>` | Output file (default: input.svg) |
| `--background <color>` | Background color (default: transparent) |
| `-c, --config <file>` | JSON configuration file |
| `-t, --theme <name>` | Theme name |
| `-q, --quiet` | Suppress log output |

### List Templates

```bash
ifgc template
```

Visit [AntV Infographic](https://github.com/antvis/Infographic) to see template previews.

## Examples

### Example 1: Simple Step List

```bash
cat > steps.ifgc << EOF
infographic list-row-simple-horizontal-arrow
data
  title Getting Started
  desc Three simple steps to begin
  items
    - label Step 1
      desc Install the package
    - label Step 2
      desc Create your first infographic
    - label Step 3
      desc Export and share
EOF

ifgc -i steps.ifgc -o steps.svg
```

### Example 2: Timeline

```bash
cat > timeline.ifgc << EOF
infographic timeline-horizontal-basic-date
data
  title Project Roadmap
  items
    - label Q1
      desc Planning
    - label Q2
      desc Development
    - label Q3
      desc Testing
    - label Q4
      desc Launch
EOF

ifgc -i timeline.ifgc -o timeline.svg
```

### Example 3: Using Theme

```bash
cat > swot.ifgc << EOF
infographic compare-quadrant-four-areas-card
data
  title SWOT Analysis
  items
    - label Strengths
      desc Internal advantages
    - label Weaknesses
      desc Internal limitations
    - label Opportunities
      desc External possibilities
    - label Threats
      desc External risks
EOF

ifgc -i swot.ifgc -o swot.svg -t dark
```

### Example 4: From stdin

```bash
echo 'infographic list-row-simple-horizontal-arrow
data
  title Quick Tasks
  items
    - label Task A
    - label Task B
    - label Task C' | ifgc -o tasks.svg
```

## Output Format

### SVG (Default)

Infographic is a vector graphics format, perfect for:

- **Web use** - Scalable, interactive, small file size
- **Documentation** - GitHub, GitLab, Notion, etc.
- **Design tools** - Figma, Sketch, Illustrator
- **Code documentation** - Docusaurus, VitePress, etc.

### Converting to PNG

If you need PNG for specific use cases, you can convert the SVG:

**Online tools**:
- [SVG to PNG](https://svgtopng.com/)
- [CloudConvert](https://cloudconvert.com/svg-to-png)

**Command line** (requires additional tools):
- ImageMagick: `convert output.svg output.png`
- Node.js with sharp: `sharp('output.svg').png().toFile('output.png')`

## Infographic Syntax

Learn more about the declarative infographic syntax at [antvis/Infographic](https://github.com/antvis/Infographic).

## See Also

- [AntV Infographic](https://github.com/antvis/Infographic) - The core library
- [Infographic Documentation](https://infographic.antv.vision/) - Official documentation
- [Infographic Editor](https://infographic.antv.vision/examples) - Online examples

## License

MIT &copy; 2026 [lyw405](https://github.com/lyw405)

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes in each version.
