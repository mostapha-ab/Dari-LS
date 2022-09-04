
app.component('overlay-sec',{
    template:
    /* html */
    `   
    <div class="overlay" @click.self="closeOverlay">
        <div class="card">
            <div class="container">
                <img src="http://127.0.0.1:8000/media/notify.png" alt="">
                <h3 id="attention">Attention !</h3>
                <p>Il ne faut jamais envoyer de l’argent à l’avance au vendeur par virement bancaire ou à travers une agence de transfert d’argent lors de l’achat des biens disponibles sur le site.</p>
                <h3 id="callUser">Call Oussama</h3>
                <button id="call-btn">
                    <img src="http://127.0.0.1:8000/media/phoneIconBlue.png" alt="">
                    0{{phoneNumber}}
                </button>
            </div>
        </div>
    </div>
    `,
    props : ["data"]
    ,
    data() {
        return {
            phoneNumber : this.data
        }
    },
    methods: {
        closeOverlay(){
            this.$emit("close-overlay",false)
        }
    }
    ,
    mounted(){
    }
})




