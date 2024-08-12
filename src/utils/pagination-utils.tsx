export const itemsPerPage: number = 10;

export const showPageItem = (index: number, page: number): boolean => {
  const pageLowerLimit = itemsPerPage * (page - 1);
  const pageUpperLimit = itemsPerPage * page;

  return index >= pageLowerLimit && index < pageUpperLimit;
};
