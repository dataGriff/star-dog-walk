import express from 'express';
import { notifications, generateId, getCurrentTimestamp } from '../data/mockData.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get user notifications
router.get('/', authenticateToken, (req, res) => {
  try {
    const userNotifications = notifications.filter(n => n.userId === req.user.id);
    res.json(userNotifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// Create notification
router.post('/', authenticateToken, (req, res) => {
  try {
    const { userId, type, title, message } = req.body;

    if (!userId || !type || !title || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newNotification = {
      id: generateId(),
      userId,
      type,
      title,
      message,
      timestamp: new Date(),
      read: false
    };

    notifications.push(newNotification);
    res.status(201).json(newNotification);
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ error: 'Failed to create notification' });
  }
});

// Mark notification as read
router.patch('/:id/read', authenticateToken, (req, res) => {
  try {
    const notificationIndex = notifications.findIndex(n => 
      n.id === req.params.id && n.userId === req.user.id
    );
    
    if (notificationIndex === -1) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    notifications[notificationIndex].read = true;
    res.json(notifications[notificationIndex]);
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ error: 'Failed to update notification' });
  }
});

// Clear all notifications
router.delete('/', authenticateToken, (req, res) => {
  try {
    // Remove all notifications for the user
    for (let i = notifications.length - 1; i >= 0; i--) {
      if (notifications[i].userId === req.user.id) {
        notifications.splice(i, 1);
      }
    }
    
    res.status(204).send();
  } catch (error) {
    console.error('Error clearing notifications:', error);
    res.status(500).json({ error: 'Failed to clear notifications' });
  }
});

export default router;