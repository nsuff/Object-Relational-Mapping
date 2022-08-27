const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products


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


});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products



  Category.findOne({
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
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });







});

router.post('/', (req, res) => {
  // create a new category







  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  Category.create({
    category_name: req.body.category_name
    
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });








});

router.put('/:id', (req, res) => {
  // update a category by its `id` value



    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    Category.update(req.body, {
      //individualHooks: true,
      where: {
        id: req.params.id
      }
    })
    .then(dbCategoryData => {
        if (!dbCategoryData[0]) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbCategoryData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });










});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
