# Custom Domain Setup Guide - thvnhtai.app

This guide provides step-by-step instructions for configuring your custom domain `thvnhtai.app` from Name.com with GitHub Pages.

## 📋 Prerequisites

- Domain purchased: `thvnhtai.app` from Name.com
- GitHub repository with GitHub Pages enabled
- Access to Name.com DNS management

## 🔧 Step-by-Step Configuration

### Part 1: Name.com DNS Configuration

1. **Log in to Name.com**
   - Go to [name.com](https://www.name.com)
   - Sign in to your account

2. **Access DNS Management**
   - Click **My Domains**
   - Find and click on **thvnhtai.app**
   - Navigate to **DNS Records** or **Advanced DNS** section

3. **Configure DNS Records**

   **For Root Domain (thvnhtai.app):**
   
   **Recommended: CNAME Record**
   ```
   Type: CNAME
   Host: @ (or leave blank/empty)
   Answer: yourusername.github.io
   TTL: 3600 (or default)
   ```
   
   **Alternative: A Records** (if CNAME doesn't work for root)
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

   **For www Subdomain (www.thvnhtai.app) - Optional:**
   ```
   Type: CNAME
   Host: www
   Answer: yourusername.github.io
   TTL: 3600
   ```

4. **Save Changes**
   - Click **Save** or **Add Record**
   - Wait for changes to propagate (usually 5-60 minutes)

### Part 2: GitHub Pages Configuration

1. **Enable Custom Domain**
   - Go to your GitHub repository
   - Navigate to **Settings** → **Pages**
   - Under **Custom domain**, enter: `thvnhtai.app`
   - Click **Save**

2. **Enable HTTPS (After DNS Propagation)**
   - Wait for DNS to propagate (check with tools below)
   - Return to **Settings** → **Pages**
   - Check **Enforce HTTPS**
   - GitHub will automatically provision SSL certificate (may take a few hours)

3. **Verify CNAME File**
   - The `public/CNAME` file should contain: `thvnhtai.app`
   - This file is automatically copied to `dist/` during build
   - GitHub Pages uses this to recognize your custom domain

### Part 3: Verification

1. **Check DNS Propagation**
   Use these tools to verify DNS is configured correctly:
   - [DNS Checker](https://dnschecker.org/#CNAME/thvnhtai.app)
   - [WhatsMyDNS](https://www.whatsmydns.net/#CNAME/thvnhtai.app)
   - [MXToolbox](https://mxtoolbox.com/SuperTool.aspx?action=cname%3athvnhtai.app)

   Expected result: CNAME pointing to `yourusername.github.io`

2. **Test Domain Access**
   - Visit `http://thvnhtai.app` (should redirect to HTTPS)
   - Visit `https://thvnhtai.app` (should show your portfolio)
   - If www is configured: `https://www.thvnhtai.app`

3. **Check GitHub Pages Status**
   - Go to **Settings** → **Pages**
   - Verify custom domain shows as "Verified" with green checkmark
   - SSL certificate status should show as "Provisioned"

## ⏱️ Timeline

- **DNS Propagation**: 5 minutes to 24 hours (usually within 1 hour)
- **SSL Certificate**: 1-24 hours after DNS is configured
- **Full Setup**: Typically complete within 24-48 hours

## 🔍 Troubleshooting

### Domain Not Resolving

**Problem**: `thvnhtai.app` shows "Site can't be reached" or DNS error

**Solutions**:
1. Verify DNS records are saved correctly in Name.com
2. Check DNS propagation status using tools above
3. Ensure CNAME points to correct GitHub Pages URL (`yourusername.github.io`)
4. Wait up to 24 hours for full propagation

### SSL Certificate Not Available

**Problem**: HTTPS not working, "Not Secure" warning

**Solutions**:
1. Ensure DNS is fully propagated (check with DNS tools)
2. Verify custom domain is saved in GitHub Pages settings
3. Wait 1-24 hours for GitHub to provision SSL certificate
4. Try removing and re-adding the custom domain in GitHub Pages settings

### CNAME File Issues

**Problem**: GitHub Pages not recognizing custom domain

**Solutions**:
1. Verify `public/CNAME` file contains exactly: `thvnhtai.app` (no trailing slash, no www)
2. Ensure file is committed to repository
3. Check that workflow copies CNAME to dist folder (see deploy.yml)
4. Re-run deployment workflow

### Mixed Content Warnings

**Problem**: Some resources loading over HTTP instead of HTTPS

**Solutions**:
1. Ensure all internal links use HTTPS or relative paths
2. Check that "Enforce HTTPS" is enabled in GitHub Pages settings
3. Clear browser cache and hard refresh (Ctrl+Shift+R / Cmd+Shift+R)

## 📝 Name.com Specific Notes

- **DNS Management Location**: My Domains → Domain Name → DNS Records
- **CNAME for Root**: Some DNS providers don't support CNAME for root domain (@)
  - If CNAME doesn't work, use A records instead (see above)
- **TTL Settings**: Lower TTL (300-600) for faster changes, higher (3600+) for stability
- **Support**: If issues persist, contact Name.com support

## 🔄 After Setup

Once configured:
- All deployments will automatically use your custom domain
- GitHub Pages will handle SSL certificate renewal automatically
- Both `thvnhtai.app` and `www.thvnhtai.app` (if configured) will work

## 📚 Additional Resources

- [GitHub Pages Custom Domain Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Name.com DNS Management](https://www.name.com/support/articles/205188508-Using-Advanced-DNS)
- [DNS Propagation Guide](https://www.name.com/support/articles/115004895548-DNS-propagation)

## ✅ Checklist

- [ ] DNS records configured in Name.com
- [ ] Custom domain added in GitHub Pages settings
- [ ] CNAME file exists in `public/CNAME` with `thvnhtai.app`
- [ ] DNS propagation verified (using DNS checker tools)
- [ ] Domain accessible via HTTP (redirects to HTTPS)
- [ ] Domain accessible via HTTPS
- [ ] SSL certificate provisioned (green checkmark in GitHub)
- [ ] "Enforce HTTPS" enabled in GitHub Pages settings
- [ ] Portfolio loads correctly on custom domain

---

**Need Help?** Check the main [DEPLOYMENT.md](./DEPLOYMENT.md) for general deployment issues.
