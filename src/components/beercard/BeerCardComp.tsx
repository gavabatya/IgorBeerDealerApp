import { FC } from 'react';
import './beercard.css';

interface BeerCardProps {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  image_url: string;
}
const someBeer = {
  id: 192,
  name: 'Punk IPA 2007 - 2010',
  tagline: 'Post Modern Classic. Spiky. Tropical. Hoppy.',
  first_brewed: '04/2007',
  image_url: 'https://images.punkapi.com/v2/192.png',
};

export const BeerCardComp: FC<BeerCardProps> = ({ id, name, tagline, first_brewed, image_url }) => {
  return (
    <div className="containerCard">
      <ul className="infoList">
        <li>{someBeer.id}</li>
        <li>{someBeer.name}</li>
        <li>{someBeer.tagline}</li>
        <li>{someBeer.first_brewed}</li>
      </ul>
      <div>
        <img id="beerImg" src="https://images.punkapi.com/v2/192.png" />
      </div>
    </div>
  );
};
