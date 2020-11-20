import { call, put, all, select, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../Services/api';
// import history from '../../../Services/history';
import { addToCartSuccess, updateAmountSuccess } from './actions';
import { formatPrice } from '../../../util/format';

function* addToCart({ id }) {
  const productExist = yield select((state) =>
    state.cart.find((p) => p.id === id)
  );

  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentAmount = productExist ? productExist.amount : 0;
  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora de estoque');
    return;
  }
  if (productExist) {
    yield put(updateAmountSuccess(id, amount));
  } else {
    const resp = yield call(api.get, `/products/${id}`);

    const data = {
      ...resp.data,
      amount: 1,
      priceFormatted: formatPrice(resp.data.price),
    };
    yield put(addToCartSuccess(data));
    // history.push('/cart');
  }
}
function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `/stock/${id}`);
  const stockAmount = stock.data.amount;
  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora de estoque');
    return;
  }
  yield put(updateAmountSuccess(id, amount));
}
export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
