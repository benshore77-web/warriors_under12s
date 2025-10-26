# Old Wimbledonian Warriors U12s Bleep Test Tracker

A web application to track fitness scores for the Old Wimbledonian Warriors Under 12s team using the Met Police 15-metre bleep test.

## Features

- **Score Tracking**: View all player scores from Test 1 (Sept 21) and Test 2 (Oct 19)
- **Sorting Options**:
  - Sort alphabetically (default)
  - Sort by best score
- **Progress Tracking**: See improvement percentages between tests
- **Target Monitoring**: Track progress toward target scores (10% improvement goal)
- **Information Panel**: Detailed explanation of the bleep test and why it's useful
- **Editable Data**: Add, edit, and delete player scores
- **Persistent Storage**: All data is saved locally in your browser
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Wimbledonian Warriors Colors**: Styled in traditional maroon and Cambridge blue

## How to Use

### Viewing Scores

1. Open `index.html` in your web browser
2. Scores are displayed alphabetically by default
3. Click **"Sort by Best Score"** to rank players by their Test 2 performance
4. Coaches appear at the bottom of the list

### Understanding the Display

- **Green** improvement percentages indicate positive progress
- **Red** indicates a decrease in score
- **Yellow** indicates no change
- Target scores with a **✓** mark mean the player has reached or exceeded their goal
- The 🔥 and 👊👏 emojis celebrate exceptional improvements

### Editing Scores

1. Click **"Edit Scores"** to enter edit mode
2. Click **"Edit"** next to any player to modify their information
3. Click **"+ Add New Player"** to add a new team member
4. Fill in the form:
   - **Player Name**: Required
   - **Test 1 Score**: Optional (leave blank if not available)
   - **Test 2 Score**: Optional
   - **Target Score**: Optional
   - **Notes**: Optional (e.g., "dead leg", emojis)
5. Click **"Save"** to save changes or **"Cancel"** to discard
6. Click **"Delete"** to remove a player (confirmation required)
7. Click **"Exit Edit Mode"** when finished

### Learning About the Bleep Test

1. Click **"About the Bleep Test"** to open the information panel
2. Read about:
   - What the bleep test is
   - The Met Police 15m version specifics
   - Why it's useful for rugby training
3. Click the **×** button to close the panel

### Data Persistence

All changes are automatically saved to your browser's local storage. Your data will persist between sessions unless you:
- Clear your browser data
- Use a different browser
- Use incognito/private browsing mode

**Important**: To preserve data across devices or as a backup, consider exporting the data periodically.

## Deployment Options

### Option 1: Open Locally
Simply double-click `index.html` to open in your default browser.

### Option 2: Host on GitHub Pages
1. Create a GitHub repository
2. Upload all files (index.html, styles.css, script.js)
3. Enable GitHub Pages in repository settings
4. Access via: `https://[username].github.io/[repository-name]`

### Option 3: Host on Netlify
1. Drag and drop the folder to [Netlify Drop](https://app.netlify.com/drop)
2. Get an instant live URL

### Option 4: Host on Vercel
1. Create a free account at [Vercel](https://vercel.com)
2. Import the project
3. Deploy with one click

## Updating for Future Tests

When conducting new monthly tests:

1. Click **"Edit Scores"**
2. For each player, click **"Edit"**
3. Update their latest score and new target
4. Consider adding the date to the notes if tracking multiple tests over time

For significant updates (e.g., Test 3, Test 4), you may want to modify the HTML to add additional columns or create a new page for each testing period.

## Customization

### Colors
The app uses traditional Wimbledon RFC colors:
- **Maroon**: #800020 (primary)
- **Cambridge Blue**: #A3C1AD (accent)
- **Navy**: #1a2332 (secondary)

To customize colors, edit the CSS variables in `styles.css`:

```css
:root {
    --maroon: #800020;
    --cambridge-blue: #A3C1AD;
    --navy: #1a2332;
}
```

### Test Dates
Update test dates in `index.html` in the `test-info` section.

## Browser Compatibility

- Chrome/Edge: ✓
- Firefox: ✓
- Safari: ✓
- Opera: ✓
- IE 11: Limited support

## Support

For issues or questions, contact the team coach or administrator.

---

**Target: 10% improvement for everyone! 💪**

*Warriors spirit, every training session!*
