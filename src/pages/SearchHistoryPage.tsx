import { useSelector } from 'react-redux';
import { getSearchHistory } from '../store/searchHistoryStore/searchHistorySelectors.ts';

export const SearchHistoryPage = () => {
  const searchesCount = useSelector(getSearchHistory);

  if (searchesCount.length === 0) {
    return <div>ГАВА-НИЧЕГО НЕ ИСКАЛ ЧЕЛОВЕК!!!! НУЖНО ПОМОЧ!!!!!!!!</div>;
  }
  return (
    <ul>
      {searchesCount.map((url, index) => {
        const parsedUrl = url.split('/');
        return (
          <li key={`${url}+${index}`}>
            <div style={{ display: 'flex', gap: '20px' }}>
              {`Search for: ${parsedUrl[parsedUrl.length - 1]}`}
              <a href={url}>{url}</a>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
