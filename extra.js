// const handleBuyNow = id => {
//     console.log('buy now', id)

//     setBuyNow(true);

//     fetch(`https://fast-beach-99961.herokuapp.com/tShirt/${id}`)
//         .then(res => res.json())
//         .then(data => {
//           setShirt(data)
//           console.log(data)
//         })
// }



// const handleOrderNow = () => {
//     const orderDetails = { ...props.shirt, ...loggedInUser };
//     const newOrder = {
//       productName: orderDetails.productName,
//       productPhoto: orderDetails.imageURL,
//       price: orderDetails.price,
//       desc: orderDetails.desc,
//       buyerName: orderDetails.buyer,
//       buyerEmail: orderDetails.email,
//       date: new Date(),
//     }
//     fetch('https://fast-beach-99961.herokuapp.com/addOrder', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(newOrder)
//     })
//       .then(res => res.json())
//       .then(data => console.log(data))

//     setPlaceOrder(true);
//   }


//   const handleOrderNow = () => {
//     const orderDetails = { ...props.shirt, ...loggedInUser };
//     const newOrder = {
//       productName: orderDetails.productName,
//       productPhoto: orderDetails.imageURL,
//       price: orderDetails.price,
//       desc: orderDetails.desc,
//       buyerName: orderDetails.buyer,
//       buyerEmail: orderDetails.email,
//       date: new Date(),
//     }
//     fetch('https://fast-beach-99961.herokuapp.com/addOrder', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(newOrder)
//     })
//       .then(res => res.json())
//       .then(data => console.log(data))

//     setPlaceOrder(true);
//   }


//   const AddProducts = () => {
//     const { register, handleSubmit, watch, errors } = useForm();
//     const [imageURL, setImageURL] = useState(null);
//     const [addedProduct,setAddedProduct] = useState(false);

//     const onSubmit = data => {
//         const productData = {
//             productName:data.name,
//             imageURL:imageURL,
//             price:data.price,
//             desc:data.desc
//         }
//         console.log(productData)
//         const url =`https://fast-beach-99961.herokuapp.com/addProduct`;
//         fetch(url,{
//             method:'POST',
//             headers:{
//                 'Content-Type':'application/json'
//             },
//             body:JSON.stringify(productData)
//         })
//         .then(res=>{
//             console.log(res)
//         })

//         setAddedProduct(true);
       
        
//     };

//     const handleImageUpload = event =>{
//         console.log(event.target.files[0])
//         const imageData = new FormData();
//         imageData.set('key', 'b437b2988a9a7d177ebe83d13b4dc437')
//         imageData.append('image', event.target.files[0])
        
//         axios.post('https://api.imgbb.com/1/upload', imageData)
//         .then(response =>{
//             setImageURL(response.data.data.display_url)
//         })
//         .catch(error=>{
//             console.log(error)
//         })

//     }
   

//     return (
//         <div className="form-container">
//             <h3>Add products</h3>
//            {
//                addedProduct? <h3>New Product added Successfully</h3>
//                : <form  onSubmit={handleSubmit(onSubmit)}>
//                <div className="form-control">
//                <div>
//                  <label htmlFor="">Product Name</label>
//                   <br/>
//                <input className="input" placeholder="new t-shirt name" {...register('name')} />
//                      <br/>
//                <label htmlFor="">Product Desc</label>
//                  <br/>
//                <input className="input" placeholder="short description" {...register('desc')} />
//                  </div>
                
                 
                
//               <div>
//               <label htmlFor="">Price</label>
//               <br/>
//                <input className="input" placeholder="price in $" {...register('price')} />
//                <br/>
//                <label htmlFor="">Add Photo</label>
//                <br/>
//                <input className="input" type="file" onChange={handleImageUpload} />
                
//               </div>
//                </div>
//               <div>
//               <input className="save-btn" type="submit" />
//               </div>
//              </form> 
//            }

