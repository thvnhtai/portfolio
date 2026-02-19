# Email Template Setup Guide

Hướng dẫn setup email template đẹp cho EmailJS.

## 📧 Email Template Setup

### Bước 1: Copy Template HTML

1. **Mở file:** `email-templates/emailjs-template.html`
2. **Copy toàn bộ nội dung HTML**

### Bước 2: Tạo Template trong EmailJS

1. **Vào EmailJS Dashboard:**
   - https://www.emailjs.com/
   - Login vào account

2. **Vào Email Templates:**
   - Click **Email Templates** trong sidebar
   - Click **Create New Template**

3. **Template Settings:**

   **Template Name:** `Portfolio Contact Form - Professional`
   
   **Subject:** `💼 New Contact Form Message from {{from_name}}`
   
   **Content Type:** Chọn **HTML**
   
   **Content:** 
   - Paste HTML code từ `emailjs-template.html`
   - Hoặc copy từ file đã tạo

4. **Save Template:**
   - Click **Save**
   - Copy **Template ID**

### Bước 3: Update Config

Update `src/config/personalInfo.js` với Template ID mới:

```javascript
emailConfig: {
  emailjs: {
    serviceId: 'service_abc123',
    templateId: 'template_NEW_ID',  // ← Template ID mới
    publicKey: 'abcdefghijklmnop',
  },
  provider: 'emailjs',
}
```

### Bước 4: Test Template

1. **Test trong EmailJS:**
   - Click **Test** button trong template editor
   - Điền test data
   - Send test email

2. **Test từ website:**
   ```bash
   npm run dev
   ```
   - Điền contact form
   - Submit
   - Check email inbox

## 🎨 Template Features

✅ **Professional Design:**
- Modern gradient header với brand colors
- Clean card-based layout
- Responsive design cho mobile

✅ **Information Display:**
- Sender name và email highlighted
- Message content trong styled box
- Timestamp và source info

✅ **Call to Action:**
- Reply button với pre-filled email
- Direct mailto link

✅ **Branding:**
- Portfolio website branding
- Professional footer
- Consistent với website design

## 📝 Template Variables

Template sử dụng các variables:
- `{{from_name}}` - Tên người gửi
- `{{from_email}}` - Email người gửi
- `{{message}}` - Nội dung message
- `{{to_email}}` - Email nhận (từ config)
- `{{timestamp}}` - Thời gian gửi (optional)

## 🔧 Customization

Bạn có thể customize template:

1. **Colors:**
   - Thay `#00d9ff` với brand color của bạn
   - Update gradient colors trong header

2. **Content:**
   - Thay "Senior Frontend Engineer" với title của bạn
   - Update footer text

3. **Layout:**
   - Adjust padding và spacing
   - Thêm/bớt sections

## ✅ Checklist

- [ ] Copy HTML từ `emailjs-template.html`
- [ ] Tạo template mới trong EmailJS
- [ ] Paste HTML vào template content
- [ ] Set subject line
- [ ] Save và copy Template ID
- [ ] Update config với Template ID mới
- [ ] Test template trong EmailJS
- [ ] Test từ website contact form
- [ ] Verify email nhận được đẹp và đầy đủ

---

**Done!** Email template của bạn sẽ trông professional và phù hợp với Senior Frontend Engineer! 🎉
