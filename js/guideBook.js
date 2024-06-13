const firebaseConfig = {
  apiKey: "AIzaSyByQT-2MJIxRq3aOvF8Osna6C36D6BKQlw",
  authDomain: "bitcode-school.firebaseapp.com",
  databaseURL: "https://bitcode-school-default-rtdb.firebaseio.com",
  projectId: "bitcode-school",
  storageBucket: "bitcode-school.appspot.com",
  messagingSenderId: "737804952668",
  appId: "1:737804952668:web:0d318fadb04ee8fb2d3299"
};

firebase.initializeApp(firebaseConfig);


const databaseHTMLRef = firebase.database().ref('html_data');
const databaseCSSRef = firebase.database().ref('css_data');


function loadAndCreateTagElements(databaseRef, wrapperId) {
  const tagsWrapper = document.getElementById(wrapperId);


  databaseRef.once('value')
    .then((snapshot) => {
      const dataArray = snapshot.val();
      if (!dataArray) {
        console.error("Данные отсутствуют в базе данных");
        return;
      }

      const fragment = createTagElements(dataArray);
      tagsWrapper.appendChild(fragment);
    })
    .catch((error) => {
      console.error("Ошибка при загрузке данных из Firebase:", error);
    });
}

function createTagElements(dataArray) {
  const fragment = document.createDocumentFragment();

  dataArray.forEach(entry => {
    const title = document.createElement('h1');
    title.textContent = entry.letter;
    title.classList.add('title', 'screenTitle');

    fragment.appendChild(title);

    const tagsContainer = document.createElement('div');
    tagsContainer.classList.add('tagsContainer');

    entry.tags.forEach(tag => {
      const tagElement = document.createElement('div');
      tagElement.classList.add('tag');

      const tagTitle = document.createElement('p');
      tagTitle.textContent = tag.title;

      const tagSubtitle = document.createElement('p');
      tagSubtitle.textContent = tag.subtitle;

      tagElement.appendChild(tagTitle);
      tagElement.appendChild(tagSubtitle);

      tagElement.addEventListener('click', () => {

        const tagsWrapperId = tagElement.closest('.tagsWrapper').id;

        const tagsWrapper = document.getElementById(tagsWrapperId);
        tagsWrapper.style.display = 'none';

        const descriptionWrapper = document.createElement('div');
        descriptionWrapper.classList.add('descriptionWrapper');

        const backButton = document.createElement('button');
        backButton.textContent = '✕';
        backButton.addEventListener('click', () => {
          tagsWrapper.style.display = '';
          descriptionWrapper.remove();
        });

        const tagInfoTitle = document.createElement('h1');
        tagInfoTitle.classList.add('title', 'screenTitle');
        tagInfoTitle.textContent = tag.title;

        const tagDescriptionItem = document.createElement('div');
        tagDescriptionItem.classList.add('descriptionItem');

        const descriptionTitle = document.createElement('p');
        descriptionTitle.classList.add('descriptionTitle');
        descriptionTitle.textContent = '> Описание';

        const descriptionSubtitle = document.createElement('p');
        descriptionSubtitle.classList.add('descriptionSubtitle');
        descriptionSubtitle.textContent = tag.description;

        tagDescriptionItem.appendChild(descriptionTitle);
        tagDescriptionItem.appendChild(document.createElement('hr'));
        tagDescriptionItem.appendChild(descriptionSubtitle);

        const tagExamplesBlock = document.createElement('div');
        tagExamplesBlock.classList.add('window', 'windowBlue', 'courseAbout');

        const notificationNav = document.createElement('div');
        notificationNav.classList.add('notificationNav', 'aboutNav');

        const aboutSubTitle = document.createElement('p');
        aboutSubTitle.classList.add('aboutSubTitle');
        aboutSubTitle.textContent = 'Примеры работы';

        const notificationIconContainer = document.createElement('div');
        const notificationIcon1 = document.createElement('img');
        notificationIcon1.classList.add('notificationIcon');
        notificationIcon1.setAttribute('src', '/img/navItems/hideWhite.png');
        const notificationIcon2 = document.createElement('img');
        notificationIcon2.classList.add('notificationIcon', 'closeIcon');
        notificationIcon2.setAttribute('src', '/img/navItems/crossWhite.png');
        notificationIconContainer.appendChild(notificationIcon1);
        notificationIconContainer.appendChild(notificationIcon2);

        notificationNav.appendChild(aboutSubTitle);
        notificationNav.appendChild(notificationIconContainer);

        const windowInfo = document.createElement('div');
        windowInfo.classList.add('windowInfo');
        tag.examples.forEach((example, index) => {
          const details = document.createElement('details');


          if (index === 0) {
            details.setAttribute('open', true);
          }

          const summary = document.createElement('summary');
          summary.textContent = `Пример ${index + 1}`;

          const exampleCode = createExampleHTML(example);

          details.appendChild(summary);
          details.appendChild(exampleCode);


          windowInfo.appendChild(details);
        });
        tagExamplesBlock.appendChild(notificationNav);
        tagExamplesBlock.appendChild(windowInfo);

        descriptionWrapper.appendChild(backButton);
        descriptionWrapper.appendChild(tagInfoTitle);
        descriptionWrapper.appendChild(tagDescriptionItem);
        descriptionWrapper.appendChild(tagExamplesBlock);

        tagsWrapper.parentNode.appendChild(descriptionWrapper);
      });




      tagsContainer.appendChild(tagElement);
    });

    fragment.appendChild(tagsContainer);
  });

  return fragment;
}
function createExampleHTML(example) {
  const exampleContainer = document.createElement('div');


  for (let i = 1; i < example.length; i++) {
    const textNode = document.createElement('div');
    textNode.classList.add('exampleCode');
    textNode.textContent = example[i];
    exampleContainer.appendChild(textNode);
  }


  const codeElement = document.createElement('div');
  codeElement.classList.add('exampleHTML');
  codeElement.innerHTML = example.join('');
  exampleContainer.appendChild(codeElement);

  return exampleContainer;
}


loadAndCreateTagElements(databaseHTMLRef, 'htmlTagsWrapper');

loadAndCreateTagElements(databaseCSSRef, 'cssTagsWrapper');
