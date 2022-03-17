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

  static async findAll() {
    const { rows } = await pool.query(
      `SELECT 
        *
        FROM
        friends
        `
    );

    return rows.map((row) => new Friend(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT
          *
          FROM
          friends
          WHERE
          id=$1
          `,
      [id]
    );

    return new Friend(rows[0]);
  }

  static async updateById(id, attributes) {
    const existingFriend = await Friend.findById(id);
    if (!existingFriend) return null;
    const name = attributes.name ?? existingFriend.name;
    const city = attributes.city ?? existingFriend.city;
    const favoriteAnimal =
      attributes.favoriteAnimal ?? existingFriend.favoriteAnimal;
    const { rows } = await pool.query(
      `UPDATE
            friends
        SET
            name=$1, 
            city=$2,
            favorite_animal=$3
        WHERE
            id=$4
        RETURNING
            *`,
      [name, city, favoriteAnimal, id]
    );
    return new Friend(rows[0]);
  }
};
