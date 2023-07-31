const Post = require('../models/Post');


module.exports.createPosts = async (req,res) =>{
      try {
           const posts = await new Post(req.body)
           posts.save()
           res.status(201).json('Post successfully..')
      } catch (error) {
          res.status(500).json('Oops, error, when posting data..')
      }

}

module.exports.getAllPosts =  async (req,res) =>{
    const username = req.query.username
    let posts;
    try {
        if(username) {
            posts = await Post.find({username : username}).sort({'createdDate':  -1});
          }
          else {
            posts = await Post.find().sort({'createdDate':  -1})
          }
         
        
        res.status(200).json(posts)
   } catch (error) {
       res.status(500).json('Oops, error, when finding posts data..')
   }

}

module.exports.getPost = async(req,res) =>{
    try {
        const post = await Post.findById(req.params.id)
        
        res.status(200).json(post)
   } catch (error) {
       res.status(500).json('Oops, error, when finding post..')
   }
}

module.exports.updatePost = async(req,res) =>{
    try {
        await Post.findByIdAndUpdate(req.params.id, { $set : req.body})
        
        res.status(201).json('Post has been updated..')
   } catch (error) {
       res.status(500).json('Oops, error, when updating post..')
   }
}


module.exports.deletePost = async(req,res) =>{
    try {
         await Post.findByIdAndDelete(req.params.id)
        
        res.status(200).json('Post has been deleted..')
   } catch (error) {
       res.status(500).json('Oops, error, when deleting post..')
   }
}


