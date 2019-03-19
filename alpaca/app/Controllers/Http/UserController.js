
'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')
const Tweet = use('App/Models/Tweet')

class UserController {
  async signup({request, auth, response}){
    const userData = request.only(['name','username','email','password'])
    try{
       //save to database
       const user = await User.create(userData)
       //generate JWT token for user
       const token = await auth.generate(user)
       
       return response.json({
          status: 'success',
          data: token
       })
     }catch(error){
       return response.status(400).json({
          status: 'error',
          message: 'There was a problem creating the user, please try again later'
       })
    }
  }
  async login({request, auth, response}){
    try{
       const token = await auth.attempt(
               request.input('email'),
               request.input('password')
       )
       return response.json({
          status: 'success',
          data: token
       })
    }catch(error){
       response.status(400).json({
           status: 'error',
           message:'Invalid email/password'
       })
    }
  }
  async me({auth, response}){
    const user = await User.query()
                 .where('id', auth.current.user.id)
                 .with('tweets', builder => {
                      builder.with('user')
                      builder.with('favorites')
                      builder.with('replies')
                 })
                 .with('following')
                 .with('followers')
                 .with('favorites')
                 .with('favorites.tweet', builder => {
                       builder.with('user')
                       builder.with('favorites')
                       builder.with('replies')
                 })
                 .firstOrFail()
     return response.json({
          status: 'success',
          data: user
     })
   }
   async updateProfile({request, auth, response}){
         try{
            const user = auth.current.user
            //update with new data entered
            user.name = request.input('name')
            user.username = request.input('username')
            user.email = request.input('email')
            user.location = request.input('location')
            user.bio = request.input('bio')
            user.website_url = request.input('website_url')
            
            await user.save()
            return response.json({
               status: 'success',
               message: 'Profile updated!',
               data: user
            })
         }catch(error){
            return response.status(400).json({
                status: 'error',
                message: 'There was a problem updating profile, please try again later'
            })
         }
    }
  async changPassword({request, auth, response}){
       const user = auth.current.user
       //verify if current password match
       const verifyPassword = await Hash.verify(
            request.input('password'),
            user.password
       )
       if(!verifyPassword){
           return response.status(400).json({
             status: 'success',
             message:'Current password could not be verify! please try again later!'
           })
       }
       user.password = await Hash.make(request.input('newPassword'))
       await user.save()
       return response.json({
            status:'success',
            message:'Password updated!'
       })
   }
   async showProfile({params, response}){
       try{
          const user = await User.query()
                       .where('id', params.id)
                       .with('tweets', builder => {
                        builder.with('user')
                        builder.with('favorites')
                        builder.with('replies')
                       })
                       .with('following')
                       .with('followers')
                       .with('favorites')
                       .with('favorites.tweet', builder => {
                         builder.with('user')
                         builder.with('favorites')
                         builder.with('replies')
                       })
                       .firstOrFail()
           return response.json({
                  status : 'success',
                  data: user
           })
     }catch(error){
        return response.status(404).json({
               status: 'error',
               message: 'User not found'
        })
     }
  }
  async usersToFollow({params, auth, response}){
      const user = auth.current.user
      //get the ids of users the currently authenticated user is already following
      const usersAlreadyFollowing = await user.following().ids()
      //fetch user the currently authenticated user is not ready following
      const usersToFollow = await User.query()
                            .whereNot('id',user.id)
                            .whereNotIn('id',usersAlreadyFollowing)
                            .pick(3)
      return response.json({
          status : 'success',
          data: usersToFollow
      })
  }
  async follow({request, auth, response}){
        const user = auth.current.user
        await user.following().attach(request.input('user_id'))
        
        return response.json({
          status : 'success',
          data : null
        })
  }
  async unFollowing({params, auth, response}){
        const user = auth.current.user
        //remove form user's followers
        await user.following().detach(params.id)

        return response.json({
           status : 'success',
           data : null
        })
  }
  async timeline({auth, response}){
     const user = await User.find(auth.current.user.id)
     const followersIds = await user.following().ids()
     //add the  user's id to the array
     followersIds.push(user.id)
     
     const tweets = await Tweet.query()
                    .whereIn('user_id',followersIds)
                    .with('user')
                    .with('favorites')
                    .with('replies')
                    .fetch()
     return response.json({
          status : 'success',
          data : tweets
     })
  }
}

module.exports = UserController
