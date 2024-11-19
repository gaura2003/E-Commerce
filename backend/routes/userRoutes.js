// // userRoutes.js (add /api prefix)
// router.get('/api/users', async (req, res) => {
//     try {
//       const users = await User.find();
//       if (!users) {
//         return res.status(404).json({ message: 'No users found' });
//       }
//       res.json(users);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       res.status(500).send('Server Error');
//     }
//   });
  
//   router.delete('/api/users/:id', async (req, res) => {
//     try {
//       const userId = req.params.id;
//       const deletedUser = await User.findByIdAndDelete(userId);
//       if (!deletedUser) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//       res.json({ message: 'User deleted successfully' });
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       res.status(500).send('Server Error');
//     }
//   });

//   export default router;

router.post('/login', async (req, res) => {
  const { emailOrPhone, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in', error });
  }
});
