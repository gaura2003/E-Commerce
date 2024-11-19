// userRoutes.js (add /api prefix)
router.get('/api/users', async (req, res) => {
    try {
      const users = await User.find();
      if (!users) {
        return res.status(404).json({ message: 'No users found' });
      }
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Server Error');
    }
  });
  
  router.delete('/api/users/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).send('Server Error');
    }
  });

  export default router;