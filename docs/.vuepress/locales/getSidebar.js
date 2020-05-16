exports.getSidebar = (title1, title2) => {
  return [
    {
      title: title1,
      collapsable: false,
      children: []
    },
    {
      title: title2,
      collapsable: false,
      children: []
    }
  ];
};
