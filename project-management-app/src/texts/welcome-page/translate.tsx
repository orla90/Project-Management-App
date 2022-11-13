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
        description: 'Code review',
        img: ArtiomFoto,
      },
      {
        name: 'Alena Staskevich',
        title: 'Web-developer',
        description: 'Developed...',
        img: LenaFoto,
      },
      {
        name: 'Dmitry Ostapchuk',
        title: 'Web-developer',
        description: 'Developed...',
        img: DimaFoto,
      },
      {
        name: 'Olga Andrievich',
        title: 'Web-developer, Teamlead',
        description: 'Developed...',
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
        description: 'Ревью кода',
        img: ArtiomFoto,
      },
      {
        name: 'Алена Стаскевич',
        title: 'Web-разработчик',
        description: 'Разработала...',
        img: LenaFoto,
      },
      {
        name: 'Дмитрий Остапчук',
        title: 'Web-разработчик',
        description: 'Разработал...',
        img: DimaFoto,
      },
      {
        name: 'Ольга Андриевич',
        title: 'Web-разработчик, Тимлид',
        description: 'Разработала...',
        img: OlyaFoto,
      },
    ],
  },
};

export default i18Obj;
