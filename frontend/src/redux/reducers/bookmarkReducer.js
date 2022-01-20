export default function bookmarks(state = {
  bookmarkedBikes: [],
  bookmarkedTutorials: []
}, action) {
  switch (action.type) {
    case 'SET_BOOKMARKED_BIKES':
      return {
        ...state,
        bookmarkedBikes: action.bikes
      };
    case 'SET_BOOKMARKED_TUTORIALS':
      return {
        ...state,
        bookmarkedTutorials: action.tutorials
      };
    default:
      return state;
  }
}
