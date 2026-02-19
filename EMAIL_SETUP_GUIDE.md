# Email Setup Guide - EmailJS & Formspree

Hướng dẫn chi tiết để setup contact form với EmailJS hoặc Formspree.

## 📧 Option 1: EmailJS (Recommended - Dễ nhất)

EmailJS cho phép gửi email trực tiếp từ frontend mà không cần backend server.

### Bước 1: Đăng ký EmailJS

1. **Truy cập:** https://www.emailjs.com/
2. **Sign Up** với email của bạn (miễn phí)
3. **Verify email** qua link trong inbox

### Bước 2: Tạo Email Service

1. **Vào Dashboard** → **Email Services**
2. **Click "Add New Service"**
3. **Chọn service:**
   - **Gmail** (nếu dùng Gmail) - Recommended
   - **Outlook** (nếu dùng Outlook)
   - **Custom SMTP** (nếu có email server riêng)

4. **Connect Service:**
   - Nếu chọn Gmail: Click "Connect Account" → Chọn Gmail account → Authorize
   - Nếu chọn Custom SMTP: Nhập SMTP settings

5. **Lưu Service ID:**
   - Sau khi connect, bạn sẽ thấy **Service ID** (ví dụ: `service_abc123`)
   - Copy Service ID này

### Bước 3: Tạo Email Template

1. **Vào Dashboard** → **Email Templates**
2. **Click "Create New Template"**
3. **Template Settings:**

   **Template Name:** `Portfolio Contact Form`
   
   **Subject:** `New Contact Form Message from {{from_name}}`
   
   **Content:**
   ```
   You have a new message from your portfolio contact form.
   
   From: {{from_name}}
   Email: {{from_email}}
   
   Message:
   {{message}}
   
   ---
   This email was sent from your portfolio website.
   ```

4. **Lưu Template:**
   - Click "Save"
   - Copy **Template ID** (ví dụ: `template_xyz789`)

### Bước 4: Get Public Key

1. **Vào Dashboard** → **Account** → **General**
2. **Tìm "Public Key"** section
3. **Copy Public Key** (ví dụ: `abcdefghijklmnop`)

### Bước 5: Update Config File

Mở `src/config/personalInfo.js` và update:

```javascript
emailConfig: {
  emailjs: {
    serviceId: 'service_abc123',        // Service ID từ bước 2
    templateId: 'template_xyz789',      // Template ID từ bước 3
    publicKey: 'abcdefghijklmnop',      // Public Key từ bước 4
  },
  provider: 'emailjs',                  // Chọn 'emailjs'
}
```

### Bước 6: Test Contact Form

1. **Chạy dev server:**
   ```bash
   npm run dev
   ```

2. **Test form:**
   - Điền form trên website
   - Submit
   - Kiểm tra email inbox để xem có nhận được email không

---

## 📬 Option 2: Formspree (Alternative)

Formspree là một form backend service đơn giản.

### Bước 1: Đăng ký Formspree

1. **Truy cập:** https://formspree.io/
2. **Sign Up** với email (free tier: 50 submissions/month)
3. **Verify email**

### Bước 2: Tạo Form

1. **Vào Dashboard** → **Forms**
2. **Click "New Form"**
3. **Form Settings:**
   - **Form Name:** `Portfolio Contact Form`
   - **Email to receive submissions:** Email của bạn
   - **Form endpoint:** Copy **Form ID** (ví dụ: `xvgwqkny`)

### Bước 3: Configure Form Fields

Formspree tự động detect fields từ form, nhưng bạn có thể customize:

1. **Vào Form Settings** → **Settings**
2. **Email Notifications:** Enable
3. **Auto-responder:** Optional (tự động reply cho người gửi)

### Bước 4: Update Config File

Mở `src/config/personalInfo.js` và update:

```javascript
emailConfig: {
  formspree: {
    formId: 'xvgwqkny',                // Form ID từ bước 2
  },
  provider: 'formspree',                // Chọn 'formspree'
}
```

### Bước 5: Update Contact Component (Nếu cần)

Formspree đã được tích hợp sẵn trong code. Chỉ cần update config là đủ.

### Bước 6: Test Contact Form

1. **Chạy dev server:**
   ```bash
   npm run dev
   ```

