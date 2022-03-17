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
};
