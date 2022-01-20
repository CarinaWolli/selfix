const getSidebar = () => {
  return {
    sidebarOpen: false
  };
};

export default function sidebar(state = getSidebar(), action) {
  if (action.type === 'TOGGLE_SIDEBAR_OPEN') {
    return {
      sidebarOpen: true
    };
  } else if (action.type === 'TOGGLE_SIDEBAR_CLOSE') {
    return {
      sidebarOpen: false
    };
  } else {
    return state;
  }
}
