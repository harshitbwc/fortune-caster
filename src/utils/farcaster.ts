export const shareToFarcaster = (message: string) => {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
  const text = encodeURIComponent(`🥠 "${message}"\n\n✨ Discover your cosmic destiny at Fortune Caster!\n${appUrl}`);
  const url = `https://warpcast.com/~/compose?text=${text}`;
  
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};

export const generateCastIntent = (fortune: string): string => {
  const baseUrl = 'https://warpcast.com/~/compose';
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
  const text = `🥠 "${fortune}"\n\n✨ Discover your cosmic destiny at Fortune Caster!\n${appUrl}`;
  return `${baseUrl}?text=${encodeURIComponent(text)}`;
};

export const createShareableFortuneUrl = (fortune: string): string => {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
  const encodedFortune = encodeURIComponent(fortune);
  return `${appUrl}?fortune=${encodedFortune}`;
};