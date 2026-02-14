import { NextRequest, NextResponse } from 'next/server';
import { API_BASE_URL } from '@/lib/constants';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  // Build upstream URL
  let upstreamUrl = `${API_BASE_URL}/no`;
  if (category && category !== 'all') {
    upstreamUrl = `${API_BASE_URL}/no/${encodeURIComponent(category)}`;
  }

  try {
    const response = await fetch(upstreamUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'NaaS-Web/1.0',
      },
      cache: 'no-store',
    });

    // Handle rate limiting
    if (response.status === 429) {
      return NextResponse.json(
        { error: 'rate_limit', message: 'Too many Nos. Try again shortly.' },
        {
          status: 429,
          headers: {
            'Retry-After': '60',
            'Cache-Control': 'no-store',
          },
        },
      );
    }

    // Handle not found (invalid category)
    if (response.status === 404) {
      // Fallback to default endpoint
      const fallback = await fetch(`${API_BASE_URL}/no`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });
      const data = await fallback.json();
      return NextResponse.json(data, {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'Content-Type': 'application/json',
        },
      });
    }

    if (!response.ok) {
      throw new Error(`Upstream error: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Edge proxy error:', error);

    return NextResponse.json(
      {
        error: 'service_unavailable',
        message: 'Unable to fetch a rejection reason right now.',
        reason: "I'd love to say no, but even the server is saying no to me right now.",
      },
      {
        status: 503,
        headers: {
          'Cache-Control': 'no-store',
          'Content-Type': 'application/json',
        },
      },
    );
  }
}
