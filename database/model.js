const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost/eventdb';

mongoose.connect(DB_URL, { useNewUrlParser: true });

const eventSchema = new mongoose.Schema({
    eventDate: String,
    event: String,
    eventLink: String,
    place: String,
    categories: Array,
    dateCrawled: Date
});

const Event = mongoose.model('Event', eventSchema);

module.exports.bulkUpsertEvents = (data, callback) => {
    var bulk = Event.collection.initializeUnorderedBulkOp();

    for(let i = 1; i < data.length; i++) {
        bulk.find({event: data[i].event}).upsert().update({$set: data[i]});
    }

    bulk.execute(callback);
}