import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdShoppingCart } from 'react-icons/md';
import { ProductList } from './styles';
import api from '../../Services/api';
import { formatPrice } from '../../util/format';
import * as CartActions from '../../store/modules/cart/actions';

function Home() {
  const [produtos, setProdutos] = useState([]);
  const dispatch = useDispatch();
  const amount = useSelector((state) =>
    state.cart.reduce((amount, product) => {
      amount[product.id] = product.amount;
      return amount;
    }, {})
  );
  useEffect(() => {
    async function getProdutos() {
      const resp = await api.get('products');
      const data = resp.data.map((produto) => ({
        ...produto,
        priceFormatted: formatPrice(produto.price),
      }));
      setProdutos(data);
    }
    getProdutos();
  }, []);

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }
  return (
    <ProductList>
      {produtos.map((prod) => (
        <li>
          <img src={prod.image} alt={prod.title} />
          <strog>{prod.title}</strog>
          <span>{prod.priceFormatted}</span>
          <button type="button" onClick={() => handleAddProduct(prod.id)}>
            <div>
              <MdShoppingCart size={36} color="#f18c" />
              {amount[prod.id] || 0}
            </div>
            <span>ADICIONAR AO CARRIHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}

export default Home;
