export const shareToFarcaster = (message: string) => {
  let appUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
  // remove http or https from appUrl
  appUrl = appUrl.replace(/^https?:\/\//, '');
  const text = encodeURIComponent(`🥠 "${message}"\n\n✨ Discover your cosmic destiny at Fortune Caster!\n${appUrl}`);
  const url = `https://warpcast.com/~/compose?text=${text}`;
  
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};

export const generateCastIntent = (fortune: string): string => {
  const baseUrl = 'https://warpcast.com/~/compose';
  let appUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
  // remove http or https from appUrl
  appUrl = appUrl.replace(/^https?:\/\//, '');
  const text = `🥠 "${fortune}"\n\n✨ Discover your cosmic destiny at Fortune Caster!\n${appUrl}`;
  return `${baseUrl}?text=${encodeURIComponent(text)}`;
};

export const createShareableFortuneUrl = (fortune: string): string => {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
  const encodedFortune = encodeURIComponent(fortune);
  return `${appUrl}?fortune=${encodedFortune}`;
};