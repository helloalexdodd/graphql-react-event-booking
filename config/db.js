const { connect } = require('mongoose');

module.exports = async () => {
  await connect('mongodb://localhost/graphql-react-event-booking', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  console.log(`Connected to mongodb...`);
};
