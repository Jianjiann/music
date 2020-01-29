import Vue from 'vue'
import Router from 'vue-router'

const recommended = () => import('./views/recommended.vue');
const ranklist = () => import('./views/ranklist.vue');
const playlist = () => import('./views/playlist.vue');
const singer = () => import('./views/singer.vue');
const playlistContent = () => import('./views/playlistContent.vue');
const singerlist = () => import('@/components/singer/singerlist.vue');
const songlistPage = () => import('@/views/songlistPage.vue');
const searchList = () => import('@/views/searchList.vue');
const player = () => import('@/views/player.vue');

Vue.use(Router)

const router = new Router({
  // mode: 'hash',

  base: process.env.BASE_URL,
  linkActiveClass: 'option-active',
  routes: [
    {
      path: '/',
      redirect: '/recommended'
    },
    {
      path: '/recommended',
      name: 'recommended',
      component: recommended,
      meta: {index: 0},
      props: true
    },
    {
      path: '/playlist',
      name: 'playlist',
      component: playlist,
      redirect: '/playlist/content',
      props: true,
      children: [
        {
          path: '/playlist/content',
          name: 'content',
          component: playlistContent,
          props: true,
          meta: {index: 1}
        }
      ]
    },
    {
      path: '/ranklist',
      name: 'ranklist',
      component: ranklist,
      meta: {index: 2},
      props: true
    },
    {
      path: '/singer',
      name: 'singer',
      component: singer,
      redirect: '/singer/singerlist',
      props: true,
      children: [
        {
          path: '/singer/singerlist',
          name: 'singerlist',
          component: singerlist,
          props: true,
          meta: {index: 3},
        }
      ]
    },
    {
      path: '/songlistPage',
      name: 'songlistPage',
      component: songlistPage,
      props: true,
      meta: {index: 4}
    },
    {
      path: '/searchList',
      name: 'searchList',
      component: searchList,
      meta: {index: -1},
    },
    {
      path: '/player',
      name: 'player',
      meta: {
        keepAlive: true
      },
      components: {
        player: player
      }
    }
  ]
});
export default router;