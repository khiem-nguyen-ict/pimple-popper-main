# Pimple Popper 🎮

A fun, satisfying, and addictive casual game where you pop pimples to achieve high scores, unlock levels, and compete with friends!

## 🎯 Features

- 🎨 **Satisfying Gameplay** - Tap/click to pop pimples with smooth animations
- 🏆 **Score System** - Earn points and unlock achievements
- 📊 **Level Progression** - Increasing difficulty and new challenges as you progress
- 🎵 **Sound Effects & Music** - Immersive audio feedback
- 💾 **Persistent Progress** - Your scores are saved locally
- 📱 **Fully Responsive** - Play on desktop, tablet, or mobile
- ⌨️ **Keyboard & Touch Support** - Multiple input methods

## 🎮 How to Play

1. **Start the Game** - Click "Play" on the main menu
2. **Pop Pimples** - Click/tap on pimples to pop them
3. **Earn Points** - Each pimple gives you points
4. **Avoid Missing** - Missing too many pimples ends your game
5. **Beat Your Score** - Try to beat your personal best!

### Gameplay Tips
- 🎯 Focus on the center of the screen for more pimples
- ⚡ Pop pimples quickly for combo multipliers
- 🛡️ Watch the combo meter at the top
- 🎁 Special pimples give bonus points

## 🛠️ Tech Stack

- **Frontend**: JavaScript (Vanilla, no frameworks)
- **Rendering**: HTML5 Canvas
- **Storage**: Browser LocalStorage for game progress
- **Styling**: CSS3 with animations
- **Audio**: Web Audio API for sound effects

## 📦 Installation

### Option 1: Play Online
Visit the live demo: [Pimple Popper Live](https://your-deployed-url.com)

### Option 2: Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/khiem-nguyen-ict/pimple-popper-main.git
   cd pimple-popper-main
   ```

2. **Install dependencies** (if any)
   ```bash
   npm install
   ```

3. **Start local server**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

4. **Open in browser**
   - Navigate to `http://localhost:8000`

## 📱 Controls

### Desktop
- 🖱️ **Left Mouse Click** - Pop pimples
- ⌨️ **SPACE** - Pause/Resume
- ⌨️ **ESC** - Back to menu

### Mobile / Tablet
- 👆 **Tap** - Pop pimples
- 🎨 **Swipe** - Navigate menus

## 📊 Game Modes

### Classic Mode
- Endless gameplay until you miss too many
- No time limit, play at your own pace
- Perfect for casual play

### Challenge Mode
- 60-second countdown timer
- Maximize score in limited time
- Test your reflexes!

### Zen Mode
- Relaxing gameplay with no scoring
- Just pop pimples at your own pace
- Great for stress relief

## 🏅 Achievements & Unlockables

- 🌟 Pop 10 pimples in a row
- 🎖️ Score 1000+ points
- 🔥 50-pimple combo
- 💎 Beat your personal best 5 times

## 📈 Leaderboard

- Local leaderboard stored in browser
- Your top 10 scores tracked
- Compare with friends (manual)

## 🎨 Customization

### Modify Game Settings

Edit `config.js`:
```javascript
const CONFIG = {
  difficulty: 1.0,      // Game difficulty multiplier
  soundEnabled: true,   // Toggle sound effects
  particleEffects: true // Toggle animations
};
```

### Customize Appearance

Edit `styles.css`:
- Change pimple colors and sizes
- Adjust UI layout and fonts
- Customize particle effects

## 🚀 Deployment

### Deploy to GitHub Pages
```bash
git push origin main
# GitHub Pages will serve it automatically
```

### Deploy to Netlify
1. Connect your repo to Netlify
2. Build command: (leave empty)
3. Publish directory: `/`
4. Deploy!

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Game not loading | Check browser console (F12), clear cache |
| Audio not playing | Check browser audio permissions, check volume |
| High score not saving | Check if localStorage is enabled |
| Mobile not responding | Try rotating device, update browser |

## 🔧 Development

### Project Structure
```
pimple-popper-main/
├── index.html           # Main game page
├── css/
│   ├── style.css       # Main styles
│   └── animations.css  # Animation definitions
├── js/
│   ├── game.js         # Core game logic
│   ├── ui.js           # UI management
│   ├── sound.js        # Audio handler
│   └── storage.js      # Data persistence
├── assets/
│   ├── sounds/         # Sound effects
│   └── sprites/        # Game graphics
└── README.md
```

### Running in Development Mode
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

## 🎯 Future Enhancements

- [ ] Multiplayer mode
- [ ] Different pimple types with power-ups
- [ ] Daily challenges
- [ ] Cosmetic skins and themes
- [ ] Mobile app version
- [ ] Cloud leaderboard

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add: amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code:
- Follows the existing code style
- Includes comments for complex logic
- Has been tested in multiple browsers
- Works on mobile and desktop

## 📞 Contact

- **Author**: Khiem Nguyen
- **Email**: nguyenthanhkhiemvn@gmail.com
- **GitHub**: [@khiem-nguyen-ict](https://github.com/khiem-nguyen-ict)

## ⭐ Show Your Support

- ⭐ Star this repo if you enjoyed the game
- 🍴 Fork to create your own version
- 📢 Share with friends and on social media
- 💬 Leave feedback and suggestions

---

**Have fun popping! 🎉**
