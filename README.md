
# One Card (Judgement) Game Scoreboard

An interactive, modern React app for tracking scores, bids, and eliminations in the classic Judgement card game.

## 🚀 Live Demo

**Hosted at:** [https://judgement-scoreboard.vercel.app/](https://judgement-scoreboard.vercel.app/) 

## 🎮 How It Works

- Supports 4-8 players, with dynamic elimination rounds based on deck constraints.
- Tracks player names, scores, bids, tricks, and status (active/eliminated).
- Cyclic bidding order and robust elimination logic.
- Modern, responsive UI with collapsible scoreboard, banners, modals, and navigation.
- Home and How-to-Play buttons always accessible.
- All game state is saved in localStorage for session persistence.

## 🗂️ File Structure & Key Components

- `src/App.js` — Main app, routing, header/footer, navigation.
- `src/Header.js` — Fixed header with title, Home, and How-to-Play buttons.
- `src/Footer.js` — Footer with developer credits.
- `src/Welcome.js` — Welcome screen and entry point.
- `src/HowToPlay.js` — Game rules and elimination logic explanation.
- `src/Setup.js` — Player name input and validation.
- `src/Game.js` — Main game logic, round rotation, bidding, trick input, scoring, elimination, banners/modals.
- `src/Scoreboard.js` — Collapsible, themed scoreboard for player status and scores.
- `src/BiddingForm.js` — Handles bidding phase and input.
- `src/TrickInput.js` — Handles trick input phase.
- `src/RoundSummary.js` — Shows round results, scores, and elimination info.
- `src/App.css` — Custom styles and theming.

## 🛠️ Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/aadi1011/judgementscoreboard.git
cd judgementscoreboard
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🤝 Contribution Guidelines

1. Fork the repo and create a new branch for your feature or fix.
2. Write clear, concise code and add comments where necessary.
3. Ensure your changes do not break existing functionality.
4. Submit a pull request with a detailed description of your changes.
5. All contributions are welcome—UI improvements, bug fixes, new features, and documentation!

## 🙏 Credits & Acknowledgements

- Original developer: **Aadith Sukumar** ([aadithsukumar.com](https://www.aadithsukumar.com))
- Inspired by the one-card game I play with my family often.
- Built with [React](https://reactjs.org/).

<!-- ## 📄 License

MIT License. See `LICENSE` for details. -->
