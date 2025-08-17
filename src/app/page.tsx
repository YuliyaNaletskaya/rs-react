import { fetchCharactersServer } from '@/utils/fetchCharacters';
import MainPageClient from './MainPageClient';

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const page = Number(searchParams.page ?? '1');
  const detailsId = searchParams.details ?? null;
  const search = searchParams.search ?? '';

  // SSR-фетч (только для initial render)
  const initialData = await fetchCharactersServer(search, page);

  return (
    <MainPageClient
      initialPage={page}
      initialDetailsId={detailsId}
      initialSearch={search}
      initialData={initialData}
    />
  );
}
