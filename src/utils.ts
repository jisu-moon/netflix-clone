export const makeImagePath = (id: string, format?: string) => {
  return `https://image.tmdb.org/t/p/${format ? format : 'original'}/${id}`;
};
export const makeVideoPath = (id: string) => {
  return `https://www.youtube.com/embed/${id}`;
};
