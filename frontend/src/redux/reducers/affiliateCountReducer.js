export default function affiliateCount(state = {
  count: 0
}, action) {
  switch (action.type) {
    case 'SET_AFFILIATE_COUNT':
      return {
        count: action.count
      };
    default:
      return state;
  }
}
