
exports.seed = function(knex) {
      return knex('users').insert([
      {
        username: 'Geralt of Rivera',
        password: 'Witcher'
      },

      {
        username: 'Master Chief',
        password: 'Cortana'
      },
       
      ]);
};
