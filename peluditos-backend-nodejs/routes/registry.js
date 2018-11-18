const express = require('express');
const router = express.Router();
const PetRegistry = require('../models/PetRegisty');


router.get('/test', function (req, res, next) {
    res.json({ title: 'Express' });
});



router.post('/save_pet/', function (req, res) {
    let _id = req.body._id || "invalid_id";
    let animal;
    let contact;
    if (req.body.animal) {
        animal = req.body.animal;
        animal._id = req.body.animal._id || "invalid_animal_id";
    } else {
        animal = { _id: "test" };
    }
    if (req.body.contact) {
        contact = req.body.contact;
        contact._id = req.body.contact._id || "invalid_contact_id";
    }

    const newRegistry = {
        _id: _id,
        date: req.body.date,
        coordinates: req.body.coordinates,
        animal: animal,
        contact: contact,
        status: req.body.status
    };

    console.log(newRegistry);

    PetRegistry.findOneAndUpdate({ _id: newRegistry._id }, newRegistry, { upsert: true }, function (err, entry) {
        if (err) {
            console.log(error);
        }
        res.json(entry);
    });
});

module.exports = router;
