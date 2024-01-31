
const loadPhone = async (searchText,isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json()
    const phones = data.data
     console.log(phones)
    displayPhone(phones,isShowAll)
}


const displayPhone = (phones,isShowAll) => {
    // console.log(phones)
    const phoneContainer =document.getElementById("phone_container");
phoneContainer.textContent='';
// Show All Button-----------
const showAllButton = document.getElementById('Show_all_container');
if(phones.length>12 && !isShowAll){
  showAllButton.classList.remove('hidden')
}
else{
  showAllButton.classList.add('hidden')
}
// console.log('is show All', isShowAll)
// Display show 10 device

if(!isShowAll){
  phones = phones.slice(0,12)
}


    phones.forEach(phone => {
        // console.log(phone)
        const phoneCard = document.createElement('div')
        phoneCard.classList = `card bg-yellow-100 p-5 shadow-xl`
        phoneCard.innerHTML= `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick="showAllDetailes('${phone.slug}');show_details_modal.showModal()" class="btn btn-primary">Show detailes</button>
          </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);

    });

    // Hide loading spinner
    toggoleSpinerLoading(false);

}

// Show All details

const showAllDetailes =async (id) =>{
  // console.log("Show All",id)
  // Load single phone data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json()
  const phone =data.data

  showPhoneDetailes(phone)

}


const showPhoneDetailes = (phone) =>{
  console.log(phone)
  const phoneName = document.getElementById('show_detaile_phone_name');
  phoneName.innerText=phone.name;

  const showDetailContainer = document.getElementById('show_detail_container');
  showDetailContainer.innerHTML=`
  <img src="${phone.image}" alt="">
  <p><span>storage:</span>${phone?.mainFeatures?.storage}</p>
  <p><span>GPS:</span> ${phone?.others?.GPS} </p>




  `

  show_details_modal.showModal()
}



// Handle search button
const handleSearch = (isShowAll) =>{
  toggoleSpinerLoading(true)
    const searchField = document.getElementById('search_Field')
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText,isShowAll);
    
}
// Recap Handle search--------------
/* const buttonHandle2 = () =>{
  toggoleSpinerLoading(true)
  const searchField = document.getElementById('search_Field2');
  const searchText=searchField.value;
  loadPhone(searchText);
} */


const toggoleSpinerLoading = (islooading) =>{
  const spinerLoading =document.getElementById('spiner_loading')
  if(islooading){
    spinerLoading.classList.remove('hidden')
  }
  else{
    spinerLoading.classList.add('hidden')
  }
}


const handleShowAll = () =>{
  handleSearch(true)
}


// loadPhone();


