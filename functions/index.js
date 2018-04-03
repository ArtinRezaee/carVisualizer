const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.database();
const auth = admin.auth();

const moment = require('moment');

exports.fixIDs = functions.https.onRequest((request, response) => {
    return db.ref('manufacturers').once('value').then(manuSnap => {
        var updates = { };

        manuSnap.forEach(maSnap => {
            maSnap.child('models').forEach(modSnap => {
                updates['manufacturers/' + maSnap.key + '/models/' + modSnap.key + '/id'] = modSnap.key;

                modSnap.child('colors').forEach(colSnap => {
                    let pr = Number(colSnap.val().price);
                    updates['manufacturers/' + maSnap.key + '/models/' + modSnap.key + '/colors/' + colSnap.key + '/price'] = pr;
                    updates['manufacturers/' + maSnap.key + '/models/' + modSnap.key + '/colors/' + colSnap.key + '/id'] = colSnap.key;
                });

                modSnap.child('trims').forEach(trSnap => {
                    let pr = Number(trSnap.val().price);
                    updates['manufacturers/' + maSnap.key + '/models/' + modSnap.key + '/trims/' + trSnap.key + '/price'] = pr;
                    updates['manufacturers/' + maSnap.key + '/models/' + modSnap.key + '/trims/' + trSnap.key + '/id'] = trSnap.key;
                });
            });
        });

        return Promise.all([db.ref().update(updates), response.status(200).send("Done")]);
    }).catch(err => {
        console.log(err.message);
    });    
});

exports.userCreate = functions.auth.user().onCreate(event => {
    const now = moment().unix();
    const uid = event.data.uid;

    var updates = {};
    updates['users/' + uid + '/access'] = 2;
    updates['users/' + uid + '/createdOn'] = now;

    return db.ref().update(updates);
});
