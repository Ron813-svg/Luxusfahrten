import './info.css';
import LeftCard from './cardInfo1';
import RightCard from './cardInfo2';

function details() {
  return (
    <div className="porsche-detail">
      <h1>Porsche 992 911 gt3</h1>
      <div className="card-container">
        <LeftCard />
        <RightCard />
      </div>
    </div>
  );
}

export default details;
