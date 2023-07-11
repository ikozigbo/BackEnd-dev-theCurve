const express = require('express');
const {
    createRecord,
    getRecords,
    getRecord,
    updateRecord,
    deleteRecord
} = require('../controllers/recordController')
const {userAuth} = require('../middleware/authMiddleware')
const router = express.Router();

// router.route('/records', userAuth)
//     .post(createRecord)
//     .get(getRecords)
router.post('/records', userAuth, createRecord)
router.get('/records', userAuth, getRecords)

router.route('/records/:id', userAuth)
    .get(getRecord)
    .put(updateRecord)
    .delete(deleteRecord)


module.exports = router