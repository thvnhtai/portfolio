# Quick Start Guide

Fast setup commands for your portfolio deployment.

## 🚀 Quick Setup Commands

### 1. Initialize Git (if not done)

```bash
cd /Users/thanhtai.nguyen/portfolio
git init
git add .
git commit -m "Initial commit: Portfolio setup"
```

### 2. Create GitHub Repository

**On GitHub Website:**
1. Go to [github.com/new](https://github.com/new)
2. Repository name: `portfolio`
3. Description: `Senior Frontend Engineer Portfolio`
4. Visibility: **Public**
5. **Don't** check any initialization options
6. Click **Create repository**

### 3. Connect and Push

```bash
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

**If authentication fails:**
- Use Personal Access Token (not password)
- Create token: GitHub → Settings → Developer settings → Personal access tokens → Generate new token (classic)
- Select `repo` scope

### 4. Enable GitHub Pages

1. Repository → **Settings** → **Pages**
2. Source: **GitHub Actions**
3. Save

### 5. Configure Domain (Name.com)

1. Login to [name.com](https://www.name.com)
2. My Domains → **thvnhtai.app** → DNS Records
3. Add CNAME:
   ```
   Type: CNAME
   Host: @
   Answer: YOUR_USERNAME.github.io
   ```
4. Save

### 6. Add Domain to GitHub

1. Repository → **Settings** → **Pages**
2. Custom domain: `thvnhtai.app`
3. Save
4. Wait for DNS propagation (5-60 min)
5. Enable **Enforce HTTPS**

## ✅ Done!

Your portfolio will be live at: `https://thvnhtai.app`

---

**For detailed instructions**, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)
