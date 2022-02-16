export const getPage = (page: string) => {
    const pageInt = parseInt(page);
    if (pageInt < 0) return 0;
    return pageInt;
};

export const getPerPage = (perPage: string) => {
    const perPageInt = parseInt(perPage);
    if (perPageInt < 0) return 0;
    return perPageInt;
};
