export default parent => ({
  ...parent,
  update: (resource, params) => {
    if (resource === "question") {
      const { data } = params;
      console.log(params);
      if (data.next) {
        data.next = data.next.id;
      }
    }
    return parent.update(resource, params);
  }
});
