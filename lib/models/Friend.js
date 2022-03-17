const pool = require('../utils/pool');

module.exports = class Friend {
  id;
  name;
  city;
  favoriteAnimal;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.city = row.city;
    this.favoriteAnimal = row.favorite_animal;
  }

  static async insert({ name, city, favoriteAnimal }) {
    const { rows } = await pool.query(
      `INSERT INTO 
      friends (name, city, favorite_animal) 
      VALUES
      ($1, $2, $3)
      RETURNING
      *
      `,
      [name, city, favoriteAnimal]
    );

    return new Friend(rows[0]);
  }
};
