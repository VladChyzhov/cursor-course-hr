import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export async function POST(req) {
  try {
    const { apiKey } = await req.json();
    if (!apiKey) {
      return NextResponse.json({ valid: false }, { status: 400 });
    }
    const { data, error } = await supabase
      .from('api_keys')
      .select('id')
      .eq('key', apiKey)
      .eq('status', 'active')
      .maybeSingle();
    if (error) {
      return NextResponse.json({ valid: false }, { status: 500 });
    }
    if (data) {
      return NextResponse.json({ valid: true });
    }
    return NextResponse.json({ valid: false });
  } catch (e) {
    return NextResponse.json({ valid: false }, { status: 500 });
  }
} 