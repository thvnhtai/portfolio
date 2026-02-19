# Quick Email Setup - 5 Minutes

Hướng dẫn nhanh để setup contact form trong 5 phút.

## 🚀 EmailJS Quick Setup (Recommended)

### Step 1: Sign Up (1 phút)
1. Truy cập: https://www.emailjs.com/
2. Click **Sign Up** → Dùng Gmail/Google account
3. Verify email

### Step 2: Create Service (1 phút)
1. Dashboard → **Email Services** → **Add New Service**
2. Chọn **Gmail** → **Connect Account**
3. Authorize Gmail → **Copy Service ID** (ví dụ: `service_abc123`)

### Step 3: Create Template (1 phút)
1. Dashboard → **Email Templates** → **Create New Template**
2. **Subject:** `New Contact: {{from_name}}`
3. **Content:**
   ```
   From: {{from_name}}
   Email: {{from_email}}
   
   Message:
   {{message}}
   ```
4. **Save** → **Copy Template ID** (ví dụ: `template_xyz789`)

### Step 4: Get Public Key (30 giây)
1. Dashboard → **Account** → **General**
2. Copy **Public Key** (ví dụ: `abcdefghijklmnop`)

### Step 5: Update Config (1 phút)
Mở `src/config/personalInfo.js` và update:

```javascript
emailConfig: {
  emailjs: {
    serviceId: 'service_abc123',     // ← Paste Service ID
    templateId: 'template_xyz789',    // ← Paste Template ID
    publicKey: 'abcdefghijklmnop',    // ← Paste Public Key
  },
  provider: 'emailjs',                // ← Keep this
}
```

### Step 6: Test (30 giây)
```bash
npm run dev
```

Điền form → Submit → Check email inbox!

---

## 📬 Formspree Quick Setup (Alternative)

### Step 1: Sign Up (1 phút)
1. Truy cập: https://formspree.io/
2. Sign Up với email
3. Verify email

### Step 2: Create Form (1 phút)
1. Dashboard → **Forms** → **New Form**
2. **Email to receive:** Your email
3. **Copy Form ID** (ví dụ: `xvgwqkny`)

### Step 3: Update Config (30 giây)
Mở `src/config/personalInfo.js`:

```javascript
emailConfig: {
  formspree: {
    formId: 'xvgwqkny',              // ← Paste Form ID
  },
  provider: 'formspree',              // ← Change to formspree
}
```

### Step 4: Test (30 giây)
```bash
npm run dev
```

Điền form → Submit → Check email!

---

## ✅ Verify Setup

Run test script:
```bash
node test-email-setup.js
```

Hoặc check manually:
- ✅ Service ID/Template ID/Public Key đã được update (EmailJS)
- ✅ Form ID đã được update (Formspree)
- ✅ Provider đúng ('emailjs' hoặc 'formspree')
- ✅ Test form và nhận được email

---

## 🐛 Troubleshooting

**Email không nhận được?**
- Check spam folder
- Verify Service/Template IDs đúng
- Check browser console for errors
- Verify email service connection

**Form không submit?**
- Check config file có đúng format không
- Check browser console
- Verify provider setting

**Cần help?**
- Xem `EMAIL_SETUP_GUIDE.md` cho hướng dẫn chi tiết
- EmailJS Docs: https://www.emailjs.com/docs/
- Formspree Docs: https://formspree.io/guides

---

**Done!** Contact form của bạn đã sẵn sàng nhận messages! 🎉