//            {/* {
//                addedProduct &&   <Redirect
//                to={{
//                    pathname: "/home",
//                }}
//            />
//            } */}
//         </div>
//     );
// };

// export default AddProducts;


//  <div class="modal-wrapper" id="add-user-modal">
//   <div class="modal">
//     <a href="#" onclick="closeModal()" class="modal-close">+</a>
//     <div class="modal-title">
//       <h2>Create New User</h2>
//     </div>
//     <div class="modal-body">
//       <form
//         method="post"
//         action="/users"
//         enctype="multipart/form-data"
//         id="add-user-form"
//       >
//         <input type="text" placeholder="enter name" name="name" />
//         <p class="error name-error"></p>

//         <input type="text" placeholder="enter email" name="email" />
//         <p class="error email-error"></p>

//         <input type="text" placeholder="enter mobile" name="mobile" />
//         <p class="error mobile-error"></p>

//         <input type="password" placeholder="enter password" name="password" />
//         <p class="error password-error"></p>

//         <input type="file" name="avatar" />
//         <p class="error avatar-error"></p>

//         <p class="error common-error"></p>

//         <input type="submit" value="Submit" />
//       </form>
//     </div>
//   </div>
// </div>
// <script>
//   const modal = document.querySelector("#add-user-modal");
//   const form = document.querySelector("#add-user-form");

//   // success toast
//   const successToast = Toastify({
//     text: "User was added successfully! Reloading the list...",
//     duration: 1000,
//   });

//   function closeModal() {
//     modal.style.display = "none";
//   }
//   function openModal() {
//     modal.style.display = "block";
//   }

//   // form submit handler
//   form.onsubmit = async function (event) {
//     event.preventDefault();

//     // clear errors first
//     const errorPlaceholders = document.querySelectorAll("p.error");
//     for (let i = 0; i < errorPlaceholders.length; i++) {
//       errorPlaceholders[i].style.display = "none";
//     }

//     const inputErrors = document.querySelectorAll("input.error");
//     if (inputErrors.length > 0) {
//       for (let j = 0; j < inputErrors.length; j++) {
//         inputErrors[j].classList.remove("error");
//       }
//     }

//     // prepare the form data
//     const formData = new FormData(form);

//     // send the request to server
//     let response = await fetch("/users", {
//       method: "POST",
//       body: formData,
//     });

//     // get response
//     let result = await response.json();

//     // handle error and response
//     if (result.errors) {
//       // errors
//       Object.keys(result.errors).forEach((fieldName) => {
//         // add error class to all inputs
//         form[fieldName].classList.add("error");

//         // set all error placeholders (p tag) textContent
//         const errorPlaceholder = document.querySelector(`.${fieldName}-error`);
//         errorPlaceholder.textContent = result.errors[fieldName].msg;

//         // make all placeholders visible
//         errorPlaceholder.style.display = "block";
//       });
//     } else {
//       // success
//       successToast.showToast();
//       closeModal();
//       document.querySelector("p.error").style.display = "none";

//       // reload the page after 1 second
//       setTimeout(() => {
//         location.reload();
//       }, 1000);
//     }
//   ;
// </script> 

// function getData(){
//     const formData = new FormData()
// formData.append('name','jabed')
// console.log(formData)
// }
// getData()

// const arr = [1,2,3,4];
// const arr2 = [1,3];

// const ans = arr.map((e)=>{
//     if(arr2.includes(e)){
//        return e=100;
//     }else{
//         return e;
//     }
// })
// console.log(ans)
// const arr1=[{title:'Hello'},{title:"Hi"}];
// const arr2 = ["Hi"]
// const ansArr = arr1.map((a)=>{
//     if(arr2.includes(a.title)){
//        return {...a,correct:true}
//     }else{
//         return {...a,correct:false}
//     }
// })
//   console.log(ansArr)



// function start(){
//     setInterval(myFunc,1000);
// }
// function myFunc(){
//     console.log(new Date().toLocaleTimeString());
// }

