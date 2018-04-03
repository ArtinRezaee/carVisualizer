const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.database();
const auth = admin.auth();


exports.fixIDs = functions.https.onRequest((request, response) => {
    return db.ref('manufacturers').once('value').then(manuSnap => {
        var updates = { };

        manuSnap.forEach(maSnap => {
            maSnap.child('models').forEach(modSnap => {
                updates['manufacturers/' + maSnap.key + '/models/' + modSnap.key + '/id'] = modSnap.key;

                modSnap.child('colors').forEach(colSnap => {
                    updates['manufacturers/' + maSnap.key + '/models/' + modSnap.key + '/colors/' + colSnap.key + '/id'] = colSnap.key;
                });

                modSnap.child('trims').forEach(trSnap => {
                    updates['manufacturers/' + maSnap.key + '/models/' + modSnap.key + '/trims/' + trSnap.key + '/id'] = trSnap.key;
                });
            });
        });

        return Promise.all([db.ref().update(updates), response.status(200).send("Done")]);
    }).catch(err => {
        console.log(err.message);
    });    
});
