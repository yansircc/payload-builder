# WordPress Migration API

This API endpoint allows importing WordPress posts from a SQL dump file into the Payload CMS.

## Overview

The migration process:

1. Accepts a WordPress SQL dump file containing post data
2. Parses the SQL file to extract post information
3. Converts WordPress HTML content to Lexical format
4. Creates new posts in Payload CMS with the converted content

## File Structure

- `route.ts` - API route handler
- `types.ts` - TypeScript interfaces and types
- `wordpress-parser.ts` - SQL parsing functionality
- `lexical-converter.ts` - HTML to Lexical conversion
- `migration-service.ts` - Core migration business logic

## Usage

Send a POST request to `/api/wordpress-migration` with:

- `file`: SQL dump file containing WordPress posts
- Valid tenant cookie in the request

### Example Request

```typescript
const formData = new FormData()
formData.append('file', sqlFile)

const response = await fetch('/api/wordpress-migration', {
  method: 'POST',
  body: formData,
})
```

### Response Format

Success response:

```json
{
  "success": true,
  "message": "WordPress posts imported",
  "results": [
    {
      "success": true,
      "id": "original_wp_id",
      "newId": "new_payload_id"
    }
  ]
}
```

Error response:

```json
{
  "success": false,
  "message": "Error message"
}
```

## Features

- Handles WordPress post content, titles, slugs, and dates
- Converts HTML to Lexical format for rich text editing
- Preserves formatting for headings, paragraphs, links
- Special handling for WordPress shortcodes (e.g., [claim])
- Multi-tenant support
- Error handling and validation

## Error Handling

The API handles several error cases:

- Missing SQL file
- Empty SQL content
- Missing tenant
- Invalid SQL format
- Failed post creation

Each failed post import is tracked in the results array with error details.
