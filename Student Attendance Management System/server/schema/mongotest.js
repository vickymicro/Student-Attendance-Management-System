import mongodb from 'mongodb';
const MongoClient =mongodb.MongoClient;


async function Database(){
    const client=MongoClient.connect('mongodb://localhost:127.0.0.1/attendance').then(()=>{
        console.log("Database successfully connected"); 
    }).catch(()=>{
        console.log("Database not connected");
    })
}

export default Database;