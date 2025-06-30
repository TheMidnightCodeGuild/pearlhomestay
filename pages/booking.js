import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Navbar from './components/Navbar';

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
        return prev.filter(r => r.id !== room.id);
      } else {
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
      <div className="min-h-screen bg-[#F2E2D7] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center border-2 border-[#8B593E]">
          <h2 className="text-3xl font-bold text-[#8B593E] mb-6">Booking Confirmed!</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Thank you for choosing Pearl Homestay! We have sent a confirmation email to {customerEmail}.
            We look forward to welcoming you soon.
          </p>
          <button
            onClick={() => setBookingSuccess(false)}
            className="w-full py-3 px-6 rounded-lg text-white bg-[#8B593E] hover:bg-[#6B4530] transition duration-300 ease-in-out font-medium text-lg shadow-md"
          >
            Make Another Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
    <Navbar />
    <div className="h-screen flex flex-col items-center justify-center bg-[#F2E2D7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8 border-2 border-[#8B593E]">
        <h2 className="text-4xl font-bold text-center mb-10 text-[#8B593E] ">Book Your Stay Now...</h2>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg">
            <p className="font-medium">{error}</p>
          </div>
        )}
        
        <form onSubmit={showCustomerForm ? handleBookingSubmit : handleSubmit} className="space-y-8">
          {!showCustomerForm ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label htmlFor="numPeople" className="block text-lg font-medium text-[#4A2511]">
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    id="numPeople"
                    min="1"
                    max="12"
                    value={numPeople}
                    onChange={(e) => setNumPeople(parseInt(e.target.value))}
                    className="w-full p-3 border-2 border-[#C6A38D] rounded-lg focus:border-[#8B593E] focus:ring focus:ring-[#8B593E]/20 transition duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="checkIn" className="block text-lg font-medium text-[#4A2511]">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    id="checkIn"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full p-3 border-2 border-[#C6A38D] rounded-lg focus:border-[#8B593E] focus:ring focus:ring-[#8B593E]/20 transition duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="checkOut" className="block text-lg font-medium text-[#4A2511]">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    id="checkOut"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full p-3 border-2 border-[#C6A38D] rounded-lg focus:border-[#8B593E] focus:ring focus:ring-[#8B593E]/20 transition duration-200"
                    required
                  />
                </div>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#8B593E] border-t-transparent mx-auto"></div>
                  <p className="mt-4 text-lg text-[#4A2511]">Checking availability...</p>
                </div>
              ) : availableRooms.length > 0 ? (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-[#4A2511]">Available Rooms</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {availableRooms.map((room) => (
                      <div key={room.id} className="p-6 border-2 border-[#C6A38D] rounded-xl hover:border-[#8B593E] transition duration-200">
                        <h4 className="text-xl font-semibold text-[#8B593E] mb-2">{room.description}</h4>
                        <p className="text-[#4A2511] mb-4">Capacity: {room.capacity} guests</p>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-[#F2E2D7] rounded-lg">
                            <div>
                              <p className="font-medium text-[#4A2511]">AC Room</p>
                              <p className="text-[#8B593E]">₹{room.acCost} + GST</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRoomSelection(room, true)}
                              className={`px-6 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                                selectedRooms.some(r => r.id === room.id && r.isAc)
                                  ? 'bg-[#8B593E] text-white'
                                  : 'bg-white text-[#8B593E] border-2 border-[#8B593E] hover:bg-[#8B593E] hover:text-white'
                              }`}
                            >
                              {selectedRooms.some(r => r.id === room.id && r.isAc) ? 'Selected' : 'Select'}
                            </button>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-[#F2E2D7] rounded-lg">
                            <div>
                              <p className="font-medium text-[#4A2511]">Non-AC Room</p>
                              <p className="text-[#8B593E]">₹{room.nonAcCost} + GST</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRoomSelection(room, false)}
                              className={`px-6 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                                selectedRooms.some(r => r.id === room.id && !r.isAc)
                                  ? 'bg-[#8B593E] text-white'
                                  : 'bg-white text-[#8B593E] border-2 border-[#8B593E] hover:bg-[#8B593E] hover:text-white'
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
                <div className="mt-8 p-6 bg-[#F2E2D7] rounded-xl">
                  <h3 className="text-2xl font-semibold text-[#4A2511] mb-4">Your Selection</h3>
                  <div className="space-y-3">
                    {selectedRooms.map((room, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <span className="text-[#4A2511] font-medium">
                          {room.description} ({room.isAc ? 'AC' : 'Non-AC'})
                        </span>
                        <span className="text-[#8B593E] font-semibold">
                          ₹{room.isAc ? room.acCost : room.nonAcCost} + GST
                        </span>
                      </div>
                    ))}
                    <div className="border-t-2 border-[#C6A38D] pt-4 mt-4">
                      <div className="flex justify-between items-center text-xl font-bold">
                        <span className="text-[#4A2511]">Total Amount:</span>
                        <span className="text-[#8B593E]">₹{totalPrice} + GST</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || selectedRooms.length === 0}
                className="w-full py-4 px-6 text-lg font-semibold text-white bg-[#8B593E] rounded-xl hover:bg-[#6B4530] transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg"
              >
                Continue to Book
              </button>
            </>
          ) : (
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-[#4A2511]">Your Details</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="customerEmail" className="block text-lg font-medium text-[#4A2511] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="customerEmail"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full p-3 border-2 border-[#C6A38D] rounded-lg focus:border-[#8B593E] focus:ring focus:ring-[#8B593E]/20 transition duration-200"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="customerPhone" className="block text-lg font-medium text-[#4A2511] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="customerPhone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full p-3 border-2 border-[#C6A38D] rounded-lg focus:border-[#8B593E] focus:ring focus:ring-[#8B593E]/20 transition duration-200"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCustomerForm(false)}
                  className="flex-1 py-4 px-6 text-lg font-semibold text-[#8B593E] bg-white border-2 border-[#8B593E] rounded-xl hover:bg-[#F2E2D7] transition duration-300"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-4 px-6 text-lg font-semibold text-white bg-[#8B593E] rounded-xl hover:bg-[#6B4530] transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg"
                >
                  {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
    </>
  );
}
