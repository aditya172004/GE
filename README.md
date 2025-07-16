# BabyWise AI - Parenting Assistant

A mobile-first web application for parenting assistance with AI-powered chat, health tracking, and community features.

## Project Structure

The project has been refactored from a single HTML file into a modular structure for better maintainability:

```
/
├── index.html          # Main HTML structure (21KB)
├── styles.css          # All CSS styles and animations (15KB)
├── script.js           # Main JavaScript functionality (17KB)
├── config.js           # Configuration data and responses (8KB)
├── utils.js            # Utility functions and helpers (13KB)
└── index_Version4_updated.html  # Original single file (for reference)
```

## Features

### Core Features
- **AI Chat**: Intelligent parenting assistant with quick actions
- **Video Consultation**: Virtual AI nurse consultation
- **Health Tracker**: Baby and mother health monitoring
- **Cry Decoder**: AI-powered baby cry analysis
- **Community**: Parent networking and experience sharing
- **Government Schemes**: Information about available benefits

### Technical Features
- Mobile-first responsive design
- Voice recording and file upload support
- Real-time chat interface with typing indicators
- Smooth animations and transitions
- Modular JavaScript architecture

## How to Run

1. Start a local HTTP server:
   ```bash
   python3 -m http.server 8000
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:8000/index.html
   ```

## File Descriptions

### `index.html`
- Main HTML structure and layout
- All page templates and components
- References to external CSS and JavaScript files

### `styles.css`
- Complete styling for the mobile app interface
- Animations and transitions
- Responsive design rules

### `script.js`
- Main application logic and functionality
- Event handlers and user interactions
- Page navigation and state management

### `config.js`
- Configuration data and settings
- AI response templates
- Feature data and content

### `utils.js`
- Utility functions for DOM manipulation
- Helper functions for common operations
- Browser compatibility checks

## Development

The modular structure makes it easy to:
- Modify styles without affecting functionality
- Add new features to specific modules
- Maintain and debug individual components
- Extend configuration without code changes

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is for educational and demonstration purposes.