//جلب البيانات 

let search = document.getElementById("search");
let container = document.getElementById("container");

let next = document.getElementById("next");
let prev = document.getElementById("prev");

let idArray;
let mood = 'add';

let addPost = document.getElementById("addPost");
let addTitle  = document.getElementById("addTitle");
let addBody = document.getElementById("addBody");
let clickAdd = document.getElementById("clickAdd");


let array = [];
let filterData = [];

let currentPage = 1;
let itemsPerPage = 10;

// جلب api

async function fetchData()
{
try
{
    let respons = await fetch("https://jsonplaceholder.typicode.com/posts");
    if(!respons.ok)
        {
            throw new Error("Don,t No Data");
        }
       array = await respons.json();
       filterData = array;
       watchData();
}
catch(err)
{
    console.log(err.message);
}
}
// عرض الداتا

function watchData()
{
container.innerHTML = '';

let start = (currentPage - 1) * itemsPerPage;
let end = currentPage * itemsPerPage;

let result = filterData.slice(start, end);
let totalPage = Math.ceil(filterData.length / itemsPerPage)

result.forEach( item =>{
    let div = document.createElement("div");
    div.style.cssText =` 
    border : 5px solid #f1c893;
    margin : 10px;
    padding : 10px;
    background : #bab1b1ff;
    border-radius: 8px;
    `
    div.innerHTML = `
    <h3>${item.title}</h3>
    <p>${item.body}</p>
    <button onclick ='deleteId(${item.id})'>Delete</button>
    <button onclick ='update(${item.id})'>UpData</button>
    `
    container.appendChild(div)
})

prev.disabled = currentPage === 1;
next.disabled = currentPage === totalPage;

}
// Pagination

next.onclick = ()=>{
    currentPage++;
    watchData();
} 

prev.onclick = ()=>{
    currentPage--;
    watchData()
}
// حذف العنصر 
function deleteId(id)
{
    filterData = array.filter(fill => fill.id !== id);
    array = array.filter(fill=> fill.id !== id);
    watchData()
}
// بحث عن العناصر
search.addEventListener("input",()=>{
    let value = search.value.toLowerCase();
    if(value === '')
        {
            filterData = array;
        }
        else
            {
        filterData = filterData.filter(path =>{
        return path.title.toLowerCase().includes(value)
    })
            }

    currentPage = 1;
    
    watchData()
    
})
// اضافه عنصر جديد
clickAdd.addEventListener("click",()=>{

    if( mood === 'add'){

    let addTitle_value = addTitle.value.trim();
    let addBody_value  = addBody.value.trim();
    
    if(addTitle.value == '' || addBody.value =='')
        {
            alert("Please Enter Titel And Body")
            return;
        }
    let object_addPost = {
        id : Date.now(),
        title : addTitle_value,
        body : addBody_value
    }    

    array.unshift(object_addPost);
    currentPage = 1;

    addTitle.value = ''
    addBody.value = ''
    
}else
    {
        
        array[idArray].title = addTitle.value;
        array[idArray].body = addBody.value;

        addTitle.value = ''
        addBody.value = ''

        addPost.textContent = 'Add Post'
        clickAdd.textContent = "Click Add"

        mood = 'add'
        
        
    }
    watchData();
})
function update(id){
    mood = 'update';
    if(mood == 'update'){
    addTitle.value = array[id-1].title;
    addBody.value = array[id-1].body;
    addPost.textContent = 'Up Date'
    clickAdd.textContent = "Click UpDate"
    idArray = id-1
    }
}
fetchData()