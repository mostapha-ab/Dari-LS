
app.component('message-request',{
    template:
    /* html */
    `
    <div class="message">
        <div class="cont">
            <img :src="img_src_value" id="msg-icn">
            <p>{{messageValue}}</p>
        </div>
    </div>
    
    `,
    props : ["message","status"]
    ,
    data() {
        return {
            messageValue : this.message,
            img_src_value : null,
            request_status : this.status
        }
    },
    mounted(){
        var imageName = this.request_status
        document.querySelector(".message").className = `message ${imageName}`;
        this.img_src_value = `/static/media/${imageName}.png`
    },
    beforeUpdate(){
        var imageName = this.request_status
        document.querySelector(".message").className = `message ${imageName}`;
        this.img_src_value = `/static/media/${imageName}.png`
    },
})

