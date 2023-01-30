function savetolocalstorage(event)
{
    event.preventDefault();
    let amount=event.target.expense.value;
    let description=event.target.description.value;
    

    let obj={
        amount,
        description
       
    }
    axios.post('https://crudcrud.com/api/bf55aa96b5e544b78c3b66d5df762bda/validatedata',obj)
    .then((res)=>{
        console.log(res.data)
        showuserdetails(res.data)
    })
    .catch((err)=>console.log(err))
    
    
}
function showuserdetails(data)
{
    let parentele=document.getElementById('frm')
    let childele=`<li id=${data._id}>${data.amount}-${data.description}
                        <button onClick=deluser('${data._id}')>delete</button></li>`
    parentele.innerHTML=parentele.innerHTML+childele
    
}
function deluser(userid)
{
    axios.delete(`https://crudcrud.com/api/bf55aa96b5e544b78c3b66d5df762bda/validatedata/${userid}`)
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
    axios.get('https://crudcrud.com/api/bf55aa96b5e544b78c3b66d5df762bda/validatedata')
    .then((res)=>{
        console.log(res.data)
        for(var i=0;i<res.data.length;i++)
        {
            showuserdetails(res.data[i]);
        }
    })
})