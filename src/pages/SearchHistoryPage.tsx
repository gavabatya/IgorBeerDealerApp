import { useSelector } from 'react-redux';
import { getSearchHistory } from '../store/searchHistoryStore/searchHistorySelectors.ts';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
export const SearchHistoryPage = () => {
  const searchesCount = useSelector(getSearchHistory);

  if (searchesCount.length === 0) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '32px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ScreenSearchDesktopIcon sx={{ color: '#ffcc33', fontSize: '60px' }} />
          Search history is empty
        </div>
      </div>
    );
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
