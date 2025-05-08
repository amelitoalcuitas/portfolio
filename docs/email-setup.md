# Email Setup Guide

This document explains how to set up the email functionality in the contact form.

## EmailJS Setup

The contact form uses [EmailJS](https://www.emailjs.com/) to send emails directly from the client-side without requiring a backend server.

### Step 1: Create an EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/) and sign up for a free account
2. Verify your email address

### Step 2: Add an Email Service

1. In the EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. Name your service (e.g., "portfolio_contact")
6. Note down the Service ID

### Step 3: Create an Email Template

1. In the EmailJS dashboard, go to "Email Templates"
2. Click "Create New Template"
3. Design your email template with the following variables:
   - `{{from_name}}` - The name of the person sending the message
   - `{{from_email}}` - The email of the person sending the message
   - `{{subject}}` - The subject of the message
   - `{{message}}` - The message content
4. Save the template
5. Note down the Template ID

### Step 4: Get Your Public Key

1. In the EmailJS dashboard, go to "Account" > "API Keys"
2. Copy your Public Key

### Step 5: Update the Environment Variables

1. Open the `.env` file in the root of the project
2. Update the following variables with your actual values:
   - `VITE_EMAILJS_SERVICE_ID` - Your EmailJS Service ID
   - `VITE_EMAILJS_TEMPLATE_ID` - Your EmailJS Template ID
   - `VITE_EMAILJS_PUBLIC_KEY` - Your EmailJS Public Key

## Testing

After setting up EmailJS, you can test the contact form by:

1. Running the development server with `npm run dev`
2. Filling out the contact form
3. Submitting the form
4. Checking your email to see if you received the test message

## Environment Variables

This project uses environment variables to store sensitive information like API keys. The following files are used:

- `.env` - Contains the actual environment variables used in development
- `.env.example` - A template file showing which variables are needed (without actual values)

For security reasons:

- Never commit your actual `.env` file to version control
- Always use `.env.example` as a template for other developers
- In production, set these environment variables on your hosting platform

## Troubleshooting

If emails are not being sent:

1. Check the browser console for any errors
2. Verify that your EmailJS account is active
3. Make sure your email service is properly connected
4. Confirm that all environment variables are correctly set
5. Check that the `.env` file exists and has the correct values
