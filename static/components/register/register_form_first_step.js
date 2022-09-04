
app.component('register-form-first-step',{
    template:
    /* html */
    `
    <div class="first-step">
        <div class="label">
            <span class="labelName">User name</span>
            <div class="input-box" id="usernameInput">
                <input type="text" v-model="username" maxlength="15" placeholder="Enter Your User name">
            </div>
            <span id="usernameError">Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.</span>
        </div>


        <div class="label">
            <span class="labelName">Phone Number </span>
            <div class="input-box" id="phone-input-box">
                <span style="color: #828282;">+212</span>
                <input type="number" v-model="phoneNumber" ref="phone_number" maxlength="9" placeholder="Enter The Phone Number">
            </div>
            <span id="phoneNumberError">Required. Must be a Valid Phone number</span>
        </div>

        <div class="label">
            <span class="labelName">City</span>
            <div class="input-box">
                <select name="" id="city" v-model="city"> 
                    <option value="Casablanca">Casablanca</option>
                    <option value="Agadir">Agadir</option>
                    <option value="Tanger">Tanger</option>
                    <option value="Essaouira">Essaouira</option>
                </select>
            </div>    
        </div>

        <p id="privacy-info" @click="validatePhoneNumber">
            We’ll text you to confirm your number. Standard message and data rates apply. Privacy Policy
        </p>


        <input type="button" class="nxt-btn" value="Next Step" @click="validateForm">
        <!--button class="nxt-btn" @click="validateForm">Next Step</!--button-->
    </div>
    `,
    data() {
        return {
            username : "",
            phoneNumber : "",
            city : "Agadir",
        }
    },
    methods: {
        //--- Emitting Event
        sendData(user_name,phoneNumber,city){
            this.$emit("place-data",user_name,phoneNumber,city)
        }
        ,
        moveNextStep(){
            this.$emit("move-to-next-step")
        },
        //> Function For Removing Error Showing 
        removePhoneNumberError(){
            document.getElementById("phone-input-box").style.border = "2px solid #F2F2F2"
            document.getElementById("phone-input-box").style.backgroundColor = "#F2F2F2"
            document.getElementById("phoneNumberError").style.color = "#626161"
        },
        removeUserNameError(){
            document.getElementById("usernameInput").style.border = "2px solid #F2F2F2"
            document.getElementById("usernameInput").style.backgroundColor = "#F2F2F2"
            document.getElementById("usernameError").style.color = "#626161"
        },
        //> Function For Showing Error For The User
        showPhoneNumberError(){
            document.getElementById("phone-input-box").style.border = "2px solid #FF6B6B"
            document.getElementById("phone-input-box").style.backgroundColor = "#FFE4E4"
            document.getElementById("phoneNumberError").style.color = "#FF6B6B"
        },
        showUserNameError(){
            document.getElementById("usernameInput").style.border = "2px solid #FF6B6B"
            document.getElementById("usernameInput").style.backgroundColor = "#FFE4E4"
            document.getElementById("usernameError").style.color = "#FF6B6B"
        }
        //> Function For Validation 
        ,
        validatePhoneNumber(){
            var isIntNum = Number.isInteger(this.phoneNumber);
            var numLength = this.phoneNumber.toString().length;
            if (isIntNum && numLength === 9){
                return true
            }
            else{
                return false
            }
        }
        ,
        validateForm(){
            var that = this
            var username_length = this.username.length;
            var valideNumber = that.validatePhoneNumber();

            if (username_length >= 5 && valideNumber){
                that.removePhoneNumberError()
                that.removeUserNameError()

                that.sendData(this.username,this.phoneNumber,this.city)
                return that.moveNextStep()
            }
            else{
                if (username_length < 4 && !valideNumber){
                    that.showPhoneNumberError()
                    that.showUserNameError()
                }
                else if (username_length > 4 && !valideNumber){
                    that.showPhoneNumberError()
                    that.removeUserNameError()
                }

                else if (valideNumber && username_length < 4){
                    that.showUserNameError()
                    that.removePhoneNumberError()
                }
            }
            // console.log("validate the form")
        }
    }
})