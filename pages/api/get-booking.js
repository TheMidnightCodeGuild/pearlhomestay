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

    // Get booking details from Firestore
    const bookingRef = doc(db, 'reservations', bookingId);
    const bookingDoc = await getDoc(bookingRef);
    
    if (!bookingDoc.exists()) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const bookingData = bookingDoc.data();

    return res.status(200).json({ 
      booking: {
        id: bookingDoc.id,
        ...bookingData
      }
    });

  } catch (error) {
    console.error('Error fetching booking:', error);
    return res.status(500).json({ message: 'Error fetching booking' });
  }
} 