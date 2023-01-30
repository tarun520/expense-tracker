
function savetolocalstorage(event)
{
    event.preventDefault()
    let amount=event.target.expense.value;
    let description=event.target.description.value;
    

    let obj={
        amount,
        description
       
    }
    axios.post('https://crudcrud.com/api/e4bb1ec55f8a4adaa3241d6419d07784/validatedata',obj)
    .then((res)=>{
        showuserdetails(res.data)
    })
    .catch((err)=>console.log(err))
    
    
}
function showuserdetails(data)
{
    document.getElementById('exp').value='';
    document.getElementById('des').value='';
    let parentele=document.getElementById('frm')
    let childele=`<li id=${data._id}>${data.amount}-${data.description}
                        <button onClick=deluser('${data._id}')>delete</button>
                        <button onClick=edituser('${data.amount}','${data.description}','${data._id}')>edit</button></li>`
    parentele.innerHTML=parentele.innerHTML+childele
    
}
function edituser(useramount,userdescription,userid)
{
    document.getElementById('exp').value=useramount;
    document.getElementById('des').value=userdescription;

    deluser(userid);

}
function deluser(userid)
{
    axios.delete(`https://crudcrud.com/api/e4bb1ec55f8a4adaa3241d6419d07784/validatedata/${userid}`)
    .then((res)=>{
        removeuser(userid)
    })
    .catch((err)=>{
        console.log(err)
    })
}
function removeuser(userid)
{
    let parnode=document.getElementById('frm')
    let childnode=document.getElementById(userid)
    if(childnode)
    {
        parnode.removeChild(childnode);
    }
}
window.addEventListener('DOMContentLoaded',()=>
{
    axios.get('https://crudcrud.com/api/e4bb1ec55f8a4adaa3241d6419d07784/validatedata')
    .then((res)=>{
        console.log(res.data)
        for(var i=0;i<res.data.length;i++)
        {
            showuserdetails(res.data[i]);
        }
    })
})