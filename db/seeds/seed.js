const db = require("../connection")
const data = require("../data/test-data");
const seed = ({shoppingItems, recipes, users}) => {
    console.log(shoppingItems, recipes, users);
    // async function deleteCollection(db, collectionPath, batchSize) {
    //     const collectionRef = db.collection(collectionPath);
    //     const query = collectionRef.orderBy('__name__').limit(batchSize);
      
    //     return new Promise((resolve, reject) => {
    //       deleteQueryBatch(db, query, resolve).catch(reject);
    //     });
    //   }
      
    //   async function deleteQueryBatch(db, query, resolve) {
    //     const snapshot = await query.get();
      
    //     const batchSize = snapshot.size;
    //     if (batchSize === 0) {
    //       // When there are no documents left, we are done
    //       resolve();
    //       return;
    //     }
      
    //     // Delete documents in a batch
    //     const batch = db.batch();
    //     snapshot.docs.forEach((doc) => {
    //       batch.delete(doc.ref);
    //     });
    //     await batch.commit();
      
    //     // Recurse on the next process tick, to avoid
    //     // exploding the stack.
    //     process.nextTick(() => {
    //       deleteQueryBatch(db, query, resolve);
    //     });
    //   }
    
    //drop table lists
    //drop table recipes
    //drop table users
    //create users
    //create recipes
    //create lists
    //insert into users
    //insert into recipes
    //insert into lists
}
seed(data)