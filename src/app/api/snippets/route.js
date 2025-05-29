import { NextResponse } from 'next/server';
// import { writeFile, mkdir } from 'fs/promises';
// import { join } from 'path';
import { getConnection } from '../../../lib/db';

// Initialize database tables
// async function initDb() {
//   const db = await getDb();
//   await db.exec(`
//     CREATE TABLE IF NOT EXISTS daily_snippets (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       thought_of_day TEXT NOT NULL,
//       daily_journal TEXT NOT NULL,
//       created_at DATETIME DEFAULT CURRENT_TIMESTAMP
//     );

//     CREATE TABLE IF NOT EXISTS images (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       path TEXT NOT NULL,
//       snippet_id INTEGER NOT NULL,
//       created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//       FOREIGN KEY (snippet_id) REFERENCES daily_snippets(id)
//     );
//   `);
//   return db;
// }

// export async function POST(request) {
//   try {
//     const formData = await request.formData();
//     const thoughtOfDay = formData.get('thoughtOfDay');
//     const dailyJournal = formData.get('dailyJournal');
//     const images = formData.getAll('images');

//     // Create upload directory if it doesn't exist
//     const uploadDir = join(process.cwd(), 'public', 'uploads', 'images');
//     await mkdir(uploadDir, { recursive: true });

//     // Initialize database
//     const db = await initDb();

//     // Insert the daily snippet
//     const result = await db.run(
//       'INSERT INTO daily_snippets (thought_of_day, daily_journal) VALUES (?, ?)',
//       [thoughtOfDay, dailyJournal]
//     );

//     const snippetId = result.lastID;

//     // Save images and their paths
//     for (const image of images) {
//       const bytes = await image.arrayBuffer();
//       const buffer = Buffer.from(bytes);
//       const fileName = `${Date.now()}-${image.name}`;
//       const path = join(uploadDir, fileName);
      
//       // Save file to disk
//       await writeFile(path, buffer);

//       // Save path to database
//       await db.run(
//         'INSERT INTO images (path, snippet_id) VALUES (?, ?)',
//         [`/uploads/images/${fileName}`, snippetId]
//       );
//     }

//     return NextResponse.json({ 
//       success: true, 
//       message: 'Snippet created successfully' 
//     });

//   } catch (error) {
//     console.error('Error saving snippet:', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to save snippet' },
//       { status: 500 }
//     );
//   }
// }

export async function GET_ALTERNATIVE() {
  try {
    const db = await getConnection();
    
    // First, get all snippets
    const snippets = await db.query(`
      SELECT * FROM daily_snippets 
      ORDER BY created_at DESC
    `);

    // Then get images for each snippet
    for (let snippet of snippets) {
      const images = await db.query(`
        SELECT id, path FROM images 
        WHERE snippet_id = ?
      `, [snippet.id]);
      
      snippet.images = images;
    }

    return NextResponse.json(snippets);
  } catch (error) {
    console.error('Error fetching snippets:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch snippets' },
      { status: 500 }
    );
  }
}