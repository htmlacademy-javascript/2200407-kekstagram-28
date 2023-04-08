import { renderGallery } from './gallery.js';
import { initFormActions } from './form.js';
import { getData } from './backend.js';
import { createMessage, MessageType} from './show-message.js';

getData()
  .then((photos) => {
    renderGallery(photos);
    initFormActions();
  })
  .catch((err) => {
    createMessage(MessageType.ERROR, err.message);
  }
  );
