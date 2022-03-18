const pool = require('../utils/pool');

module.exports = class Chore {
  id;
  name;
  location;
  frequency;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.location = row.location;
    this.frequency = row.frequency;
  }

  static async insert({ name, location, frequency }) {
    const { rows } = await pool.query(
      `INSERT INTO 
      chores (name, location, frequency) 
      VALUES
      ($1, $2, $3)
      RETURNING
      *
      `,
      [name, location, frequency]
    );

    return new Chore(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM chores');
    return rows.map((row) => new Chore(row));
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM chores WHERE id=$1', [id]);
    if (!rows[0]) return null;
    return new Chore(rows[0]);
  }
};
