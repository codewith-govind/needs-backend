const { db } = require('../config/firebase');

const createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    let totalPrice = 0;

    // Verify items and calculate total price
    for (const item of items) {
      const groceryDoc = await db.collection('groceries').doc(item.id).get();
      if (!groceryDoc.exists) {
        return res.status(400).json({ error: `Item ${item.id} not found` });
      }
      
      const groceryData = groceryDoc.data();
      if (groceryData.quantity < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for item ${groceryData.name}` });
      }

      totalPrice += groceryData.price * item.quantity;
    }

    // Create order
    const orderRef = await db.collection('orders').add({
      userId: req.user.uid,
      items,
      totalPrice,
      status: 'pending',
      createdAt: new Date().toISOString()
    });

    // Update inventory
    for (const item of items) {
      const groceryRef = db.collection('groceries').doc(item.id);
      await groceryRef.update({
        quantity: admin.firestore.FieldValue.increment(-item.quantity)
      });
    }

    res.status(201).json({ id: orderRef.id });
  } catch (error) {
    res.status(500).json({ error: 'Error creating order' });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const snapshot = await db.collection('orders')
      .where('userId', '==', req.user.uid)
      .orderBy('createdAt', 'desc')
      .get();

    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const snapshot = await db.collection('orders')
      .orderBy('createdAt', 'desc')
      .get();

    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const orderRef = db.collection('orders').doc(req.params.id);
    const doc = await orderRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await orderRef.update({ status });
    res.json({ message: 'Order status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating order status' });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus
};