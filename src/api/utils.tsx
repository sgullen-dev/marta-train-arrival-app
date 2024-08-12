import { MartaArrivalOptionData } from './types';

const toTitleCase = (str: string): string => {
  // Remove "station" from stations to normalize with destination names
  str = str.replace(' STATION', '');
  // Handle edge cases for names that need special formatting
  switch (str.toLocaleUpperCase()) {
    case 'OMNI DOME':
      return 'GWCC/CNN Center';
    case 'HAMILTON E HOLMES':
      return 'H.E. Holmes';
    default:
      return str
        .toLocaleLowerCase()
        .replace(/\b\S/g, (letter) => letter.toLocaleUpperCase());
  }
};

export const updateOptionData = (
  options: Record<string, MartaArrivalOptionData>,
  key: string,
  relatedKeys: string[]
) => {
  if (!options[key]) {
    options[key] = {
      name: toTitleCase(key),
      available: new Set(),
    };
  }

  relatedKeys.forEach((relatedKey) => options[key].available.add(relatedKey));
};
