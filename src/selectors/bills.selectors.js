export function getBillByUrl(state, billUrl) {
  return state.bills && state.bills.find(b => b.url === billUrl);
}