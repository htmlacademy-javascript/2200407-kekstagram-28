import {generatePhotos} from './data.js';
import {renderGallery} from './gallery.js';

const allPhotos = generatePhotos();

renderGallery(allPhotos);

