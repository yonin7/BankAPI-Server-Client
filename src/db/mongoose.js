const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://YONI:esuahcdss12@cluster0.2vfqv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
);

// const { MongoClient } = require('mongodb');
// const uri =
//   'mongodb+srv://YONI:<password>@cluster0.2vfqv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// client.connect((err) => {
//   const collection = client.db('test').collection('devices');
//   // perform actions on the collection object
//   client.close();
// });
