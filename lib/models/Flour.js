const pool = require('../utils/pool');

module.exports = class Flour {
  id;
  type;
  protein;

  constructor(row) {
    this.id = row.id;
    this.type = row.type;
    this.protein = row.protein;
  }

  static async insert({ type, protein }) {
    const { rows } = await pool.query(
      `
          INSERT INTO
          flours (type, protein)
          VALUES
          ($1, $2)
          RETURNING
          *
          `,
      [type, protein]
    );
    return new Flour(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `SELECT
      *
      FROM
      flours
      `
    );
    return rows.map((row) => new Flour(row));
  }
};
