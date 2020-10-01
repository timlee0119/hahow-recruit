module.exports = async (action, times) => {
  for (let i = 0; i < times; ++i) {
    try {
      const result = await action();
      if (result.data && result.data.code !== 1000) {
        return result;
      }
    } catch (error) {
      throw error;
    }
  }
  return;
};
