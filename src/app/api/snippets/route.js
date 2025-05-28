import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Initialize database
async function getDb() {
  return open({
    filename: join(process.cwd(), 'data', 'snippets.db'),
    driver: sqlite3.Database
  });
}

// Initialize database tables
async function initDb() {
  const db = await getDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS daily_snippets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      thought_of_day TEXT NOT NULL,
      daily_journal TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      path TEXT NOT NULL,
      snippet_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (snippet_id) REFERENCES daily_snippets(id)
    );
  `);
  return db;
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const thoughtOfDay = formData.get('thoughtOfDay');
    const dailyJournal = formData.get('dailyJournal');
    const images = formData.getAll('images');

    // Create upload directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'images');
    await mkdir(uploadDir, { recursive: true });

    // Initialize database
    const db = await initDb();

    // Insert the daily snippet
    const result = await db.run(
      'INSERT INTO daily_snippets (thought_of_day, daily_journal) VALUES (?, ?)',
      [thoughtOfDay, dailyJournal]
    );

    const snippetId = result.lastID;

    // Save images and their paths
    for (const image of images) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${image.name}`;
      const path = join(uploadDir, fileName);
      
      // Save file to disk
      await writeFile(path, buffer);

      // Save path to database
      await db.run(
        'INSERT INTO images (path, snippet_id) VALUES (?, ?)',
        [`/uploads/images/${fileName}`, snippetId]
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Snippet created successfully' 
    });

  } catch (error) {
    console.error('Error saving snippet:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save snippet' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const db = await getDb();
    
    const snippets = await db.all(`
      SELECT 
        s.*,
        json_group_array(
          json_object(
            'id', i.id,
            'path', i.path
          )
        ) as images
      FROM daily_snippets s
      LEFT JOIN images i ON s.id = i.snippet_id
      GROUP BY s.id
      ORDER BY s.created_at DESC
    `);

    return NextResponse.json(snippets);
  } catch (error) {
    console.error('Error fetching snippets:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch snippets' },
      { status: 500 }
    );
  }
}
