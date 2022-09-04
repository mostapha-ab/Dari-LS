
app.component('hero-section',{
    template:
    /* html */
    `
        <section id="hero">
            <div class="hero-context">
                <h1>Let’s Find A Home That’s Perfect For You</h1>
                <a href="search/" style="text-decoration:none"><button class="pri-btn">
                    <span><i class="fa-solid fa-magnifying-glass"></i> Search Now</span>
                </button></a>
            </div>
            <img src="http://127.0.0.1:8000/media/line.png" alt="" id="shape">
        </section>

    `,
    data() {
        return {
        }
    },
    methods: {
    }
})

