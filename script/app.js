let products = [
    {
        id: 1,
        name: 'Crazy',
        price: 31000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    {
        id: 2,
        name: 'Light',
        price: 26000,
        img: 'images/products/burger-2.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    {
        id: 3,
        name: 'CheeseBurger',
        price: 29000,
        img: 'images/products/burger-3.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    {
        id: 4,
        name: 'dBurger',
        price: 24000,
        img: 'images/products/burger-4.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    {
        id: 5,
        name: 'Best Burger',
        price: 44000,
        img: 'https://yandex-images.clstorage.net/YhJA98356/dadd785_dM/24zD74tiEeuxcDAn8WKEMXytJbRj9pOEHxssSspbs2JJTwAxYe6401rXro-sn_jWPPkrVwVNiEuOMNCIZvDhHprbgaPIIwu17TQqar1ljTVj5jj8Y7GP1hQMN0-VHLxpRksFDQmby6I0qZry2bWBl2TyeVFIBs1Q5QrD4DmCmX7Dqv_ClXBy5Zp0Wib4WbMeVvMmuF-uk945KWNljiLoRSoYVDAQkvqHHZSE2ceTtbdy8GlgXmv_WvE8kO4nkrpu6pn547N8cuGZaXgN-F2xNkXTMqhHl6D6DipWf7Au_3YoH0YmHqrtpgythPffurupc8R0eV994Gn9H5foOrCffPuf0N21YlrVvld1GepggSRUwh2kWJuLzDQVc3aOIstwOSpHICaDxboPr5j-5p-BgkHPRVJiY_Vj4yKK7DefjV_7p8fNvllW0K9wbxTISqMdcNQ-i2G1guk0DmNMiRnRSygTTxkFl_CoOoygwsyGp7l95k12dFH_afIahdI9jIxoxqja4rN5SOG_UlI9wUCVNWv7KbpQl6v3Pjdmeqkc400QL0MiPb3TkjmMrvT4lYOCUcpzQHRH7nr7G6n9G72VYMmV7uCRf3Xvs1RdPclJoTNoxjqDc7GJygEZVEWBPfdoLhdBAh2u-pMzrYn29I-AnnblZU12WPBi7xiOyhydnWr7iOPjmFRs055EVRDBaq4lZvkSpVmoiPccNndPgRT_Xys1bAcyqPyxG6Slycmdq4VJyX9cdmXfY-IFgegShY5dyp3u2qldXs2sd1QS3Xy4Mn3rE5Z_nJzTEjl4SIg5wWMvMEQkMKLSlSejvM7PkYWUZupSZVpB-kTCPo_gPpCrYt2s0NeKVHPEkXB9Lv1ciwZhwCOBfrqD2DcyZlmsHMlUMxBgFSeV_rUAoY3R0564pH_1cXJRRtxd0Tyb7iidtVzDgO3cj2Np1aN3azXqdLkzVcIJnkWyrek0PVNXnCQ',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
]

let wrapperList = document.querySelector('.wrapper__list')

// outBurgers - Будет перебирать массив products, и выводить все данные в wrapperList

function outBurgers() {
    
    products.forEach((item) => {
       let { id,name, price, img  } = item
       
       wrapperList.innerHTML += `
                <div class="wrapper__list-card" id="${id}">
                    <p class="wrapper__list-count"></p>
                    <img class="wrapper__list-image" src="${img}" alt="">
                    <h3 class="wrapper__list-title">${name}</h3>
                    <div class="wrapper__list-sub">
                        <p class="wrapper__list-text">${price} сум</p>
                        <button class="wrapper__list-btn"><img src="images/sell-icon.svg" alt=""></button>
                    </div>
                </div>     
       `
    })
}

outBurgers()



let burgersBtn = document.querySelectorAll('.wrapper__list-btn'),
    cartBtn    = document.querySelector('.wrapper__navbar-btn'),
    basket     = document.querySelector('.wrapper__navbar-basket'),
    cartClose  = document.querySelector('.wrapper__navbar-close'),
    amountBasket = document.querySelector('.warapper__navbar-count'),
    cartTotalPrice = document.querySelector('.wrapper__navbar-totalprice'),
    checkList   = document.querySelector('.wrapper__navbar-checklist'),
    korzina = []
    

    
cartBtn.addEventListener('click', () => basket.classList.add('active'))
cartClose.addEventListener('click', () => basket.classList.remove('active'))

    

burgersBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        addAmount(btn)
    })
})


// addAmount будет добавлять количество (amount) нашему выбраному бургеру

function addAmount(btn) {
    // closest() - метод который подключается к указаному ближайшему родителю
    let id = btn.closest('.wrapper__list-card').getAttribute('id')
    let currentBurger = products.find((item) => item.id == id)
    
    currentBurger.amount < 10 ? currentBurger.amount++ : alert('Слишком жирно')
    addToKorzina(currentBurger)
}


function addToKorzina (burger) {
    if(burger.amount > 0) {
        if(!korzina.includes(burger)) {
            korzina.push(burger)
        }
    }
    outData()
}

function outData () {
    
    cartTotalPrice.innerHTML = getTotalPrice()
    let allAmount = getTotalAmount()
    if(allAmount > 0) {
        amountBasket.classList.add('active')
        amountBasket.innerHTML = allAmount
    }else {
        amountBasket.classList.remove('active')
        amountBasket.innerHTML = ''
    }
    outFromKorzina()
}


function getTotalAmount () {
    let sum = 0;
    products.forEach((item) => {
        sum += item.amount
    })
    return sum    
}

function getTotalPrice () {
    let sum = 0;
    products.forEach((item) => {
        sum += item.totalSum
    })
    return sum + 'сумм'
}


function outFromKorzina() {
    
    
    checkList.innerHTML = ''
    korzina.forEach((item) => {
        checkList.innerHTML +=  `
        <div class="navbar__item" data-id="${item.id}">
        <div class="navbar__item-left">
            <img src="${item.img}" alt="">
            <div class="navbar__item-left-info">
                <p class="navbar__item-left-name">${item.name}</p>
                <p class="navbar__item-left-price">${item.price} сум</p>
            </div>
        </div>
        <div class="navbar__item-right">
            <button data-symbol="-" class="navbar__item-btn">-</button>
            <output class="navbar__item-count">${item.amount}</output>
            <button data-symbol="+" class="navbar__item-btn">+</button>
        </div>
    </div> 
        `
    })
}



window.addEventListener('click', (event) => {
    if(event.target.classList.contains('navbar__item-btn')) {
        let btn = event.target
        let id = btn.closest('.navbar__item').getAttribute('data-id')
        let burger = products.find((item) => item.id == id)
        let dataValue = btn.getAttribute('data-symbol')
        if(dataValue == '+' && burger.amount < 10) {
            burger.amount++
        }else if(dataValue == '-') {
            burger.amount--
        }
        korzina = korzina.filter((item) => item.amount > 0)
        outData()
    }
})

