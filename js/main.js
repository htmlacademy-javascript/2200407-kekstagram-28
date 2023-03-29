import { generatePictures } from './data.js';
import { renderGallery } from './gallery.js';

const allPictures = generatePictures();

renderGallery(allPictures);

