# Simple Teleprompter

A lightweight, easy-to-use teleprompter application built with Electron. Perfect for content creators, presenters, and anyone who needs a reliable teleprompter solution.

## Features

- Clean, distraction-free interface
- Adjustable scroll speed
- Reverse scrolling capability
- Full-screen mode
- Keyboard shortcuts for all controls
- Text editing in real-time
- Adjustable font size

## Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/simpletp-electron.git
```

2. Install dependencies:
```bash
pnpm install
```

## Usage

To start the application:
```bash
pnpm start
```

### Keyboard Shortcuts

- `⌘+⌃+⇧+K`: Toggle fullscreen
- `⌘+⌃+⇧+M`: Mirror text
- `⌘+⌃+⇧+P`: Play/Pause scrolling
- `⌘+⌃+⇧+R`: Toggle reverse scrolling
- `⌘+⌃+⇧+↑`: Increase scroll speed
- `⌘+⌃+⇧+↓`: Decrease scroll speed
- `⌘+⌃+⇧++`: Increase font size
- `⌘+⌃+⇧+-`: Decrease font size

## Building for macOS

To create a macOS application:

```bash
pnpm run build
```

This will generate a `.dmg` file in the `dist` folder.

## Development

The application is built with:
- Electron
- HTML/CSS/JavaScript
- electron-builder for packaging

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.