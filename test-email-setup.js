#!/usr/bin/env node

/**
 * Email Setup Test Script
 * Run this script to verify your email configuration
 * Usage: node test-email-setup.js
 */

import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

console.log('📧 Email Setup Verification\n')
console.log('=' .repeat(50))

try {
  // Read config file
  const configPath = join(__dirname, 'src/config/personalInfo.js')
  const configContent = readFileSync(configPath, 'utf-8')
  
  // Check EmailJS config
  const emailjsServiceId = configContent.match(/serviceId:\s*['"]([^'"]+)['"]/)?.[1]
  const emailjsTemplateId = configContent.match(/templateId:\s*['"]([^'"]+)['"]/)?.[1]
  const emailjsPublicKey = configContent.match(/publicKey:\s*['"]([^'"]+)['"]/)?.[1]
  const provider = configContent.match(/provider:\s*['"]([^'"]+)['"]/)?.[1]
  
  // Check Formspree config
  const formspreeFormId = configContent.match(/formId:\s*['"]([^'"]+)['"]/)?.[1]
  
  console.log('\n📋 Configuration Status:\n')
  
  if (provider === 'emailjs') {
    console.log('Provider: EmailJS')
    console.log('─'.repeat(50))
    console.log(`Service ID:     ${emailjsServiceId && emailjsServiceId !== 'YOUR_SERVICE_ID' ? '✅ ' + emailjsServiceId : '❌ Not configured'}`)
    console.log(`Template ID:    ${emailjsTemplateId && emailjsTemplateId !== 'YOUR_TEMPLATE_ID' ? '✅ ' + emailjsTemplateId : '❌ Not configured'}`)
    console.log(`Public Key:     ${emailjsPublicKey && emailjsPublicKey !== 'YOUR_PUBLIC_KEY' ? '✅ ' + emailjsPublicKey.substring(0, 10) + '...' : '❌ Not configured'}`)
    
    if (emailjsServiceId === 'YOUR_SERVICE_ID' || emailjsTemplateId === 'YOUR_TEMPLATE_ID' || emailjsPublicKey === 'YOUR_PUBLIC_KEY') {
      console.log('\n⚠️  EmailJS is not fully configured!')
      console.log('\n📝 Next steps:')
      console.log('1. Sign up at https://www.emailjs.com/')
      console.log('2. Create Email Service → Copy Service ID')
      console.log('3. Create Email Template → Copy Template ID')
      console.log('4. Get Public Key from Account → General')
      console.log('5. Update src/config/personalInfo.js')
      console.log('\n📚 See EMAIL_SETUP_GUIDE.md for detailed instructions')
    } else {
      console.log('\n✅ EmailJS configuration looks good!')
      console.log('\n🧪 Test your form:')
      console.log('1. Run: npm run dev')
      console.log('2. Fill out the contact form')
      console.log('3. Submit and check your email inbox')
    }
  } else if (provider === 'formspree') {
    console.log('Provider: Formspree')
    console.log('─'.repeat(50))
    console.log(`Form ID:        ${formspreeFormId && formspreeFormId !== 'YOUR_FORM_ID' ? '✅ ' + formspreeFormId : '❌ Not configured'}`)
    
    if (formspreeFormId === 'YOUR_FORM_ID') {
      console.log('\n⚠️  Formspree is not fully configured!')
      console.log('\n📝 Next steps:')
      console.log('1. Sign up at https://formspree.io/')
      console.log('2. Create New Form → Copy Form ID')
      console.log('3. Update src/config/personalInfo.js')
      console.log('\n📚 See EMAIL_SETUP_GUIDE.md for detailed instructions')
    } else {
      console.log('\n✅ Formspree configuration looks good!')
      console.log('\n🧪 Test your form:')
      console.log('1. Run: npm run dev')
      console.log('2. Fill out the contact form')
      console.log('3. Submit and check your email inbox')
    }
  } else {
    console.log('❌ No provider configured')
    console.log('\n📝 Set provider to "emailjs" or "formspree" in src/config/personalInfo.js')
  }
  
  console.log('\n' + '='.repeat(50))
  
} catch (error) {
  console.error('❌ Error reading config file:', error.message)
  console.log('\nMake sure src/config/personalInfo.js exists')
}
