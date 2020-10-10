const bcrypt = require('bcryptjs');
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
};
