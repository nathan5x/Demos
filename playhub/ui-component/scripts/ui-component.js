/*	- Document: JS for UI Components creation
	- Version:  1.1
	- Author:   Sabarinathan 
*/

$(document).ready(function() {
  var myLoginControl = new LoginControl();
  myLoginControl.loginInitialize($('#instance1'), "Instance 1");
  
  myLoginControl = new LoginControl();
  myLoginControl.loginInitialize($('#instance2'), "Instance 2");
});


/**
* Login UI Component Base to hold the 1. login data (user name and password)
* 2. Name of the instance
* 3. UI of the instnace
* @class LoginControl
* @constructor
*/
function LoginControl() {
    this.loginData = { username:'', password:'' };
    this.name = '';
    this.loginUI = $('<div class="login-ui"> \
                        <form name="loginForm" class="login-form"> \
                            <div class="form-fields"> \
                                <label class="title"> User Login </label> \
                                <div class="form-field"> \
                                    <input type="text" class="input-text username" name="username" placeholder="User ID"/> \
                                </div> \
                                <div class="form-field"> \
                                    <input type="password" class="input-text" name="password" placeholder="Password"/> \
                                </div> \
                                <input class="btn submit" type="submit" value="Login to your account"/> \
                            </div> \
                        </form> \
                     </div>');
}    

LoginControl.prototype = { 
    
    /**
	* loginInitialize method to attach the Login Components UI into 
	* main stage (HTML) file using the placeholder including 
	* all the events and intial values.
	*
	* @method loginInitialize
	* @param {jQueryObject} placeholder jQuery UI object 
    * @param String name Instane name
	*/
    
    loginInitialize: function(placeHolder, name) {
       var currentInstance = this;
       var view = currentInstance.loginUI;
       currentInstance.name = name;      
       view.children('.login-form').submit(function(event) {
            if(currentInstance.loginData.username === '' || currentInstance.loginData.password === '') {
              alert (currentInstance.name + ': Input fields should not be empty');
            } else { 
              LoginAdapter.login(currentInstance);
            } 
            event.preventDefault();  
       });
      
       view.find('input[name=username]').change( function() {
         currentInstance.loginData.username = $(this).val();         
       });
      
       view.find('input[name=password]').change( function() {
         currentInstance.loginData.password = $(this).val();         
       });
      
       placeHolder.append(view);
    }
};
   
/* Login Adapter 
*  Acts as a Gateway to talk to server and process Login functionalities 
**/
var LoginAdapter = {
    loginServiceURL : 'api.yoursite.com/login',
    loginHTTPMethodType : 'POST',
    login : function (instance) {
        var loginData = instance.loginData;
       /* Client Side Processing for demonstration*/
       if(loginData.username === 'user' && loginData.password === 'pwd') {
       		$('#status').text(instance.name +": Succeeded");
       } else {
       		$('#status').text(instance.name +": Failed");
       }
        
       /* //Server side processing 
         $.ajax({
            url : this.loginServiceURL,
            type: this.loginHTTPMethodType,
            data : loginData,
            success:function(loginResponseData) 
            {
                console.log( loginResponseData.loginStatus ? 'succeeded' : 'failed' );
            },
            error: function(ajaxRequest, errorDetails) 
            {
                console.log('Some error has been occured');
            }
        }); */
    }
};
