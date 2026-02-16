# Complete Setup Guide - End to End

This guide will walk you through setting up your portfolio from scratch, including GitHub repository creation, deployment, and custom domain configuration.

## 📋 Prerequisites

- [x] Node.js installed (v18 or higher)
- [x] Git installed
- [x] GitHub account
- [x] Domain purchased: `thvnhtai.app` from Name.com

## 🚀 Step-by-Step Setup

### Step 1: Initialize Git Repository (Local)

Open terminal in your project directory and run:

```bash
# Navigate to project directory
cd /Users/thanhtai.nguyen/portfolio

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Portfolio setup with GitHub Pages deployment"
```

### Step 2: Create GitHub Repository

#### Option A: Using GitHub Website (Recommended)

1. **Go to GitHub**
   - Visit [github.com](https://github.com)
   - Sign in to your account

2. **Create New Repository**
   - Click the **+** icon in top right → **New repository**
   - Repository name: `portfolio` (or any name you prefer)
   - Description: `Senior Frontend Engineer Portfolio`
   - Visibility: **Public** (required for free GitHub Pages) or **Private** (if you have GitHub Pro)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
   - Click **Create repository**

3. **Copy Repository URL**
   - After creation, GitHub will show you the repository URL
   - Copy the HTTPS URL (e.g., `https://github.com/yourusername/portfolio.git`)

#### Option B: Using GitHub CLI (If installed)

```bash
gh repo create portfolio --public --description "Senior Frontend Engineer Portfolio"
```

### Step 3: Connect Local Repository to GitHub

```bash
# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Verify remote is added
git remote -v

# Push code to GitHub
git branch -M main
git push -u origin main
```

**Note**: You may be prompted for GitHub credentials. Use:
- Username: Your GitHub username
- Password: Personal Access Token (not your GitHub password)

### Step 4: Create Personal Access Token (If needed)

If you get authentication errors:

1. Go to GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Click **Generate new token (classic)**
3. Name: `portfolio-deployment`
4. Select scopes: `repo` (full control)
5. Click **Generate token**
6. **Copy the token** (you won't see it again!)
7. Use this token as your password when pushing

### Step 5: Enable GitHub Pages

1. **Go to Repository Settings**
   - Navigate to your repository on GitHub
   - Click **Settings** tab

2. **Configure Pages**
   - Scroll down to **Pages** section (left sidebar)
   - Under **Source**, select **GitHub Actions**
   - Click **Save**

3. **Verify GitHub Actions**
   - Go to **Actions** tab
   - You should see the workflow running
   - Wait for it to complete (usually 2-3 minutes)

### Step 6: Configure Custom Domain (thvnhtai.app)

#### 6.1: Name.com DNS Configuration

1. **Log in to Name.com**
   - Go to [name.com](https://www.name.com)
   - Sign in to your account

2. **Access DNS Management**
   - Click **My Domains**
   - Click on **thvnhtai.app**
   - Go to **DNS Records** or **Advanced DNS**

3. **Add DNS Records**

   **For Root Domain (thvnhtai.app):**
   
   Add CNAME record:
   ```
   Type: CNAME
   Host: @ (or leave blank)
   Answer: YOUR_USERNAME.github.io (replace YOUR_USERNAME with your GitHub username)
   TTL: 3600
   ```
   
   **If CNAME doesn't work for root domain, use A records:**
   ```
   Type: A
   Host: @
   Answer: 185.199.108.153
   
   Type: A
   Host: @
   Answer: 185.199.109.153
   
   Type: A
   Host: @
   Answer: 185.199.110.153
   
   Type: A
   Host: @
   Answer: 185.199.111.153
   ```

   **For www subdomain (optional):**
   ```
   Type: CNAME
   Host: www
   Answer: YOUR_USERNAME.github.io
   TTL: 3600
   ```

4. **Save Changes**
   - Click **Save** or **Add Record**
   - Wait 5-60 minutes for DNS propagation

#### 6.2: GitHub Pages Custom Domain Setup

1. **Add Custom Domain**
   - Go to repository → **Settings** → **Pages**
   - Under **Custom domain**, enter: `thvnhtai.app`
   - Click **Save**

2. **Enable HTTPS (After DNS Propagation)**
   - Wait for DNS to propagate (check with DNS checker tools)
   - Return to **Settings** → **Pages**
   - Check **Enforce HTTPS**
   - GitHub will provision SSL certificate (may take 1-24 hours)

### Step 7: Verify Deployment

1. **Check GitHub Actions**
   - Go to **Actions** tab
   - Verify workflow completed successfully (green checkmark)

2. **Check GitHub Pages**
   - Go to **Settings** → **Pages**
   - Verify deployment shows as successful
   - Custom domain should show as "Verified" (after DNS propagates)

3. **Test URLs**
   - GitHub Pages: `https://YOUR_USERNAME.github.io/portfolio/`
   - Custom Domain: `https://thvnhtai.app` (after DNS propagates)

### Step 8: Verify DNS Propagation

Use these tools to check DNS status:

- [DNS Checker](https://dnschecker.org/#CNAME/thvnhtai.app)
- [WhatsMyDNS](https://www.whatsmydns.net/#CNAME/thvnhtai.app)

Expected: CNAME pointing to `YOUR_USERNAME.github.io`

## 🔄 Future Updates

After initial setup, to update your portfolio:

```bash
# Make changes to your code
# ...

# Stage changes
git add .

# Commit changes
git commit -m "Update portfolio content"

# Push to GitHub (triggers automatic deployment)
git push origin main
```

Deployment happens automatically via GitHub Actions!

## ✅ Verification Checklist

- [ ] Git repository initialized locally
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] GitHub Pages enabled (Source: GitHub Actions)
- [ ] GitHub Actions workflow completed successfully
- [ ] DNS records configured in Name.com
- [ ] Custom domain added in GitHub Pages settings
- [ ] DNS propagation verified (using DNS checker tools)
- [ ] Domain accessible: `https://thvnhtai.app`
- [ ] SSL certificate provisioned (green checkmark in GitHub)
- [ ] HTTPS enforced in GitHub Pages settings

## 🐛 Troubleshooting

### Git Push Issues

**Problem**: Authentication failed
- **Solution**: Use Personal Access Token instead of password
- See Step 4 above

**Problem**: Remote already exists
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
```

### GitHub Actions Not Running

**Problem**: Workflow not triggering
- **Solution**: 
  1. Check GitHub Actions is enabled: Settings → Actions → General
  2. Ensure workflow file exists: `.github/workflows/deploy.yml`
  3. Push to `main` branch (not `master`)

### Domain Not Working

**Problem**: `thvnhtai.app` not resolving
- **Solution**: 
  1. Verify DNS records in Name.com
  2. Check DNS propagation (use DNS checker tools)
  3. Wait up to 24 hours for full propagation
  4. Verify custom domain in GitHub Pages settings

### Build Failures

**Problem**: GitHub Actions build failing
- **Solution**:
  1. Check Actions tab for error logs
  2. Verify `package.json` has all dependencies
  3. Test build locally: `npm run build`

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Name.com DNS Guide](https://www.name.com/support/articles/205188508-Using-Advanced-DNS)
- [Domain Setup Guide](./DOMAIN_SETUP.md)

## 🎉 Success!

Once all steps are complete, your portfolio will be:
- ✅ Automatically deployed on every push to `main`
- ✅ Available at `https://thvnhtai.app`
- ✅ Secured with SSL/HTTPS
- ✅ Fully automated via GitHub Actions

---

**Need Help?** Check the detailed guides:
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment details
- [DOMAIN_SETUP.md](./DOMAIN_SETUP.md) - Domain configuration details
