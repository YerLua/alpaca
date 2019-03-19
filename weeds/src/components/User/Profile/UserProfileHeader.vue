<template>
  <div class="ui segment">
    <div class="ui grid container">
      <div class="four wide column">
          <img class="ui tiny avatar image" :src="imgDataUrl" @click="toggleShow">
          <my-upload field="avatar"
           @crop-success="cropSuccess"
           @crop-upload-success="cropUploadSuccess"
           @crop-upload-fail="cropUploadFail"
           v-model="show"
		       :width="200"
		       :height="200"
		       url="http://localhost:3333/upload"
		       img-format="jpg"></my-upload>
      </div>
      <div class="bottom aligned twelve wide column">
        <div class="ui horizontal relaxed link list">
          <div class="item">
            <div class="content">
              <router-link :to="`/${user.id}`">
                <div class="header">Tweets</div>
                <strong>{{ user.tweets.length }}</strong>
              </router-link>
            </div>
          </div>
          <div class="item">
            <div class="content">
              <router-link :to="isOwner ? `/following` : `/${user.id}/following`">
                <div class="header">Following</div>
                <strong>{{ user.following.length }}</strong>
              </router-link>
            </div>
          </div>
          <div class="item">
            <div class="content">
              <router-link :to="isOwner ? `/followers` : `/${user.id}/followers`">
                <div class="header">Followers</div>
                <strong>{{ user.followers.length }}</strong>
              </router-link>
            </div>
          </div>
          <div class="item">
            <div class="content">
              <router-link :to="isOwner ? `/favorites` : `/${user.id}/favorites`">
                <div class="header">Favorites</div>
                <strong>{{ user.favorites.length }}</strong>
              </router-link>
            </div>
          </div>
        </div>
        <div class="ui right floated horizontal list" v-if="isOwner">
          <router-link to="/settings/profile" class="ui button primary">Edit profile</router-link>
        </div>
        <div class="ui right floated horizontal list" v-if="isLoggedIn && !isOwner">
          <button class="ui tiny primary button" v-if="isFollowing" @click="unFollow(user.id)">Unfollow</button>
          <button class="ui tiny primary button" v-else @click="follow(user.id)">Follow</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import myUpload from 'vue-image-crop-upload';
export default {
  name: 'UserProfileHeader',
  props: {
    user: {
      type: Object,
      required: true
    },
    authUser: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
        show: false,
        imgDataUrl: 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'
    }
  },
  components: {
			'my-upload': myUpload
  },
  computed: {
    isOwner () {
      return this.user.id === this.authUser.id
    },
    isLoggedIn () {
      return !!this.authUser
    },
    isFollowing () {
      for (const following of this.authUser.following) {
        if (following.id === this.user.id) {
           return true
        }
      }
           return false
    }
  },
  methods: {
    follow (userId) {
      const token = localStorage.getItem('tweetr-token')

      axios
          .post(
                '/users/follow',
                { user_id: userId },
                {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                 }
           )
           .then(response => {
               this.authUser.following.push({ id: userId })
           })
    },
    unFollow (userId) {
      const token = localStorage.getItem('tweetr-token')
      axios
         .delete(`/users/unfollow/${userId}`, {
                 headers: {
                   Authorization: `Bearer ${token}`
                 }
         })
         .then(response => {
            this.authUser.following = this.authUser.following.filter(u => {
              return u.id !== userId
            })
         })
    },
    toggleShow : function toggleShow(){
       var show = this.show
       this.show = !show && this.user.id === this.authUser.id
    },
    cropSuccess(imgDataUrl, field){
        console.log('-------- crop success --------');
        console.log(imgDataUrl);
				this.imgDataUrl = imgDataUrl;
    },
    cropUploadSuccess(jsonData, field){
				console.log('-------- upload success --------');
				console.log(jsonData);
				console.log('field: ' + field);
      },
    cropUploadFail(status, field){
				console.log('-------- upload fail --------');
				console.log(status);
				console.log('field: ' + field);
			}
  }
}
</script>
