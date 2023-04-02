import { generatePictures } from './data.js';
import { renderGallery } from './gallery.js';
import { initFormActions } from './form.js';

const allPictures = generatePictures();

renderGallery(allPictures);
initFormActions();
