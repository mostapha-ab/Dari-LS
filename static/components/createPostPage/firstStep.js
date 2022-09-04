
app.component('create-post-first-step',{
    template:
    /* html */
    `
    <div class="form-step-one">
        <label for="">Category
            <div class="input-box">
                <select name="category" id="category">
                    <option value="House" selected="">House</option>
                    <option value="Appartement">Appartement</option>
                    <option value="Villa">Villa</option>
                    <option value="Duplex">Duplex</option>
                </select>
            </div>
        </label>

        <label for="">Transaction
            <div class="input-box">
                <select name="transaction" id="transaction">
                    <option value="Vente" selected="">Vente</option>
                    <option value="Location (Per Day)">Location (Per Day)</option>
                    <option value="Location (Per Month)">Location (Per Month)</option>
                </select>
            </div>
        </label>

        <label for="">City
            <div class="input-box">
                <select name="city" id="city">
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

        <label for="">Addresse
            <div class="input-box" id="addresseBox">
                <input type="text" name="addresse" id="" v-model="addresse" @keyup="checkAddresse" placeholder="Enter your Addresse Here">
            </div>
            <span id="addresse-notify">Minimum 10 caractères</span>
        </label>


        <div class="buttons">
            <p @click="validateForm" class="prv-btn">Back</p>
            <p @click="validateForm" class="nxt-btn">Next</p>
        </div>

    </div>    
    `
    ,
    data(){
        return {
            fname : "mehdi hyad",
            addresse : ""
        }
    }
    ,
    methods: {
        // Method For Addresse Checking
        checkAddresse(){
            var addresse_error_text = document.getElementById("addresse-notify");
            var addresse_input_box = document.getElementById("addresseBox");
            var addresse_value = this.addresse;

            if (addresse_value.length < 10){
                addresse_error_text.style.opacity = "1"
                addresse_input_box.style.border = "3px solid #e14c4c"
                return false
            }
            else{
                addresse_error_text.style.opacity = "0"
                addresse_input_box.style.border = "3px solid #4A3AFF"
                setTimeout(()=>{
                    addresse_input_box.style.border = "3px solid #B7B7B7"
                },1000)
                return true
            }
        }
        ,
        validateForm(){
            var that = this
            var addresse_valid = that.checkAddresse();

            if (addresse_valid){
                that.nextMove()
                console.log("Now We Can Move")
            }
        }
        ,
        // Method For Next Move
        nextMove(){
            var step1 = document.getElementById("step1");
            var step2 = document.getElementById("step2");
            
            var bar1 = document.getElementById("bar1");

            this.$emit("next-move","showFirst","showSecond")
            step1.style.border = "none"
            step1.style.color = "white"
            step1.style.backgroundColor = "#4A3AFF"
            bar1.style.backgroundColor = "#4A3AFF"

            step2.style.border = "3px solid #4A3AFF"
            step2.style.color = "#4A3AFF"
        }
    },
    mounted(){
        var step1 = document.getElementById("step1");
        var buttons = document.querySelector(".buttons")

        step1.style.border = "3px solid #4A3AFF";
        step1.style.color = "#4A3AFF";
        buttons.style.marginTop = "0";
    },
})


