// export const dynamic = 'force-dynamic';

import { fetchCharactersServer } from '@/utils/fetchCharacters';
import MainPageClient from './MainPageClient';
import type { Character } from '@/types/types';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;

  const page = Number(params.page ?? '1');
  const detailsId = params.details ?? null;
  const search = params.search ?? '';

  const initialData: { characters: Character[]; totalPages: number } =
    await fetchCharactersServer(search, page);

  return (
    <MainPageClient
      initialPage={page}
      initialDetailsId={detailsId}
      initialSearch={search}
      initialData={initialData}
    />
  );
}
