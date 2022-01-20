import { combineReducers } from 'redux';
import user from './userReducer';
import sidebar from './sidebarReducer';
import bookmarks from './bookmarkReducer';
import affiliates from './affiliateCountReducer';

export default combineReducers({
  user,
  sidebar,
  bookmarks,
  affiliates
});
