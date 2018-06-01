const getAll = async (table, res) => {
  const records = await db(table).select();
  res.send(records);
};

module.exports = {
  getAll
};
