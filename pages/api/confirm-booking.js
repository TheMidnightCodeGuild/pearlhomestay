import { db } from '../../lib/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import nodemailer from 'nodemailer';

<<<<<<< HEAD
// Configure email transporters
=======
// Configure email transporter
>>>>>>> 30cf696eb86e7a14a0c1b304892453855e6ef2b9
const homestayTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.HOMESTAY_EMAIL,
    pass: process.env.HOMESTAY_PASSWORD
  }
});

<<<<<<< HEAD
const normalTransporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

=======
>>>>>>> 30cf696eb86e7a14a0c1b304892453855e6ef2b9
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { bookingId } = req.body;

    if (!bookingId) {
      return res.status(400).json({ message: 'Booking ID is required' });
    }

    // Update booking status in Firestore
    const bookingRef = doc(db, 'bookings', bookingId);
    await updateDoc(bookingRef, {
      status: 'confirmed',
      updatedAt: serverTimestamp()
    });

    // Get booking details for email
    const { getDoc } = await import('firebase/firestore');
    const bookingDoc = await getDoc(bookingRef);
    
    if (!bookingDoc.exists()) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const bookingData = bookingDoc.data();

    // Send confirmation email to customer
    const customerConfirmationEmail = `
      <h2>Booking Confirmed - Pearl Homestay</h2>
      <p>Dear Guest,</p>
      <p>Great news! Your reservation at Pearl Homestay has been confirmed.</p>
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Booking Details:</h3>
        <ul>
          <li><strong>Booking Reference:</strong> ${bookingId}</li>
          <li><strong>Check-in:</strong> ${bookingData.checkIn}</li>
          <li><strong>Check-out:</strong> ${bookingData.checkOut}</li>
          <li><strong>Number of Guests:</strong> ${bookingData.numPeople}</li>
          <li><strong>Selected Rooms:</strong> ${bookingData.selectedRooms.map(room => 
            `${room.description} (${room.isAc ? 'AC' : 'Non-AC'})`
          ).join(', ')}</li>
          <li><strong>Total Price:</strong> ₹${bookingData.totalPrice} + GST</li>
        </ul>
      </div>
      <p><strong>Important Information:</strong></p>
      <ul>
        <li>Please arrive at the homestay between 12:00 PM and 2:00 PM for check-in</li>
        <li>Check-out time is 11:00 AM</li>
        <li>Please carry a valid ID proof for all guests</li>
        <li>For any queries, please contact us at ${process.env.HOMESTAY_EMAIL}</li>
      </ul>
      <p>We look forward to welcoming you to Pearl Homestay!</p>
      <p>Best regards,<br>Pearl Homestay Team</p>
    `;

    // Send confirmation email to customer
    await homestayTransporter.sendMail({
      from: process.env.HOMESTAY_EMAIL,
      to: bookingData.customerEmail,
      subject: 'Booking Confirmed - Pearl Homestay',
      html: customerConfirmationEmail
    });

    return res.status(200).json({ 
      message: 'Booking confirmed successfully',
      bookingId: bookingId
    });

  } catch (error) {
    console.error('Error confirming booking:', error);
    return res.status(500).json({ message: 'Error confirming booking' });
  }
}