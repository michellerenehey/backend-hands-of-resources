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
      'INSERT INTO flours (type, protein) VALUES ($1, $2) RETURNING *',
      [type, protein]
    );
    if (!rows[0]) return null;
    return new Flour(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM flours');
    return rows.map((row) => new Flour(row));
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM flours WHERE id=$1', [id]);
    if (!rows[0]) return null;
    return new Flour(rows[0]);
  }

  static async updateById(id, attributes) {
    const existingFlour = await Flour.findById(id);
    if (!existingFlour) return null;
    const type = attributes.type ?? existingFlour.type;
    const protein = attributes.protein ?? existingFlour.protein;
    const { rows } = await pool.query(
      'UPDATE flours SET type=$1, protein=$2 WHERE id=$3 RETURNING *',
      [type, protein, id]
    );
    if (!rows[0]) return null;
    return new Flour(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM flours WHERE id=$1 RETURNING *',
      [id]
    );
    if (!rows[0]) return null;
    return new Flour(rows[0]);
  }
};
