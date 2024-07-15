import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  // Set CORS headers
  if (request.method === 'OPTIONS') {
    const headers = {
      'Access-Control-Allow-Origin': '*', // Allow all origins. Change this to your frontend URL in production
      'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
    return new Response(null, { status: 204, headers });
  }

  // Process the actual request
  try {
    const { name, email, phone, address, service, pickupDate, pickupTime } = await request.json();

    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Consider using a more secure method like OAuth for Gmail
      auth: {
        user: process.env.EMAIL_USER, // Defined in your environment variables
        pass: process.env.EMAIL_PASS,
      },
    });

    // Setup email data
    const mailOptions = {
      from:{
        name: "Swabi Laundry Website",
        address: email,
      }, // Sender address
      to: [process.env.EMAIL_USER, email], // Replace with your target email address
      subject: 'New Order from Swabi Laundry',
      html: `
       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #f7f7f7; padding: 20px; text-align: center;">
          <h1 style="color: #333; margin: 0; font-size: 28px;">New Laundry Order</h1>
        </div>
        <div style="padding: 20px; background-color: #fff;">
          <table style="width: 100%; border-collapse: collapse; font-size: 18px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;"><strong>Name:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;"><strong>Email:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;"><strong>Phone:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;"><strong>Address:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">${address}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;"><strong>Service:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;"><strong>Pickup Date:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">${pickupDate}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;"><strong>Pickup Time:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">${pickupTime}</td>
            </tr>
          </table>
        </div>
        <div style="background-color: #f7f7f7; padding: 20px; text-align: center;">
          <p style="margin: 0; color: #333; font-size: 16px;">Thank you for using Swabi Laundry!</p>
        </div>
      </div>
    `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);

    const headers = {
      'Access-Control-Allow-Origin': '*', // Allow all origins. Change this to your frontend URL in production
      'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
    return new Response(JSON.stringify({ message: 'Email sent successfully', status: 200, info: info.messageId }), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Failed to send email', error);

    const headers = {
      'Access-Control-Allow-Origin': '*', // Allow all origins. Change this to your frontend URL in production
      'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
    return new Response(JSON.stringify({ message: 'Failed to send email', status: 500, error: error.message }), {
      status: 500,
      headers,
    });
  }
}
