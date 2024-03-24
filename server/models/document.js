const mongoose = require('mongoose');

const childSchema = new mongoose.Schema({
  id: {type: String, require: true},
  name: {type: String},
  description: {type: String},
  url: {type: String, required: true},
});

const documentSchema = mongoose.Schema({
  id: {type: String, require: true},
  name: {type: String},
  description: {type: String},
  url: {type: String, required: true},
  children: {type: childSchema}
});

module.exports = mongoose.model('Document', documentSchema);

// const Document = mongoose.model('Document', documentSchema);
// const doc = new Document({
//   id: "1",
//   name: "CIT 425 - Data Warehousing",
//   url: "https://rkjdatawarehousing.wordpress.com/",
//   children: [
//     {
//       id: "2",
//       name: "Project 1  The Kimball Method",
//       url: "https://rkjdatawarehousing.wordpress.com/projects/project-1-the-kimball-method/"
//     },
//     // Add the rest of the child documents here...
//   ]
// });

// doc.save(function(err) {
//   if (err) console.error(err);
//   else console.log('Document saved successfully');
// });
