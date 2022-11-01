import { createRouter, createWebHistory } from 'vue-router'
import Home from './routes/home';
import Auth from './routes/auth';
import Account from './routes/account';
import notFound from './routes/notFound';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    Home,
    Auth,
    Account,
    notFound,
  ]
});

router.beforeEach((to, from, next) => {

  const checkToken = localStorage.getItem('logged');
  if (to.meta.needToken === false) {
    if (!checkToken) {
      next()
    }
    else {
      next('account/dashboard')
    }
  }

  if (to.meta.needToken) {
    if (checkToken) {
      next()
    }
    else {
      next('auth/login')
    }
  }
  else next()

  document.title = to.meta.title;
});

export default router;
