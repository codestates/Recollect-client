module.exports = {
  getbookmark: (bookmark) => {
    const result = [];

    let cur = bookmark[0];
    for (let i = 1; i <= bookmark.length; i++) {
      if (!bookmark[i]) {
        result.push(cur);
        break;
      }

      if (bookmark[i].id === cur.id) {
        cur = { ...cur, ...bookmark[i], icon: cur.icon + bookmark[i].icon };
      } else {
        result.push(cur);
        cur = bookmark[i];
      }
    }

    result.map((el) => {
      return (el.createdAt = el.createdAt.slice(0, 10));
    });

    return result;
  },
};
