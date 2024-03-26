import { useParams } from 'react-router-dom';
import SearchPageContent from '../features/searchPageContent/SearchPageContent.tsx';

export const SearchPage = () => {
  const { searchQuery } = useParams();

  return <SearchPageContent searchString={searchQuery} />;
};
