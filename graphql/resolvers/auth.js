const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../models/user');

module.exports = {
  createUser: async (args) => {
    try {
      const user = await User.findOne({
        email: args.userInput.email,
      });
      if (user)
        throw new Error('This email is already in use by an existing user');

      const password = await bcrypt.hash(args.userInput.password, 12);

      const newUser = new User({
        email: args.userInput.email,
        password,
      });

      const result = await newUser.save();
      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email });
      if (!user) throw new Error('Invalid email or password');

      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) throw new Error('Invalid email or password');

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        'some-super-secret-key',
        { expiresIn: '1h' }
      );

      return { userId: user.id, token, tokenExpiration: 1 };
    } catch (err) {
      throw err;
    }
  },
  logout: async () => {
    //
  },
};
