const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data

  /*
  Category.findAll({
    //attributes: { exclude: ['password'] }
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  */

  Tag.findAll({
    //attributes: { exclude: ['password'] }
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });


});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data



  Tag.findOne({
    //attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });















});

router.post('/', (req, res) => {
  // create a new tag





  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  Tag.create({
    tag_name: req.body.tag_name
    
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });










});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value






   // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
  Tag.update(req.body, {
    //individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
       if (!dbTagData[0]) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbTagData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });










});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value






  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });









});

module.exports = router;
