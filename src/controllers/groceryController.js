const { db } = require('../config/firebase');

const getAllItems = async (req, res) => {
  try {
    const snapshot = await db.collection('groceries').get();
    const items = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching grocery items' });
  }
};

const getItem = async (req, res) => {
  try {
    const doc = await db.collection('groceries').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching grocery item' });
  }
};

const createItem = async (req, res) => {
  try {
    const { name, price, quantity, category } = req.body;
    const docRef = await db.collection('groceries').add({
      name,
      price,
      quantity,
      category,
      createdAt: new Date().toISOString()
    });
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: 'Error creating grocery item' });
  }
};

const updateItem = async (req, res) => {
  try {
    const itemRef = db.collection('groceries').doc(req.params.id);
    const doc = await itemRef.get();
    
    if (!doc.exists) {
      return res.status(404).json({ error: 'Item not found' });
    }

    await itemRef.update(req.body);
    res.json({ message: 'Item updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating grocery item' });
  }
};

const deleteItem = async (req, res) => {
  try {
    const doc = await db.collection('groceries').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    await doc.ref.delete();
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting grocery item' });
  }
};

module.exports = {
  getAllItems,
  getItem,
  createItem,
  updateItem,
  deleteItem
};