import {generatePhotos} from './data.js';
import {renderThumbnails} from './thumbnail.js';

const allPhotos = generatePhotos();

renderThumbnails(allPhotos);

