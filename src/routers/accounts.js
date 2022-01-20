const express = require('express');
const Accounts = require('../models/accounts');

const router = new express.Router();

router.post('/users', async (req, res) => {
  const account = new Accounts(req.body);
  //check if account already exist
  try {
    await account.save();
    res.status(201).send(account);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/users', async (req, res) => {
  try {
    const accounts = await Accounts.find({});
    res.status(200).send(accounts);
  } catch (err) {
    res.status(500).send();
  }
});

// router.get('/products/actives', async (req, res) => {
//   try {
//     const activProduct = await Accounts.find({ isActive: true });
//     if (!activProduct) {
//       return res.status(404).send();
//     }
//     res.status(200).send(activProduct);
//   } catch (err) {
//     res.status(500).send();
//   }
// });

// router.get('/price/:min/:max', async (req, res) => {
//   const min = req.params.min;
//   const max = req.params.max;

//   try {
//     const products = await Accounts.find({
//       $and: [
//         { 'details.Price': { $gte: min } },
//         { 'details.Price': { $lte: max } },
//       ],
//     });
//     if (!products) {
//       return res.status(400).send();
//     }
//     res.status(200).send(products);
//   } catch {
//     res.status(500).send();
//   }
// });

router.get('/users/:id', async (req, res) => {
  const passportID = req.params.id;
  try {
    const account = await Accounts.findOne({ passportID });
    if (!account) {
      return res.status(404).send('account not exists');
    }
    res.status(200).send(account);
  } catch (err) {
    res.status(500).send();
  }
});

router.patch('/users/deposit/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'isActive', 'passportID', 'cash'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(404).send({ error: 'Invalid updates!' });
  }
  try {
    const account = await Accounts.findByIdAndUpdate(
      req.params.id,
      req.body.passportID,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!account) {
      return res.status(404).send();
    }
    res.status(200).send(account);
  } catch (error) {
    res.status(400).send();
  }
});

// router.delete('/products/:id', async (req, res) => {
//   try {
//     const product = await Accounts.findByIdAndDelete(req.params.id);

//     if (!product) {
//       return res.status(404).send();
//     }
//     res.status(200).send(product);
//   } catch (err) {
//     res.status(500).send();
//   }
// });

// router.delete('/products', async (req, res) => {
//   try {
//     const products = await Accounts.deleteMany({});

//     if (!products || products.deletedCount === 0) {
//       return res.status(404).send('No products');
//     }
//     res.status(200).send(products);
//   } catch (err) {
//     res.status(500).send();
//   }
// });

module.exports = router;
