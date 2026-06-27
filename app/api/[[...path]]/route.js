import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URL;
let cached = global._mongo;
if (!cached) cached = global._mongo = { client: null, promise: null };

async function getDb() {
  if (!cached.client) {
    if (!cached.promise) cached.promise = new MongoClient(uri).connect();
    cached.client = await cached.promise;
  }
  return cached.client.db(process.env.DB_NAME || 'artaura');
}

function json(data, status = 200) {
  return NextResponse.json(data, { status });
}

export async function GET(request, { params }) {
  const path = (params?.path || []).join('/');
  try {
    if (path === '' || path === 'health') return json({ status: 'ok', brand: 'ARTAURA' });
    if (path === 'subscribers') {
      const db = await getDb();
      const items = await db.collection('subscribers').find({}, { projection: { _id: 0 } }).sort({ createdAt: -1 }).limit(50).toArray();
      return json({ items });
    }
    if (path === 'contacts') {
      const db = await getDb();
      const items = await db.collection('contacts').find({}, { projection: { _id: 0 } }).sort({ createdAt: -1 }).limit(50).toArray();
      return json({ items });
    }
    return json({ error: 'Not found' }, 404);
  } catch (e) {
    return json({ error: e.message }, 500);
  }
}

export async function POST(request, { params }) {
  const path = (params?.path || []).join('/');
  try {
    const body = await request.json().catch(() => ({}));
    const db = await getDb();
    if (path === 'subscribe') {
      if (!body.email) return json({ error: 'Email required' }, 400);
      const doc = { id: crypto.randomUUID(), email: body.email, createdAt: new Date().toISOString() };
      await db.collection('subscribers').insertOne(doc);
      return json({ ok: true, subscriber: doc });
    }
    if (path === 'contact') {
      const { name = '', email = '', message = '' } = body;
      if (!email || !message) return json({ error: 'Email and message required' }, 400);
      const doc = { id: crypto.randomUUID(), name, email, message, createdAt: new Date().toISOString() };
      await db.collection('contacts').insertOne(doc);
      return json({ ok: true, contact: doc });
    }
    if (path === 'workshops/register') {
      const { workshopId, name = '', email = '' } = body;
      if (!workshopId || !email) return json({ error: 'workshopId and email required' }, 400);
      const doc = { id: crypto.randomUUID(), workshopId, name, email, createdAt: new Date().toISOString() };
      await db.collection('registrations').insertOne(doc);
      return json({ ok: true, registration: doc });
    }
    return json({ error: 'Not found' }, 404);
  } catch (e) {
    return json({ error: e.message }, 500);
  }
}
