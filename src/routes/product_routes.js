const { Router } = require('express');
const router = Router();

//recipes info
const products = require('../data/products.json');
const api_url = '/api/products';

//methods of recipes
function isTitleRepeated(new_title) {
    for (const product of products) {
        let title_repeated = product.title == new_title;
        if (title_repeated) return true;
    }
    return false;
}

//get all products
// API TIPO GET CON DIRECCION api/products SIN PARAMETROS QUE REGRESA UN JSON CON TODOS LOS PRODUCTOS
router.get(api_url, (_, response) => {
    response.status(200).json(products);
});

//get promotion products
// API TIPO GET CON DIRECCION api/products/promotions SIN PARAMETROS QUE REGRESA UN JSON CON TODOS LOS PRODUCTOS QUE CUENTAN CON DESCUENTO
router.get(api_url + '/promotions', (request, response) => {
    let promotions = []
    products.forEach(product => {
        if (product.discount > 0.0) 
            promotions.push(product);
    });
    response.status(200).json(promotions);
});

//get product by id
// API TIPO GET CON DIRECCION api/products CON UN ID DE PRODUCTO COMO PARAMETRO QUE REGRESA UN JSON CON UN UNICO PRODUCTO QUE HAGA MATCH CON EL ID
router.get(api_url + '/:id', (request, response) => {
    const {id} = request.params;
    products.forEach(product => {
        if (product.id == id) {
            response.status(200).json(product);
            return;
        }
    });
    response.status(500).send('product with id #' + id + ' not found');
});

//get product image  
// ESTA NO SE USA NO LE HAGAN CASO
router.get(api_url + '/images/:id', (request, response) => {
    const {id} = request.params;
    products.forEach(product => {
        if (product.id == id) {
            response.status(200).send(__dirname.substring(0, __dirname.length -  7) + "/images/" + product.images[0]);
            return;
        }
    });
    response.status(500).send('product with id #' + id + ' not found');
});

//add new product
/*router.post(api_url, (request, response) => {
    const {title, price, discount, category, colors, sizes, images, description, tags, stock} = request.body;
    
    if (!(title && price && discount && category && colors && sizes && images && description && tags && stock)) {
        response.status(500).send('missing data');
        return;
    }

    if (isTitleRepeated(title)) {
        response.status(500).send('title is repeated');
        return;
    }

    const new_id = products.length + 1;
    const stars = 5;
    products.push({new_id, title, stars, price, discount, category, colors, sizes, images, description, tags, stock});
    response.status(200).send('product added successfully');
});*/


//modify recipe 
/*router.post(api_url + '/modify', (request, response) => {
    const {id, image, title, price, tipe, ingredients} = request.body;
    
    if (!(id) || !(image || title || price || tipe || ingredients)) {
        response.status(500).send('missing id or data');
        return;
    }

    recipes.forEach(recipe => {
        if (recipe.id == id) {
            if (image)
                recipe.image = image;
            if (price) 
                recipe.price = price;
            if (tipe) 
                recipe.tipe = tipe;
            if (ingredients) 
                recipe.ingredients = ingredients;
            if (title)
                if (!isTitleRepeated(title)) 
                    recipe.title = title;
                else
                    response.status(200).send('recipe modified successfully but name repeated');  
            response.status(200).send('recipe modified successfully');
            return;
        }
    });

    response.status(500).send('recipe with id #' + id + ' not found');
});*/

module.exports = router;