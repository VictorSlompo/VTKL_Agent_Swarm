# ▲ Vercel Integration

Dashboard hosting and blob storage.

## Dashboard

**URL**: https://dashboard-silk-one-72.vercel.app

### Pages

| Page | Path | Purpose |
|------|------|---------|
| Home | `/` | Overview dashboard |
| Intake | `/intake` | Project submission form |
| Wiki | `/wiki` | Documentation |
| Agents | `/agents` | Agent status |
| Activity | `/activity` | Activity feed |

### Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Blob Storage

**Store**: swarm-uploads

Used for storing uploaded files from the intake form.

### Configuration

```bash
# Environment variable
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...
```

### Usage

```typescript
import { put } from '@vercel/blob';

const blob = await put('projects/id/file.pdf', file, {
  access: 'public',
});
// blob.url contains the CDN URL
```

## Deployment

```bash
# Deploy to production
cd swarm/dashboard
vercel --prod

# With token
vercel --token $VERCEL_TOKEN --prod
```

## Project Structure

```
swarm/dashboard/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Home
│   │   ├── intake/page.tsx    # Intake form
│   │   ├── wiki/              # Wiki pages
│   │   └── api/
│   │       └── intake/route.ts # Upload API
│   └── components/
├── package.json
└── vercel.json
```

## API Routes

### POST /api/intake

Handles project submission:
1. Receives form data
2. Uploads files to Blob
3. Sends webhook to server
4. Returns project JSON

```typescript
// Request: multipart/form-data
// - projectData: JSON string
// - files: File[]

// Response
{
  "success": true,
  "project": { ... },
  "files": [ { "name": "...", "url": "..." } ],
  "webhook": { "sent": true }
}
```

## Environment Variables

Set in Vercel dashboard or CLI:

```bash
vercel env add BLOB_READ_WRITE_TOKEN production
vercel env add INTAKE_WEBHOOK_URL production
```

---

*Managed by Neo (CTO)*
