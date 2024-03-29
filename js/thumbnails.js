import {getRandomInteger, debounce} from './util.js';

class Thumbnails {
  constructor(imageViewer, allImages) {
    this.imageViewer = imageViewer;
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    this.allImages = allImages;
    document.querySelectorAll('.img-filters__button').forEach((element) => {
      element.addEventListener('click', debounce((evt) => this.buttonFilterListener(evt)));
    });
    this.activeFilter = document.querySelector('#filter-default');
  }

  // количество случайных миниатюр
  static get RANDOM_THUMBNAILS_COUNT() {
    return 10;
  }

  // обработчик смены фильтра
  buttonFilterListener(evt) {
    if (this.activeFilter !== evt.target) {
      this.activeFilter.classList.remove('img-filters__button--active');
      this.activeFilter = evt.target;
      this.activeFilter.classList.add('img-filters__button--active');
      let images;
      switch (this.activeFilter.getAttribute('id')) {
        case 'filter-default':
          images = this.allImages;
          break;
        case 'filter-random':
          images = [];
          for (let i = 0; i < Thumbnails.RANDOM_THUMBNAILS_COUNT; i++) {
            let randomValue;
            do {
              randomValue = getRandomInteger(0, this.allImages.length - 1);
            } while (images.includes(this.allImages[randomValue]));
            images.push(this.allImages[randomValue]);
          }
          break;
        case 'filter-discussed':
          images = this.allImages.slice();
          images.sort((a, b) => b.comments.length - a.comments.length);
      }
      this.draw(images);
    }
  }

  // удаление миниатюр
  deleteAllThumbnails() {
    document.querySelectorAll('.picture').forEach((picture) =>
      picture.parentNode.removeChild(picture)
    );
  }

  draw(images) {
    const fragment = document.createDocumentFragment();
    const template = document.querySelector('#picture');
    this.deleteAllThumbnails();
    const thumbnails = this;
    images.forEach((image) => {
      const clone = template.content.cloneNode(true);
      const img = clone.querySelector('img');
      img.setAttribute('src', image.url);
      if (thumbnails.imageViewer !== undefined) {
        img.addEventListener('click', () => thumbnails.imageViewer.show(image));
      }
      clone.querySelector('.picture__likes').textContent = image.likes;
      clone.querySelector('.picture__comments').textContent = image.comments.length;
      fragment.appendChild(clone);
    });
    document.querySelector('.pictures').append(fragment);
  }
}

export {Thumbnails};