2. **Test form:**
   - Điền và submit form
   - Kiểm tra email inbox
   - Kiểm tra Formspree dashboard để xem submissions

---

## 🔧 Troubleshooting

### EmailJS Issues

**Problem:** Email không được gửi
- **Solution 1:** Kiểm tra Service ID, Template ID, và Public Key có đúng không
- **Solution 2:** Kiểm tra browser console để xem error messages
- **Solution 3:** Verify email service connection trong EmailJS dashboard
- **Solution 4:** Kiểm tra spam folder

**Problem:** "Invalid public key" error
- **Solution:** Đảm bảo Public Key được copy đầy đủ, không có spaces

**Problem:** Template variables không hoạt động
- **Solution:** Đảm bảo template variables match với code:
  - `{{from_name}}`
  - `{{from_email}}`
  - `{{message}}`

### Formspree Issues

**Problem:** Form không submit
- **Solution 1:** Kiểm tra Form ID có đúng không
- **Solution 2:** Kiểm tra CORS settings trong Formspree dashboard
- **Solution 3:** Kiểm tra browser console để xem errors

**Problem:** "Too many submissions" error
- **Solution:** Free tier giới hạn 50 submissions/month. Upgrade plan hoặc đợi reset monthly

**Problem:** Email không nhận được
- **Solution 1:** Kiểm tra spam folder
- **Solution 2:** Verify email address trong Formspree settings
- **Solution 3:** Kiểm tra Formspree dashboard → Submissions để xem có submissions không

---

## 📊 So sánh EmailJS vs Formspree

| Feature | EmailJS | Formspree |
|---------|---------|-----------|
| **Setup** | ⭐⭐⭐ Dễ | ⭐⭐⭐⭐ Rất dễ |
| **Free Tier** | 200 emails/month | 50 submissions/month |
| **Customization** | ⭐⭐⭐⭐ Nhiều | ⭐⭐⭐ Vừa phải |
| **Email Templates** | ✅ Có | ❌ Không |
| **Spam Protection** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Analytics** | ⭐⭐ | ⭐⭐⭐⭐ |
| **Best For** | Custom email templates | Simple forms |

**Recommendation:** 
- **EmailJS** nếu bạn muốn customize email template và có nhiều control hơn
- **Formspree** nếu bạn muốn setup nhanh và đơn giản nhất

---

## ✅ Checklist

### EmailJS Setup:
- [ ] Đăng ký EmailJS account
- [ ] Tạo Email Service và copy Service ID
- [ ] Tạo Email Template và copy Template ID
- [ ] Copy Public Key
- [ ] Update `src/config/personalInfo.js` với các IDs
- [ ] Test contact form
- [ ] Verify email nhận được

### Formspree Setup:
- [ ] Đăng ký Formspree account
- [ ] Tạo Form và copy Form ID
- [ ] Configure email notifications
- [ ] Update `src/config/personalInfo.js` với Form ID
- [ ] Test contact form
- [ ] Verify email nhận được

---

## 🎯 Quick Start (EmailJS - 5 phút)

1. **Sign up:** https://www.emailjs.com/
2. **Add Service:** Gmail → Connect → Copy Service ID
3. **Create Template:** Use template above → Copy Template ID
4. **Get Public Key:** Account → General → Copy Public Key
5. **Update config:** `src/config/personalInfo.js`
6. **Test:** Submit form và check email

---

## 📝 Example Config

Sau khi setup, file `src/config/personalInfo.js` sẽ trông như thế này:

```javascript
// EmailJS Example
emailConfig: {
  emailjs: {
    serviceId: 'service_abc123',
    templateId: 'template_xyz789',
    publicKey: 'abcdefghijklmnop',
  },
  provider: 'emailjs',
}

// Formspree Example
emailConfig: {
  formspree: {
    formId: 'xvgwqkny',
  },
  provider: 'formspree',
}
```

---

## 🚀 Next Steps

Sau khi setup xong:
1. Test form nhiều lần để đảm bảo hoạt động tốt
2. Customize email template (nếu dùng EmailJS)
3. Setup auto-responder (optional)
4. Monitor submissions trong dashboard

---

**Need Help?** 
- EmailJS Docs: https://www.emailjs.com/docs/
- Formspree Docs: https://formspree.io/guides
