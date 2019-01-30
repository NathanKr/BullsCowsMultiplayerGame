const createMessage = (from,text) => {
    return  {
        from,
        text,
        createdAt: Date.now()
      }
};

module.exports = {
    createMessage
}