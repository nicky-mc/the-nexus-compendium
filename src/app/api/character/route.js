import { dbConnection } from '@/app/utils/dbconnection';

export default async function handler(req, res) {
  const db = await dbConnection();
  const { method } = req;

  switch (method) {
    // CREATE a new character
    case 'POST':
      try {
        const {
          player_name,
          character_info,
          stats,
          inventory,
          spells,
          notes,
        } = req.body;

        await db.query(
          `
          INSERT INTO characters 
          (player_name, character_info, stats, inventory, spells, notes) 
          VALUES ($1, $2, $3, $4, $5, $6)
          `,
          [
            player_name,
            character_info,
            stats,
            inventory,
            spells,
            notes,
          ]
        );
         
        res.status(201).json({ message: 'Character created successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating character' });
      }
      break;

    // READ all characters
    case 'GET':
      try {
        const characters = await db.query('SELECT * FROM characters');
        res.status(200).json(characters.rows);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching characters' });
      }
      break;

    // UPDATE a character
    case 'PUT':
      try {
        const {
          id,
          player_name,
          character_info,
          stats,
          inventory,
          spells,
          notes,
        } = req.body;

        await db.query(
          `
          UPDATE characters 
          SET 
            player_name = $1, 
            character_info = $2, 
            stats = $3, 
            inventory = $4, 
            spells = $5, 
            notes = $6
          WHERE id = $7
          `,
          [
            player_name,
            character_info,
            stats,
            inventory,
            spells,
            notes,
            id,
          ]
        );

        res.status(200).json({ message: 'Character updated successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating character' });
      }
      break;

    // DELETE a character
    case 'DELETE':
      try {
        const { id } = req.query;

        await db.query('DELETE FROM characters WHERE id = $1', [id]);

        res.status(200).json({ message: 'Character deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting character' });
      }
      break;

    default:
      res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
