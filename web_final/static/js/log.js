let userinput=document.querySelector("[name='Username']");
let passinput=document.querySelector("[name='pass']");
document.forms[0].onsubmit=function(event){
   let usernam=false;
   let pass=false;
   console.log(passinput.value);
   if(userinput.value=="admin"&&userinput.value.length>0&&passinput.value=="123456"){
       usernam=true;
       pass=true;
   }
   if(usernam===false||pass===false){
       alert('worng password or username')
       event.preventDefault();
   }
   

}