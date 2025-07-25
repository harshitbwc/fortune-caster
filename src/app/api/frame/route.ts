import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await req.json(); // Parse the request body
    
    // Handle Farcaster frame interaction
    // Future use for frame interactions
    
    // For now, just redirect to the main app
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fortune-caster.vercel.app';
    
    return new Response(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${appUrl}/home.png" />
          <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
          <meta property="fc:frame:button:1" content="🥠 Open Fortune Caster" />
          <meta property="fc:frame:button:1:action" content="link" />
          <meta property="fc:frame:button:1:target" content="${appUrl}" />
          <meta property="og:title" content="Fortune Caster - Cosmic Fortune Cookies" />
          <meta property="og:description" content="Discover your cosmic destiny with interactive fortune cookies!" />
          <meta property="og:image" content="${appUrl}/home.png" />
        </head>
        <body>
          <h1>Fortune Caster</h1>
          <p>Click the button above to open Fortune Caster and discover your cosmic destiny!</p>
        </body>
      </html>
    `, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Frame API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  // Return frame metadata for GET requests
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://fortune-caster.vercel.app';
  
  return new Response(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${appUrl}/home.png" />
        <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
        <meta property="fc:frame:button:1" content="🥠 Get Your Fortune" />
        <meta property="fc:frame:button:1:action" content="link" />
        <meta property="fc:frame:button:1:target" content="${appUrl}" />
        <meta property="fc:frame:post_url" content="${appUrl}/api/frame" />
        <meta property="og:title" content="Fortune Caster - Cosmic Fortune Cookies" />
        <meta property="og:description" content="Discover your cosmic destiny with interactive fortune cookies!" />
        <meta property="og:image" content="${appUrl}/home.png" />
      </head>
      <body>
        <h1>Fortune Caster</h1>
        <p>Discover your cosmic destiny with interactive fortune cookies!</p>
      </body>
    </html>
  `, {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
    },
  });
}