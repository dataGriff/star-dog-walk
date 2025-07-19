// Mock database - in production this would be replaced with a real database
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

// Users data
const users = [
  {
    id: '1',
    email: 'owner@example.com',
    password: bcrypt.hashSync('password', 10),
    name: 'Sophie Williams',
    role: 'owner',
    phone: '+44 7123 456789',
    address: 'Adamsdown, Cardiff',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    email: 'walker@stardogwalker.com',
    password: bcrypt.hashSync('password', 10),
    name: 'Sarah Jenkins',
    role: 'walker',
    phone: '+44 7987 654321',
    address: 'Splott, Cardiff',
    createdAt: '2024-01-01T00:00:00Z'
  }
];

// Dogs data
const dogs = [
  {
    id: '1',
    name: 'Max',
    breed: 'Golden Retriever',
    age: 3,
    weight: 25,
    color: 'Golden',
    microchipNumber: 'GB123456789',
    vetName: 'Cardiff Veterinary Centre',
    vetPhone: '+44 29 2012 3456',
    medications: 'None',
    allergies: 'None known',
    behaviorNotes: 'Friendly with other dogs, afraid of bicycles, loves puddles and playing fetch.',
    emergencyContact: 'Sophie Williams - +44 7123 456789',
    feedingInstructions: 'Fed twice daily, no treats during walks',
    photo: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400',
    ownerId: '1',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Bella',
    breed: 'Border Collie',
    age: 2,
    weight: 20,
    color: 'Black and White',
    microchipNumber: 'GB987654321',
    vetName: 'Cardiff Veterinary Centre',
    vetPhone: '+44 29 2012 3456',
    medications: 'None',
    allergies: 'None known',
    behaviorNotes: 'Very energetic, good with other dogs, excellent recall.',
    emergencyContact: 'Sophie Williams - +44 7123 456789',
    feedingInstructions: 'Fed twice daily, loves training treats',
    photo: 'https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg?auto=compress&cs=tinysrgb&w=300',
    ownerId: '1',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z'
  },
  {
    id: '3',
    name: 'Charlie',
    breed: 'French Bulldog',
    age: 4,
    weight: 12,
    color: 'Fawn',
    microchipNumber: 'GB456789123',
    vetName: 'Adamsdown Vet Clinic',
    vetPhone: '+44 29 2034 5678',
    medications: 'None',
    allergies: 'Sensitive to heat',
    behaviorNotes: 'Calm temperament, prefers shorter walks, good with children.',
    emergencyContact: 'Emma Davies - +44 7456 123789',
    feedingInstructions: 'Fed twice daily, no grain-based treats',
    photo: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=300',
    ownerId: '3',
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z'
  }
];

// Walks data
const walks = [
  {
    id: '1',
    dogId: '1',
    walkerId: '2',
    ownerId: '1',
    date: '2024-01-12',
    startTime: '14:00',
    endTime: '15:00',
    duration: 60,
    status: 'completed',
    route: 'Splott Park Loop',
    weather: 'sunny',
    notes: 'Max had a wonderful time today! We walked through Splott Park and he got to play with two other golden retrievers. He was particularly excited about the puddles from yesterday\'s rain and had a good splash. We practiced his recall training near the tennis courts and he did brilliantly. No issues with bicycles today - he\'s getting much more confident.',
    behaviorNotes: 'Very well behaved, friendly with other dogs, good recall',
    photos: [
      'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    pickupAddress: 'Splott Road, Cardiff',
    specialNotes: 'Afraid of bicycles, loves puddles',
    createdAt: '2024-01-12T13:00:00Z',
    updatedAt: '2024-01-12T15:30:00Z'
  },
  {
    id: '2',
    dogId: '2',
    walkerId: '2',
    ownerId: '1',
    date: '2024-01-10',
    startTime: '10:00',
    endTime: '10:45',
    duration: 45,
    status: 'completed',
    route: 'Adamsdown Streets',
    weather: 'cloudy',
    notes: 'Bella was full of energy today! We explored the quieter streets of Adamsdown and she got to meet several friendly neighbors. She was particularly interested in the local cats (from a respectful distance). Great recall and very well-behaved on the lead.',
    behaviorNotes: 'Excellent energy, good with people, curious about cats',
    photos: [
      'https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    pickupAddress: 'Adamsdown, Cardiff',
    specialNotes: 'Very energetic, good with other dogs',
    createdAt: '2024-01-10T09:30:00Z',
    updatedAt: '2024-01-10T11:00:00Z'
  },
  {
    id: '3',
    dogId: '1',
    walkerId: '2',
    ownerId: '1',
    date: '2024-01-15',
    startTime: '14:00',
    endTime: '15:00',
    duration: 60,
    status: 'confirmed',
    pickupAddress: 'Splott Road, Cardiff',
    specialNotes: 'Afraid of bicycles, loves puddles',
    createdAt: '2024-01-13T10:00:00Z',
    updatedAt: '2024-01-13T10:00:00Z'
  },
  {
    id: '4',
    dogId: '3',
    walkerId: '2',
    ownerId: '3',
    date: '2024-01-17',
    startTime: '10:30',
    endTime: '11:15',
    duration: 45,
    status: 'pending',
    pickupAddress: 'Splott Park area',
    specialNotes: 'Prefers shorter walks, sensitive to heat',
    createdAt: '2024-01-14T15:00:00Z',
    updatedAt: '2024-01-14T15:00:00Z'
  }
];

// Notifications data
const notifications = [
  {
    id: '1',
    userId: '1',
    type: 'success',
    title: 'Walk Completed',
    message: 'Max\'s walk has been completed. Check out the photos!',
    timestamp: new Date('2024-01-12T15:30:00Z'),
    read: false
  },
  {
    id: '2',
    userId: '2',
    type: 'info',
    title: 'New Walk Request',
    message: 'Charlie needs a walk on January 17th',
    timestamp: new Date('2024-01-14T15:00:00Z'),
    read: false
  }
];

// Add a third user for Charlie's owner
users.push({
  id: '3',
  email: 'emma@example.com',
  password: bcrypt.hashSync('password', 10),
  name: 'Emma Davies',
  role: 'owner',
  phone: '+44 7456 123789',
  address: 'Splott, Cardiff',
  createdAt: '2024-01-03T00:00:00Z'
});

export {
  users,
  dogs,
  walks,
  notifications,
  // Helper functions to simulate database operations
  generateId,
  getCurrentTimestamp
};

// Helper functions
function generateId() {
  return uuidv4();
}

function getCurrentTimestamp() {
  return new Date().toISOString();
}