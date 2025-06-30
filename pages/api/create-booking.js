import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import nodemailer from 'nodemailer';

// Configure email transporters
const homestayTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.HOMESTAY_EMAIL,
    pass: process.env.HOMESTAY_PASSWORD
  }
});

const normalTransporter = nodemailer.createTransport({
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
    const reservationRef = await addDoc(collection(db, 'reservations'), bookingData);

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
        <li>Total Price: ₹${totalPrice}</li>
      </ul>
      <p>We will review your request and confirm your booking shortly. You will receive another email with the confirmation.</p>
      <p>Booking Reference: ${reservationRef.id}</p>
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
        <li>Total Price: ₹${totalPrice}</li>
      </ul>
      <p>Booking Reference: ${reservationRef.id}</p>
      <div style="margin-top: 30px; text-align: center;">
        <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/confirm-booking?bookingId=${reservationRef.id}" 
           style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
          Confirm Booking
        </a>
      </div>
      <p style="margin-top: 20px; font-size: 14px; color: #666;">
        Click the button above to confirm this booking. This will send a confirmation email to the customer.
      </p>
    `;

    // Send emails
    await Promise.all([
      homestayTransporter.sendMail({
        from: process.env.HOMESTAY_EMAIL,
        to: customerEmail,
        subject: 'Reservation Request - Pearl Homestay',
        html: customerEmailContent
      }),
      normalTransporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: process.env.HOMESTAY_EMAIL,
        subject: 'New Reservation Request - Pearl Homestay',
        html: homestayEmailContent
      })
    ]);

    

    return res.status(200).json({ 
      message: 'Reservation request submitted successfully',
      reservationId: reservationRef.id
    });

  } catch (error) {
    console.error('Error creating booking:', error);
    return res.status(500).json({ message: 'Error creating booking' });
  }
} 