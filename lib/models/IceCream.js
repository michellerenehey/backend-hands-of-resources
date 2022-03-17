const pool = require('../utils/pool');

module.exports = class IceCream {
  id;
  flavor;
  brand;

  constructor(row) {
    this.id = row.id;
    this.flavor = row.flavor;
    this.brand = row.brand;
  }

  static async insert({ flavor, brand }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
      icecream (flavor, brand)
      VALUES
      ($1, $2)
      RETURNING
      *`,
      [flavor, brand]
    );
    return new IceCream(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `SELECT
        *
        FROM
        icecream
        `
    );
    return rows.map((row) => new IceCream(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT
          *
          FROM
          icecream
          WHERE
          id=$1
          `,
      [id]
    );
    return new IceCream(rows[0]);
  }
};
