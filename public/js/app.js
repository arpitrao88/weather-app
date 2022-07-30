console.log('Hello from the client side js');



const weatherform=document.querySelector('form');
const search=document.querySelector('input')
const messageone=document.querySelector('#m1')
const messagetwo=document.querySelector('#m2')



weatherform.addEventListener('submit',(e)=>{
    
    e.preventDefault();
    
    const url='/weather?address='+search.value

    messageone.innerText="Loading..."
    messagetwo.innerText=''
    
    fetch(url).then((response)=> response.json()).then((data)=>{
        if(!data.error)
        {
        messageone.innerText=`${data.location} `;
        messagetwo.innerText=`The weather is expected to be ${data.forecast}`

        
        }
        else
        {
            messageone.innerText=`${data.error}`
        }
            
        })


})

