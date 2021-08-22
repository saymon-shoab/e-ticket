import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './LogIn.css'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.Config';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../../App';



if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

const LogIn = () => {

  const {loggedInUser, setLoggedInUser}= useContext(UserContext);
     const history = useHistory();
     const location = useLocation();
     const { from } = location.state || { from: { pathname: "/" } };
 
    // const [modalIsOpen, setIsOpen] = useState(false);
    // function openModal() {
    //     setIsOpen(true);
    //   }
    //   function closeModal() {
    //     setIsOpen(false);
    //   }
 

    const [newUser, setNewUser]=useState(false)
    const [user, setUser] = useState({
        isSignedIn:false,
        
        name:'',
        email:'',
        password:'',
        photo:'',
    })

    const provider = new firebase.auth.GoogleAuthProvider();


    const handleSignIn = () => {
        
        firebase.auth().signInWithPopup(provider)
        .then(res=>{
            let {displayName,photoURL,email}=res.user
            const signedInUser ={
                isSignedIn:true,
                name:displayName,
                email:email,
                photo:photoURL,
            }
            setUser(signedInUser)
            setLoggedInUser(signedInUser);
            storeAuthTocken();
            history.replace(from)
            console.log(displayName,photoURL,email)
        })
        .catch(error=>{
            console.log(error.message)
        })
    }
const handleSignOut =() => {
    firebase.auth().signOut()
    .then(res => {
        console.log(res)
        // Sign-out successful.
        const signedOutUser ={
            isSignedIn:false,
            name:'',
            email:'',
            photo:'',
            error:'',
            success:false
        }
        setUser(signedOutUser)
      }).catch((error) => {
        // An error happened.
        console.log(error)
      });
}

const handleBlur =(event)=>{
    let isFormValid = true;
    console.log(event.target.name, event.target.value);
    if(event.target.name==="email"){
        isFormValid = /\S+@\S+\.\S+/.test(event.target.value)
       console.log(isFormValid)
    }
    if(event.target.name === "password"){
        const passwordLength = event.target.value.length > 6;
        const passwordSasNumber = /\d{1}/.test(event.target.value)
        isFormValid =   passwordLength && passwordSasNumber;
        console.log(isFormValid)
    }
    if(isFormValid){
      const newUserInfo = {...user}
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo)
    }
}

const handleSubmit = (event) => { 
    
   if(newUser && user.email && user.password){
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then((res) => {
      const newUserInfo = {...user};
      newUserInfo.error = "";
      newUserInfo.success =true;
      setUser(newUserInfo);
      console.log(res)
      // ...
    })
    .catch((error) => {
      const newUserInfo ={...user} 
      newUserInfo.error = error.message
      newUserInfo.success=false;
     setUser(newUserInfo)
     updateUserName(user.name)
      // ..
    });
   }
   
   if(!newUser && user.email && user.password){
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then((res) => {
      // Signed in
      const newUserInfo = {...user};
      newUserInfo.error = "";
      newUserInfo.success =true;
      setUser(newUserInfo);
      setLoggedInUser(newUserInfo);
      storeAuthTocken()
      history.replace(from);
      console.log(res.user)
      // ...
    })
    .catch((error) => {
      const newUserInfo ={...user} 
      newUserInfo.error = error.message
      newUserInfo.success=false;
     setUser(newUserInfo)
      //   const newUserInfo ={...user} 
      //   newUserInfo.error = error.message
      //  setUser(newUserInfo)
    });
   }

    event.preventDefault();
}


const updateUserName = name =>{
  const user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: "Jane Q. User",
  }).then(() => {
    // Update successful
    // ...
  }).catch((error) => {
    // An error occurred
    // ...
  });  
}

const storeAuthTocken = () => {
  firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
  .then(function(idToken) {
   sessionStorage.setItem('token', idToken)
    // Send token to your backend via HTTPS
    // ...
  }).catch(function(error) {
    // Handle error
  });
}

    return (
        <div className="body">
            
             <div className="d-flex">
            <form onSubmit={handleSubmit} className="form-login text-center">
              <h2> User Login </h2>
{    
            newUser && <input  onBlur={handleBlur} className="form-control log-input mb-3" name="name" type="text" placeholder="enter your name"  required/>
}              <input  onBlur={handleBlur} className="form-control log-input mb-3" name="email" type="email" placeholder="enter your email address"  required/>
              <input  onBlur={handleBlur} className="form-control mb-3 log-input" name="password" type="password" placeholder="enter your passward"  required/>
               <div className="checkbox mb-3">
                   <label for="">
                       <input onChange={()=>setNewUser(!newUser)} type="checkbox" name="newUser" />new user sign up
                   </label>
               </div>
               <button  className="btn btn-log w-100 mb-2" type="submit"> {newUser ? "signUp" : "login"} </button>
             
             { user.isSignedIn ?<button onClick={handleSignOut} className="btn btn-log w-100"
             type="submit"><FontAwesomeIcon icon={faGoogle} />
                Google Sign Out </button>:<button onClick={handleSignIn} className="btn btn-log w-100"
             type="submit"><FontAwesomeIcon icon={faGoogle} />  
               Google Sign In </button>}
               <div  >
            
                   <p style={{color:'red'}}>{user.error}</p>
              
          { user.success &&
             
             <p style={{color:'green'}}>User {newUser ?"created" : "logged In"} successfully</p>
          }


               </div>
                   
            
             {
                 user.isSignedIn && <div>
                     <p>{user.name}</p>
                 </div>
             }
            </form>
           
        </div>
        </div>
       
    );
};

export default LogIn;