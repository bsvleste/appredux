/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import { Container, ProductTable, Total } from './styles';
import { formatPrice } from '../../util/format';
import * as CartActions from '../../store/modules/cart/actions';

export default function Carrinho() {
  const dispatch = useDispatch();
  const total = useSelector((state) =>
    formatPrice(
      state.cart.reduce((totalsum, product) => {
        return totalsum + product.price * product.amount;
      }, 0)
    )
  );

  const cart = useSelector((state) =>
    state.cart.map((product) => ({
      ...product,
      subTotal: formatPrice(product.price * product.amount),
    }))
  );

  function incrementAmount(prod) {
    dispatch(CartActions.updateAmountRequest(prod.id, prod.amount + 1));
  }
  function decrementAmount(prod) {
    dispatch(CartActions.updateAmountRequest(prod.id, prod.amount - 1));
  }
  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>Produto</th>
            <th>Qtd</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map((prod) => (
            <tr>
              <td>
                <img src={prod.image} alt="tenis" />
              </td>
              <td>
                <strong>{prod.title}</strong>
                <span>{prod.priceFormatted}</span>
              </td>
              <td>
                <div>
                  <button type="button" onClick={() => decrementAmount(prod)}>
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="number" readOnly value={prod.amount} />
                  <button type="button" onClick={() => incrementAmount(prod)}>
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{prod.subTotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => dispatch(CartActions.removeFromCart(prod.id))}
                >
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>
      <footer>
        <button type="button">inalizar pedido</button>
        <Total>
          <span>Total</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}
