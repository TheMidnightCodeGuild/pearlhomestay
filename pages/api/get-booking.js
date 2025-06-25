import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { bookingId } = req.query;

    if (!bookingId) {
      return res.status(400).json({ message: 'Booking ID is required' });
    }

    // First check reservations collection
    const reservationRef = doc(db, 'reservations', bookingId);
    const reservationDoc = await getDoc(reservationRef);
    
    if (reservationDoc.exists()) {
      const reservationData = reservationDoc.data();
      return res.status(200).json({ 
        booking: {
          id: reservationDoc.id,
          ...reservationData,
          status: 'pending'
        }
      });
    }

    // If not found in reservations, check bookings collection
    const bookingRef = doc(db, 'bookings', bookingId);
    const bookingDoc = await getDoc(bookingRef);
    
    if (bookingDoc.exists()) {
      const bookingData = bookingDoc.data();
      return res.status(200).json({ 
        booking: {
          id: bookingDoc.id,
          ...bookingData,
          status: 'confirmed'
        }
      });
    }

    // If not found in either collection
    return res.status(404).json({ message: 'Booking not found' });

  } catch (error) {
    console.error('Error fetching booking:', error);
    return res.status(500).json({ message: 'Error fetching booking' });
  }
} 