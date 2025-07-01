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
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

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
        description: `${room.type.charAt(0).toUpperCase() + room.type.slice(1)} Room`,
        amenities: ['Free WiFi', 'Daily Housekeeping', 'Private Bathroom'],
        images: room.images || []
      }));
      
      setAvailableRooms(available);
      
      if (available.length === 0) {
        setError('No rooms available for selected dates');
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
    setShowModal(false);
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

      setShowConfirmationModal(true);
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

  return (
    <>
    <Navbar />
    <div className={`min-h-screen flex flex-col items-center justify-center bg-[#C6A38D] py-6 sm:py-12 px-4 sm:px-6 lg:px-8 border-l-[10px] border-r-[10px] border-b-[10px] border-[#ffffff] ${showConfirmationModal ? 'blur-sm' : ''}`}>
      <div className="w-full max-w-3xl rounded-[50px] mx-auto bg-white shadow-lg p-4 sm:p-8 border-2 border-[#8B593E] flex flex-col items-center mt-24">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10 text-[#8B593E]">Book Your Stay Now...</h2>
        
        {error && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg w-full">
            <p className="text-sm sm:text-base font-medium">{error}</p>
          </div>
        )}
        
        <form onSubmit={showCustomerForm ? handleBookingSubmit : handleSubmit} className="space-y-6 sm:space-y-8 w-full">
          {!showCustomerForm ? (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
                <div className="space-y-2">
                  <label htmlFor="numPeople" className="block text-sm sm:text-base font-medium text-[#4A2511]">
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    id="numPeople"
                    min="1"
                    max="12"
                    value={numPeople}
                    onChange={(e) => setNumPeople(parseInt(e.target.value))}
                    className="w-full p-2 sm:p-2 text-sm sm:text-base border-2 border-[#C6A38D] rounded-lg focus:border-[#8B593E] focus:ring focus:ring-[#8B593E]/20 transition duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="checkIn" className="block text-sm sm:text-base font-medium text-[#4A2511]">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    id="checkIn"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full p-2 sm:p-2 text-sm sm:text-base border-2 border-[#C6A38D] rounded-lg focus:border-[#8B593E] focus:ring focus:ring-[#8B593E]/20 transition duration-200"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="checkOut" className="block text-sm sm:text-base font-medium text-[#4A2511]">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    id="checkOut"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full p-2 sm:p-2 text-sm sm:text-base border-2 border-[#C6A38D] rounded-lg focus:border-[#8B593E] focus:ring focus:ring-[#8B593E]/20 transition duration-200"
                    required
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(true)}
                disabled={loading || !checkIn || !checkOut}
                className="w-full py-3 sm:py-4 px-4 sm:px-6 text-base sm:text-lg font-semibold text-white bg-[#8B593E] rounded-xl hover:bg-[#6B4530] transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg"
              >
                Continue to Book
              </button>

              {/* Modal */}
              {showModal && (
                <div className="fixed inset-0 bg-[#C6A38D] flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#8B593E]">Available Rooms</h3>
                      <button 
                        onClick={() => setShowModal(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ✕
                      </button>
                    </div>

                    {loading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#8B593E] border-t-transparent mx-auto"></div>
                        <p className="mt-4 text-lg text-[#4A2511]">Checking availability...</p>
                      </div>
                    ) : (
                      <div className="flex flex-col lg:flex-row gap-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
                          {availableRooms.map((room) => (
                            <div key={room.id} className="border-2 border-[#C6A38D] rounded-xl p-4">
                              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                                <img 
                                  src={room.images[0] || "/room-placeholder.jpg"} 
                                  alt={room.description}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              
                              <h4 className="text-lg font-semibold text-[#8B593E] mb-2">{room.description}</h4>
                              <p className="text-sm text-[#4A2511] mb-2">
                                <span className="font-medium">Capacity:</span> {room.capacity} guests
                              </p>
                              
                              <div className="space-y-3 mt-4">
                                <div className="flex items-center justify-between p-3 bg-[#F2E2D7] rounded-lg">
                                  <div>
                                    <p className="text-sm font-medium">AC Room</p>
                                    <p className="text-lg font-bold text-[#8B593E]">₹{room.acCost}</p>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => handleRoomSelection(room, true)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                      selectedRooms.some(r => r.id === room.id && r.isAc)
                                        ? 'bg-[#8B593E] text-white'
                                        : 'bg-white text-[#8B593E] border-2 border-[#8B593E]'
                                    }`}
                                  >
                                    {selectedRooms.some(r => r.id === room.id && r.isAc) ? 'Selected' : 'Select'}
                                  </button>
                                </div>
                                
                                <div className="flex items-center justify-between p-3 bg-[#F2E2D7] rounded-lg">
                                  <div>
                                    <p className="text-sm font-medium">Non-AC Room</p>
                                    <p className="text-lg font-bold text-[#8B593E]">₹{room.nonAcCost}</p>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => handleRoomSelection(room, false)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                      selectedRooms.some(r => r.id === room.id && !r.isAc)
                                        ? 'bg-[#8B593E] text-white'
                                        : 'bg-white text-[#8B593E] border-2 border-[#8B593E]'
                                    }`}
                                  >
                                    {selectedRooms.some(r => r.id === room.id && !r.isAc) ? 'Selected' : 'Select'}
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Right side panel for total and proceed */}
                        <div className="lg:w-80 lg:ml-6">
                          {selectedRooms.length > 0 && (
                            <div className="lg:sticky lg:top-6">
                              <div className="p-4 bg-[#F2E2D7] rounded-xl">
                                <h3 className="text-xl font-semibold text-[#4A2511] mb-3">Your Selection</h3>
                                <div className="space-y-2">
                                  {selectedRooms.map((room, index) => (
                                    <div key={index} className="flex justify-between items-center p-2 bg-white rounded-lg">
                                      <span className="text-sm text-[#4A2511] font-medium">
                                        {room.description} ({room.isAc ? 'AC' : 'Non-AC'})
                                      </span>
                                      <span className="text-sm text-[#8B593E] font-semibold">
                                        ₹{room.isAc ? room.acCost : room.nonAcCost}
                                      </span>
                                    </div>
                                  ))}
                                  <div className="border-t-2 border-[#C6A38D] pt-3 mt-3">
                                    <div className="flex justify-between items-center text-lg font-bold">
                                      <span className="text-[#4A2511]">Total Amount:</span>
                                      <span className="text-[#8B593E]">₹{totalPrice}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="mt-6 flex flex-col space-y-3">
                                <button
                                  type="submit"
                                  disabled={selectedRooms.length === 0}
                                  className="w-full py-3 bg-[#8B593E] text-white rounded-lg disabled:bg-gray-400 font-semibold"
                                >
                                  Proceed to Details
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setShowModal(false)}
                                  className="w-full py-3 text-[#8B593E] border-2 border-[#8B593E] rounded-lg font-semibold"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl font-semibold text-[#4A2511] text-center">Your Details</h3>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label htmlFor="customerEmail" className="block text-base sm:text-lg font-medium text-[#4A2511] mb-1 sm:mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="customerEmail"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full p-2 sm:p-3 text-sm sm:text-base border-2 border-[#C6A38D] rounded-lg focus:border-[#8B593E] focus:ring focus:ring-[#8B593E]/20 transition duration-200"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="customerPhone" className="block text-base sm:text-lg font-medium text-[#4A2511] mb-1 sm:mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="customerPhone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full p-2 sm:p-3 text-sm sm:text-base border-2 border-[#C6A38D] rounded-lg focus:border-[#8B593E] focus:ring focus:ring-[#8B593E]/20 transition duration-200"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 sm:pt-4">
                <button
                  type="button"
                  onClick={() => setShowCustomerForm(false)}
                  className="w-full sm:flex-1 py-2 sm:py-4 px-4 sm:px-6 text-base sm:text-lg font-semibold text-[#8B593E] bg-white border-2 border-[#8B593E] rounded-xl hover:bg-[#F2E2D7] transition duration-300"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 py-2 sm:py-4 px-4 sm:px-6 text-base sm:text-lg font-semibold text-white bg-[#8B593E] rounded-xl hover:bg-[#6B4530] transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg"
                >
                  {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>

    {/* Confirmation Modal */}
    {showConfirmationModal && (
      <div className="fixed inset-0 bg-[#C6A38D]/5  flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-6 max-w-md w-full text-center">
          <h3 className="text-2xl font-bold text-[#8B593E] mb-4">Booking Confirmed!</h3>
          <p className="text-gray-700 mb-6">
            Thank you for choosing Pearl Homestay! We have sent a confirmation email to {customerEmail}.
            We look forward to welcoming you soon.
          </p>
          <button
            onClick={() => {
              setShowConfirmationModal(false);
              window.location.reload();
            }}
            className="w-full py-3 bg-[#8B593E] text-white rounded-lg font-semibold hover:bg-[#6B4530] transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    )}
    </>
  );
}
