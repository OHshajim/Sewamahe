import './TopBar.sass';
import { FiArrowLeft } from 'react-icons/fi';

function TopBar({ back }) {
  return (
    <div className="top-bar uk-flex uk-flex-between uk-flex-middle">
      <div className="nav">
        <div className="button mobile" onClick={back}>
          <FiArrowLeft />
        </div>
      </div>
      <div className="nav"> </div>
    </div>
  );
}

export default TopBar;
