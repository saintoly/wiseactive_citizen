const express             = require('express'),
      router              = express.Router(),
      BlogsController  = require('../controllers/blogs_controller');


 router.get('/', BlogsController.viewAllBlogs);
 router.get('/create', BlogsController.viewCreateBlog);
 router.get('/:id', BlogsController.viewChoice);
 router.get('/update/:id', BlogsController.viewUpdate);


router.post('/create', BlogsController.createBlog);
router.post('/update/:id', BlogsController.update);
router.post('/delete/:id', BlogsController.delete);

 


 module.exports = router;     