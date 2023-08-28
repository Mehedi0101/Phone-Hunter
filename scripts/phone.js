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
            <div class="card-actions justify-center">
                <button class="btn btn-primary" onclick="showDetails('${item.slug}'); details.showModal()">SHOW DETAILS</button>
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

const showDetails = async (id) => { 
        const modalContainer = document.getElementById('modal-container');
        modalContainer.textContent='';
        const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
        const data = await response.json();
        const phoneDetails = data.data;
        console.log(phoneDetails);
        const div = document.createElement('div');
        div.innerHTML = `
        <img src="${phoneDetails.image}" alt="" class="mx-auto">
        <h2 class="text-2xl font-semibold">${phoneDetails.name}</h2>
        <p><span class="font-bold">Storage: </span>${phoneDetails.mainFeatures.storage}</p>
        <p><span class="font-bold">Display Size: </span>${phoneDetails.mainFeatures.displaySize}</p>
        <p><span class="font-bold">Chipset: </span>${phoneDetails.mainFeatures.chipset}</p>
        <p><span class="font-bold">Memory: </span>${phoneDetails.mainFeatures.memory}</p>
        <p><span class="font-bold">Release data: </span>${phoneDetails.releaseDate}</p>
        <p><span class="font-bold">Brand: </span>${phoneDetails.brand}</p>
        <p><span class="font-bold">GPS: </span>${phoneDetails?.others?.GPS || 'none'}</p>
        <div class="modal-action">
            <button class="btn">Close</button>
        </div>
        `
        modalContainer.appendChild(div);
}


