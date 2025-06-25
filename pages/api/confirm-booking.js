import { db } from '../../lib/firebase';
import { doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
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
    const { bookingId } = req.body;

    if (!bookingId) {
      return res.status(400).json({ message: 'Booking ID is required' });
    }

    // Get reservation details
    const { getDoc } = await import('firebase/firestore');
    const reservationRef = doc(db, 'reservations', bookingId);
    const reservationDoc = await getDoc(reservationRef);
    
    if (!reservationDoc.exists()) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    const reservationData = reservationDoc.data();

    // Create new booking in bookings collection
    const bookingRef = doc(db, 'bookings', bookingId);
    await setDoc(bookingRef, {
      ...reservationData,
      status: 'confirmed',
      updatedAt: serverTimestamp()
    });

    // Delete from reservations collection
    await deleteDoc(reservationRef);

    // Send confirmation email to customer
    const customerConfirmationEmail = `
      <h2>Booking Confirmed - Pearl Homestay</h2>
      <p>Dear Guest,</p>
      <p>Great news! Your reservation at Pearl Homestay has been confirmed.</p>
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Booking Details:</h3>
        <ul>
          <li><strong>Booking Reference:</strong> ${bookingId}</li>
          <li><strong>Check-in:</strong> ${reservationData.checkIn}</li>
          <li><strong>Check-out:</strong> ${reservationData.checkOut}</li>
          <li><strong>Number of Guests:</strong> ${reservationData.numPeople}</li>
          <li><strong>Selected Rooms:</strong> ${reservationData.selectedRooms.map(room => 
            `${room.description} (${room.isAc ? 'AC' : 'Non-AC'})`
          ).join(', ')}</li>
          <li><strong>Total Price:</strong> ₹${reservationData.totalPrice} + GST</li>
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
      to: reservationData.customerEmail,
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