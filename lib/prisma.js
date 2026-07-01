import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.poolQueryViaFetch = true;
neonConfig.webSocketConstructor = ws;

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);

// FIX: Next.js 'fetch' causes Neon to crash in Node.js (which Inngest uses).
// We ONLY use the adapter if Vercel is actively running this on the Edge.
const isEdge = process.env.NEXT_RUNTIME === "edge";

// If on Edge, use Neon Adapter. If on standard Node (Inngest), use standard Prisma.
const prisma = global.prisma || new PrismaClient(isEdge ? { adapter } : {});

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;
