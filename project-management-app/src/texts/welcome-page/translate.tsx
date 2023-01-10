import ArtiomFoto from '../../assets/main-page/developers/artiom.png';
import DimaFoto from '../../assets/main-page/developers/dima.jpeg';
import LenaFoto from '../../assets/main-page/developers/lena.jpeg';
import OlyaFoto from '../../assets/main-page/developers/olya.jpg';

const i18Obj = {
  en: {
    features: 'Handling your projects in the most efficient way is our mojo',
    interface: {
      title: 'Interface',
      description: 'Simple and user-friendly interface',
    },
    reconfiguration: {
      title: 'Reconfiguration',
      description: 'Personal fully editable list of projects, task stages and tasks',
    },
    search: {
      title: 'Search',
      description: 'Convenient search among the list of your projects',
    },
    team: 'Our team',
    developers: [
      {
        name: 'Artiom Savchuk',
        title: 'Mentor',
        description: 'Tips for organizing the structure of the application, code review.',
        img: ArtiomFoto,
      },
      {
        name: 'Alena Staskevich',
        title: 'Web-developer',
        description:
          'Deployed the Backend, made up a page with a list of boards and developed its functionality, developed the basis of the modal window.',
        img: LenaFoto,
      },
      {
        name: 'Dmitry Ostapchuk',
        title: 'Web-developer',
        description:
          'Implemented the header, footer, Welcome section on the main page, fully developed pages with authorization, registration and profile editing. Participated in the development of the functionality of the board, implemented the drag and drop of columns and tasks on the board page.',
        img: DimaFoto,
      },
      {
        name: 'Olga Andrievich',
        title: 'Web-developer, Teamlead',
        description:
          'Built the basic structure of the application with routes, layout of the section with the characteristics of the project and the section with developers, layout of the page with the board and development of the board functionality. Implemented the display of errors from the Backend in the toast format.',
        img: OlyaFoto,
      },
    ],
  },
  ru: {
    features: 'Эффективное управление вашими проектами — наша главная задача.',
    interface: {
      title: 'Интерфейс',
      description: 'Простой и удобный интерфейс',
    },
    reconfiguration: {
      title: 'Реконфигурация',
      description: 'Полностью редактируемый список проектов, этапов задач и самих задач',
    },
    search: {
      title: 'Поиск',
      description: 'Удобный поиск среди списка ваших проектов',
    },
    team: 'Наша команда',
    developers: [
      {
        name: 'Артем Савчук',
        title: 'Ментор',
        description: 'Советы по организации структуры приложения, ревью кода.',
        img: ArtiomFoto,
      },
      {
        name: 'Алена Стаскевич',
        title: 'Web-разработчик',
        description:
          'Задеплоила Backend, занималась версткой страницы со списком досок и разработкой ее функционала, разработала основу модального окна.',
        img: LenaFoto,
      },
      {
        name: 'Дмитрий Остапчук',
        title: 'Web-разработчик',
        description:
          'Реализовал header, footer, раздел Welcome на главной странице, полностью разработал страницы с авторизацией, регистрацией и редактированием профиля. Участвовал в разработке функционала доски, реализовал перетаскивание колонок и задач на странице доски.',
        img: DimaFoto,
      },
      {
        name: 'Ольга Андриевич',
        title: 'Web-разработчик, Тимлид',
        description:
          'Занималась построением базовой структуры приложения c маршрутами, версткой раздела с характеристиками проекта и раздела с разработчиками, версткой страницы с доской и разработкой функционала доски. Реализовала отображение ошибок со стороны BE в формате toast.',
        img: OlyaFoto,
      },
    ],
  },
};

export default i18Obj;
