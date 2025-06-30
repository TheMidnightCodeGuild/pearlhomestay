import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ConfirmBooking() {
  const router = useRouter();
  const { bookingId } = router.query;
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (bookingId) {
      fetchBookingDetails();
    }
  }, [bookingId]);

  const fetchBookingDetails = async () => {
    try {
      const response = await fetch(`/api/get-booking?bookingId=${bookingId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error fetching booking');
      }

      setBooking(data.booking);
    } catch (err) {
      setError(err.message || 'Error fetching booking details');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmBooking = async () => {
    setConfirming(true);
    setError('');

    try {
      const response = await fetch('/api/confirm-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookingId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error confirming booking');
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Error confirming booking');
    } finally {
      setConfirming(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-4">
            The booking has been successfully confirmed. A confirmation email has been sent to the customer.
          </p>
          <button
            onClick={() => router.push('/asdfghjkl')}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Booking Not Found</h2>
          <p className="text-gray-600 mb-4">The requested booking could not be found.</p>
          <button
            onClick={() => router.push('/')}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  // Don't allow confirmation if already confirmed
  if (booking.status === 'confirmed') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Booking Already Confirmed</h2>
          <p className="text-gray-600 mb-4">This booking has already been confirmed.</p>
          <button
            onClick={() => router.push('/asdfghjkl')}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Confirm Booking</h2>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">Booking Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Customer Email</p>
              <p className="font-medium">{booking.customerEmail}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Customer Phone</p>
              <p className="font-medium">{booking.customerPhone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Check-in Date</p>
              <p className="font-medium">{booking.checkIn}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Check-out Date</p>
              <p className="font-medium">{booking.checkOut}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Number of Guests</p>
              <p className="font-medium">{booking.numPeople}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Price</p>
              <p className="font-medium">₹{booking.totalPrice}</p>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-gray-600">Selected Rooms</p>
            <ul className="mt-2 space-y-1">
              {booking.selectedRooms.map((room, index) => (
                <li key={index} className="font-medium">
                  {room.description} ({room.isAc ? 'AC' : 'Non-AC'})
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-gray-600">Booking Reference</p>
            <p className="font-medium font-mono">{booking.id}</p>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleConfirmBooking}
            disabled={confirming}
            className="flex-1 bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {confirming ? 'Confirming...' : 'Confirm Booking'}
          </button>
          <button
            onClick={() => router.push('/asdfghjkl')}
            className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}