# Configuration Guide

Hướng dẫn chi tiết để cấu hình portfolio của bạn.

## 📝 Bước 1: Personalize Content

### Update `src/config/personalInfo.js`

1. **Basic Information:**
```javascript
name: 'Your Full Name',
title: 'Senior Frontend Engineer',
location: 'Ho Chi Minh City, Vietnam',
email: 'your.email@example.com',
```

2. **Social Links:**
```javascript
social: {
  github: 'https://github.com/YOUR_USERNAME',
  linkedin: 'https://linkedin.com/in/YOUR_USERNAME',
  twitter: 'https://twitter.com/YOUR_USERNAME',
  email: 'mailto:your.email@example.com',
},
```

3. **Hero Section:**
- Update `hero.badge`, `hero.title`, `hero.titleHighlight`
- Update `hero.description`
- Update `hero.stats` với số liệu thật của bạn

4. **About Section:**
- Update `about.paragraphs` với thông tin về bạn
- Update `about.highlights` với highlights của bạn

5. **Resume:**
```javascript
resume: {
  downloadUrl: '/resume.pdf', // Đặt file resume.pdf vào public folder
  fileName: 'Resume-YourName.pdf',
},
```

## 📧 Bước 2: Setup Contact Form

### Option A: EmailJS (Recommended)

1. **Đăng ký EmailJS:**
   - Truy cập https://www.emailjs.com/
   - Tạo account miễn phí
   - Verify email

2. **Tạo Email Service:**
   - Vào **Email Services** → **Add New Service**
   - Chọn Gmail hoặc email service khác
   - Connect và lưu **Service ID**

3. **Tạo Email Template:**
   - Vào **Email Templates** → **Create New Template**
   - Template content:
     ```
     From: {{from_name}} <{{from_email}}>
     Subject: New Contact Form Message
     
     Message:
     {{message}}
     ```
   - Lưu **Template ID**

4. **Get Public Key:**
   - Vào **Account** → **General**
   - Copy **Public Key**

5. **Update Config:**
   ```javascript
   // src/config/personalInfo.js
   emailConfig: {
     emailjs: {
       serviceId: 'YOUR_SERVICE_ID',
       templateId: 'YOUR_TEMPLATE_ID',
       publicKey: 'YOUR_PUBLIC_KEY',
     },
     provider: 'emailjs',
   }
   ```

### Option B: Formspree

1. **Đăng ký Formspree:**
   - Truy cập https://formspree.io/
   - Tạo account miễn phí
   - Verify email

2. **Tạo Form:**
   - Click **New Form**
   - Copy **Form ID**

3. **Update Config:**
   ```javascript
   emailConfig: {
     formspree: {
       formId: 'YOUR_FORM_ID',
     },
     provider: 'formspree',
   }
   ```

## 📊 Bước 3: Setup Google Analytics

1. **Tạo GA4 Property:**
   - Truy cập https://analytics.google.com/
   - Tạo property mới
   - Copy **Measurement ID** (format: G-XXXXXXXXXX)

2. **Update Config:**
   ```javascript
   // src/config/personalInfo.js
   analyticsConfig: {
     googleAnalytics: {
       measurementId: 'G-XXXXXXXXXX',
       enabled: true, // Set to true
     },
   }
   ```

3. **Update index.html:**
   - Uncomment Google Analytics script
   - Replace `G-XXXXXXXXXX` với Measurement ID của bạn

## 🖼️ Bước 4: Add Project Images

1. **Chuẩn bị Images:**
   - Tạo screenshots của projects
   - Recommended size: 1200x800px (16:9)
   - Format: PNG hoặc WebP
   - Optimize images để giảm file size

2. **Đặt vào folder:**
   ```
   public/images/projects/
   ├── project1.png
   ├── project2.png
   └── ...
   ```

3. **Update Projects Config:**
   ```javascript
   // src/config/projects.js
   {
     id: 1,
     title: 'Your Project',
     image: '/images/projects/project1.png', // Thay emoji
     // ... other fields
   }
   ```

4. **Add Project Details:**
   - `fullDescription`: Mô tả chi tiết
   - `features`: Array các features
   - `liveUrl`: Link đến live demo
   - `githubUrl`: Link đến GitHub repo
   - `challenges`: Mô tả challenges và solutions

## 📄 Bước 5: Add Resume

1. **Tạo Resume PDF:**
   - Sử dụng Canva, Overleaf, hoặc tool khác
   - Export thành PDF
   - Đặt tên: `resume.pdf`

2. **Đặt vào public folder:**
   ```
   public/resume.pdf
   ```

3. **Resume sẽ tự động hiển thị download button trong Hero section**

## 🔍 Bước 6: SEO Optimization

### Update `index.html`:

1. **Meta Tags:**
   - Update `<title>` với tên của bạn
   - Update `meta description`
   - Update `og:title`, `og:description`
   - Update `twitter:title`, `twitter:description`

2. **Open Graph Image:**
   - Tạo image 1200x630px
   - Đặt vào `public/og-image.png`
   - Update `og:image` và `twitter:image` URLs

3. **Structured Data:**
   - Update JSON-LD với thông tin của bạn
   - Update `sameAs` với social links

4. **Sitemap:**
   - File `public/sitemap.xml` đã được tạo
   - Update `lastmod` dates khi cần

## ✅ Checklist

- [ ] Update `src/config/personalInfo.js` với thông tin của bạn
- [ ] Update `src/config/projects.js` với projects thật
- [ ] Setup EmailJS hoặc Formspree
- [ ] Add Google Analytics Measurement ID
- [ ] Add project images vào `public/images/projects/`
- [ ] Add resume PDF vào `public/resume.pdf`
- [ ] Update SEO meta tags trong `index.html`
- [ ] Create và add `og-image.png`
- [ ] Test contact form
- [ ] Test resume download
- [ ] Verify Google Analytics tracking

## 🚀 Sau khi hoàn thành

1. **Test locally:**
   ```bash
   npm run dev
   ```

2. **Build và test:**
   ```bash
   npm run build
   npm run preview
   ```

3. **Deploy:**
   ```bash
   git add .
   git commit -m "Personalize portfolio content"
   git push origin main
   ```

## 📚 Resources

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [Formspree Documentation](https://formspree.io/guides)
- [Google Analytics Setup](https://support.google.com/analytics/answer/9304153)
- [Open Graph Protocol](https://ogp.me/)
- [Schema.org Documentation](https://schema.org/)

---

**Lưu ý:** Sau khi update config, tất cả components sẽ tự động sử dụng thông tin mới!
