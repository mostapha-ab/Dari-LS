
app.component('our-form',{
    template:
    /* html */
    `   
    <label for=""><p>User Name</p>
        <div class="input-box" :class={errorInput:!valideUserName}>
            <input type="text" name="" id="" v-model="username" placeholder="Enter your User Name Here">
        </div>
        <span id="username-notify" v-show="!valideUserName">Error (Required. at least 5 and less than 15 characters) or (Already Used username)</span>
    </label>

    <label for=""><p>Location</p>
        <div class="input-box">
            <select name="" id="city" v-model="location">
                <option value="Casablanca" selected="">Casablanca</option>
                <option value="Rabat">Rabat</option>
                <option value="Marrakech">Marrakech</option>
                <option value="Agadir">Agadir</option>
                <option value="Sale">Sale</option>
                <option value="Kenitra">Kenitra</option>
                <option value="Meknes">Meknes</option>
                <option value="Oujda">Oujda</option>
                <option value="Temara">Temara</option>
                <option value="El Jadida">El Jadida</option>
                <option value="Mohammedia">Mohammedia</option>
                <option value="Tetouan">Tetouan</option>
                <option value="Nador">Nador</option>
                <option value="Safi">Safi</option>
                <option value="Beni Mellal">Beni Mellal</option>
                <option value="Khouribga">Khouribga</option>
                <option value="Bouznika">Bouznika</option>
                <option value="Settat">Settat</option>
                <option value="Abadou">Abadou</option>
                <option value="Abaynou">Abaynou</option>
                <option value="Agadir">Agadir</option>
                <option value="Agadir Melloul">Oujda</option>
                <option value="Tanger">Tanger</option>
            </select>
        </div>
    </label>

    <label for=""><p>Email</p>
        <div class="input-box" id="addresseBox">
            <input type="text" name="" v-model="email" readonly disabled id="" placeholder="E-mail">
        </div>
    </label>

    <label for=""><p>Phone Number</p>
        <div class="input-box">
            <input type="number" name="" v-model="phoneNumber" id="" placeholder="Enter your Phone Number">
        </div>
        <span id="phoneNumber-notify" v-show="!validePhoneNumber">Required. Must be a Valid Phone number</span>
    </label>

    <button id="pri-btn" v-if="formValide" @click="test($event)">Save Changes</button>
    <button id="pri-btn" disabled v-if="!formValide">Save Changes</button>
    `,
    emits: ["show-msg"]
    ,
    props : ["csrf_token_value"]
    ,
    data() {
        return {
            domain : "http://127.0.0.1:8000/",
            all_usernames : [],
            persData : [],

            // Data Templates
            username : "",
            location : "",
            email : "",
            phoneNumber : 691233082,
        }
    },
    methods: {  
        // Methods Goes Here
        emittingParent(res,sts){
            this.$emit("show-msg",res,sts)
        }
        ,
        test(event){
            var that = this
            event.preventDefault()
            var xhr = new XMLHttpRequest

            xhr.onload = function(){
                var response = xhr.responseText
                if (response === "The User Data Saved Successfully"){
                    that.emittingParent("Profile updated successfully","success")
                }
                else if (response === "Data Has not been saved Please Try Again!"){
                    that.emittingParent("Profile updated unsuccessfully","error")
                }
            }
            xhr.open("POST","")
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
            xhr.send(`username=${this.username}&city=${this.location}&phoneNumber=${this.phoneNumber}&csrfmiddlewaretoken=${this.csrf_token_value}`)
        }
    }
    ,
    computed:{
        userNameExist(){
            var usernames_list =  this.all_usernames
            var i = 0;
            for (i; i < usernames_list.length ; i++){
                if (usernames_list[i] === this.username.trim()){ return true } 
            }
            return false
        }
        ,
        valideUserName(){
            var that = this
            var username_exist = that.userNameExist
            var username_length = this.username.trim().length;
            if (username_length >= 5 && username_length <= 12 && !username_exist){
                return true
            }
            return false
        }
        ,
        validePhoneNumber(){
            var isIntNum = Number.isInteger(this.phoneNumber);
            var numLength = this.phoneNumber.toString().length;
            if (isIntNum && numLength === 9){ return true }
            else{ return false }
        }
        ,
        formValide(){
            var that = this
            valide_username = that.valideUserName
            valide_phoneNumber = that.validePhoneNumber
            if (valide_username && valide_phoneNumber){ return true }
            return false
        }
    }
    ,
    mounted(){
        var that = this
        var url = `${this.domain}home/api/allusers`
        var user_data_url = `${this.domain}home/api/personalInfoApi`

        new_list = []
        fetch(url)
            .then(res=>res.json())
            .then(res=>res.forEach(function(item){
                var name = item.username
                new_list.push(name)
            }))
            .then(()=>{ this.all_usernames = new_list })

        
        n_dict = {}
        fetch(user_data_url)
            .then(res=>res.json())
            .then((res)=>{
                this.persData = res
                this.username = this.persData[0].username
                this.location = this.persData[0].city
                this.email = this.persData[0].email
                this.phoneNumber = parseInt(this.persData[0].phoneNumber)
            })
    }
})




