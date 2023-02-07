const express = require("express");
const router = express.Router();
const cors = require("cors");
const Controller = require('./controllers/sisCibController');
const sisCibMiddleware = require('./middlewares/sisCibMiddleware');

const httHeaders = [
    {key: 'Access-Control-Allow-Credentials', value:'true'},
    {key: 'Access-Control-Allow-Origin', value:'*'},
    {key: 'Access-Control-Allow-Methods', value:'*'},
    {key: 'Access-Control-Allow-Headers', value:'*'},
]

router.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    router.use(cors());
    next();

});

router.get('/ranking',sisCibMiddleware.verifyLogin, Controller.getAllUserRanking);
router.post('/TagSearch',Controller.getTagSearch);
router.post('/insertTag',sisCibMiddleware.verifyLogin, Controller.insertTag);

router.delete('/deleteTag/:tag,:voo',sisCibMiddleware.verifyLogin, Controller.deleteTag);

// router.put('/tasks/:id',sisCibMiddleware.validateFieldTitle,sisCibMiddleware.validateFieldStatus, Controller.updateTask);

router.post('/voos',Controller.getAllVoos2);
router.post('/tagsreturn',Controller.getAllTagsFilter);

router.post('/cias',Controller.getAllCias);
router.post('/userLider',Controller.getAllUserLider);
// router.post('/cias',sisCibMiddleware.verifyLogin, Controller.getAllCias);

router.post('/login',sisCibMiddleware.validateLogin,Controller.authenticationLogin);

module.exports = router;




