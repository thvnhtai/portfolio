# Deployment Guide

This portfolio is configured to deploy automatically to GitHub Pages using GitHub Actions.

## 🚀 Automatic Deployment

The deployment process is fully automated using GitHub Actions. Every push to the `main` branch will trigger:

1. **Build**: Compiles and optimizes the React application
2. **Deploy**: Publishes to GitHub Pages automatically

## 📋 Prerequisites

1. A GitHub repository (public or private with GitHub Pages enabled)
2. GitHub Actions enabled in your repository settings

## ⚙️ Setup Instructions

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the settings

### Step 2: Configure Repository Name (if needed)

The base path is automatically detected from your repository name. If you need to override it, update `vite.config.js`:

```js
// Option 1: Manual override
base: '/your-repo-name/',

// Option 2: Use environment variable (current setup)
base: process.env.GITHUB_PAGES ? `/${repositoryName}/` : '/',
```

The workflow automatically sets `GITHUB_REPOSITORY` environment variable, so it should work out of the box!

### Step 3: Push to Main Branch

Simply push your code to the `main` branch:

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

The GitHub Action will automatically:
- Build your application
- Deploy it to GitHub Pages
- Make it available at `https://yourusername.github.io/portfolio/`

## 🔍 Workflow Files

### `.github/workflows/deploy.yml`
Main deployment workflow that:
- Builds the application on push to `main`
- Deploys to GitHub Pages
- Runs on manual trigger (`workflow_dispatch`)

### `.github/workflows/ci.yml`
Continuous Integration workflow that:
- Validates builds on push and pull requests
- Ensures code quality before deployment

## 🌐 Custom Domain Setup

This portfolio is configured for custom domain: **thvnhtai.app**

### Step 1: DNS Configuration (Name.com)

1. Log in to your **Name.com** account
2. Go to **My Domains** → Select **thvnhtai.app**
3. Navigate to **DNS Records** or **Advanced DNS**

4. Add/Update DNS records:

   **Option A: Using CNAME (Recommended)**
   ```
   Type: CNAME
   Host: @ (or leave blank for root domain)
   Answer: yourusername.github.io
   TTL: 3600 (or default)
   ```

   **Option B: Using A Records (Alternative)**
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
   Answer: yourusername.github.io
   TTL: 3600
   ```

5. **Save** the DNS records

### Step 2: Configure GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Custom domain**, enter: `thvnhtai.app`
4. Check **Enforce HTTPS** (will be available after DNS propagates)
5. Click **Save**

### Step 3: Verify Setup

The `CNAME` file is already configured in `public/CNAME` with `thvnhtai.app`.

After DNS propagation (usually 5-60 minutes):
- Visit `https://thvnhtai.app` - should show your portfolio
- Visit `http://thvnhtai.app` - should redirect to HTTPS

### DNS Propagation Check

You can check if DNS has propagated using:
- [DNS Checker](https://dnschecker.org/)
- [WhatsMyDNS](https://www.whatsmydns.net/)

Enter `thvnhtai.app` and check for CNAME pointing to `yourusername.github.io`

### Troubleshooting Custom Domain

**Domain not working:**
- Wait 24-48 hours for full DNS propagation
- Verify DNS records are correct in Name.com
- Check GitHub Pages settings show the custom domain
- Ensure CNAME file exists in `public/CNAME`

**SSL Certificate issues:**
- GitHub automatically provisions SSL certificates
- May take a few hours after DNS is configured
- Ensure "Enforce HTTPS" is enabled in GitHub Pages settings

**www subdomain:**
- If you want `www.thvnhtai.app` to work, add CNAME record for `www` subdomain
- GitHub Pages will handle both root and www automatically

## 📝 Manual Deployment

You can also trigger deployment manually:

1. Go to **Actions** tab in your repository
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow**
4. Select branch and click **Run workflow**

## 🔧 Troubleshooting

### Build Fails
- Check GitHub Actions logs for errors
- Ensure all dependencies are listed in `package.json`
- Verify Node.js version compatibility

### 404 Errors
- Verify the `base` path in `vite.config.js` matches your repository name
- Ensure `.nojekyll` file exists in the root
- Check GitHub Pages settings

### Assets Not Loading
- Verify `base` path configuration
- Check that assets are in the `dist/assets` folder after build
- Clear browser cache

## 📊 Deployment Status

Check deployment status:
- **Actions** tab: View workflow runs and logs
- **Settings** → **Pages**: View deployment history and status

## 🔄 Rollback

To rollback to a previous deployment:

1. Go to **Actions** tab
2. Find the successful deployment
3. Click **Re-run jobs** to redeploy that version

Or manually revert commits:

```bash
git revert <commit-hash>
git push origin main
```

## 🎯 Best Practices

1. **Test Locally First**: Always test builds locally before pushing
   ```bash
   npm run build
   npm run preview
   ```

2. **Use Branches**: Create feature branches and use pull requests
   ```bash
   git checkout -b feature/new-section
   # Make changes
   git push origin feature/new-section
   # Create PR on GitHub
   ```

3. **Monitor Deployments**: Check Actions tab regularly for failed deployments

4. **Environment Variables**: Use GitHub Secrets for sensitive data if needed

## 📚 Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#github-pages)
