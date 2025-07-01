import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query, doc, updateDoc, deleteDoc, limit, startAfter } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, pending, confirmed, cancelled
  const [editingRoom, setEditingRoom] = useState(null);
  const [lastEnquiryDoc, setLastEnquiryDoc] = useState(null);
  const [hasMoreEnquiries, setHasMoreEnquiries] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    fetchBookingsAndReservations();
    fetchRooms();
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async (lastDoc = null) => {
    try {
      const enquiriesRef = collection(db, 'enquiries');
      let enquiriesQuery;
      
      if (lastDoc) {
        enquiriesQuery = query(enquiriesRef, orderBy('createdAt', 'desc'), startAfter(lastDoc), limit(5));
      } else {
        enquiriesQuery = query(enquiriesRef, orderBy('createdAt', 'desc'), limit(5));
      }

      const enquiriesSnapshot = await getDocs(enquiriesQuery);
      
      const enquiriesData = enquiriesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date()
      }));

      if (!lastDoc) {
        setEnquiries(enquiriesData);
      } else {
        setEnquiries(prev => [...prev, ...enquiriesData]);
      }

      setLastEnquiryDoc(enquiriesSnapshot.docs[enquiriesSnapshot.docs.length - 1]);
      setHasMoreEnquiries(enquiriesSnapshot.docs.length === 5);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      setError('Failed to load enquiries. Please try again later.');
    }
  };

  const handleLoadMoreEnquiries = () => {
    if (lastEnquiryDoc) {
      fetchEnquiries(lastEnquiryDoc);
    }
  };

  const handleDeleteEnquiry = async (enquiryId) => {
    if (window.confirm('Are you sure you want to delete this enquiry? This action cannot be undone.')) {
      try {
        await deleteDoc(doc(db, 'enquiries', enquiryId));
        setEnquiries(enquiries.filter(e => e.id !== enquiryId));
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      } catch (error) {
        console.error('Error deleting enquiry:', error);
        setError('Failed to delete enquiry. Please try again.');
      }
    }
  };

  const fetchRooms = async () => {
    try {
      const roomsRef = collection(db, 'rooms');
      const roomsSnapshot = await getDocs(roomsRef);
      const roomsData = roomsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRooms(roomsData);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      setError('Failed to load rooms data. Please refresh the page.');
    }
  };

  const handleRoomEdit = (room) => {
    setEditingRoom({...room});
  };

  const handleRoomSave = async () => {
    try {
      if (!editingRoom.ACCost || !editingRoom.NonACCost || !editingRoom.capacity || !editingRoom.type) {
        alert('Please fill in all fields');
        return;
      }

      const roomRef = doc(db, 'rooms', editingRoom.id);
      await updateDoc(roomRef, {
        ACCost: Number(editingRoom.ACCost),
        NonACCost: Number(editingRoom.NonACCost),
        capacity: Number(editingRoom.capacity),
        type: editingRoom.type
      });
      
      setRooms(rooms.map(room => 
        room.id === editingRoom.id ? editingRoom : room
      ));
      setEditingRoom(null);
      alert('Room details updated successfully!');
    } catch (error) {
      console.error('Error updating room:', error);
      alert('Failed to update room. Please try again.');
    }
  };

  const fetchBookingsAndReservations = async () => {
    try {
      setLoading(true);
      
      // Fetch confirmed bookings
      const bookingsRef = collection(db, 'bookings');
      const bookingsQuery = query(bookingsRef, orderBy('createdAt', 'desc'));
      const bookingsSnapshot = await getDocs(bookingsQuery);

      const bookingsData = bookingsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
        status: 'confirmed'
      }));

      // Fetch pending reservations
      const reservationsRef = collection(db, 'reservations');
      const reservationsQuery = query(reservationsRef, orderBy('createdAt', 'desc'));
      const reservationsSnapshot = await getDocs(reservationsQuery);

      const reservationsData = reservationsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate?.() || new Date(),
        status: 'pending'
      }));

      setBookings(bookingsData);
      setReservations(reservationsData);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load dashboard data. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const allEntries = [...bookings, ...reservations];

  const filteredEntries = allEntries.filter(entry => {
    if (filter === 'all') return true;
    return entry.status === filter;
  });

  const stats = {
    total: allEntries.length,
    pending: reservations.length,
    confirmed: bookings.length,
    cancelled: allEntries.filter(b => b.status === 'cancelled').length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
          <p className="text-sm text-gray-500">This may take a few moments</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchBookingsAndReservations}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-4 sm:py-8 px-2 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome to Pearl Homestay Dashboard</h1>
          <p className="text-gray-600">Manage your bookings, reservations, and room settings all in one place</p>
        </div>

        {showSuccessMessage && (
          <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            Action completed successfully!
          </div>
        )}

        {/* Enquiries Section */}
        <div className="bg-white rounded-lg shadow mb-6 sm:mb-8 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Recent Customer Enquiries</h2>
          {enquiries.length === 0 ? (
            <p className="text-gray-500">No new enquiries at the moment</p>
          ) : (
            <div className="space-y-4">
              {enquiries.map(enquiry => (
                <div key={enquiry.id} className="border rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row justify-between items-start gap-4 hover:bg-gray-50 transition-colors">
                  <div className="w-full">
                    <p className="font-medium text-lg">{enquiry.name}</p>
                    <p className="text-gray-600 break-all">
                      <span className="font-medium">Email:</span> {enquiry.email}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Phone:</span> {enquiry.phone}
                    </p>
                    <p className="text-gray-700 mt-2 break-words">
                      <span className="font-medium">Message:</span> {enquiry.message}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Received on: {enquiry.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteEnquiry(enquiry.id)}
                    className="text-red-600 hover:text-red-800 self-end sm:self-start hover:underline"
                  >
                    Delete Enquiry
                  </button>
                </div>
              ))}
              {hasMoreEnquiries && (
                <button
                  onClick={handleLoadMoreEnquiries}
                  className="w-full mt-4 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Load More Enquiries
                </button>
              )}
            </div>
          )}
        </div>

        {/* Rooms Management Section */}
        <div className="bg-white rounded-lg shadow mb-6 sm:mb-8 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Room Management</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {rooms.map(room => (
              <div key={room.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                {editingRoom?.id === room.id ? (
                  <>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">AC Room Price (₹)</label>
                        <input
                          type="number"
                          value={editingRoom.ACCost}
                          onChange={(e) => setEditingRoom({...editingRoom, ACCost: e.target.value})}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Enter AC room price"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Non-AC Room Price (₹)</label>
                        <input
                          type="number"
                          value={editingRoom.NonACCost}
                          onChange={(e) => setEditingRoom({...editingRoom, NonACCost: e.target.value})}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Enter non-AC room price"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Room Capacity</label>
                        <input
                          type="number"
                          value={editingRoom.capacity}
                          onChange={(e) => setEditingRoom({...editingRoom, capacity: e.target.value})}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Enter room capacity"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Room Type</label>
                        <input
                          type="text"
                          value={editingRoom.type}
                          onChange={(e) => setEditingRoom({...editingRoom, type: e.target.value})}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          placeholder="Enter room type"
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 mt-4">
                        <button
                          onClick={handleRoomSave}
                          className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={() => setEditingRoom(null)}
                          className="w-full sm:w-auto bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="font-medium text-lg mb-2">Room {room.id}</h3>
                    <div className="space-y-2">
                      <p className="text-gray-700">
                        <span className="font-medium">AC Room:</span> ₹{room.ACCost}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Non-AC Room:</span> ₹{room.NonACCost}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Capacity:</span> {room.capacity} people
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Type:</span> {room.type}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRoomEdit(room)}
                      className="mt-4 text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      Edit Room Details
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg shadow p-4 sm:p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 sm:p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 sm:p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Confirmed Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.confirmed}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 sm:p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cancelled Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.cancelled}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-4 sm:space-x-8 px-4 sm:px-6">
              {[
                { key: 'all', label: 'All Bookings', count: stats.total },
                { key: 'pending', label: 'Pending', count: stats.pending },
                { key: 'confirmed', label: 'Confirmed', count: stats.confirmed },
                { key: 'cancelled', label: 'Cancelled', count: stats.cancelled }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    filter === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Bookings List */}
        <div className="bg-white rounded-lg shadow">
          {filteredEntries.length === 0 ? (
            <div className="p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {filter === 'all' 
                  ? 'You haven\'t received any bookings yet.' 
                  : `No ${filter} bookings found at the moment.`}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Booking ID & Date
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer Details
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stay Duration
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Room Details & Price
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredEntries.map((entry) => (
                      <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 sm:px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            #{entry.id.slice(-8)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {entry.createdAt.toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <div className="text-sm text-gray-900 break-all">{entry.customerEmail}</div>
                          <div className="text-sm text-gray-500">{entry.customerPhone}</div>
                          <div className="text-sm text-gray-500">{entry.numPeople} guests</div>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <div className="text-sm text-gray-900">
                            <div>Check-in: {entry.checkIn}</div>
                            <div>Check-out: {entry.checkOut}</div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {entry.selectedRooms?.map((room, index) => (
                              <div key={index} className="text-sm text-gray-600">
                                {room.description} ({room.isAc ? 'AC' : 'Non-AC'})
                              </div>
                            ))}
                            <div className="font-medium text-gray-900 mt-1">
                              Total: ₹{entry.totalPrice}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(entry.status)}`}>
                            {entry.status}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-sm font-medium">
                          <div className="flex flex-col sm:flex-row gap-2">
                            {entry.status === 'pending' && (
                              <a
                                href={`/confirm-booking?bookingId=${entry.id}`}
                                className="text-blue-600 hover:text-blue-900 hover:underline transition-colors"
                              >
                                Confirm Booking
                              </a>
                            )}
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(entry.id);
                                alert('Booking ID copied to clipboard!');
                              }}
                              className="text-gray-600 hover:text-gray-900 hover:underline transition-colors"
                            >
                              Copy Booking ID
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
