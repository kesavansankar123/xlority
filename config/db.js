const Mongoose =require('mongoose');
const url="mongodb://127.0.0.1:27017/xlority_Task"


 function loginDetails() {
    Mongoose.connect(url) 

    // Mongoose.connection.once('open',() => {
    //     console.log('connected success');
        const db = Mongoose.connection;

        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.once('open', () => {
        console.log('Connected to MongoDB');

  // Now, you can initialize GridFSBucket or perform other MongoDB operations here
});
        
}


module.exports=loginDetails;
