
app.component('heading-section',{
    template:
    /* html */
    `   
    <section class="heading-post">
        <div class="container">
                        <div class="fst-sec">
                            <div id="dir-icon"  @click="goBack">
                                <a href="#back"><img src="http://127.0.0.1:8000/media/Vector 19.png" alt=""></a>
                            </div>
                            <div class="post-headInfo">
                                <h3>{{title}}</h3>
                                <div class="location">
                                    <img src="http://127.0.0.1:8000/media/location.png" alt="location icon">
                                    <p id="location-place">{{titleAd}}</p>
                                </div>
                            </div>
                        </div>

                        <button id="saveBtn" v-if="user_auth" @click="likePost" :class="{likes:savedPost}">Save</button>
                        <button id="saveBtn" v-if="!user_auth" :class="{likes:savedPost}">Save</button>
        </div>
    </section>

    `,
    props : ["title","location","city","saved","user_auth"]
    ,
    data() {
        return {
            // Data Goes Here
            savedPost : false
        }
    },
    methods: {
        goBack(){
            var url = document.referrer
            console.log(url)
            if (url == "http://127.0.0.1:8000/home/add/post"){
                
            }
            window.location.assign(url)
            
        }
        ,
        likePost(){
            this.$emit("update_house",!this.savedPost)
            this.savedPost = !this.savedPost            
        }
    }
    , 
    computed : {
        titleAd(){
            return this.city + ' , ' + this.location
        }
        ,
        likedPost(){
            var user = this.user_auth
            var likedPost = this.saved.includes(user)
            return likedPost
        }
    }
    ,
    mounted(){
        var username = this.user_auth
        if (username !== false){
            this.savedPost = this.saved.includes(username)
            console.log(this.savedPost)
        }
    }
})




