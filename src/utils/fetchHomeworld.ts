export const fetchHomeworld = async (url: string): Promise<string> => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return (
      data.result?.properties?.name ||
      data.result?.properties?.title ||
      'unknown'
    );
  } catch {
    return 'unknown';
  }
};
