# Modern Calculator

A sleek, feature-rich calculator application built with vanilla HTML, CSS, and JavaScript. Features a modern glassmorphism design, sound effects, calculation history, and full keyboard support.

[Live Demo](https://aman-bam.github.io/CodeAlpha_Calculator/)

<img width="1917" height="938" alt="Screenshot 2025-09-01 110337" src="https://github.com/user-attachments/assets/21bf587e-ac9a-4ac6-af79-c8af915ba4ea" />

## ✨ Features

- **Modern Design**: Glassmorphism UI with smooth animations and transitions
- **Sound Effects**: Audio feedback for button presses and operations
- **Calculation History**: View and reuse previous calculations
- **Keyboard Support**: Full keyboard navigation and input
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Error Handling**: Graceful handling of division by zero and other errors
- **Number Formatting**: Automatic number formatting with commas and scientific notation

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required

### Installation

1. Clone or download the repository
2. Ensure all three files are in the same directory:
   - `index.html`
   - `style.css`
   - `script.js`
3. Open `index.html` in your web browser

### Usage

#### Basic Operations
- Click number buttons or use your keyboard to input numbers
- Use operation buttons (+, -, ×, ÷) or keyboard shortcuts
- Press = or Enter to calculate results
- Use AC to clear all or C to clear current entry

#### Keyboard Shortcuts
- **Numbers**: `0-9`
- **Operators**: `+`, `-`, `*`, `/`
- **Calculate**: `Enter` or `=`
- **Clear All**: `Escape` or `Shift+C`
- **Clear Entry**: `C`
- **Decimal**: `.`
- **Backspace**: Delete last digit

#### Advanced Features
- **History Panel**: Click on the display to view calculation history
- **Sound Toggle**: Click the 🔊 button to enable/disable sound effects
- **Sign Toggle**: Use ± button to change number sign
- **History Selection**: Click any history item to reuse the result

## 🎨 Design Features

- **Glassmorphism Effect**: Modern translucent design with backdrop blur
- **Smooth Animations**: Button press animations and transitions
- **Responsive Layout**: Adapts to different screen sizes
- **Dark Theme**: Easy on the eyes with a sophisticated color scheme
- **Visual Feedback**: Button hover effects and active states

## 🔧 Technical Details

### File Structure
```
calculator/
├── index.html      # Main HTML structure
├── style.css       # Styling and animations
└── script.js       # Calculator logic and interactions
```

### Key Technologies
- **HTML5**: Semantic markup and modern web standards
- **CSS3**: Grid layout, animations, and modern visual effects
- **Vanilla JavaScript**: No external dependencies
- **Web Audio API**: For sound effects generation

### Browser Compatibility
- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎵 Sound System

The calculator includes a built-in sound system that generates different tones for:
- Number inputs (600Hz)
- Decimal point (700Hz)
- Operators (800Hz)
- Equals/Calculate (900Hz)
- Clear functions (400-500Hz)
- Sound toggle feedback

Sounds can be toggled on/off using the speaker icon in the top-right corner.

## 📱 Responsive Design

The calculator automatically adapts to different screen sizes:
- **Desktop**: Full-size layout with hover effects
- **Tablet**: Optimized button sizes and spacing
- **Mobile**: Compact layout with touch-friendly buttons

## 🔄 Calculation History

- Stores up to 10 recent calculations
- Click the display area to show/hide history panel
- Click any history item to use its result as input
- History persists during the current session

## 🛠️ Customization

### Changing Colors
Edit the CSS variables in `style.css`:
- Background gradients
- Button colors
- Accent colors for operators

### Modifying Sounds
Adjust frequency and duration values in the `playSound()` function in `script.js`.

### Adding Features
The modular code structure makes it easy to extend functionality:
- Add new operators in the `calculate()` function
- Modify display formatting in `formatNumber()`
- Extend keyboard shortcuts in the event listener

## 🐛 Error Handling

- Division by zero displays "Error" and auto-resets
- Invalid operations are gracefully handled
- Number overflow switches to scientific notation
- Malformed inputs default to safe values

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For questions or issues, please open an issue in the repository or contact the development team.

---

**Built with ❤️ using vanilla web technologies**
