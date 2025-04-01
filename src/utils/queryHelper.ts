import pool from '../configs/database';

type executeQuery = {
    sql: string;
    params?: any[];
}

export async function executeQuery({sql, params}: executeQuery): Promise<any> {
    let conn;
    try {
      conn = await pool.getConnection();
      const response = await conn.query(sql, params);
      return response;
    } catch (err) {
      console.error('Database error:', err);
      throw new Error('Database query failed');
    } finally {
    // Ferme la connexion à la base de données
      if (conn) conn.release();
    }
  }