
function createPromise(position, delay) {
console.log(delay)
  const shouldResolve = Math.random() > 0.3;
  const  promise = new Promise ((resolve,reject)=>{
  if (shouldResolve) {
    resolve( {position, delay} );
  } else {
    reject( position, delay );
  }
  
})
promise.then(({position, delay})=>console.log(`🍿 Fulfilled promise ${position} in ${delay} ms`)).catch((position, delay)=>console.log(`🧨 Rejected promise ${position} in ${delay} ms`));
}
const ref = {
  form:document.querySelector(".form"),
}

ref.form.addEventListener('submit', (e)=>{event.preventDefault();
  const formData = new FormData(e.currentTarget)
  const dataByForm = {}
  formData.forEach((value,name)=>{
    dataByForm[name]=Number(value)
  
  })
  for (let i = 1; i<= dataByForm.amount; i+=1){
    createPromise(i,dataByForm.delay)
    dataByForm.delay+=dataByForm.step
    
  }

})