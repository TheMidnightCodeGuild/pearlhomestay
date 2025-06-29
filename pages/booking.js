import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, getDocs } from 'firebase/firestore';

export default function Booking() {
  const [numPeople, setNumPeople] = useState(1);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rooms, setRooms] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Fetch all rooms from Firestore
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsRef = collection(db, 'rooms');
        const querySnapshot = await getDocs(roomsRef);
        const roomsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRooms(roomsData);
      } catch (err) {
        console.error('Error fetching rooms:', err);
        setError('Error loading room information');
      }
    };

    fetchRooms();
  }, []);

  const checkRoomAvailability = async () => {
    if (!checkIn || !checkOut) return;
    
    setLoading(true);
    setError('');
    
    try {
      const available = rooms.map(room => ({
        id: room.id,
        type: room.type,
        capacity: room.capacity,
        acCost: room.ACCost,
        nonAcCost: room.NonACCost,
        description: `${room.type.charAt(0).toUpperCase() + room.type.slice(1)} Room`
      }));
      
      setAvailableRooms(available);
      
      if (available.length === 0) {
        setError('No rooms available');
      }
    } catch (err) {
      setError('Error checking room availability');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (checkIn && checkOut) {
      checkRoomAvailability();
    }
  }, [checkIn, checkOut, numPeople, rooms, checkRoomAvailability]);

  // Calculate total price whenever selected rooms change
  useEffect(() => {
    const total = selectedRooms.reduce((sum, room) => {
      return sum + (room.isAc ? room.acCost : room.nonAcCost);
    }, 0);
    setTotalPrice(total);
  }, [selectedRooms]);

  const handleRoomSelection = (room, isAc) => {
    setSelectedRooms(prev => {
      const existingRoom = prev.find(r => r.id === room.id);
      if (existingRoom) {
        // If room is already selected, remove it
        return prev.filter(r => r.id !== room.id);
      } else {
        // Add new room selection
        return [...prev, { ...room, isAc }];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedRooms.length === 0) {
      setError('Please select at least one room');
      return;
    }
    setShowCustomerForm(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/create-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerEmail,
          customerPhone,
          numPeople,
          checkIn,
          checkOut,
          selectedRooms,
          totalPrice
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error creating booking');
      }

      setBookingSuccess(true);
      // Reset form
      setNumPeople(1);
      setCheckIn('');
      setCheckOut('');
      setSelectedRooms([]);
      setCustomerEmail('');
      setCustomerPhone('');
      setShowCustomerForm(false);

    } catch (err) {
      setError(err.message || 'Error creating booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (bookingSuccess) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Booking Request Submitted!</h2>
          <p className="text-gray-600 mb-4">
            Thank you for your reservation request. We have sent a confirmation email to {customerEmail}.
            We will review your request and confirm your booking shortly.
          </p>
          <button
            onClick={() => setBookingSuccess(false)}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Make Another Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Make a Reservation</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={showCustomerForm ? handleBookingSubmit : handleSubmit} className="space-y-6">
          {!showCustomerForm ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="numPeople" className="block text-sm font-medium text-gray-700">
                    Number of People
                  </label>
                  <input
                    type="number"
                    id="numPeople"
                    min="1"
                    max="12"
                    value={numPeople}
                    onChange={(e) => setNumPeople(parseInt(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    id="checkIn"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    id="checkOut"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {loading ? (
                <div className="text-center">Checking availability...</div>
              ) : availableRooms.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700">Available Rooms:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {availableRooms.map((room) => (
                      <div key={room.id} className="p-4 border rounded-lg">
                        <p className="font-medium">{room.description}</p>
                        <p className="text-sm text-gray-600">Capacity: {room.capacity} people</p>
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium">AC Room</p>
                              <p className="text-sm text-gray-600">₹{room.acCost} + GST</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRoomSelection(room, true)}
                              className={`px-4 py-2 rounded-md text-sm font-medium ${
                                selectedRooms.some(r => r.id === room.id && r.isAc)
                                  ? 'bg-green-600 text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {selectedRooms.some(r => r.id === room.id && r.isAc) ? 'Selected' : 'Select'}
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium">Non-AC Room</p>
                              <p className="text-sm text-gray-600">₹{room.nonAcCost} + GST</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRoomSelection(room, false)}
                              className={`px-4 py-2 rounded-md text-sm font-medium ${
                                selectedRooms.some(r => r.id === room.id && !r.isAc)
                                  ? 'bg-green-600 text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {selectedRooms.some(r => r.id === room.id && !r.isAc) ? 'Selected' : 'Select'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {selectedRooms.length > 0 && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-700 mb-2">Selected Rooms:</h3>
                  <div className="space-y-2">
                    {selectedRooms.map((room, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">
                          {room.description} ({room.isAc ? 'AC' : 'Non-AC'})
                        </span>
                        <span className="text-sm font-medium">
                          ₹{room.isAc ? room.acCost : room.nonAcCost} + GST
                        </span>
                      </div>
                    ))}
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between items-center font-medium">
                        <span>Total Price:</span>
                        <span>₹{totalPrice} + GST</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || selectedRooms.length === 0}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Book Now
              </button>
            </>
          ) : (
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">Customer Details</h3>
              <div>
                <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="customerEmail"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="customerPhone"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowCustomerForm(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
