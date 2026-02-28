// === Integration Stubs for MLH Prizes ===

// Google Gemini: Analyze memory photo
export async function analyzeMemoryPhoto(_imageUrl: string): Promise<{ vibeTags: string[]; category: string; captionSuggestions: string[] }> {
  console.log('[Gemini Stub] Analyzing photo...');
  return { vibeTags: ['cozy', 'golden hour', 'urban'], category: 'Art', captionSuggestions: ['A hidden gem in the city', 'Discovered something magical today'] };
}

// Google Gemini: Generate route story
export async function generateRouteStory(_mode: string, _stopTypes: string[]): Promise<string> {
  console.log('[Gemini Stub] Generating route story...');
  return 'A winding path through the city\'s creative heart — where murals meet matcha and every corner tells a story.';
}

// ElevenLabs: Generate audio micro-guide
export async function generateAudioGuide(_spotName: string, _description: string): Promise<string> {
  console.log('[ElevenLabs Stub] Generating audio guide...');
  return 'https://example.com/audio-guide-placeholder.mp3';
}

// Solana: Mint proof of exploration badge
export async function mintProofOfExploration(_walletAddress: string, _badgeId: string): Promise<{ txHash: string }> {
  console.log('[Solana Stub] Minting badge on-chain...');
  return { txHash: '0x' + Math.random().toString(16).slice(2, 18) };
}

// Auth0: Sign in
export async function authSignIn(_provider: 'apple' | 'google' | 'guest'): Promise<{ userId: string; name: string }> {
  console.log('[Auth0 Stub] Signing in...');
  return { userId: 'u_' + Math.random().toString(36).slice(2, 8), name: 'Explorer' };
}

// Snowflake: Send analytics event
export async function sendAnalyticsEvent(_event: string, _data: Record<string, unknown>): Promise<void> {
  console.log('[Snowflake Stub] Sending event:', _event, _data);
}

// Vultr: API base URL
export const API_BASE_URL = 'https://api.sidequest.app/v1';
