module.exports = {
  loginAdmin(agent) {
    return async () => {
      await agent
        .post('/auth/admin/callback')
        .send({ email: 'test@test.com', password: 'password' });
    };
  },

  loginPublic(agent) {
    return async () => {
      await agent
        .post('/auth/public/callback')
        .send({ email: 'test@test.com', password: 'password' });
    };
  }
};
