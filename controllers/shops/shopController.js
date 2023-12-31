import Product from '../../models/mongoose/product.js';
import Pagination from '../../utils/pagination.js';

class ShopController {
  static index(req, res) {
    const currentPage = parseInt(req.query.page || 1);
    const itemsPerPage = 3;
    const pagination = new Pagination();
    pagination
      .getResultSet('products', itemsPerPage, currentPage)
      .then((products) => {
        res.render('shops/index.ejs', {
          auth: req.session.auth,
          products: products,
          pageTitle: 'Our Shop',
          path: '/',
          messages: req.flash(),
          pagination: pagination.get(),
        });
      })
      .catch((err) => console.log(err));
  }
}

export default ShopController;
