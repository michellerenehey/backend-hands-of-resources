const pool = require('../utils/pool');

module.exports = class Housewife {
  id;
  name;
  season;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.season = row.season;
  }

  static async insert({ name, season }) {
    const { rows } = await pool.query(
      `
        INSERT INTO 
            housewives (name, season) 
        VALUES 
            ($1, $2) 
        RETURNING 
        *
        `,
      [name, season]
    );

    return new Housewife(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query(
      `
          SELECT
          *
          FROM
          housewives
          `
    );
    return rows.map((row) => new Housewife(row));
  }
};
