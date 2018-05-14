const casparter = require('./lib.js')

casparter.downloadImage('https://cdn.shopify.com/s/files/1/1703/8383/products/The_Shining_Jack_Nicholson_Here_s_Johnny_large.jpg').then((file) => {
    casparter.deleteFile(file);
}).catch(err => console.error(err));

