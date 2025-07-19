const express = require('express');
const { dogs, generateId, getCurrentTimestamp } = require('../data/mockData');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all dogs (filtered by user role)
router.get('/', authenticateToken, (req, res) => {
  try {
    let userDogs;
    
    if (req.user.role === 'walker') {
      // Walkers can see all dogs
      userDogs = dogs;
    } else {
      // Owners can only see their own dogs
      userDogs = dogs.filter(dog => dog.ownerId === req.user.id);
    }

    res.json(userDogs);
  } catch (error) {
    console.error('Error fetching dogs:', error);
    res.status(500).json({ error: 'Failed to fetch dogs' });
  }
});

// Get single dog
router.get('/:id', authenticateToken, (req, res) => {
  try {
    const dog = dogs.find(d => d.id === req.params.id);
    
    if (!dog) {
      return res.status(404).json({ error: 'Dog not found' });
    }

    // Check permissions
    if (req.user.role === 'owner' && dog.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(dog);
  } catch (error) {
    console.error('Error fetching dog:', error);
    res.status(500).json({ error: 'Failed to fetch dog' });
  }
});

// Create new dog
router.post('/', authenticateToken, (req, res) => {
  try {
    // Only owners can create dogs
    if (req.user.role !== 'owner') {
      return res.status(403).json({ error: 'Only owners can create dog profiles' });
    }

    const {
      name,
      breed,
      age,
      weight,
      color,
      microchipNumber,
      vetName,
      vetPhone,
      medications,
      allergies,
      behaviorNotes,
      emergencyContact,
      feedingInstructions,
      photo
    } = req.body;

    if (!name || !breed) {
      return res.status(400).json({ error: 'Name and breed are required' });
    }

    const newDog = {
      id: generateId(),
      name,
      breed,
      age: age || null,
      weight: weight || null,
      color: color || '',
      microchipNumber: microchipNumber || '',
      vetName: vetName || '',
      vetPhone: vetPhone || '',
      medications: medications || '',
      allergies: allergies || '',
      behaviorNotes: behaviorNotes || '',
      emergencyContact: emergencyContact || '',
      feedingInstructions: feedingInstructions || '',
      photo: photo || '',
      ownerId: req.user.id,
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp()
    };

    dogs.push(newDog);
    res.status(201).json(newDog);
  } catch (error) {
    console.error('Error creating dog:', error);
    res.status(500).json({ error: 'Failed to create dog profile' });
  }
});

// Update dog
router.put('/:id', authenticateToken, (req, res) => {
  try {
    const dogIndex = dogs.findIndex(d => d.id === req.params.id);
    
    if (dogIndex === -1) {
      return res.status(404).json({ error: 'Dog not found' });
    }

    const dog = dogs[dogIndex];

    // Check permissions
    if (req.user.role === 'owner' && dog.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Update dog data
    const updatedDog = {
      ...dog,
      ...req.body,
      id: dog.id, // Prevent ID changes
      ownerId: dog.ownerId, // Prevent owner changes
      createdAt: dog.createdAt, // Prevent creation date changes
      updatedAt: getCurrentTimestamp()
    };

    dogs[dogIndex] = updatedDog;
    res.json(updatedDog);
  } catch (error) {
    console.error('Error updating dog:', error);
    res.status(500).json({ error: 'Failed to update dog profile' });
  }
});

// Delete dog
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const dogIndex = dogs.findIndex(d => d.id === req.params.id);
    
    if (dogIndex === -1) {
      return res.status(404).json({ error: 'Dog not found' });
    }

    const dog = dogs[dogIndex];

    // Only owners can delete their own dogs
    if (req.user.role !== 'owner' || dog.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    dogs.splice(dogIndex, 1);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting dog:', error);
    res.status(500).json({ error: 'Failed to delete dog profile' });
  }
});

module.exports = router;