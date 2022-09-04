
app.component('hero-section',{
    template:
    /* html */
    `
    <section id="hero">
        <div class="hero-context">
            <h1>Let’s Find A Home That’s Perfect For You</h1>

            <div class="search-bar">
                <form action="">
                    <!--  -->
                    <div class="input-box">
                        <label for="">location
                            <select name="" id="" v-model="location">
                                <option value="">All</option>
                                <option value="Casablanca">Casablanca</option>
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
                        </label>
                    </div>
                    <!--  -->
                    <!--  -->
                    <div class="input-box">
                        <label for="">Type
                            <select name="" id="" v-model="type_estate">
                                <option value="">Choose</option>
                                <option value="Appartement">Appartement</option>
                                <option value="House">House</option>
                                <option value="Villa">Villa</option>
                                <option value="Duplex">Duplex</option>
                            </select>
                        </label>
                    </div>
                    <!--  -->
                    <div class="input-box">
                        <label for="">Price
                            <select name="" id="" v-model="price_order">
                                <option value="asc">Increase</option>
                                <option value="desc">Decrease</option>
                            </select>
                        </label>
                    </div>
                    <!--  -->
                    <div class="input-box">
                        <label for="">Transaction
                            <select name="" id="" v-model="transaction">
                                <option value="">All</option>
                                <option value="Vente">Sell</option>
                                <option value="Location (Per Day)">Rent Per Day</option>
                                <option value="Location (Per Month)">Rent Per Month</option>
                            </select>
                        </label>
                    </div>
                    

                </form>
                <button @click="test" id="searchBtn"><i class="fa-solid fa-magnifying-glass"></i>Search</button>                        
            </div>

        </div>
    </section>   

    `,
    props : ["location_param","cat_param","ord_param","trans_param"]
    ,
    data() {
        return {
            location : "",
            type_estate : "",
            price_order : "asc",
            transaction : ""
        }
    },
    methods: {
        test(){
            const domain = "http://127.0.0.1:8000";
            var url = window.location.pathname;
            var page_url = domain+url
            var searchUrl = `?city=${this.location}&category=${this.type_estate}&transaction=${this.transaction}&price=${this.price_order}`;
            var searchUrl = page_url+searchUrl

            window.location.assign(searchUrl)
        }
    }
    ,
    mounted(){
        this.type_estate = this.cat_param
        if (this.ord_param == ""){
            this.price_order = "asc"
        }
        this.location = this.location_param
        this.transaction = this.trans_param
    }
})

