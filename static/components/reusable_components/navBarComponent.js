app.component('navbar-sec',{
    template:
    /* html */
    `   
    <header class="navBar">
            <div class="container">
                <a href="/home"><div id="logo">
                    <img src="/media/logo.png" alt="">
                    <h1>Dari</h1>
                </div></a>

                <nav>
                    <div class="offic-links">
                        <li><a href="/home">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </div>

                    <ul class="navLinks" v-if="!username">
                        <a href="/login"><button id="btn-add-item-sec">Connect</button></a>
                        <a href="/login"><button id="btn-add-item-pri">Add item</button></a>
                    </ul>

                    <ul class="navLinks" v-if="username">
                            <li id="profile-link">
                                <div class="prf-img-cont">
                                    <img :src="img" alt="">
                                </div>
                                <p @click="openDropDown">{{username}}</p> 
                                <ul class="dropDown" v-show="toggle_dropDown">
                                    <div class="cont">
                                        <li><a href="#">My listings</a></li>
                                        <li><a href="#">Saved Homes</a></li>
                                        <li><a href="/account/settings/profile/">Account settings</a></li>
                                        <li><a href="/logout">Log out</a></li>
                                    </div>
                                </ul>
                            </li>
                            <a href="/home/add/post"><button id="btn-add-item">Add Item</button></a>
                    </ul>
                </nav>

                <span class="material-symbols-outlined" @click="openResponsiveNav">
                    widgets
                </span>

                <span class="material-symbols-outlined" id="closingMenu" @click="openResponsiveNav">close</span>
            </div>

    </header>
    `,
    props : ["background"]
    ,
    data() {
        return {
            // 
            toggle_dropDown : false,
            showResNav : false,
            username : "",
            img : ""
        }
    },
    methods: {
        openDropDown(){
            this.toggle_dropDown = !this.toggle_dropDown
        }
        ,
        openResponsiveNav(){
            this.showResNav = !this.showResNav
            console.log("SHowing Navigation " + this.showResNav)

            if (this.showResNav == true){
                document.querySelector("#closingMenu").style.display = "inline"
                document.querySelector("nav").style.display = "flex"
                document.body.style.overflow = "hidden"
                this.toggle_dropDown = true
            }
            else{
                document.querySelector("#closingMenu").style.display = "none"
                document.querySelector("nav").style.display = "none"
                document.body.style.overflowY = "scroll"
            }
        }
    }
    , 
    mounted(){
        document.querySelector(".navBar").style.backgroundColor = this.background;
        fetch("http://127.0.0.1:8000/home/api/personalInfoApi")
          .then(res=>res.json())
          .then((res)=>{
            this.username = (res[0].username);
            this.img = (res[0].image)
        })



        setInterval(function(){
            var buttonAddItem = document.getElementById("btn-add-item")
            try{
                buttonAddItem.style.transform = "scale(1.1)"
                buttonAddItem.style.transition = ".5s ease"
                setTimeout(function(){
                    buttonAddItem.style.transform = "scale(1)"
                },2000)
            }
            catch(e){
                console.log(e)
            }
        },7000)
    }
})




