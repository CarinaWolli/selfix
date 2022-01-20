export function setBookmarkedBikes(bikes) {
  return { type: 'SET_BOOKMARKED_BIKES', bikes: bikes  };
}

export function setBookmarkedTutorials(tutorials) {
  return { type: 'SET_BOOKMARKED_TUTORIALS', tutorials: tutorials };
}
