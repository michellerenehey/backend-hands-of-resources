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

  static async findById(id) {
    const { rows } = await pool.query(
      `
          SELECT
          *
          FROM
          housewives
          WHERE
          id=$1
          `,
      [id]
    );
    if (!rows[0]) return null;
    return new Housewife(rows[0]);
  }

  static async updateById(id, attributes) {
    const result = await Housewife.findById(id);
    if (!result) return null;
    // if there isn't a matching ID, it will be null and error
    const name = attributes.name ?? result.name;
    // if this name attribute was updated, we'll return that
    // otherwise we'll return the name of the result (housewive name)
    // same with season below
    const season = attributes.season ?? result.season;
    const { rows } = await pool.query(
      `UPDATE 
        housewives 
      SET 
        name=$2, 
        season=$3 
      WHERE 
        id=$1 
      RETURNING 
        *
      `,
      [id, name, season]
    );
    return new Housewife(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `
          DELETE FROM
          housewives
          WHERE
          id=$1
          RETURNING
          *
          `,
      [id]
    );
    if (!rows[0]) return null;
    return new Housewife(rows[0]);
  }
};
