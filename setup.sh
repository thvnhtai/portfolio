#!/bin/bash

# Portfolio Setup Script
# This script helps you set up your portfolio repository and deployment

set -e

echo "🚀 Portfolio Setup Script"
echo "=========================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Git and Node.js are installed"
echo ""

# Check if git repository is initialized
if [ -d ".git" ]; then
    echo -e "${YELLOW}⚠️  Git repository already initialized${NC}"
    read -p "Do you want to reinitialize? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Reinitializing git repository..."
        rm -rf .git
        git init
    else
        echo "Keeping existing git repository"
    fi
else
    echo "📦 Initializing git repository..."
    git init
fi

echo ""
echo "📝 Creating initial commit..."
git add .
git commit -m "Initial commit: Portfolio setup with GitHub Pages deployment" || {
    echo -e "${YELLOW}⚠️  No changes to commit or commit already exists${NC}"
}

echo ""
echo -e "${GREEN}✅ Local git repository initialized${NC}"
echo ""

# Get GitHub username
echo -e "${BLUE}📋 GitHub Configuration${NC}"
echo "=========================="
read -p "Enter your GitHub username: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ GitHub username is required"
    exit 1
fi

REPO_NAME="portfolio"
REPO_URL="https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"

echo ""
echo "Repository will be: ${REPO_URL}"
echo ""

# Check if remote already exists
if git remote get-url origin &> /dev/null; then
    CURRENT_REMOTE=$(git remote get-url origin)
    echo -e "${YELLOW}⚠️  Remote 'origin' already exists: ${CURRENT_REMOTE}${NC}"
    read -p "Do you want to update it? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git remote set-url origin ${REPO_URL}
        echo "✅ Remote updated"
    else
        echo "Keeping existing remote"
    fi
else
    echo "🔗 Adding remote repository..."
    git remote add origin ${REPO_URL}
    echo "✅ Remote added"
fi

echo ""
echo -e "${GREEN}✅ Git configuration complete!${NC}"
echo ""

# Set main branch
git branch -M main 2>/dev/null || echo "Already on main branch"

echo ""
echo "📋 Next Steps:"
echo "=============="
echo ""
echo "1. Create GitHub repository:"
echo "   Visit: https://github.com/new"
echo "   Repository name: ${REPO_NAME}"
echo "   Visibility: Public (for free GitHub Pages)"
echo "   DO NOT initialize with README, .gitignore, or license"
echo ""
echo "2. Push your code:"
echo "   git push -u origin main"
echo ""
echo "3. Enable GitHub Pages:"
echo "   Repository → Settings → Pages → Source: GitHub Actions"
echo ""
echo "4. Configure custom domain (thvnhtai.app):"
echo "   - Add DNS records in Name.com (see DOMAIN_SETUP.md)"
echo "   - Add domain in GitHub Pages settings"
echo ""
echo "📚 For detailed instructions, see:"
echo "   - SETUP_GUIDE.md (complete guide)"
echo "   - QUICK_START.md (quick reference)"
echo "   - DOMAIN_SETUP.md (domain configuration)"
echo ""
echo -e "${GREEN}✨ Setup script completed!${NC}"
