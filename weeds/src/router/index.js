import Vue from 'vue'
import Router from 'vue-router'
import SignUpForm from '@/components/Auth/SignUpForm'
import LoginForm from '@/components/Auth/LoginForm'
import UserProfileSettings from '@/components/User/Settings/UserProfileSettings'
import UserPasswordSetting from '@/components/User/Settings/UserPasswordSetting'
import Home from '@/components/Home'
import SingleTweet from '@/components/Tweet/SingleTweet'
import UserProfile from '@/components/User/Profile/UserProfile'
import UsersFollowing from '@/components/User/Profile/UsersFollowing'
import UserFollowers from '@/components/User/Profile/UserFollowers'
import FavoriteTweets from '@/components/User/Profile/FavoriteTweets'

Vue.use(Router)

export default new Router({
  routes: [
   {
     path: '/',
     component: Home
   }, 
   {
      path: '/signup',
      component: SignUpForm
    },
    {
      path: '/login',
      component: LoginForm
    },
    {
      path: '/following',
      component: UsersFollowing
    },
    {
      path: '/:id/following',
      component: UsersFollowing,
      props: true,
    },
    {
      path: '/followers',
      component: UserFollowers
    },
    {
      path: '/:id/followers',
      component: UserFollowers,
      props: true
    },
    {
      path: '/favorites',
      component: FavoriteTweets
    },
    {
      path: '/:id/favorites',
      component: FavoriteTweets,
      props: true
    },
    {
      path: '/settings/profile',
      component: UserProfileSettings
    },
    {
      path: '/settings/password',
      component: UserPasswordSetting
    },
    {
      path: '/:id',
      component: UserProfile,
      props: true
    },
    {
      path: '/:username/status/:id',
      component: SingleTweet,
      props: true
    }
  ]
})
