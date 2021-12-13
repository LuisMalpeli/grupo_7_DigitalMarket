const fs = require ('fs');
const path = require ('path');

const Products = {
    fileName:path.resolve (__dirname, '../db/products.json'),

    getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },
    findAll: function () {
        return this.getData();
    },
    findByPk: function (pk) {
        let allProducts = this.findAll();
        let productFound = allProducts.find(product => product.id == pk)
        return productFound;
    },
    findByField: function (field, text){
        //Busca un producto recibiendo qué campo debería buscar, y que valor tiene que buscar en ese campo
        let allProducts = this.findAll();
        let productFound = allProducts.find(product => product[field] === text)
        return productFound;
    },
    generateId: function () {
        let allProducts = this.findAll();
        let lastProduct = allProducts.pop();
        if (lastProduct) {
            return lastProduct.id + 1;
        }
        return 1;
    },
    create: function (product) {
        //recibe un producto como objeto literal
        let allProducts = this.findAll();
        let newProduct = {
            id: this.generateId(),
            ...product
        }
        allProducts.push(newProduct);
        fs.writeFileSync(this.fileName,JSON.stringify(allProducts, null, ' '));
        return newProduct; //retorna el producto para utilizarlo luego
    },
    delete: function (id) {
        let allProducts = this.findAll();
        let finalProductList = allProducts.filter(product => product.id != id);
        fs.writeFileSync(this.fileName,JSON.stringify(finalProductList, null, ' '));
        return true; //retorna true para validar que todo funcionó
    },
    edit: function (product) {
        let allProducts = this.findAll();
        let productsEdited = allProducts.map(function (element) {
            // encuentra y edita el producto deseado
            if (element.id == product.id) {
                element = product
            }
            return element
        })
        //guardar la BBDD
        fs.writeFileSync(this.fileName,JSON.stringify(productsEdited, null, ' '));
        return true;
        
    }

}

module.exports = Products;