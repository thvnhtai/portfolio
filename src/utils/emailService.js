// Email service integration example
// You can use EmailJS, Formspree, or any other service

// Example with EmailJS (https://www.emailjs.com/)
export const sendEmailWithEmailJS = async (formData) => {
  // Install: npm install @emailjs/browser
  // import emailjs from '@emailjs/browser'
  
  // emailjs.init('YOUR_PUBLIC_KEY')
  
  // const templateParams = {
  //   from_name: formData.name,
  //   from_email: formData.email,
  //   message: formData.message,
  // }
  
  // return emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
}

// Example with Formspree (https://formspree.io/)
export const sendEmailWithFormspree = async (formData) => {
  const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      message: formData.message,
    }),
  })
  
  if (!response.ok) {
    throw new Error('Failed to send message')
  }
  
  return response.json()
}

// Example with custom backend API
export const sendEmailWithAPI = async (formData) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  
  if (!response.ok) {
    throw new Error('Failed to send message')
  }
  
  return response.json()
}
