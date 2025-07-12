import { NextResponse } from 'next/server';
import githubSummarizerChain from '../../../llm/githubSummarizerChain';
import { supabase } from '../../../lib/supabaseClient';

function parseGitHubUrl(url) {
  const match = url.match(/^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)(?:\/|$)/i);
  if (!match) return null;
  return { owner: match[1], repo: match[2] };
}

export async function POST(req) {
  try {
    const { githubUrl, apiKey } = await req.json();
    console.log('[API] githubUrl:', githubUrl);
    
    // Проверка API-ключа
    if (!apiKey) {
      console.log('[API] No API key provided');
      return NextResponse.json({ error: 'API key required' }, { status: 401 });
    }

    // Проверяем валидность ключа в базе данных
    const { data: keyData, error: keyError } = await supabase
      .from('api_keys')
      .select('id')
      .eq('key', apiKey)
      .eq('status', 'active')
      .maybeSingle();

    if (keyError || !keyData) {
      console.log('[API] Invalid API key');
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
    }

    if (!githubUrl) {
      console.log('[API] No githubUrl provided');
      return NextResponse.json({ error: 'GitHub URL required' }, { status: 400 });
    }
    
    const parsed = parseGitHubUrl(githubUrl);
    console.log('[API] Parsed:', parsed);
    if (!parsed) {
      console.log('[API] Invalid GitHub URL');
      return NextResponse.json({ error: 'Invalid GitHub URL' }, { status: 400 });
    }
    
    const { owner, repo } = parsed;
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;
    console.log('[API] Fetching README from:', apiUrl);
    const res = await fetch(apiUrl, {
      headers: { 'Accept': 'application/vnd.github.v3.raw' },
    });
    console.log('[API] GitHub API status:', res.status);
    if (!res.ok) {
      console.log('[API] Failed to fetch README');
      return NextResponse.json({ error: 'Failed to fetch README from GitHub' }, { status: 404 });
    }
    
    const readmeContent = await res.text();
    console.log('[API] README content (first 200 chars):', readmeContent.slice(0, 200));
    if (!readmeContent) {
      console.log('[API] README is empty');
      return NextResponse.json({ error: 'README is empty' }, { status: 404 });
    }
    
    // Вызов LangChain пайплайна
    let summaryResult = null;
    try {
      summaryResult = await githubSummarizerChain.invoke({ readmeContent });
      console.log('[API] LangChain summaryResult:', summaryResult);
    } catch (llmError) {
      console.error('[API] LangChain error:', llmError);
      return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 });
    }
    
    return NextResponse.json(summaryResult);
  } catch (e) {
    console.error('[API] General error:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 