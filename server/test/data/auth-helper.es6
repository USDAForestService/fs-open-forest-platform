module.exports = {
  loginAdmin(agent) {
    return async () => {
      await agent
        .post('/auth/admin/callback')
        .send({ email: 'test@test.com', password: 'password' })
        .then((res) => {
          // Make sure session cookies are always httponly and samesite=none
          assert(/^session=.* httponly(;|$)/.test(res.headers['set-cookie']));
          assert(/^session=.* samesite=none(;|$)/.test(res.headers['set-cookie']));
          return res;
        });
    };
  },

  loginPublic(agent) {
    return async () => {
      await agent
        .post('/auth/public/callback')
        .send({ email: 'test@test.com', password: 'password' })
        .then((res) => {
          // Make sure session cookies are always httponly and samesite=none
          assert(/^session=.* httponly(;|$)/.test(res.headers['set-cookie']));
          assert(/^session=.* samesite=none(;| )/.test(res.headers['set-cookie']));
          return res;
        });
    };
  }
};
