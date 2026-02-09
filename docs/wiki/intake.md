# 📥 Project Intake System

Complete pipeline for submitting new projects with automatic file processing.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      VERCEL (Frontend)                       │
│                                                              │
│  User → /intake Form → Upload to Blob → Webhook ────────────┼──┐
│                                                              │  │
│  • Voice recording (browser)                                 │  │
│  • File uploads (any format)                                 │  │
│  • Project metadata                                          │  │
└─────────────────────────────────────────────────────────────┘  │
                                                                  │
┌─────────────────────────────────────────────────────────────┐  │
│              OPENCLAW SERVER (Backend Processor)             │◄─┘
│                                                              │
│  Webhook → Download Files → Process → Extract Content        │
│                                                              │
│  Processing Pipeline:                                        │
│  ├── 🎤 Audio/Video → OpenAI Whisper → Transcription        │
│  ├── 📄 PDF → pdf-parse → Text extraction                   │
│  ├── 📝 Word (DOC/DOCX) → mammoth → Text extraction         │
│  ├── 📊 PowerPoint → Manual review flag                     │
│  └── 🖼️ Images → Vision API ready                           │
│                                                              │
│  Output: state/projects/{id}.json (AI-readable)              │
└─────────────────────────────────────────────────────────────┘
```

## How to Submit a Project

1. **Go to the Intake Form**: https://dashboard-silk-one-72.vercel.app/intake
2. **Fill in Project Details**: Name, objective, features (MoSCoW priorities)
3. **Record Voice Note** (Optional): Click 🎙️ to explain in your own words
4. **Attach Files**: Meeting recordings, documents, presentations
5. **Submit**: Files are uploaded and automatically processed

## Supported File Formats

| Type | Formats | Processing |
|------|---------|------------|
| 🎬 Video | MP4, MOV, WEBM | Auto-transcribed (Whisper) |
| 🎤 Audio | MP3, WAV, M4A, OGG | Auto-transcribed (Whisper) |
| 📄 PDF | PDF | Text extracted |
| 📝 Word | DOC, DOCX | Text extracted |
| 📊 PowerPoint | PPT, PPTX | Manual review |
| 📈 Excel | XLS, XLSX | Manual review |
| 🖼️ Images | PNG, JPG, GIF | Vision ready |
| 📋 Text | TXT, MD | Direct read |

## Data Flow

1. User submits form with files
2. Files uploaded to Vercel Blob → URLs generated
3. Webhook sent to OpenClaw server (port 3847)
4. Server downloads files from Blob URLs
5. Content extracted (Whisper, pdf-parse, mammoth)
6. Project saved to `state/projects/{id}.json`
7. Neo notified → Estimation begins

## Output Format

```json
{
  "id": "construction-estimator-mvp",
  "name": "Construction Estimator MVP",
  "status": "processed",
  "createdAt": "2026-02-09T18:00:00Z",
  "processedAt": "2026-02-09T18:01:23Z",
  "objective": "Build a construction cost estimator",
  "features": [
    { "id": "F001", "name": "Material Calculator", "priority": "must" },
    { "id": "F002", "name": "Labor Estimates", "priority": "should" }
  ],
  "extractedContent": [
    {
      "fileName": "meeting-recording.mp3",
      "fileType": "audio/mpeg",
      "fileUrl": "https://blob.vercel.../meeting.mp3",
      "content": "[Full transcription of the meeting...]",
      "processedAt": "2026-02-09T18:01:20Z"
    }
  ],
  "contentSummary": "### meeting-recording.mp3\n\n[transcription]..."
}
```

## Technical Details

| Setting | Value |
|---------|-------|
| Webhook Endpoint | `:3847/webhook/intake` |
| Service | `intake-processor.service` |
| Blob Storage | Vercel Blob (swarm-uploads) |
| Transcription | OpenAI Whisper-1 |
| State Directory | `swarm/state/projects/` |
| Default Language | Portuguese (pt) |

## Cost

- **Whisper transcription**: ~$0.006/minute of audio
- **Blob storage**: ~$0.15/GB/month
- **Processing**: Included in server costs

---

*Part of the VTKL Agent Swarm system*
