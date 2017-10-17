import { Db, MongoClient } from 'mongodb';

let _db = null;

const getDb = () => new Promise<Db>((resolve, reject) => {
  if (_db) {
    return resolve(_db);
  }
  MongoClient.connect(process.env.conn, (err, db) => {
    if (err) {
      return reject(err);
    }
    _db = db;
    resolve(_db);
  });
});

export const DbClient = {
  getDb
};