import { renderGallery } from './gallery.js';
import { initFormActions } from './form.js';
import { getData } from './backend.js';
import { createMessage, MessageType} from './show-message.js';
import { initSortPicturesActions } from './sort.js';

getData()
  .then((pictures) => {
    renderGallery(pictures);
    initSortPicturesActions(pictures);
    initFormActions();
  })
  .catch((err) => {
    createMessage(MessageType.ERROR, err.message);
  }
  );
