
app.component('fotter-sec',{
    template:
    /* html */
    `   
    <footer class="fotter">
        <div class="container">
            <p id="copyRight">Copyright © 2022 Real Estate World</p>

            <p>All Rights Reserved | <span>Terms and Conditions | Privacy Policy</span></p>
        </div>
    </footer>
    `
    ,
    props : ["test"]
    ,
    data() {
        return {
            
        }
    },
    methods: {
    }
    ,
    mounted(){
        var size_pos = this.test
        document.querySelector(".fotter").style.top = `${size_pos}`
    }
})




