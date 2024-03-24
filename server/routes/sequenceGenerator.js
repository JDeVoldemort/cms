const Sequence = require('../models/sequence');

let sequenceId = null;

const sequenceGenerator = {
  async init() {
    try {
      const sequence = await Sequence.findOne({}).exec();
      if (!sequence) {
        throw new Error('Sequence not found');
      }
      sequenceId = sequence._id;
    } catch (err) {
      console.error('Error initializing SequenceGenerator:', err);
      throw err;
    }
  },

  async nextId(collectionType) {
    if (!sequenceId) {
      await this.init();
    }

    let updateObject = {};
    let nextId;

    try {
      switch (collectionType) {
        case 'documents':
          const maxDocumentId = await this.nextDocumentId();
          nextId = maxDocumentId.toString();
          updateObject = { maxDocumentId: maxDocumentId };
          break;
        case 'messages':
          const maxMessageId = await this.nextMessageId();
          nextId = maxMessageId.toString();
          updateObject = { maxMessageId: maxMessageId };
          break;
        case 'contacts':
          const maxContactId = await this.nextContactId();
          nextId = maxContactId.toString();
          updateObject = { maxContactId: maxContactId };
          break;
        default:
          return -1;
      }

      await Sequence.updateOne({ _id: sequenceId }, { $set: updateObject });

      return nextId;
    } catch (err) {
      console.log("nextId error = " + err);
      return null;
    }
  },

  async nextDocumentId() {
    const sequence = await Sequence.findOneAndUpdate({}, { $inc: { maxDocumentId: 1 } }, { new: true });
    return sequence.maxDocumentId;
  },

  async nextMessageId() {
    const sequence = await Sequence.findOneAndUpdate({}, { $inc: { maxMessageId: 1 } }, { new: true });
    return sequence.maxMessageId;
  },

  async nextContactId() {
    const sequence = await Sequence.findOneAndUpdate({}, { $inc: { maxContactId: 1 } }, { new: true });
    return sequence.maxContactId;
  }
};

module.exports = sequenceGenerator;
