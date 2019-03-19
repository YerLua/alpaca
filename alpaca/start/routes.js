'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Helpers = use('Helpers')

Route.post('/signup','UserController.signup')
Route.post('/login', 'UserController.login')
Route.group(() => {
   Route.get('/me','UserController.me')
   Route.put('/update_profile','UserController.updateProfile')
   Route.put('/change_password','UserController.changPassword')
})
  .prefix('account')
  .middleware(['auth:jwt'])
Route.group(() => {
   Route.get('/users_to_follow','UserController.usersToFollow')
   Route.post('/follow/','UserController.follow')
   Route.delete('/unfollow/:id','UserController.unFollow')
   Route.get('/timeline','UserController.timeline')
})
  .prefix('users')
  .middleware(['auth:jwt'])


//tweet partion
Route.post('/tweet','TweetController.tweet').middleware(['auth:jwt'])
Route.get('/tweets/:id','TweetController.show')
Route.post('/tweets/reply/:id','TweetController.reply').middleware(['auth:jwt'])
Route.delete('/tweets/destroy/:id','TweetController.destory').middleware(['auth:jwt'])
Route.group(() => {
    Route.post('/create','FavoriteController.favorite')
    Route.delete('/destroy/:id','FavoriteController.unFavorite')
})
  .prefix('favorites')
  .middleware(['auth:jwt'])

Route.post('upload', async ({ request, response }) => {
    const profilePic = request.file('avatar', {
      types: ['image'],
      size: '2mb'
    })
    await profilePic.move(Helpers.tmpPath('uploads'), {
      name: 'custom-name.jpg',
      overwrite: true
    })
    if (!profilePic.moved()) {
      return response.json({
        status : 'error',
        message : profilePic.error(),
        data : ''
      })
    }
    return response.json({
      status : 'success',
      message : 'file uploaded',
      data : ''
   })
  })

  Route.get('avatar/:picname',async({params,response}) =>{
    const avatar = Helpers.tmpPath(params.picname+'.jpg');
    if(avatar){
      return response.json({
        status:'success',
        data: avatar
      })
    }
    return response.json({
      status : 'error',
      message : 'file no find',
      data : ''
   })
  })

Route.get('/:id','UserController.showProfile')