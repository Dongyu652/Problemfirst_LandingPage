# problemfirst

> A marketplace connecting founders with people who experience real problems. Built by student founders, based on real customer discovery interviews, and inspired by the Lean Startup methodology. Discover validated pain points, talk to future users, and build what the world actually needs.

## 🚀 Live Demo

Visit: `https://yourusername.github.io/problemfirst/`

## 📁 Project Structure

```
problemfirst/
├── index.html              ← Homepage & main app (entry point)
├── 404.html                ← Custom 404 page
├── robots.txt              ← SEO crawler rules
├── .nojekyll               ← Bypasses Jekyll on GitHub Pages
├── README.md               ← This file
├── LICENSE                 ← Project license
│
└── assets/
    ├── css/
    │   └── style.css       ← All styles (design tokens, components, pages)
    │
    ├── js/
    │   └── script.js       ← Application logic (routing, rendering, state)
    │
    └── images/
        ├── favicon.svg     ← Browser tab icon
        └── og-image.png    ← Social media preview image (add your own)
```

## 🛠️ Deploy to GitHub Pages

### Option A: Quick Deploy (recommended)

1. **Create a new repository** on GitHub named `problemfirst`

2. **Upload all files** via the GitHub web interface:
   - Go to your new repo → "Add file" → "Upload files"
   - Drag the entire contents of this folder
   - Commit to `main` branch

3. **Enable GitHub Pages**:
   - Go to repo **Settings** → **Pages**
   - Source: **Deploy from a branch**
   - Branch: **main** → Folder: **/ (root)**
   - Click **Save**

4. **Wait 1–2 minutes**, then visit:
   ```
   https://yourusername.github.io/problemfirst/
   ```

### Option B: Git CLI

```bash
# Navigate into this folder
cd problemfirst

# Initialize git
git init
git add .
git commit -m "Initial commit: problemfirst MVP"

# Add your remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/problemfirst.git
git branch -M main
git push -u origin main
```

Then enable GitHub Pages in Settings → Pages → main branch → root folder.

### Option C: GitHub CLI

```bash
# Create repo and push in one command
gh repo create problemfirst --public --source=. --remote=origin --push

# Enable Pages
gh api repos/{owner}/problemfirst/pages -X POST -f source.branch=main -f source.path=/
```

## ✏️ Customization

### Change Colors
Edit CSS variables in `assets/css/style.css`:
```css
:root {
  --teal: #0F766E;        /* Primary brand color */
  --coral: #F97316;        /* Secondary accent */
  --bg: #FFF9F2;           /* Page background */
}
```

### Change Content
Edit `assets/js/script.js` — the `PROBLEMS` array at the top contains all sample data.

### Add a Custom Domain
1. Create a `CNAME` file in the root with your domain:
   ```
   www.problemfirst.com
   ```
2. Configure DNS at your domain registrar:
   - CNAME record: `www` → `yourusername.github.io`

### Add Analytics
Add before `</head>` in `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 📊 Pages Included

| Page | Description |
|------|-------------|
| **Landing** | Hero, value props, video placeholder, how-it-works, FAQ, pricing |
| **Problem Board** | Searchable/filterable card feed with upvotes |
| **Problem Detail** | Full problem view + founder interaction panel |
| **Post a Problem** | Structured form for problem facers |
| **Pressure Test** | Founders post ideas for community critique + bounties |
| **Checkout** | Simulated $5 payment flow for revenue validation |

## 🧪 MVP Validation Metrics

Track these to validate the idea:
1. Problem submission rate (% of visitors who post)
2. Founder engagement rate (% who upvote/comment)
3. Interview request rate (requests per problem)
4. Interview acceptance rate (% accepted)
5. Checkout conversion rate (% who click "Pay $5")

## 📄 License

MIT — Built by student founders, March 2026.
