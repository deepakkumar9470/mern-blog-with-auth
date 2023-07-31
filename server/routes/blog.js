const router = require("express").Router();
const Post = require('../models/Post')
const {createPosts,getAllPosts,getPost,updatePost,deletePost,searchPost} =  require('../controllers/post-controller');

const {createComments, getAllComments, deleteComment} =  require('../controllers/comment-controller');

const {uploadPic,getPics} = require('../controllers/image-controller');

const upload = require('../utils/upload');


// @api/blog/create
router.post('/create',createPosts)

// @api/blog/posts
router.get('/posts',getAllPosts)

// @api/blog/posts/123
router.get('/posts/:id',getPost)

// @api/blog/update/123
router.put('/update/:id',updatePost)

// @api/blog/posts/123
router.delete('/posts/:id',deletePost)

// @api/blog/posts/123
router.post('/file/upload',upload.single('file') ,uploadPic)

// @api/blog/file/hvddv
router.get('/file/:filename',getPics)


// @api/blog/comment/create
router.post('/comment/create',createComments)

// @api/blog/comments
router.get('/comments',getAllComments)

// @api/blog/comment/123
router.delete('/comment/:id',deleteComment)


module.exports = router