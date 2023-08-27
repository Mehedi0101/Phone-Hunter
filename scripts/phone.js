const phoneLoad = async (search,isShowAll) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`);
    const data = await response.json();
    const phoneList = data.data;
    displayPhones(phoneList,isShowAll);
}

const displayPhones = (list,isShowAll) => {
    const phonesContainer = document.getElementById('phones-container');
    const showAllButton = document.getElementById('show-button');

    phonesContainer.textContent = '';

    if (list.length > 9 && !isShowAll) {
        list = list.slice(0, 9);
        showAllButton.classList.remove('hidden');
    }
    else {
        showAllButton.classList.add('hidden');
    }

    list.forEach(item => {
        const cardContainer = document.createElement('div');
        cardContainer.classList = `card p-10 bg-gray-200 shadow-xl`;
        cardContainer.innerHTML = `
        <figure><img src="${item.image}" alt="" /></figure>
        <div class="card-body">
            <h2 class="card-title">${item.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `
        spinnerToggle(false);
        phonesContainer.appendChild(cardContainer);
    });
}

const displayItems = (isShowAll) => {
    spinnerToggle(true);
    const searchValue = document.getElementById('search-field').value;
    phoneLoad(searchValue,isShowAll);
}

document.getElementById('search-btn').addEventListener('click', () => {
    displayItems(false);
})

const spinnerToggle = (loadStatus) => {
    const spinner = document.getElementById('spinner');
    loadStatus ? spinner.classList.remove('hidden') : spinner.classList.add('hidden');
}

document.getElementById('show-button').addEventListener('click',()=>{
    displayItems(true);
})
