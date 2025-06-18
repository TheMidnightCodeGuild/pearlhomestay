import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import nodemailer from 'nodemailer';

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      customerEmail,
      customerPhone,
      numPeople,
      checkIn,
      checkOut,
      selectedRooms,
      totalPrice
    } = req.body;

    // Create booking document
    const bookingData = {
      customerEmail,
      customerPhone,
      numPeople,
      checkIn,
      checkOut,
      selectedRooms,
      totalPrice,
      status: 'pending', // pending, confirmed, cancelled
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    // Save to Firestore
    const bookingRef = await addDoc(collection(db, 'bookings'), bookingData);

    // Send email to customer
    const customerEmailContent = `
      <h2>Reservation Request Received</h2>
      <p>Dear Guest,</p>
      <p>Thank you for your reservation request at Pearl Homestay. We have received your booking details:</p>
      <ul>
        <li>Check-in: ${checkIn}</li>
        <li>Check-out: ${checkOut}</li>
        <li>Number of Guests: ${numPeople}</li>
        <li>Selected Rooms: ${selectedRooms.map(room => 
          `${room.description} (${room.isAc ? 'AC' : 'Non-AC'})`
        ).join(', ')}</li>
        <li>Total Price: ₹${totalPrice} + GST</li>
      </ul>
      <p>We will review your request and confirm your booking shortly. You will receive another email with the confirmation.</p>
      <p>Booking Reference: ${bookingRef.id}</p>
      <p>Best regards,<br>Pearl Homestay Team</p>
    `;

    // Send email to homestay
    const homestayEmailContent = `
      <h2>New Reservation Request</h2>
      <p>A new reservation request has been received:</p>
      <ul>
        <li>Customer Email: ${customerEmail}</li>
        <li>Customer Phone: ${customerPhone}</li>
        <li>Check-in: ${checkIn}</li>
        <li>Check-out: ${checkOut}</li>
        <li>Number of Guests: ${numPeople}</li>
        <li>Selected Rooms: ${selectedRooms.map(room => 
          `${room.description} (${room.isAc ? 'AC' : 'Non-AC'})`
        ).join(', ')}</li>
        <li>Total Price: ₹${totalPrice} + GST</li>
      </ul>
      <p>Booking Reference: ${bookingRef.id}</p>
    `;

    // Send emails
    await Promise.all([
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: customerEmail,
        subject: 'Reservation Request - Pearl Homestay',
        html: customerEmailContent
      }),
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.HOMESTAY_EMAIL,
        subject: 'New Reservation Request - Pearl Homestay',
        html: homestayEmailContent
      })
    ]);

    return res.status(200).json({ 
      message: 'Booking request submitted successfully',
      bookingId: bookingRef.id
    });

  } catch (error) {
    console.error('Error creating booking:', error);
    return res.status(500).json({ message: 'Error creating booking' });
  }
} 