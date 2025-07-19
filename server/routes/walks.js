const express = require('express');
const { walks, dogs, generateId, getCurrentTimestamp } = require('../data/mockData');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all walks (filtered by user role)
router.get('/', authenticateToken, (req, res) => {
  try {
    let userWalks;
    
    if (req.user.role === 'walker') {
      // Walkers can see all walks
      userWalks = walks;
    } else {
      // Owners can only see walks for their dogs
      userWalks = walks.filter(walk => walk.ownerId === req.user.id);
    }

    // Add dog information to each walk
    const walksWithDogInfo = userWalks.map(walk => {
      const dog = dogs.find(d => d.id === walk.dogId);
      return {
        ...walk,
        dog: dog ? { id: dog.id, name: dog.name, breed: dog.breed, photo: dog.photo } : null
      };
    });

    res.json(walksWithDogInfo);
  } catch (error) {
    console.error('Error fetching walks:', error);
    res.status(500).json({ error: 'Failed to fetch walks' });
  }
});

// Get single walk
router.get('/:id', authenticateToken, (req, res) => {
  try {
    const walk = walks.find(w => w.id === req.params.id);
    
    if (!walk) {
      return res.status(404).json({ error: 'Walk not found' });
    }

    // Check permissions
    if (req.user.role === 'owner' && walk.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Add dog information
    const dog = dogs.find(d => d.id === walk.dogId);
    const walkWithDogInfo = {
      ...walk,
      dog: dog ? { id: dog.id, name: dog.name, breed: dog.breed, photo: dog.photo } : null
    };

    res.json(walkWithDogInfo);
  } catch (error) {
    console.error('Error fetching walk:', error);
    res.status(500).json({ error: 'Failed to fetch walk' });
  }
});

// Get public walk (no authentication required)
router.get('/public/:id', (req, res) => {
  try {
    const walk = walks.find(w => w.id === req.params.id);
    
    if (!walk || walk.status !== 'completed') {
      return res.status(404).json({ error: 'Walk not found or not completed' });
    }

    // Add dog information
    const dog = dogs.find(d => d.id === walk.dogId);
    const walkWithDogInfo = {
      ...walk,
      dog: dog ? { id: dog.id, name: dog.name, breed: dog.breed, photo: dog.photo } : null
    };

    res.json(walkWithDogInfo);
  } catch (error) {
    console.error('Error fetching public walk:', error);
    res.status(500).json({ error: 'Failed to fetch walk' });
  }
});

// Create new walk
router.post('/', authenticateToken, (req, res) => {
  try {
    const {
      dogId,
      date,
      startTime,
      endTime,
      duration,
      pickupAddress,
      specialNotes
    } = req.body;

    if (!dogId || !date || !startTime || !duration) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Find the dog to get owner info
    const dog = dogs.find(d => d.id === dogId);
    if (!dog) {
      return res.status(404).json({ error: 'Dog not found' });
    }

    // Check permissions
    if (req.user.role === 'owner' && dog.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const newWalk = {
      id: generateId(),
      dogId,
      walkerId: req.user.role === 'walker' ? req.user.id : '2', // Default walker ID
      ownerId: dog.ownerId,
      date,
      startTime,
      endTime: endTime || null,
      duration: parseInt(duration),
      status: req.user.role === 'walker' ? 'confirmed' : 'pending',
      pickupAddress: pickupAddress || '',
      specialNotes: specialNotes || '',
      route: null,
      weather: null,
      notes: null,
      behaviorNotes: null,
      photos: [],
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp()
    };

    walks.push(newWalk);
    
    // Add dog information to response
    const walkWithDogInfo = {
      ...newWalk,
      dog: { id: dog.id, name: dog.name, breed: dog.breed, photo: dog.photo }
    };

    res.status(201).json(walkWithDogInfo);
  } catch (error) {
    console.error('Error creating walk:', error);
    res.status(500).json({ error: 'Failed to create walk' });
  }
});

// Update walk
router.put('/:id', authenticateToken, (req, res) => {
  try {
    const walkIndex = walks.findIndex(w => w.id === req.params.id);
    
    if (walkIndex === -1) {
      return res.status(404).json({ error: 'Walk not found' });
    }

    const walk = walks[walkIndex];

    // Check permissions
    if (req.user.role === 'owner' && walk.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Update walk data
    const updatedWalk = {
      ...walk,
      ...req.body,
      id: walk.id, // Prevent ID changes
      dogId: walk.dogId, // Prevent dog changes
      ownerId: walk.ownerId, // Prevent owner changes
      createdAt: walk.createdAt, // Prevent creation date changes
      updatedAt: getCurrentTimestamp()
    };

    walks[walkIndex] = updatedWalk;
    
    // Add dog information to response
    const dog = dogs.find(d => d.id === walk.dogId);
    const walkWithDogInfo = {
      ...updatedWalk,
      dog: dog ? { id: dog.id, name: dog.name, breed: dog.breed, photo: dog.photo } : null
    };

    res.json(walkWithDogInfo);
  } catch (error) {
    console.error('Error updating walk:', error);
    res.status(500).json({ error: 'Failed to update walk' });
  }
});

// Update walk status
router.patch('/:id/status', authenticateToken, (req, res) => {
  try {
    const { status } = req.body;
    const walkIndex = walks.findIndex(w => w.id === req.params.id);
    
    if (walkIndex === -1) {
      return res.status(404).json({ error: 'Walk not found' });
    }

    const walk = walks[walkIndex];

    // Only walkers can update walk status
    if (req.user.role !== 'walker') {
      return res.status(403).json({ error: 'Only walkers can update walk status' });
    }

    walks[walkIndex] = {
      ...walk,
      status,
      updatedAt: getCurrentTimestamp()
    };

    res.json(walks[walkIndex]);
  } catch (error) {
    console.error('Error updating walk status:', error);
    res.status(500).json({ error: 'Failed to update walk status' });
  }
});

// Delete walk
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const walkIndex = walks.findIndex(w => w.id === req.params.id);
    
    if (walkIndex === -1) {
      return res.status(404).json({ error: 'Walk not found' });
    }

    const walk = walks[walkIndex];

    // Check permissions - owners can cancel their walks, walkers can cancel any
    if (req.user.role === 'owner' && walk.ownerId !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    walks.splice(walkIndex, 1);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting walk:', error);
    res.status(500).json({ error: 'Failed to delete walk' });
  }
});

module.exports = router;