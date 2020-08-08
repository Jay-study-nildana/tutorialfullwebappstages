function pagehasloaded()
{
    var logopener="----entering pagehasloaded----";
    console.log(logopener);

    hidetheloading();
   
    //check if local storage has a token.
    var getCurrentToken = getToken();

    if(getCurrentToken!=null)
    {
        console.log("You are already signed in");
        //load the resume 
        loadfullresume();
    }
    else
    {
        console.log("You need to sign in below");
    }

    var logcloser="----leaving pagehasloaded----";
    console.log(logcloser);
}

async function loadfullresume()
{
    var logopener="----entering loadfullresume----";
    console.log(logopener);   

    //show the loading thing
    showtheloading();

    var baseUrl = returnCurrentBaseURL();
    var endPoint = "api/UserandResume/GetResume";
    var fullUrl = baseUrl + endPoint;
    var getCurrentToken = getToken();

    const response = await fetch(fullUrl,
        {
            method: 'GET',
            // body: body
            headers:
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+getCurrentToken
            }
        }
        );    

    if(response.status == 400)
    {
        console.log("unknown error - " + response.status);        
    }        
    else if(response.status == 200)
    {
        var responsejson = response.json();
        responsejson.then(
            function(result)
            {
                console.log(result);

                //display things with edit boxes
                displaytheresumewitheditboxes(result);
            },
            function(error)
            {
                console.log(error);
            }
        );
    }
    else
    {
        console.log("unknown error - " + response.status);        
    }

    var logcloser="----leaving loadfullresume----";
    console.log(logcloser);
}

//TODO006  - we need to modularize this
//break it up into modules
function displaytheresumewitheditboxes(result)
{
    var logopener="----entering displaytheresumewitheditboxes----";
    console.log(logopener);  

    //lets display the name and email address
    //pick the div meant for this item
    var currentDiv = document.getElementById("namedisplay");
    var namep = document.createElement("p"); 
    namep.innerText = result.FirstName + " " +
                        result.MiddleName + " " +
                        result.LastName;
    currentDiv.appendChild(namep);    
    var emailp = document.createElement("p"); 
    emailp.innerText = result.UserEmail;
    currentDiv.appendChild(emailp); 
    var emailp = document.createElement("p"); 
    emailp.innerText = "(alternate email - " + result.Email + ")";
    currentDiv.appendChild(emailp);  

    var currentDivphonenumberdisplay = document.getElementById("phonenumberdisplay");
    //this is to add new item
    //creating an DOM item
    var tempp = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "enter new number";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "PhoneNumber";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp.setAttributeNode(atttype);
    tempp.setAttributeNode(attplaceholder);
    tempp.setAttributeNode(attrequired);
    tempp.setAttributeNode(attid);
    tempp.setAttributeNode(attclass);          
    currentDivphonenumberdisplay.appendChild(tempp);

    //we need a button to update.

    //creating an DOM item
    var tempbutton = document.createElement("button"); 
    //lets add the attributes.    
    var attclass = document.createAttribute("class");
    attclass.value = "btn btn-lg btn-primary btn-block";            
    //for the button I want to keep the GUID directly as the ID
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "PhoneNumberButton";
    //want to display for the button as well.
    tempbutton.innerText = "add phone number";
    //lets attach the attributes to the DOM element in question
    tempbutton.setAttributeNode(attid);             
    tempbutton.setAttributeNode(attclass);                           
    
    //lets setup the click function.
    tempbutton.addEventListener('click', function(){
        addphonenumber();
    });            
    currentDivphonenumberdisplay.appendChild(tempbutton);     


    //add a divider line
    var temphr = document.createElement("hr");
    currentDivphonenumberdisplay.appendChild(temphr);            
    
    if(result.PhoneNumber == true)
    {
        //if this is true, then items related to this topic are available
        //try and display them.
        var itemsarray = result.phoneNumberViewModels;
        //pick the div meant for this item
        var currentDiv = document.getElementById("phonenumberdisplay");
        //start adding the elements.
        //add title.
        var titlep = document.createElement("p"); 
        titlep.innerText = "phone number";
        currentDiv.appendChild(titlep);
        //add the numbers from the collection.
        for(var i=0;i<itemsarray.length;i++)
        {
            var tempitem = itemsarray[i];
            //TODO007  - country code is currently bool. once its changed, need to display it.
            //creating an DOM item
            var tempp = document.createElement("input"); 
            //lets add the attributes.
            var atttype = document.createAttribute("type");
            atttype.value = "text";
            var attplaceholder = document.createAttribute("placeholder");
            attplaceholder.value = tempitem.PhoneNumber;     
            var attrequired = document.createAttribute("required");
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid + "PhoneNumber";
            var attclass = document.createAttribute("class");
            attclass.value = "form-control";
            //lets attach the attributes to the DOM element in question
            tempp.setAttributeNode(atttype);
            tempp.setAttributeNode(attplaceholder);
            tempp.setAttributeNode(attrequired);
            tempp.setAttributeNode(attid);
            tempp.setAttributeNode(attclass);          
            currentDiv.appendChild(tempp);

            //we need a button to update.

            //creating an DOM item
            var tempbutton = document.createElement("button"); 
            //lets add the attributes.
            var attplaceholder = document.createAttribute("placeholder");
            attplaceholder.value = tempitem.PhoneNumber;     
            var attclass = document.createAttribute("class");
            attclass.value = "btn btn-lg btn-primary btn-block";            
            //for the button I want to keep the GUID directly as the ID
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid;
            //want to display for the button as well.
            tempbutton.innerText = "update phone number"
            //lets attach the attributes to the DOM element in question
            tempbutton.setAttributeNode(attid);             
            tempbutton.setAttributeNode(attclass);              
            
            //lets setup the click function.
            tempbutton.addEventListener('click', function(){
                updatephonenumber();
            });            
            currentDiv.appendChild(tempbutton);     


            //add a divider line
            var temphr = document.createElement("hr");
            currentDiv.appendChild(temphr);
        }

    }

    //the new add option.
    var currentDivaddressdisplay = document.getElementById("addressdisplay");
    //AddressLineOne
    var tempp = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "enter address line one";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "AddressLineOne";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp.setAttributeNode(atttype);
    tempp.setAttributeNode(attplaceholder);
    tempp.setAttributeNode(attrequired);
    tempp.setAttributeNode(attid);
    tempp.setAttributeNode(attclass);          
    currentDivaddressdisplay.appendChild(tempp);            

    //AddressLineTwo

    var tempp2 = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "enter address line two";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "AddressLineTwo";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp2.setAttributeNode(atttype);
    tempp2.setAttributeNode(attplaceholder);
    tempp2.setAttributeNode(attrequired);
    tempp2.setAttributeNode(attid);
    tempp2.setAttributeNode(attclass);          
    currentDivaddressdisplay.appendChild(tempp2);             

    //City

    var tempp3 = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "enter City";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "City";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp3.setAttributeNode(atttype);
    tempp3.setAttributeNode(attplaceholder);
    tempp3.setAttributeNode(attrequired);
    tempp3.setAttributeNode(attid);
    tempp3.setAttributeNode(attclass);          
    currentDivaddressdisplay.appendChild(tempp3);            

    //State

    var tempp4 = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "enter State";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "State";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp4.setAttributeNode(atttype);
    tempp4.setAttributeNode(attplaceholder);
    tempp4.setAttributeNode(attrequired);
    tempp4.setAttributeNode(attid);
    tempp4.setAttributeNode(attclass);          
    currentDivaddressdisplay.appendChild(tempp4);                        

    //Pincode

    var tempp5 = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "enter Pincode";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "Pincode";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp5.setAttributeNode(atttype);
    tempp5.setAttributeNode(attplaceholder);
    tempp5.setAttributeNode(attrequired);
    tempp5.setAttributeNode(attid);
    tempp5.setAttributeNode(attclass);          
    currentDivaddressdisplay.appendChild(tempp5);             

    //Landmark

    var tempp6 = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "enter landmark";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "Landmark";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp6.setAttributeNode(atttype);
    tempp6.setAttributeNode(attplaceholder);
    tempp6.setAttributeNode(attrequired);
    tempp6.setAttributeNode(attid);
    tempp6.setAttributeNode(attclass);          
    currentDivaddressdisplay.appendChild(tempp6);            

    //AddressExtraNotes

    var tempp7 = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "enter address extra notes";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "AddressExtraNotes";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp7.setAttributeNode(atttype);
    tempp7.setAttributeNode(attplaceholder);
    tempp7.setAttributeNode(attrequired);
    tempp7.setAttributeNode(attid);
    tempp7.setAttributeNode(attclass);          
    currentDivaddressdisplay.appendChild(tempp7);              


    //we need a button to update.
    var tempbutton = document.createElement("button"); 
    //lets add the attributes.   
    var attclass = document.createAttribute("class");
    attclass.value = "btn btn-lg btn-primary btn-block";            
    //for the button I want to keep the GUID directly as the ID
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "AddressButton";
    //want to display for the button as well.
    tempbutton.innerText = "add address"
    //lets attach the attributes to the DOM element in question
    tempbutton.setAttributeNode(attid);             
    tempbutton.setAttributeNode(attclass);              
    
    //lets setup the click function.
    tempbutton.addEventListener('click', function(){
        addaddress();
    });            
    currentDivaddressdisplay.appendChild(tempbutton);                 

    if(result.Address == true)
    {
        //if this is true, then items related to this topic are available
        var itemsarray = result.addressViewModels;
        //pick the div meant for this item
        var currentDiv = document.getElementById("addressdisplay");
        //start adding the elements.
        //add title.
        var titlep = document.createElement("p"); 
        titlep.innerText = "address";
        currentDiv.appendChild(titlep);     
        
        //add the numbers from the collection.
        for(var i=0;i<itemsarray.length;i++)
        {
            var tempitem = itemsarray[i];

            //AddressLineOne
            var tempp = document.createElement("input"); 
            //lets add the attributes.
            var atttype = document.createAttribute("type");
            atttype.value = "text";
            var attplaceholder = document.createAttribute("placeholder");
            attplaceholder.value = tempitem.AddressLineOne;     
            var attrequired = document.createAttribute("required");
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid + "AddressLineOne";
            var attclass = document.createAttribute("class");
            attclass.value = "form-control";
            //lets attach the attributes to the DOM element in question
            tempp.setAttributeNode(atttype);
            tempp.setAttributeNode(attplaceholder);
            tempp.setAttributeNode(attrequired);
            tempp.setAttributeNode(attid);
            tempp.setAttributeNode(attclass);          
            currentDiv.appendChild(tempp);            

            //AddressLineTwo

            var tempp2 = document.createElement("input"); 
            //lets add the attributes.
            var atttype = document.createAttribute("type");
            atttype.value = "text";
            var attplaceholder = document.createAttribute("placeholder");
            attplaceholder.value = tempitem.AddressLineTwo;     
            var attrequired = document.createAttribute("required");
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid + "AddressLineTwo";
            var attclass = document.createAttribute("class");
            attclass.value = "form-control";
            //lets attach the attributes to the DOM element in question
            tempp2.setAttributeNode(atttype);
            tempp2.setAttributeNode(attplaceholder);
            tempp2.setAttributeNode(attrequired);
            tempp2.setAttributeNode(attid);
            tempp2.setAttributeNode(attclass);          
            currentDiv.appendChild(tempp2);             

            //City

            var tempp3 = document.createElement("input"); 
            //lets add the attributes.
            var atttype = document.createAttribute("type");
            atttype.value = "text";
            var attplaceholder = document.createAttribute("placeholder");
            attplaceholder.value = tempitem.City;     
            var attrequired = document.createAttribute("required");
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid + "City";
            var attclass = document.createAttribute("class");
            attclass.value = "form-control";
            //lets attach the attributes to the DOM element in question
            tempp3.setAttributeNode(atttype);
            tempp3.setAttributeNode(attplaceholder);
            tempp3.setAttributeNode(attrequired);
            tempp3.setAttributeNode(attid);
            tempp3.setAttributeNode(attclass);          
            currentDiv.appendChild(tempp3);            

            //State

            var tempp4 = document.createElement("input"); 
            //lets add the attributes.
            var atttype = document.createAttribute("type");
            atttype.value = "text";
            var attplaceholder = document.createAttribute("placeholder");
            attplaceholder.value = tempitem.State;     
            var attrequired = document.createAttribute("required");
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid + "State";
            var attclass = document.createAttribute("class");
            attclass.value = "form-control";
            //lets attach the attributes to the DOM element in question
            tempp4.setAttributeNode(atttype);
            tempp4.setAttributeNode(attplaceholder);
            tempp4.setAttributeNode(attrequired);
            tempp4.setAttributeNode(attid);
            tempp4.setAttributeNode(attclass);          
            currentDiv.appendChild(tempp4);                        

            //Pincode

            var tempp5 = document.createElement("input"); 
            //lets add the attributes.
            var atttype = document.createAttribute("type");
            atttype.value = "text";
            var attplaceholder = document.createAttribute("placeholder");
            attplaceholder.value = tempitem.Pincode;     
            var attrequired = document.createAttribute("required");
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid + "Pincode";
            var attclass = document.createAttribute("class");
            attclass.value = "form-control";
            //lets attach the attributes to the DOM element in question
            tempp5.setAttributeNode(atttype);
            tempp5.setAttributeNode(attplaceholder);
            tempp5.setAttributeNode(attrequired);
            tempp5.setAttributeNode(attid);
            tempp5.setAttributeNode(attclass);          
            currentDiv.appendChild(tempp5);             

            //Landmark

            var tempp6 = document.createElement("input"); 
            //lets add the attributes.
            var atttype = document.createAttribute("type");
            atttype.value = "text";
            var attplaceholder = document.createAttribute("placeholder");
            attplaceholder.value = tempitem.Landmark;     
            var attrequired = document.createAttribute("required");
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid + "Landmark";
            var attclass = document.createAttribute("class");
            attclass.value = "form-control";
            //lets attach the attributes to the DOM element in question
            tempp6.setAttributeNode(atttype);
            tempp6.setAttributeNode(attplaceholder);
            tempp6.setAttributeNode(attrequired);
            tempp6.setAttributeNode(attid);
            tempp6.setAttributeNode(attclass);          
            currentDiv.appendChild(tempp6);            

            //AddressExtraNotes

            var tempp7 = document.createElement("input"); 
            //lets add the attributes.
            var atttype = document.createAttribute("type");
            atttype.value = "text";
            var attplaceholder = document.createAttribute("placeholder");
            attplaceholder.value = tempitem.AddressExtraNotes;     
            var attrequired = document.createAttribute("required");
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid + "AddressExtraNotes";
            var attclass = document.createAttribute("class");
            attclass.value = "form-control";
            //lets attach the attributes to the DOM element in question
            tempp7.setAttributeNode(atttype);
            tempp7.setAttributeNode(attplaceholder);
            tempp7.setAttributeNode(attrequired);
            tempp7.setAttributeNode(attid);
            tempp7.setAttributeNode(attclass);          
            currentDiv.appendChild(tempp7);              


            //we need a button to update.
            var tempbutton = document.createElement("button"); 
            //lets add the attributes.   
            var attclass = document.createAttribute("class");
            attclass.value = "btn btn-lg btn-primary btn-block";            
            //for the button I want to keep the GUID directly as the ID
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid;
            //want to display for the button as well.
            tempbutton.innerText = "update address"
            //lets attach the attributes to the DOM element in question
            tempbutton.setAttributeNode(attid);             
            tempbutton.setAttributeNode(attclass);              
            
            //lets setup the click function.
            tempbutton.addEventListener('click', function(){
                updateaddress();
            });            
            currentDiv.appendChild(tempbutton);             

            //add a divider line
            var temphr = document.createElement("hr");
            currentDiv.appendChild(temphr);
        }   
        

    }

    var currentDiveducationdisplay = document.getElementById("educationdisplay");

    //the new add option.
    //EducationTitle   
    var tempp = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "enter education title";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "EducationTitle";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp.setAttributeNode(atttype);
    tempp.setAttributeNode(attplaceholder);
    tempp.setAttributeNode(attrequired);
    tempp.setAttributeNode(attid);
    tempp.setAttributeNode(attclass);          
    currentDiveducationdisplay.appendChild(tempp); 

    //InstituationName

    var tempp2 = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "college/institute name";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "InstituationName";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp2.setAttributeNode(atttype);
    tempp2.setAttributeNode(attplaceholder);
    tempp2.setAttributeNode(attrequired);
    tempp2.setAttributeNode(attid);
    tempp2.setAttributeNode(attclass);          
    currentDiveducationdisplay.appendChild(tempp2); 

    //YearOfGraduation

    var tempp3 = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "year of graduation";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "YearOfGraduation";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp3.setAttributeNode(atttype);
    tempp3.setAttributeNode(attplaceholder);
    tempp3.setAttributeNode(attrequired);
    tempp3.setAttributeNode(attid);
    tempp3.setAttributeNode(attclass);          
    currentDiveducationdisplay.appendChild(tempp3);             

    //PassGrade

    var tempp4 = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "pass grade";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "PassGrade";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp4.setAttributeNode(atttype);
    tempp4.setAttributeNode(attplaceholder);
    tempp4.setAttributeNode(attrequired);
    tempp4.setAttributeNode(attid);
    tempp4.setAttributeNode(attclass);          
    currentDiveducationdisplay.appendChild(tempp4); 

    //EducationOtherNotes1

    var tempp5 = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "other notes";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "EducationOtherNotes1";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp5.setAttributeNode(atttype);
    tempp5.setAttributeNode(attplaceholder);
    tempp5.setAttributeNode(attrequired);
    tempp5.setAttributeNode(attid);
    tempp5.setAttributeNode(attclass);          
    currentDiveducationdisplay.appendChild(tempp5); 

    //EducationOtherNotes2

    var tempp6 = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "other notes";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "EducationOtherNotes2";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp6.setAttributeNode(atttype);
    tempp6.setAttributeNode(attplaceholder);
    tempp6.setAttributeNode(attrequired);
    tempp6.setAttributeNode(attid);
    tempp6.setAttributeNode(attclass);          
    currentDiveducationdisplay.appendChild(tempp6);            

    //we need a button to update.
    var tempbutton = document.createElement("button"); 
    //lets add the attributes.   
    var attclass = document.createAttribute("class");
    attclass.value = "btn btn-lg btn-primary btn-block";            
    //for the button I want to keep the GUID directly as the ID
    var attid = document.createAttribute("id");
    attid.value =  "newitem" + "EducationButton";
    //want to display for the button as well.
    tempbutton.innerText = "add education"
    //lets attach the attributes to the DOM element in question
    tempbutton.setAttributeNode(attid);             
    tempbutton.setAttributeNode(attclass);     
    
    //lets setup the click function.
    tempbutton.addEventListener('click', function(){
        addeducation();
    });            
    currentDiveducationdisplay.appendChild(tempbutton);                  

    if(result.EducationalDetailsSummary == true)
    {
        //if this is true, then items related to this topic are available
        //try and display them.
        var itemsarray = result.educationalDetailViewModels;
        //pick the div meant for this item
        var currentDiv = document.getElementById("educationdisplay");
        //start adding the elements.
        //add title.
        var titlep = document.createElement("p"); 
        titlep.innerText = "education";
        currentDiv.appendChild(titlep);
        //add the numbers from the collection.
        for(var i=0;i<itemsarray.length;i++)
        {
            var tempitem = itemsarray[i];

            //EducationTitle   
            var tempp = document.createElement("input"); 
            //lets add the attributes.
            var atttype = document.createAttribute("type");
            atttype.value = "text";
            var attplaceholder = document.createAttribute("placeholder");
            attplaceholder.value = tempitem.EducationTitle;     
            var attrequired = document.createAttribute("required");
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid + "EducationTitle";
            var attclass = document.createAttribute("class");
            attclass.value = "form-control";
            //lets attach the attributes to the DOM element in question
            tempp.setAttributeNode(atttype);
            tempp.setAttributeNode(attplaceholder);
            tempp.setAttributeNode(attrequired);
            tempp.setAttributeNode(attid);
            tempp.setAttributeNode(attclass);          
            currentDiv.appendChild(tempp); 

            //InstituationName

            var tempp2 = document.createElement("input"); 
            //lets add the attributes.
            var atttype = document.createAttribute("type");
            atttype.value = "text";
            var attplaceholder = document.createAttribute("placeholder");
            attplaceholder.value = tempitem.InstituationName;     
            var attrequired = document.createAttribute("required");
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid + "InstituationName";
            var attclass = document.createAttribute("class");
            attclass.value = "form-control";
            //lets attach the attributes to the DOM element in question
            tempp2.setAttributeNode(atttype);
            tempp2.setAttributeNode(attplaceholder);
            tempp2.setAttributeNode(attrequired);
            tempp2.setAttributeNode(attid);
            tempp2.setAttributeNode(attclass);          
            currentDiv.appendChild(tempp2); 

            //YearOfGraduation

            var tempp3 = document.createElement("input"); 
            //lets add the attributes.
            var atttype = document.createAttribute("type");
            atttype.value = "text";
            var attplaceholder = document.createAttribute("placeholder");
            attplaceholder.value = tempitem.YearOfGraduation;     
            var attrequired = document.createAttribute("required");
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid + "YearOfGraduation";
            var attclass = document.createAttribute("class");
            attclass.value = "form-control";
            //lets attach the attributes to the DOM element in question
            tempp3.setAttributeNode(atttype);
            tempp3.setAttributeNode(attplaceholder);
            tempp3.setAttributeNode(attrequired);
            tempp3.setAttributeNode(attid);
            tempp3.setAttributeNode(attclass);          
            currentDiv.appendChild(tempp3);             

            //PassGrade

            var tempp4 = document.createElement("input"); 
            //lets add the attributes.
            var atttype = document.createAttribute("type");
            atttype.value = "text";
            var attplaceholder = document.createAttribute("placeholder");
            attplaceholder.value = tempitem.PassGrade;     
            var attrequired = document.createAttribute("required");
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid + "PassGrade";
            var attclass = document.createAttribute("class");
            attclass.value = "form-control";
            //lets attach the attributes to the DOM element in question
            tempp4.setAttributeNode(atttype);
            tempp4.setAttributeNode(attplaceholder);
            tempp4.setAttributeNode(attrequired);
            tempp4.setAttributeNode(attid);
            tempp4.setAttributeNode(attclass);          
            currentDiv.appendChild(tempp4); 

            //EducationOtherNotes1

            var tempp5 = document.createElement("input"); 
            //lets add the attributes.
            var atttype = document.createAttribute("type");
            atttype.value = "text";
            var attplaceholder = document.createAttribute("placeholder");
            attplaceholder.value = tempitem.EducationOtherNotes1;     
            var attrequired = document.createAttribute("required");
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid + "EducationOtherNotes1";
            var attclass = document.createAttribute("class");
            attclass.value = "form-control";
            //lets attach the attributes to the DOM element in question
            tempp5.setAttributeNode(atttype);
            tempp5.setAttributeNode(attplaceholder);
            tempp5.setAttributeNode(attrequired);
            tempp5.setAttributeNode(attid);
            tempp5.setAttributeNode(attclass);          
            currentDiv.appendChild(tempp5); 

            //EducationOtherNotes2

            var tempp6 = document.createElement("input"); 
            //lets add the attributes.
            var atttype = document.createAttribute("type");
            atttype.value = "text";
            var attplaceholder = document.createAttribute("placeholder");
            attplaceholder.value = tempitem.EducationOtherNotes2;     
            var attrequired = document.createAttribute("required");
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid + "EducationOtherNotes2";
            var attclass = document.createAttribute("class");
            attclass.value = "form-control";
            //lets attach the attributes to the DOM element in question
            tempp6.setAttributeNode(atttype);
            tempp6.setAttributeNode(attplaceholder);
            tempp6.setAttributeNode(attrequired);
            tempp6.setAttributeNode(attid);
            tempp6.setAttributeNode(attclass);          
            currentDiv.appendChild(tempp6);            

            //we need a button to update.
            var tempbutton = document.createElement("button"); 
            //lets add the attributes.   
            var attclass = document.createAttribute("class");
            attclass.value = "btn btn-lg btn-primary btn-block";            
            //for the button I want to keep the GUID directly as the ID
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid;
            //want to display for the button as well.
            tempbutton.innerText = "update education"
            //lets attach the attributes to the DOM element in question
            tempbutton.setAttributeNode(attid);             
            tempbutton.setAttributeNode(attclass);              
            
            //lets setup the click function.
            tempbutton.addEventListener('click', function(){
                updateeducation();
            });            
            currentDiv.appendChild(tempbutton);             

            //add a divider line
            var temphr = document.createElement("hr");
            currentDiv.appendChild(temphr);
        }
        
    } 

    var currentDivskilldisplay = document.getElementById("skilldisplay");    

    //add new item
    var tempp = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "add new skill";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "SkillTitle";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp.setAttributeNode(atttype);
    tempp.setAttributeNode(attplaceholder);
    tempp.setAttributeNode(attrequired);
    tempp.setAttributeNode(attid);
    tempp.setAttributeNode(attclass);          
    currentDivskilldisplay.appendChild(tempp);             

    //SkillDescription

    var tempp = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "describe the skill";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "SkillDescription";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp.setAttributeNode(atttype);
    tempp.setAttributeNode(attplaceholder);
    tempp.setAttributeNode(attrequired);
    tempp.setAttributeNode(attid);
    tempp.setAttributeNode(attclass);          
    currentDivskilldisplay.appendChild(tempp);             

    //SkillExperience

    var tempp = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "skill experience";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "SkillExperience";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp.setAttributeNode(atttype);
    tempp.setAttributeNode(attplaceholder);
    tempp.setAttributeNode(attrequired);
    tempp.setAttributeNode(attid);
    tempp.setAttributeNode(attclass);          
    currentDivskilldisplay.appendChild(tempp);             

    //SkillOtherNotes1

    var tempp = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "other notes";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "SkillOtherNotes1";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp.setAttributeNode(atttype);
    tempp.setAttributeNode(attplaceholder);
    tempp.setAttributeNode(attrequired);
    tempp.setAttributeNode(attid);
    tempp.setAttributeNode(attclass);          
    currentDivskilldisplay.appendChild(tempp);             

    //SkillOtherNotes2

    var tempp = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "other notes";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "SkillOtherNotes2";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp.setAttributeNode(atttype);
    tempp.setAttributeNode(attplaceholder);
    tempp.setAttributeNode(attrequired);
    tempp.setAttributeNode(attid);
    tempp.setAttributeNode(attclass);          
    currentDivskilldisplay.appendChild(tempp);
    
    var tempbutton = document.createElement("button"); 
    //lets add the attributes.   
    var attclass = document.createAttribute("class");
    attclass.value = "btn btn-lg btn-primary btn-block";            
    //for the button I want to keep the GUID directly as the ID
    var attid = document.createAttribute("id");
    attid.value =  "newitem" + "SkillButton";
    //want to display for the button as well.
    tempbutton.innerText = "add skills"
    //lets attach the attributes to the DOM element in question
    tempbutton.setAttributeNode(attid);             
    tempbutton.setAttributeNode(attclass);     
    
    //lets setup the click function.
    tempbutton.addEventListener('click', function(){
        addskill();
    });            
    currentDivskilldisplay.appendChild(tempbutton);        
    
    if(result.SkillsSummary == true)
    {
        //if this is true, then items related to this topic are available
        //try and display them.
        var itemsarray = result.skillsTableViewModels;
        //pick the div meant for this item
        var currentDiv = document.getElementById("skilldisplay");
        //start adding the elements.
        //add title.
        var titlep = document.createElement("p"); 
        titlep.innerText = "skills";
        currentDiv.appendChild(titlep);
        //add the numbers from the collection.
        for(var i=0;i<itemsarray.length;i++)
        {
            var tempitem = itemsarray[i];
            
            //SkillTitle

            var tempp = document.createElement("input"); 
            //lets add the attributes.
            var atttype = document.createAttribute("type");
            atttype.value = "text";
            var attplaceholder = document.createAttribute("placeholder");
            attplaceholder.value = tempitem.SkillTitle;     
            var attrequired = document.createAttribute("required");
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid + "SkillTitle";
            var attclass = document.createAttribute("class");
            attclass.value = "form-control";
            //lets attach the attributes to the DOM element in question
            tempp.setAttributeNode(atttype);
            tempp.setAttributeNode(attplaceholder);
            tempp.setAttributeNode(attrequired);
            tempp.setAttributeNode(attid);
            tempp.setAttributeNode(attclass);          
            currentDiv.appendChild(tempp);             

            //SkillDescription

            var tempp = document.createElement("input"); 
            //lets add the attributes.
            var atttype = document.createAttribute("type");
            atttype.value = "text";
            var attplaceholder = document.createAttribute("placeholder");
            attplaceholder.value = tempitem.SkillDescription;     
            var attrequired = document.createAttribute("required");
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid + "SkillDescription";
            var attclass = document.createAttribute("class");
            attclass.value = "form-control";
            //lets attach the attributes to the DOM element in question
            tempp.setAttributeNode(atttype);
            tempp.setAttributeNode(attplaceholder);
            tempp.setAttributeNode(attrequired);
            tempp.setAttributeNode(attid);
            tempp.setAttributeNode(attclass);          
            currentDiv.appendChild(tempp);             

            //SkillExperience

            var tempp = document.createElement("input"); 
            //lets add the attributes.
            var atttype = document.createAttribute("type");
            atttype.value = "text";
            var attplaceholder = document.createAttribute("placeholder");
            attplaceholder.value = tempitem.SkillExperience;     
            var attrequired = document.createAttribute("required");
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid + "SkillExperience";
            var attclass = document.createAttribute("class");
            attclass.value = "form-control";
            //lets attach the attributes to the DOM element in question
            tempp.setAttributeNode(atttype);
            tempp.setAttributeNode(attplaceholder);
            tempp.setAttributeNode(attrequired);
            tempp.setAttributeNode(attid);
            tempp.setAttributeNode(attclass);          
            currentDiv.appendChild(tempp);             

            //SkillOtherNotes1

            var tempp = document.createElement("input"); 
            //lets add the attributes.
            var atttype = document.createAttribute("type");
            atttype.value = "text";
            var attplaceholder = document.createAttribute("placeholder");
            attplaceholder.value = tempitem.SkillOtherNotes1;     
            var attrequired = document.createAttribute("required");
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid + "SkillOtherNotes1";
            var attclass = document.createAttribute("class");
            attclass.value = "form-control";
            //lets attach the attributes to the DOM element in question
            tempp.setAttributeNode(atttype);
            tempp.setAttributeNode(attplaceholder);
            tempp.setAttributeNode(attrequired);
            tempp.setAttributeNode(attid);
            tempp.setAttributeNode(attclass);          
            currentDiv.appendChild(tempp);             

            //SkillOtherNotes2

            var tempp = document.createElement("input"); 
            //lets add the attributes.
            var atttype = document.createAttribute("type");
            atttype.value = "text";
            var attplaceholder = document.createAttribute("placeholder");
            attplaceholder.value = tempitem.SkillOtherNotes2;     
            var attrequired = document.createAttribute("required");
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid + "SkillOtherNotes2";
            var attclass = document.createAttribute("class");
            attclass.value = "form-control";
            //lets attach the attributes to the DOM element in question
            tempp.setAttributeNode(atttype);
            tempp.setAttributeNode(attplaceholder);
            tempp.setAttributeNode(attrequired);
            tempp.setAttributeNode(attid);
            tempp.setAttributeNode(attclass);          
            currentDiv.appendChild(tempp);        
            
            //we need a button to update.
            var tempbutton = document.createElement("button"); 
            //lets add the attributes.   
            var attclass = document.createAttribute("class");
            attclass.value = "btn btn-lg btn-primary btn-block";            
            //for the button I want to keep the GUID directly as the ID
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid;
            //want to display for the button as well.
            tempbutton.innerText = "update skills"
            //lets attach the attributes to the DOM element in question
            tempbutton.setAttributeNode(attid);             
            tempbutton.setAttributeNode(attclass);              
            
            //lets setup the click function.
            tempbutton.addEventListener('click', function(){
                updateskill();
            });            
            currentDiv.appendChild(tempbutton);             

            //add a divider line
            var temphr = document.createElement("hr");
            currentDiv.appendChild(temphr);            
        }
    }   
    
    var currentDivprojectdisplay = document.getElementById("projectdisplay");

    //add stuff

    //ProjectTitle

    var tempp = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "enter project title";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "ProjectTitle";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp.setAttributeNode(atttype);
    tempp.setAttributeNode(attplaceholder);
    tempp.setAttributeNode(attrequired);
    tempp.setAttributeNode(attid);
    tempp.setAttributeNode(attclass);          
    currentDivprojectdisplay.appendChild(tempp);            

    //ProjectDescription

    var tempp = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "enter project description";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "ProjectDescription";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp.setAttributeNode(atttype);
    tempp.setAttributeNode(attplaceholder);
    tempp.setAttributeNode(attrequired);
    tempp.setAttributeNode(attid);
    tempp.setAttributeNode(attclass);          
    currentDivprojectdisplay.appendChild(tempp);            

    //YearOfProject

    var tempp = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "enter project year";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "YearOfProject";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp.setAttributeNode(atttype);
    tempp.setAttributeNode(attplaceholder);
    tempp.setAttributeNode(attrequired);
    tempp.setAttributeNode(attid);
    tempp.setAttributeNode(attclass);          
    currentDivprojectdisplay.appendChild(tempp);            

    //ProjectNotes1

    var tempp = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "enter project details";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "ProjectNotes1";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp.setAttributeNode(atttype);
    tempp.setAttributeNode(attplaceholder);
    tempp.setAttributeNode(attrequired);
    tempp.setAttributeNode(attid);
    tempp.setAttributeNode(attclass);          
    currentDivprojectdisplay.appendChild(tempp);            

    //ProjectNotes2

    var tempp = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "enter project details";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "ProjectNotes2";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp.setAttributeNode(atttype);
    tempp.setAttributeNode(attplaceholder);
    tempp.setAttributeNode(attrequired);
    tempp.setAttributeNode(attid);
    tempp.setAttributeNode(attclass);          
    currentDivprojectdisplay.appendChild(tempp);             

    var tempbutton = document.createElement("button"); 
    //lets add the attributes.   
    var attclass = document.createAttribute("class");
    attclass.value = "btn btn-lg btn-primary btn-block";            
    //for the button I want to keep the GUID directly as the ID
    var attid = document.createAttribute("id");
    attid.value =  "newitem" + "SkillButton";
    //want to display for the button as well.
    tempbutton.innerText = "add project details"
    //lets attach the attributes to the DOM element in question
    tempbutton.setAttributeNode(attid);             
    tempbutton.setAttributeNode(attclass);     
    
    //lets setup the click function.
    tempbutton.addEventListener('click', function(){
        addproject();
    });            
    currentDivprojectdisplay.appendChild(tempbutton);         

    if(result.ProjectDetails == true)
    {
        //if this is true, then items related to this topic are available
        //try and display them.
        var itemsarray = result.projectDetailViewModels;
        //pick the div meant for this item
        var currentDiv = document.getElementById("projectdisplay");
        //start adding the elements.
        //add title.
        var titlep = document.createElement("p"); 
        titlep.innerText = "project experience";
        currentDiv.appendChild(titlep);
        //add the numbers from the collection.
        for(var i=0;i<itemsarray.length;i++)
        {
            var tempitem = itemsarray[i];

            //ProjectTitle

            var tempp = document.createElement("input"); 
            //lets add the attributes.
            var atttype = document.createAttribute("type");
            atttype.value = "text";
            var attplaceholder = document.createAttribute("placeholder");
            attplaceholder.value = tempitem.ProjectTitle;     
            var attrequired = document.createAttribute("required");
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid + "ProjectTitle";
            var attclass = document.createAttribute("class");
            attclass.value = "form-control";
            //lets attach the attributes to the DOM element in question
            tempp.setAttributeNode(atttype);
            tempp.setAttributeNode(attplaceholder);
            tempp.setAttributeNode(attrequired);
            tempp.setAttributeNode(attid);
            tempp.setAttributeNode(attclass);          
            currentDiv.appendChild(tempp);            

            //ProjectDescription

            var tempp = document.createElement("input"); 
            //lets add the attributes.
            var atttype = document.createAttribute("type");
            atttype.value = "text";
            var attplaceholder = document.createAttribute("placeholder");
            attplaceholder.value = tempitem.ProjectDescription;     
            var attrequired = document.createAttribute("required");
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid + "ProjectDescription";
            var attclass = document.createAttribute("class");
            attclass.value = "form-control";
            //lets attach the attributes to the DOM element in question
            tempp.setAttributeNode(atttype);
            tempp.setAttributeNode(attplaceholder);
            tempp.setAttributeNode(attrequired);
            tempp.setAttributeNode(attid);
            tempp.setAttributeNode(attclass);          
            currentDiv.appendChild(tempp);            

            //YearOfProject

            var tempp = document.createElement("input"); 
            //lets add the attributes.
            var atttype = document.createAttribute("type");
            atttype.value = "text";
            var attplaceholder = document.createAttribute("placeholder");
            attplaceholder.value = tempitem.YearOfProject;     
            var attrequired = document.createAttribute("required");
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid + "YearOfProject";
            var attclass = document.createAttribute("class");
            attclass.value = "form-control";
            //lets attach the attributes to the DOM element in question
            tempp.setAttributeNode(atttype);
            tempp.setAttributeNode(attplaceholder);
            tempp.setAttributeNode(attrequired);
            tempp.setAttributeNode(attid);
            tempp.setAttributeNode(attclass);          
            currentDiv.appendChild(tempp);            

            //ProjectNotes1

            var tempp = document.createElement("input"); 
            //lets add the attributes.
            var atttype = document.createAttribute("type");
            atttype.value = "text";
            var attplaceholder = document.createAttribute("placeholder");
            attplaceholder.value = tempitem.ProjectNotes1;     
            var attrequired = document.createAttribute("required");
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid + "ProjectNotes1";
            var attclass = document.createAttribute("class");
            attclass.value = "form-control";
            //lets attach the attributes to the DOM element in question
            tempp.setAttributeNode(atttype);
            tempp.setAttributeNode(attplaceholder);
            tempp.setAttributeNode(attrequired);
            tempp.setAttributeNode(attid);
            tempp.setAttributeNode(attclass);          
            currentDiv.appendChild(tempp);            

            //ProjectNotes2

            var tempp = document.createElement("input"); 
            //lets add the attributes.
            var atttype = document.createAttribute("type");
            atttype.value = "text";
            var attplaceholder = document.createAttribute("placeholder");
            attplaceholder.value = tempitem.ProjectNotes2;     
            var attrequired = document.createAttribute("required");
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid + "ProjectNotes2";
            var attclass = document.createAttribute("class");
            attclass.value = "form-control";
            //lets attach the attributes to the DOM element in question
            tempp.setAttributeNode(atttype);
            tempp.setAttributeNode(attplaceholder);
            tempp.setAttributeNode(attrequired);
            tempp.setAttributeNode(attid);
            tempp.setAttributeNode(attclass);          
            currentDiv.appendChild(tempp);     
            
            //we need a button to update.
            var tempbutton = document.createElement("button"); 
            //lets add the attributes.   
            var attclass = document.createAttribute("class");
            attclass.value = "btn btn-lg btn-primary btn-block";            
            //for the button I want to keep the GUID directly as the ID
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid;
            //want to display for the button as well.
            tempbutton.innerText = "update project details"
            //lets attach the attributes to the DOM element in question
            tempbutton.setAttributeNode(attid);             
            tempbutton.setAttributeNode(attclass);              
            
            //lets setup the click function.
            tempbutton.addEventListener('click', function(){
                updateproject();
            });            
            currentDiv.appendChild(tempbutton);             

            //add a divider line
            var temphr = document.createElement("hr");
            currentDiv.appendChild(temphr);             
        }
    }  

    var currentDivextracurriculardisplay = document.getElementById("extracurriculardisplay");   
    
    //add stuff

    //ExtraCurricularOtherNotes1
    var tempp = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "enter extra curricular details";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "ExtraCurricularOtherNotes1";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp.setAttributeNode(atttype);
    tempp.setAttributeNode(attplaceholder);
    tempp.setAttributeNode(attrequired);
    tempp.setAttributeNode(attid);
    tempp.setAttributeNode(attclass);          
    currentDivextracurriculardisplay.appendChild(tempp);            

    //ExtraCurricularNotes2

    var tempp = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "enter extra curricular details";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "ExtraCurricularNotes2";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp.setAttributeNode(atttype);
    tempp.setAttributeNode(attplaceholder);
    tempp.setAttributeNode(attrequired);
    tempp.setAttributeNode(attid);
    tempp.setAttributeNode(attclass);          
    currentDivextracurriculardisplay.appendChild(tempp);              

    var tempbutton = document.createElement("button"); 
    //lets add the attributes.   
    var attclass = document.createAttribute("class");
    attclass.value = "btn btn-lg btn-primary btn-block";            
    //for the button I want to keep the GUID directly as the ID
    var attid = document.createAttribute("id");
    attid.value =  "newitem" + "SkillButton";
    //want to display for the button as well.
    tempbutton.innerText = "add extra curricurals"
    //lets attach the attributes to the DOM element in question
    tempbutton.setAttributeNode(attid);             
    tempbutton.setAttributeNode(attclass);     
    
    //lets setup the click function.
    tempbutton.addEventListener('click', function(){
        addextracurricural();
    });            
    currentDivextracurriculardisplay.appendChild(tempbutton);             
    
    if(result.ExtraCurricularActivitiesSummary == true)
    {
        //if this is true, then items related to this topic are available
        //try and display them.
        var itemsarray = result.extraCurricularViewModels;
        //pick the div meant for this item
        var currentDiv = document.getElementById("extracurriculardisplay");
        //start adding the elements.
        //add title.
        var titlep = document.createElement("p"); 
        titlep.innerText = "extra curriculars";
        currentDiv.appendChild(titlep);
        //add the numbers from the collection.
        for(var i=0;i<itemsarray.length;i++)
        {
            var tempitem = itemsarray[i];

            //ExtraCurricularOtherNotes1
            var tempp = document.createElement("input"); 
            //lets add the attributes.
            var atttype = document.createAttribute("type");
            atttype.value = "text";
            var attplaceholder = document.createAttribute("placeholder");
            attplaceholder.value = tempitem.ExtraCurricularOtherNotes1;     
            var attrequired = document.createAttribute("required");
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid + "ExtraCurricularOtherNotes1";
            var attclass = document.createAttribute("class");
            attclass.value = "form-control";
            //lets attach the attributes to the DOM element in question
            tempp.setAttributeNode(atttype);
            tempp.setAttributeNode(attplaceholder);
            tempp.setAttributeNode(attrequired);
            tempp.setAttributeNode(attid);
            tempp.setAttributeNode(attclass);          
            currentDiv.appendChild(tempp);            

            //ExtraCurricularNotes2

            var tempp = document.createElement("input"); 
            //lets add the attributes.
            var atttype = document.createAttribute("type");
            atttype.value = "text";
            var attplaceholder = document.createAttribute("placeholder");
            attplaceholder.value = tempitem.ExtraCurricularNotes2;     
            var attrequired = document.createAttribute("required");
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid + "ExtraCurricularNotes2";
            var attclass = document.createAttribute("class");
            attclass.value = "form-control";
            //lets attach the attributes to the DOM element in question
            tempp.setAttributeNode(atttype);
            tempp.setAttributeNode(attplaceholder);
            tempp.setAttributeNode(attrequired);
            tempp.setAttributeNode(attid);
            tempp.setAttributeNode(attclass);          
            currentDiv.appendChild(tempp);      
            
            //we need a button to update.
            var tempbutton = document.createElement("button"); 
            //lets add the attributes.   
            var attclass = document.createAttribute("class");
            attclass.value = "btn btn-lg btn-primary btn-block";            
            //for the button I want to keep the GUID directly as the ID
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid;
            //want to display for the button as well.
            tempbutton.innerText = "update extra curricurals"
            //lets attach the attributes to the DOM element in question
            tempbutton.setAttributeNode(attid);             
            tempbutton.setAttributeNode(attclass);              
            
            //lets setup the click function.
            tempbutton.addEventListener('click', function(){
                updateextracurricural();
            });            
            currentDiv.appendChild(tempbutton);             

            //add a divider line
            var temphr = document.createElement("hr");
            currentDiv.appendChild(temphr);             
        }
    }    

    var currentDivotherstuffdisplay = document.getElementById("otherstuffdisplay");

    //add stuff

    //OtherStuffNotes1

    var tempp = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "enter other notes";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "OtherStuffNotes1";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp.setAttributeNode(atttype);
    tempp.setAttributeNode(attplaceholder);
    tempp.setAttributeNode(attrequired);
    tempp.setAttributeNode(attid);
    tempp.setAttributeNode(attclass);          
    currentDivotherstuffdisplay.appendChild(tempp);            

    //OtherStuffNotes2

    var tempp = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "enter other notes";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "OtherStuffNotes2";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp.setAttributeNode(atttype);
    tempp.setAttributeNode(attplaceholder);
    tempp.setAttributeNode(attrequired);
    tempp.setAttributeNode(attid);
    tempp.setAttributeNode(attclass);          
    currentDivotherstuffdisplay.appendChild(tempp);            

    //OtherStuffNotes3

    var tempp = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "enter other notes";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "OtherStuffNotes3";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp.setAttributeNode(atttype);
    tempp.setAttributeNode(attplaceholder);
    tempp.setAttributeNode(attrequired);
    tempp.setAttributeNode(attid);
    tempp.setAttributeNode(attclass);          
    currentDivotherstuffdisplay.appendChild(tempp);            

    //OtherStuffNotes4

    var tempp = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "enter other notes";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem" + "OtherStuffNotes4";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp.setAttributeNode(atttype);
    tempp.setAttributeNode(attplaceholder);
    tempp.setAttributeNode(attrequired);
    tempp.setAttributeNode(attid);
    tempp.setAttributeNode(attclass);          
    currentDivotherstuffdisplay.appendChild(tempp);            

    //OtherStuffNotes5

    var tempp = document.createElement("input"); 
    //lets add the attributes.
    var atttype = document.createAttribute("type");
    atttype.value = "text";
    var attplaceholder = document.createAttribute("placeholder");
    attplaceholder.value = "enter other notes";     
    var attrequired = document.createAttribute("required");
    var attid = document.createAttribute("id");
    attid.value = "newitem"+ "OtherStuffNotes5";
    var attclass = document.createAttribute("class");
    attclass.value = "form-control";
    //lets attach the attributes to the DOM element in question
    tempp.setAttributeNode(atttype);
    tempp.setAttributeNode(attplaceholder);
    tempp.setAttributeNode(attrequired);
    tempp.setAttributeNode(attid);
    tempp.setAttributeNode(attclass);          
    currentDivotherstuffdisplay.appendChild(tempp);          

    var tempbutton = document.createElement("button"); 
    //lets add the attributes.   
    var attclass = document.createAttribute("class");
    attclass.value = "btn btn-lg btn-primary btn-block";            
    //for the button I want to keep the GUID directly as the ID
    var attid = document.createAttribute("id");
    attid.value =  "newitem" + "SkillButton";
    //want to display for the button as well.
    tempbutton.innerText = "add other notes"
    //lets attach the attributes to the DOM element in question
    tempbutton.setAttributeNode(attid);             
    tempbutton.setAttributeNode(attclass);     
    
    //lets setup the click function.
    tempbutton.addEventListener('click', function(){
        addothernote();
    });            
    currentDivotherstuffdisplay.appendChild(tempbutton);             

    if(result.GetOtherStuff == true)
    {
        //if this is true, then items related to this topic are available
        //try and display them.
        var itemsarray = result.otherStuffViewModels;
        //pick the div meant for this item
        var currentDiv = document.getElementById("otherstuffdisplay");
        //start adding the elements.
        //add title.
        var titlep = document.createElement("p"); 
        titlep.innerText = "other notes";
        currentDiv.appendChild(titlep);
        //add the numbers from the collection.
        for(var i=0;i<itemsarray.length;i++)
        {
            var tempitem = itemsarray[i];

            //OtherStuffNotes1

            var tempp = document.createElement("input"); 
            //lets add the attributes.
            var atttype = document.createAttribute("type");
            atttype.value = "text";
            var attplaceholder = document.createAttribute("placeholder");
            attplaceholder.value = tempitem.OtherStuffNotes1;     
            var attrequired = document.createAttribute("required");
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid + "OtherStuffNotes1";
            var attclass = document.createAttribute("class");
            attclass.value = "form-control";
            //lets attach the attributes to the DOM element in question
            tempp.setAttributeNode(atttype);
            tempp.setAttributeNode(attplaceholder);
            tempp.setAttributeNode(attrequired);
            tempp.setAttributeNode(attid);
            tempp.setAttributeNode(attclass);          
            currentDiv.appendChild(tempp);            

            //OtherStuffNotes2

            var tempp = document.createElement("input"); 
            //lets add the attributes.
            var atttype = document.createAttribute("type");
            atttype.value = "text";
            var attplaceholder = document.createAttribute("placeholder");
            attplaceholder.value = tempitem.OtherStuffNotes2;     
            var attrequired = document.createAttribute("required");
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid + "OtherStuffNotes2";
            var attclass = document.createAttribute("class");
            attclass.value = "form-control";
            //lets attach the attributes to the DOM element in question
            tempp.setAttributeNode(atttype);
            tempp.setAttributeNode(attplaceholder);
            tempp.setAttributeNode(attrequired);
            tempp.setAttributeNode(attid);
            tempp.setAttributeNode(attclass);          
            currentDiv.appendChild(tempp);            

            //OtherStuffNotes3

            var tempp = document.createElement("input"); 
            //lets add the attributes.
            var atttype = document.createAttribute("type");
            atttype.value = "text";
            var attplaceholder = document.createAttribute("placeholder");
            attplaceholder.value = tempitem.OtherStuffNotes3;     
            var attrequired = document.createAttribute("required");
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid + "OtherStuffNotes3";
            var attclass = document.createAttribute("class");
            attclass.value = "form-control";
            //lets attach the attributes to the DOM element in question
            tempp.setAttributeNode(atttype);
            tempp.setAttributeNode(attplaceholder);
            tempp.setAttributeNode(attrequired);
            tempp.setAttributeNode(attid);
            tempp.setAttributeNode(attclass);          
            currentDiv.appendChild(tempp);            

            //OtherStuffNotes4

            var tempp = document.createElement("input"); 
            //lets add the attributes.
            var atttype = document.createAttribute("type");
            atttype.value = "text";
            var attplaceholder = document.createAttribute("placeholder");
            attplaceholder.value = tempitem.OtherStuffNotes4;     
            var attrequired = document.createAttribute("required");
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid + "OtherStuffNotes4";
            var attclass = document.createAttribute("class");
            attclass.value = "form-control";
            //lets attach the attributes to the DOM element in question
            tempp.setAttributeNode(atttype);
            tempp.setAttributeNode(attplaceholder);
            tempp.setAttributeNode(attrequired);
            tempp.setAttributeNode(attid);
            tempp.setAttributeNode(attclass);          
            currentDiv.appendChild(tempp);            

            //OtherStuffNotes5

            var tempp = document.createElement("input"); 
            //lets add the attributes.
            var atttype = document.createAttribute("type");
            atttype.value = "text";
            var attplaceholder = document.createAttribute("placeholder");
            attplaceholder.value = tempitem.OtherStuffNotes5;     
            var attrequired = document.createAttribute("required");
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid + "OtherStuffNotes5";
            var attclass = document.createAttribute("class");
            attclass.value = "form-control";
            //lets attach the attributes to the DOM element in question
            tempp.setAttributeNode(atttype);
            tempp.setAttributeNode(attplaceholder);
            tempp.setAttributeNode(attrequired);
            tempp.setAttributeNode(attid);
            tempp.setAttributeNode(attclass);          
            currentDiv.appendChild(tempp);  
            
            //we need a button to update.
            var tempbutton = document.createElement("button"); 
            //lets add the attributes.   
            var attclass = document.createAttribute("class");
            attclass.value = "btn btn-lg btn-primary btn-block";            
            //for the button I want to keep the GUID directly as the ID
            var attid = document.createAttribute("id");
            attid.value = tempitem.UniqueGuid;
            //want to display for the button as well.
            tempbutton.innerText = "update other notes"
            //lets attach the attributes to the DOM element in question
            tempbutton.setAttributeNode(attid);             
            tempbutton.setAttributeNode(attclass);              
            
            //lets setup the click function.
            tempbutton.addEventListener('click', function(){
                updateothernote();
            });            
            currentDiv.appendChild(tempbutton);             

            //add a divider line
            var temphr = document.createElement("hr");
            currentDiv.appendChild(temphr);             
        }
    }        
    
    hidetheloading();
    var logcloser="----leaving displaytheresumewitheditboxes----";
    console.log(logcloser);
}

//-----------------------------------------------
//for the phone number update related stuff
//-----------------------------------------------

function updatephonenumber()
{
    var logopener="----entering updatephonenumber----";
    console.log(logopener);

    //lets get the id. 
    console.log("UniqueGuid is " + event.target.id);

    //we have the id. now, we need to do a post call to update it. 
    var tempbutton = event.target;

    apiworkphonenumberupdate(tempbutton);
    
    var logcloser="----leaving updatephonenumber----";
    console.log(logcloser);
}

//take the unique id
//collect the information in the input boxes
//make the post call to perform the udpate
//do a get call and get the latest information.
//update the display aka the placeholders with the new information
async function apiworkphonenumberupdate(tempbutton)
{
    var logopener="----entering apiworkphonenumberupdate----";
    console.log(logopener);

    tempbutton.innerText = "updating..."
    //lets get the entered values.
    var tempinputbox1 = document.getElementById(tempbutton.id+"PhoneNumber");
    var tempenteredvalue1 = tempinputbox1.value;

    var POSTbody = new Object();
    POSTbody.PhoneNumber = tempenteredvalue1;
    POSTbody.CountryCode = true;
    POSTbody.UniqueGuid = tempbutton.id;

    var POSTbodyinJSON = JSON.stringify(POSTbody);   

    var baseUrl = returnCurrentBaseURL();
    var endPoint = "api/UserandResume/UpdatePhoneNumber";
    var fullUrl = baseUrl + endPoint;
    var getCurrentToken = getToken();

    const response = await fetch(fullUrl,
        {
            method: 'POST',
            body: POSTbodyinJSON,
            headers:
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+getCurrentToken
            }
        }
        );    

    if(response.status == 400)
    {
        console.log("unknown error - " + response.status);        
    }        
    else if(response.status == 200)
    {
        var responsejson = response.json();
        responsejson.then(
            function(result)
            {
                console.log(result);
                tempbutton.value="";
                // tempinputbox.setAttributeNode("placeholder",tempenteredvalue1);
                tempinputbox.setAttribute("placeholder",tempenteredvalue1);
                tempinputbox.value = "";
                tempbutton.innerText = "update phone number";
            },
            function(error)
            {
                console.log(error);
                tempbutton.value="";
                tempbutton.setAttributeNode("placeholder",tempenteredvalue1);
                tempbutton.innerText = "try again";
            }
        );
    }
    else
    {
        console.log("unknown error - " + response.status);        
    }

    var logcloser="----leaving apiworkphonenumberupdate----";
    console.log(logcloser);
}

async function addphonenumber()
{
    var logopener="----entering addphonenumber----";
    console.log(logopener);

    var tempbutton = event.target;

    tempbutton.innerText = "adding..."
    //lets get the entered values.
    var tempinputbox1 = document.getElementById("newitem" + "PhoneNumber");
    var tempenteredvalue1 = tempinputbox1.value;

    var POSTbody = new Object();
    POSTbody.PhoneNumber = tempenteredvalue1;
    POSTbody.CountryCode = true;
    POSTbody.UniqueGuid = "emptyonpurpose";

    var POSTbodyinJSON = JSON.stringify(POSTbody);   

    var baseUrl = returnCurrentBaseURL();
    var endPoint = "api/UserandResume/AddPhoneNumber";
    var fullUrl = baseUrl + endPoint;
    var getCurrentToken = getToken();

    const response = await fetch(fullUrl,
        {
            method: 'POST',
            body: POSTbodyinJSON,
            headers:
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+getCurrentToken
            }
        }
        );    

    if(response.status == 400)
    {
        console.log("unknown error - " + response.status);        
    }        
    else if(response.status == 200)
    {
        var responsejson = response.json();
        responsejson.then(
            function(result)
            {
                console.log(result);
                //TODO011  - I am doing a full page reload here.
                //we should reload just the section in question.
                location.reload();
            },
            function(error)
            {
                console.log(error);
                tempbutton.innerText = "try again";
            }
        );
    }
    else
    {
        console.log("unknown error - " + response.status);        
    }

    var logcloser="----leaving addphonenumber----";
    console.log(logcloser);
}

//-----------------------------------------------
//for the address update related stuff
//-----------------------------------------------

function updateaddress()
{
    var logopener="----entering updateaddress----";
    console.log(logopener);

    //lets get the id. 
    console.log("UniqueGuid is " + event.target.id);

    //we have the id. now, we need to do a post call to update it. 
    var tempbutton = event.target;

    apiworkaddressupdate(tempbutton);
    
    var logcloser="----leaving updateaddress----";
    console.log(logcloser);
}

//take the unique id
//collect the information in the input boxes
//make the post call to perform the udpate
//do a get call and get the latest information.
//update the display aka the placeholders with the new information
async function apiworkaddressupdate(tempbutton)
{
    var logopener="----entering apiworkaddressupdate----";
    console.log(logopener);

    tempbutton.innerText = "updating..."
    //lets get the entered values.
    var tempinputbox1 = document.getElementById(tempbutton.id+"AddressLineOne");
    var tempenteredvalue1 = tempinputbox1.value;
    var tempinputbox2 = document.getElementById(tempbutton.id+"AddressLineTwo");
    var tempenteredvalue2 = tempinputbox2.value;
    var tempinputbox3 = document.getElementById(tempbutton.id+"City");
    var tempenteredvalue3 = tempinputbox3.value;
    var tempinputbox4 = document.getElementById(tempbutton.id+"State");
    var tempenteredvalue4 = tempinputbox4.value;
    var tempinputbox5 = document.getElementById(tempbutton.id+"Pincode");
    var tempenteredvalue5 = tempinputbox5.value;
    var tempinputbox6 = document.getElementById(tempbutton.id+"Landmark");
    var tempenteredvalue6 = tempinputbox6.value;
    var tempinputbox7 = document.getElementById(tempbutton.id+"AddressExtraNotes");
    var tempenteredvalue7 = tempinputbox7.value;

    var POSTbody = new Object();
    POSTbody.AddressLineOne = tempenteredvalue1;
    POSTbody.AddressLineTwo = tempenteredvalue2;
    POSTbody.City = tempenteredvalue3;
    POSTbody.State = tempenteredvalue4;
    POSTbody.Pincode = tempenteredvalue5;
    POSTbody.Landmark = tempenteredvalue6;
    POSTbody.AddressExtraNotes = tempenteredvalue7;
    POSTbody.PrimaryAddress = true;
    POSTbody.UniqueGuid = tempbutton.id;

    var POSTbodyinJSON = JSON.stringify(POSTbody);   

    var baseUrl = returnCurrentBaseURL();
    var endPoint = "api/UserandResume/UpdateAddress";
    var fullUrl = baseUrl + endPoint;
    var getCurrentToken = getToken();

    const response = await fetch(fullUrl,
        {
            method: 'POST',
            body: POSTbodyinJSON,
            headers:
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+getCurrentToken
            }
        }
        );    

    if(response.status == 400)
    {
        console.log("unknown error - " + response.status);        
    }        
    else if(response.status == 200)
    {
        var responsejson = response.json();
        responsejson.then(
            function(result)
            {
                console.log(result);
                tempbutton.value="";
                tempinputbox1.setAttribute("placeholder",tempenteredvalue1);
                tempinputbox1.value = "";
                tempinputbox2.setAttribute("placeholder",tempenteredvalue2);
                tempinputbox2.value = "";
                tempinputbox3.setAttribute("placeholder",tempenteredvalue3);
                tempinputbox3.value = "";
                tempinputbox4.setAttribute("placeholder",tempenteredvalue4);
                tempinputbox4.value = "";
                tempinputbox5.setAttribute("placeholder",tempenteredvalue5);
                tempinputbox5.value = "";
                tempinputbox6.setAttribute("placeholder",tempenteredvalue6);
                tempinputbox6.value = "";
                tempinputbox7.setAttribute("placeholder",tempenteredvalue7);
                tempinputbox7.value = "";                                                                                                

                tempbutton.innerText = "update address";
            },
            function(error)
            {
                console.log(error);
                tempbutton.value="";
                tempinputbox.setAttribute("placeholder",tempenteredvalue1);
                tempinputbox.value = "";
                tempinputbox.setAttribute("placeholder",tempenteredvalue2);
                tempinputbox.value = "";
                tempinputbox.setAttribute("placeholder",tempenteredvalue3);
                tempinputbox.value = "";
                tempinputbox.setAttribute("placeholder",tempenteredvalue4);
                tempinputbox.value = "";
                tempinputbox.setAttribute("placeholder",tempenteredvalue5);
                tempinputbox.value = "";
                tempinputbox.setAttribute("placeholder",tempenteredvalue6);
                tempinputbox.value = "";
                tempinputbox.setAttribute("placeholder",tempenteredvalue7);
                tempinputbox.value = "";  
                
                tempbutton.innerText = "try again";
            }
        );
    }
    else
    {
        console.log("unknown error - " + response.status);        
    }

    var logcloser="----leaving apiworkaddressupdate----";
    console.log(logcloser);
}

async function addaddress()
{
    var logopener="----entering addaddress----";
    console.log(logopener);

    var tempbutton = event.target;

    tempbutton.innerText = "adding..."
    //lets get the entered values.
    var tempinputbox1 = document.getElementById("newitem" + "PhoneNumber");
    var tempenteredvalue1 = tempinputbox1.value;
    var tempinputbox2 = document.getElementById("newitem"+"AddressLineOne");
    var tempenteredvalue2 = tempinputbox2.value;
    var tempinputbox3 = document.getElementById("newitem"+"AddressLineTwo");
    var tempenteredvalue3 = tempinputbox3.value;
    var tempinputbox4 = document.getElementById("newitem"+"City");
    var tempenteredvalue4 = tempinputbox4.value;
    var tempinputbox5 = document.getElementById("newitem"+"State");
    var tempenteredvalue5 = tempinputbox5.value;
    var tempinputbox6 = document.getElementById("newitem"+"Pincode");
    var tempenteredvalue6 = tempinputbox6.value;
    var tempinputbox7 = document.getElementById("newitem"+"Landmark");
    var tempenteredvalue7 = tempinputbox7.value;
    var tempinputbox8 = document.getElementById("newitem"+"AddressExtraNotes");
    var tempenteredvalue8 = tempinputbox8.value;    

    var POSTbody = new Object();
    POSTbody.PhoneNumber = tempenteredvalue1;
    POSTbody.AddressLineOne = tempenteredvalue2;
    POSTbody.AddressLineTwo = tempenteredvalue3;
    POSTbody.City = tempenteredvalue4;
    POSTbody.State = tempenteredvalue5;
    POSTbody.Pincode = tempenteredvalue6;
    POSTbody.Landmark = tempenteredvalue7;
    POSTbody.AddressExtraNotes = tempenteredvalue8;
    POSTbody.PrimaryAddress = true;
    POSTbody.UniqueGuid = "emptyonpurpose";

    var POSTbodyinJSON = JSON.stringify(POSTbody);   

    var baseUrl = returnCurrentBaseURL();
    var endPoint = "api/UserandResume/AddAddress";
    var fullUrl = baseUrl + endPoint;
    var getCurrentToken = getToken();

    const response = await fetch(fullUrl,
        {
            method: 'POST',
            body: POSTbodyinJSON,
            headers:
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+getCurrentToken
            }
        }
        );    

    if(response.status == 400)
    {
        console.log("unknown error - " + response.status);        
    }        
    else if(response.status == 200)
    {
        var responsejson = response.json();
        responsejson.then(
            function(result)
            {
                console.log(result);
                //TODO011 - I am doing a full page reload here.
                //we should reload just the section in question.
                location.reload();
            },
            function(error)
            {
                console.log(error);
                tempbutton.innerText = "try again";
            }
        );
    }
    else
    {
        console.log("unknown error - " + response.status);        
    }

    var logcloser="----leaving addaddress----";
    console.log(logcloser);
}

//-----------------------------------------------
//for the education update related stuff
//-----------------------------------------------

function updateeducation()
{
    var logopener="----entering updateeducation----";
    console.log(logopener);

    //lets get the id. 
    console.log("UniqueGuid is " + event.target.id);

    //we have the id. now, we need to do a post call to update it. 
    var tempbutton = event.target;

    apiworkeducationupdate(tempbutton);
    
    var logcloser="----leaving updateeducation----";
    console.log(logcloser);
}

//take the unique id
//collect the information in the input boxes
//make the post call to perform the udpate
//do a get call and get the latest information.
//update the display aka the placeholders with the new information
async function apiworkeducationupdate(tempbutton)
{
    var logopener="----entering apiworkeducationupdate----";
    console.log(logopener);

    tempbutton.innerText = "updating..."
    //lets get the entered values.
    var tempinputbox1 = document.getElementById(tempbutton.id+"EducationTitle");
    var tempenteredvalue1 = tempinputbox1.value;
    var tempinputbox2 = document.getElementById(tempbutton.id+"InstituationName");
    var tempenteredvalue2 = tempinputbox2.value;
    var tempinputbox3 = document.getElementById(tempbutton.id+"YearOfGraduation");
    var tempenteredvalue3 = tempinputbox3.value;
    var tempinputbox4 = document.getElementById(tempbutton.id+"PassGrade");
    var tempenteredvalue4 = tempinputbox4.value;
    var tempinputbox5 = document.getElementById(tempbutton.id+"EducationOtherNotes1");
    var tempenteredvalue5 = tempinputbox5.value;
    var tempinputbox6 = document.getElementById(tempbutton.id+"EducationOtherNotes2");
    var tempenteredvalue6 = tempinputbox6.value;

    var POSTbody = new Object();
    POSTbody.EducationTitle = tempenteredvalue1;
    POSTbody.InstituationName = tempenteredvalue2;
    POSTbody.YearOfGraduation = tempenteredvalue3;
    POSTbody.PassGrade = tempenteredvalue4;
    POSTbody.EducationOtherNotes1 = tempenteredvalue5;
    POSTbody.EducationOtherNotes2 = tempenteredvalue6;
    POSTbody.UniqueGuid = tempbutton.id;

    var POSTbodyinJSON = JSON.stringify(POSTbody);   

    var baseUrl = returnCurrentBaseURL();
    var endPoint = "api/UserandResume/UpdateEducationalDetails";
    var fullUrl = baseUrl + endPoint;
    var getCurrentToken = getToken();

    const response = await fetch(fullUrl,
        {
            method: 'POST',
            body: POSTbodyinJSON,
            headers:
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+getCurrentToken
            }
        }
        );    

    if(response.status == 400)
    {
        console.log("unknown error - " + response.status);        
    }        
    else if(response.status == 200)
    {
        var responsejson = response.json();
        responsejson.then(
            function(result)
            {
                console.log(result);
                tempbutton.value="";
                tempinputbox1.setAttribute("placeholder",tempenteredvalue1);
                tempinputbox1.value = "";
                tempinputbox2.setAttribute("placeholder",tempenteredvalue2);
                tempinputbox2.value = "";
                tempinputbox3.setAttribute("placeholder",tempenteredvalue3);
                tempinputbox3.value = "";
                tempinputbox4.setAttribute("placeholder",tempenteredvalue4);
                tempinputbox4.value = "";
                tempinputbox5.setAttribute("placeholder",tempenteredvalue5);
                tempinputbox5.value = "";
                tempinputbox6.setAttribute("placeholder",tempenteredvalue6);
                tempinputbox6.value = "";                                                                                               
                tempbutton.innerText = "update education";
            },
            function(error)
            {
                console.log(error);
                tempbutton.value="";
                tempinputbox.setAttribute("placeholder",tempenteredvalue1);
                tempinputbox.value = "";
                tempinputbox.setAttribute("placeholder",tempenteredvalue2);
                tempinputbox.value = "";
                tempinputbox.setAttribute("placeholder",tempenteredvalue3);
                tempinputbox.value = "";
                tempinputbox.setAttribute("placeholder",tempenteredvalue4);
                tempinputbox.value = "";
                tempinputbox.setAttribute("placeholder",tempenteredvalue5);
                tempinputbox.value = "";
                tempinputbox.setAttribute("placeholder",tempenteredvalue6);
                tempinputbox.value = "";                 
                tempbutton.innerText = "try again";
            }
        );
    }
    else
    {
        console.log("unknown error - " + response.status);        
    }

    var logcloser="----leaving apiworkeducationupdate----";
    console.log(logcloser);
}

async function addeducation()
{
    var logopener="----entering addeducation----";
    console.log(logopener);

    var tempbutton = event.target;

    tempbutton.innerText = "adding..."
    //lets get the entered values.
    var tempinputbox1 = document.getElementById("newitem" + "EducationTitle");
    var tempenteredvalue1 = tempinputbox1.value;
    var tempinputbox2 = document.getElementById("newitem"+"InstituationName");
    var tempenteredvalue2 = tempinputbox2.value;
    var tempinputbox3 = document.getElementById("newitem"+"YearOfGraduation");
    var tempenteredvalue3 = tempinputbox3.value;
    var tempinputbox4 = document.getElementById("newitem"+"PassGrade");
    var tempenteredvalue4 = tempinputbox4.value;
    var tempinputbox5 = document.getElementById("newitem"+"EducationOtherNotes1");
    var tempenteredvalue5 = tempinputbox5.value;
    var tempinputbox6 = document.getElementById("newitem"+"EducationOtherNotes2");
    var tempenteredvalue6 = tempinputbox6.value;    

    var POSTbody = new Object();
    POSTbody.EducationTitle = tempenteredvalue1;
    POSTbody.InstituationName = tempenteredvalue2;
    POSTbody.YearOfGraduation = tempenteredvalue3;
    POSTbody.PassGrade = tempenteredvalue4;
    POSTbody.EducationOtherNotes1 = tempenteredvalue5;
    POSTbody.EducationOtherNotes2 = tempenteredvalue6;
    POSTbody.UniqueGuid = "emptyonpurpose";

    var POSTbodyinJSON = JSON.stringify(POSTbody);   

    var baseUrl = returnCurrentBaseURL();
    var endPoint = "api/UserandResume/AddEducationalDetails";
    var fullUrl = baseUrl + endPoint;
    var getCurrentToken = getToken();

    const response = await fetch(fullUrl,
        {
            method: 'POST',
            body: POSTbodyinJSON,
            headers:
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+getCurrentToken
            }
        }
        );    

    if(response.status == 400)
    {
        console.log("unknown error - " + response.status);        
    }        
    else if(response.status == 200)
    {
        var responsejson = response.json();
        responsejson.then(
            function(result)
            {
                console.log(result);
                //TODO011 - I am doing a full page reload here.
                //we should reload just the section in question.
                location.reload();
            },
            function(error)
            {
                console.log(error);
                tempbutton.innerText = "try again";
            }
        );
    }
    else
    {
        console.log("unknown error - " + response.status);        
    }

    var logcloser="----leaving addeducation----";
    console.log(logcloser);
}


//-----------------------------------------------
//for the skills update related stuff
//-----------------------------------------------

function updateskill()
{
    var logopener="----entering updateskill----";
    console.log(logopener);

    //lets get the id. 
    console.log("UniqueGuid is " + event.target.id);

    //we have the id. now, we need to do a post call to update it. 
    var tempbutton = event.target;

    apiworkskillupdate(tempbutton);
    
    var logcloser="----leaving updateskill----";
    console.log(logcloser);
}

//take the unique id
//collect the information in the input boxes
//make the post call to perform the udpate
//do a get call and get the latest information.
//update the display aka the placeholders with the new information
async function apiworkskillupdate(tempbutton)
{
    var logopener="----entering apiworkskillupdate----";
    console.log(logopener);

    tempbutton.innerText = "updating..."
    //lets get the entered values.
    var tempinputbox1 = document.getElementById(tempbutton.id+"SkillTitle");
    var tempenteredvalue1 = tempinputbox1.value;
    var tempinputbox2 = document.getElementById(tempbutton.id+"SkillDescription");
    var tempenteredvalue2 = tempinputbox2.value;
    var tempinputbox3 = document.getElementById(tempbutton.id+"SkillExperience");
    var tempenteredvalue3 = tempinputbox3.value;
    var tempinputbox4 = document.getElementById(tempbutton.id+"SkillOtherNotes1");
    var tempenteredvalue4 = tempinputbox4.value;
    var tempinputbox5 = document.getElementById(tempbutton.id+"SkillOtherNotes2");
    var tempenteredvalue5 = tempinputbox5.value;

    var POSTbody = new Object();
    POSTbody.SkillTitle = tempenteredvalue1;
    POSTbody.SkillDescription = tempenteredvalue2;
    POSTbody.SkillExperience = tempenteredvalue3;
    POSTbody.SkillOtherNotes1 = tempenteredvalue4;
    POSTbody.SkillOtherNotes2 = tempenteredvalue5;
    POSTbody.UniqueGuid = tempbutton.id;

    var POSTbodyinJSON = JSON.stringify(POSTbody);   

    var baseUrl = returnCurrentBaseURL();
    var endPoint = "api/UserandResume/UpdateSkillsTable";
    var fullUrl = baseUrl + endPoint;
    var getCurrentToken = getToken();

    const response = await fetch(fullUrl,
        {
            method: 'POST',
            body: POSTbodyinJSON,
            headers:
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+getCurrentToken
            }
        }
        );    

    if(response.status == 400)
    {
        console.log("unknown error - " + response.status);        
    }        
    else if(response.status == 200)
    {
        var responsejson = response.json();
        responsejson.then(
            function(result)
            {
                console.log(result);
                tempbutton.value="";
                tempinputbox1.setAttribute("placeholder",tempenteredvalue1);
                tempinputbox1.value = "";
                tempinputbox2.setAttribute("placeholder",tempenteredvalue2);
                tempinputbox2.value = "";
                tempinputbox3.setAttribute("placeholder",tempenteredvalue3);
                tempinputbox3.value = "";
                tempinputbox4.setAttribute("placeholder",tempenteredvalue4);
                tempinputbox4.value = "";
                tempinputbox5.setAttribute("placeholder",tempenteredvalue5);
                tempinputbox5.value = "";                                                                                          
                tempbutton.innerText = "update skills";
            },
            function(error)
            {
                console.log(error);
                tempbutton.value="";
                tempinputbox1.setAttribute("placeholder",tempenteredvalue1);
                tempinputbox1.value = "";
                tempinputbox2.setAttribute("placeholder",tempenteredvalue2);
                tempinputbox2.value = "";
                tempinputbox3.setAttribute("placeholder",tempenteredvalue3);
                tempinputbox3.value = "";
                tempinputbox4.setAttribute("placeholder",tempenteredvalue4);
                tempinputbox4.value = "";
                tempinputbox5.setAttribute("placeholder",tempenteredvalue5);
                tempinputbox5.value = "";             
                tempbutton.innerText = "try again";
            }
        );
    }
    else
    {
        console.log("unknown error - " + response.status);        
    }

    var logcloser="----leaving apiworkskillupdate----";
    console.log(logcloser);
}

async function addskill()
{
    var logopener="----entering addskill----";
    console.log(logopener);

    var tempbutton = event.target;

    tempbutton.innerText = "adding..."
    //lets get the entered values.
    var tempinputbox1 = document.getElementById("newitem" + "SkillTitle");
    var tempenteredvalue1 = tempinputbox1.value;
    var tempinputbox2 = document.getElementById("newitem"+"SkillDescription");
    var tempenteredvalue2 = tempinputbox2.value;
    var tempinputbox3 = document.getElementById("newitem"+"SkillExperience");
    var tempenteredvalue3 = tempinputbox3.value;
    var tempinputbox4 = document.getElementById("newitem"+"SkillOtherNotes1");
    var tempenteredvalue4 = tempinputbox4.value;
    var tempinputbox5 = document.getElementById("newitem"+"SkillOtherNotes2");
    var tempenteredvalue5 = tempinputbox5.value;   

    var POSTbody = new Object();
    POSTbody.SkillTitle = tempenteredvalue1;
    POSTbody.SkillDescription = tempenteredvalue2;
    POSTbody.SkillExperience = tempenteredvalue3;
    POSTbody.SkillOtherNotes1 = tempenteredvalue4;
    POSTbody.SkillOtherNotes2 = tempenteredvalue5;
    POSTbody.UniqueGuid = "emptyonpurpose";

    var POSTbodyinJSON = JSON.stringify(POSTbody);   

    var baseUrl = returnCurrentBaseURL();
    var endPoint = "api/UserandResume/AddSkillsTable";
    var fullUrl = baseUrl + endPoint;
    var getCurrentToken = getToken();

    const response = await fetch(fullUrl,
        {
            method: 'POST',
            body: POSTbodyinJSON,
            headers:
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+getCurrentToken
            }
        }
        );    

    if(response.status == 400)
    {
        console.log("unknown error - " + response.status);        
    }        
    else if(response.status == 200)
    {
        var responsejson = response.json();
        responsejson.then(
            function(result)
            {
                console.log(result);
                //TODO011 - I am doing a full page reload here.
                //we should reload just the section in question.
                location.reload();
            },
            function(error)
            {
                console.log(error);
                tempbutton.innerText = "try again";
            }
        );
    }
    else
    {
        console.log("unknown error - " + response.status);        
    }

    var logcloser="----leaving addskill----";
    console.log(logcloser);
}

//-----------------------------------------------
//for the project experience update related stuff
//-----------------------------------------------

function updateproject()
{
    var logopener="----entering updateproject----";
    console.log(logopener);

    //lets get the id. 
    console.log("UniqueGuid is " + event.target.id);

    //we have the id. now, we need to do a post call to update it. 
    var tempbutton = event.target;

    apiworkprojectupdate(tempbutton);
    
    var logcloser="----leaving updateproject----";
    console.log(logcloser);
}

//take the unique id
//collect the information in the input boxes
//make the post call to perform the udpate
//do a get call and get the latest information.
//update the display aka the placeholders with the new information
async function apiworkprojectupdate(tempbutton)
{
    var logopener="----entering apiworkprojectupdate----";
    console.log(logopener);

    tempbutton.innerText = "updating..."
    //lets get the entered values.
    var tempinputbox1 = document.getElementById(tempbutton.id+"ProjectTitle");
    var tempenteredvalue1 = tempinputbox1.value;
    var tempinputbox2 = document.getElementById(tempbutton.id+"ProjectDescription");
    var tempenteredvalue2 = tempinputbox2.value;
    var tempinputbox3 = document.getElementById(tempbutton.id+"YearOfProject");
    var tempenteredvalue3 = tempinputbox3.value;
    var tempinputbox4 = document.getElementById(tempbutton.id+"ProjectNotes1");
    var tempenteredvalue4 = tempinputbox4.value;
    var tempinputbox5 = document.getElementById(tempbutton.id+"ProjectNotes2");
    var tempenteredvalue5 = tempinputbox5.value;

    var POSTbody = new Object();
    POSTbody.ProjectTitle = tempenteredvalue1;
    POSTbody.ProjectDescription = tempenteredvalue2;
    POSTbody.YearOfProject = tempenteredvalue3;
    POSTbody.ProjectNotes1 = tempenteredvalue4;
    POSTbody.ProjectNotes2 = tempenteredvalue5;
    POSTbody.UniqueGuid = tempbutton.id;

    var POSTbodyinJSON = JSON.stringify(POSTbody);   

    var baseUrl = returnCurrentBaseURL();
    var endPoint = "api/UserandResume/UpdateProjectDetails";
    var fullUrl = baseUrl + endPoint;
    var getCurrentToken = getToken();

    const response = await fetch(fullUrl,
        {
            method: 'POST',
            body: POSTbodyinJSON,
            headers:
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+getCurrentToken
            }
        }
        );    

    if(response.status == 400)
    {
        console.log("unknown error - " + response.status);        
    }        
    else if(response.status == 200)
    {
        var responsejson = response.json();
        responsejson.then(
            function(result)
            {
                console.log(result);
                tempbutton.value="";
                tempinputbox1.setAttribute("placeholder",tempenteredvalue1);
                tempinputbox1.value = "";
                tempinputbox2.setAttribute("placeholder",tempenteredvalue2);
                tempinputbox2.value = "";
                tempinputbox3.setAttribute("placeholder",tempenteredvalue3);
                tempinputbox3.value = "";
                tempinputbox4.setAttribute("placeholder",tempenteredvalue4);
                tempinputbox4.value = "";
                tempinputbox5.setAttribute("placeholder",tempenteredvalue5);
                tempinputbox5.value = "";                                                                                          
                tempbutton.innerText = "update project details";
            },
            function(error)
            {
                console.log(error);
                tempbutton.value="";
                tempinputbox1.setAttribute("placeholder",tempenteredvalue1);
                tempinputbox1.value = "";
                tempinputbox2.setAttribute("placeholder",tempenteredvalue2);
                tempinputbox2.value = "";
                tempinputbox3.setAttribute("placeholder",tempenteredvalue3);
                tempinputbox3.value = "";
                tempinputbox4.setAttribute("placeholder",tempenteredvalue4);
                tempinputbox4.value = "";
                tempinputbox5.setAttribute("placeholder",tempenteredvalue5);
                tempinputbox5.value = "";             
                tempbutton.innerText = "try again";
            }
        );
    }
    else
    {
        console.log("unknown error - " + response.status);        
    }

    var logcloser="----leaving apiworkprojectupdate----";
    console.log(logcloser);
}

async function addproject()
{
    var logopener="----entering addproject----";
    console.log(logopener);

    var tempbutton = event.target;

    tempbutton.innerText = "adding..."
    //lets get the entered values.
    var tempinputbox1 = document.getElementById("newitem" + "ProjectTitle");
    var tempenteredvalue1 = tempinputbox1.value;
    var tempinputbox2 = document.getElementById("newitem"+"ProjectDescription");
    var tempenteredvalue2 = tempinputbox2.value;
    var tempinputbox3 = document.getElementById("newitem"+"YearOfProject");
    var tempenteredvalue3 = tempinputbox3.value;
    var tempinputbox4 = document.getElementById("newitem"+"ProjectNotes1");
    var tempenteredvalue4 = tempinputbox4.value;
    var tempinputbox5 = document.getElementById("newitem"+"ProjectNotes2");
    var tempenteredvalue5 = tempinputbox5.value;   

    var POSTbody = new Object();
    POSTbody.ProjectTitle = tempenteredvalue1;
    POSTbody.ProjectDescription = tempenteredvalue2;
    POSTbody.YearOfProject = tempenteredvalue3;
    POSTbody.ProjectNotes1 = tempenteredvalue4;
    POSTbody.ProjectNotes2 = tempenteredvalue5;
    POSTbody.UniqueGuid = "emptyonpurpose";

    var POSTbodyinJSON = JSON.stringify(POSTbody);   

    var baseUrl = returnCurrentBaseURL();
    var endPoint = "api/UserandResume/AddProjectDetails";
    var fullUrl = baseUrl + endPoint;
    var getCurrentToken = getToken();

    const response = await fetch(fullUrl,
        {
            method: 'POST',
            body: POSTbodyinJSON,
            headers:
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+getCurrentToken
            }
        }
        );    

    if(response.status == 400)
    {
        console.log("unknown error - " + response.status);        
    }        
    else if(response.status == 200)
    {
        var responsejson = response.json();
        responsejson.then(
            function(result)
            {
                console.log(result);
                //TODO011 - I am doing a full page reload here.
                //we should reload just the section in question.
                location.reload();
            },
            function(error)
            {
                console.log(error);
                tempbutton.innerText = "try again";
            }
        );
    }
    else
    {
        console.log("unknown error - " + response.status);        
    }

    var logcloser="----leaving addproject----";
    console.log(logcloser);
}


//-----------------------------------------------
//for the extra curricular update related stuff
//-----------------------------------------------

function updateextracurricural()
{
    var logopener="----entering updateextracurricural----";
    console.log(logopener);

    //lets get the id. 
    console.log("UniqueGuid is " + event.target.id);

    //we have the id. now, we need to do a post call to update it. 
    var tempbutton = event.target;

    apiworkextracurricuralupdate(tempbutton);
    
    var logcloser="----leaving updateextracurricural----";
    console.log(logcloser);
}

//take the unique id
//collect the information in the input boxes
//make the post call to perform the udpate
//do a get call and get the latest information.
//update the display aka the placeholders with the new information
async function apiworkextracurricuralupdate(tempbutton)
{
    var logopener="----entering apiworkextracurricuralupdate----";
    console.log(logopener);

    tempbutton.innerText = "updating..."
    //lets get the entered values.
    var tempinputbox1 = document.getElementById(tempbutton.id+"ExtraCurricularOtherNotes1");
    var tempenteredvalue1 = tempinputbox1.value;
    var tempinputbox2 = document.getElementById(tempbutton.id+"ExtraCurricularNotes2");
    var tempenteredvalue2 = tempinputbox2.value;

    var POSTbody = new Object();
    POSTbody.ExtraCurricularOtherNotes1 = tempenteredvalue1;
    POSTbody.ExtraCurricularNotes2 = tempenteredvalue2;
    POSTbody.UniqueGuid = tempbutton.id;

    var POSTbodyinJSON = JSON.stringify(POSTbody);   

    var baseUrl = returnCurrentBaseURL();
    var endPoint = "api/UserandResume/UpdateExtraCurricular";
    var fullUrl = baseUrl + endPoint;
    var getCurrentToken = getToken();

    const response = await fetch(fullUrl,
        {
            method: 'POST',
            body: POSTbodyinJSON,
            headers:
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+getCurrentToken
            }
        }
        );    

    if(response.status == 400)
    {
        console.log("unknown error - " + response.status);        
    }        
    else if(response.status == 200)
    {
        var responsejson = response.json();
        responsejson.then(
            function(result)
            {
                console.log(result);
                tempbutton.value="";
                tempinputbox1.setAttribute("placeholder",tempenteredvalue1);
                tempinputbox1.value = "";
                tempinputbox2.setAttribute("placeholder",tempenteredvalue2);
                tempinputbox2.value = "";                                                                                         
                tempbutton.innerText = "update extra curricular";
            },
            function(error)
            {
                console.log(error);
                tempbutton.value="";
                tempinputbox1.setAttribute("placeholder",tempenteredvalue1);
                tempinputbox1.value = "";
                tempinputbox2.setAttribute("placeholder",tempenteredvalue2);
                tempinputbox2.value = "";            
                tempbutton.innerText = "try again";
            }
        );
    }
    else
    {
        console.log("unknown error - " + response.status);        
    }

    var logcloser="----leaving apiworkextracurricuralupdate----";
    console.log(logcloser);
}

async function addextracurricural()
{
    var logopener="----entering addextracurricural----";
    console.log(logopener);

    var tempbutton = event.target;

    tempbutton.innerText = "adding..."
    //lets get the entered values.
    var tempinputbox1 = document.getElementById("newitem" + "ExtraCurricularOtherNotes1");
    var tempenteredvalue1 = tempinputbox1.value;
    var tempinputbox2 = document.getElementById("newitem"+"ExtraCurricularNotes2");
    var tempenteredvalue2 = tempinputbox2.value;  

    var POSTbody = new Object();
    POSTbody.ExtraCurricularOtherNotes1 = tempenteredvalue1;
    POSTbody.ExtraCurricularNotes2 = tempenteredvalue2;
    POSTbody.UniqueGuid = "emptyonpurpose";

    var POSTbodyinJSON = JSON.stringify(POSTbody);   

    var baseUrl = returnCurrentBaseURL();
    var endPoint = "api/UserandResume/AddExtraCurricular";
    var fullUrl = baseUrl + endPoint;
    var getCurrentToken = getToken();

    const response = await fetch(fullUrl,
        {
            method: 'POST',
            body: POSTbodyinJSON,
            headers:
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+getCurrentToken
            }
        }
        );    

    if(response.status == 400)
    {
        console.log("unknown error - " + response.status);        
    }        
    else if(response.status == 200)
    {
        var responsejson = response.json();
        responsejson.then(
            function(result)
            {
                console.log(result);
                //TODO011 - I am doing a full page reload here.
                //we should reload just the section in question.
                location.reload();
            },
            function(error)
            {
                console.log(error);
                tempbutton.innerText = "try again";
            }
        );
    }
    else
    {
        console.log("unknown error - " + response.status);        
    }

    var logcloser="----leaving addextracurricural----";
    console.log(logcloser);
}


//-----------------------------------------------
//for the other notes update related stuff
//-----------------------------------------------

function updateothernote()
{
    var logopener="----entering updateothernote----";
    console.log(logopener);

    //lets get the id. 
    console.log("UniqueGuid is " + event.target.id);

    //we have the id. now, we need to do a post call to update it. 
    var tempbutton = event.target;

    apiworkothernoteupdate(tempbutton);
    
    var logcloser="----leaving updateothernote----";
    console.log(logcloser);
}

//take the unique id
//collect the information in the input boxes
//make the post call to perform the udpate
//do a get call and get the latest information.
//update the display aka the placeholders with the new information
async function apiworkothernoteupdate(tempbutton)
{
    var logopener="----entering apiworkothernoteupdate----";
    console.log(logopener);

    tempbutton.innerText = "updating..."
    //lets get the entered values.
    var tempinputbox1 = document.getElementById(tempbutton.id+"OtherStuffNotes1");
    var tempenteredvalue1 = tempinputbox1.value;
    var tempinputbox2 = document.getElementById(tempbutton.id+"OtherStuffNotes2");
    var tempenteredvalue2 = tempinputbox2.value;
    var tempinputbox3 = document.getElementById(tempbutton.id+"OtherStuffNotes3");
    var tempenteredvalue3 = tempinputbox3.value;
    var tempinputbox4 = document.getElementById(tempbutton.id+"OtherStuffNotes4");
    var tempenteredvalue4 = tempinputbox4.value;
    var tempinputbox5 = document.getElementById(tempbutton.id+"OtherStuffNotes5");
    var tempenteredvalue5 = tempinputbox5.value;

    var POSTbody = new Object();
    POSTbody.OtherStuffNotes1 = tempenteredvalue1;
    POSTbody.OtherStuffNotes2 = tempenteredvalue2;
    POSTbody.OtherStuffNotes3 = tempenteredvalue3;
    POSTbody.OtherStuffNotes4 = tempenteredvalue4;
    POSTbody.OtherStuffNotes5 = tempenteredvalue5;
    POSTbody.UniqueGuid = tempbutton.id;

    var POSTbodyinJSON = JSON.stringify(POSTbody);   

    var baseUrl = returnCurrentBaseURL();
    var endPoint = "api/UserandResume/UpdateOtherStuff";
    var fullUrl = baseUrl + endPoint;
    var getCurrentToken = getToken();

    const response = await fetch(fullUrl,
        {
            method: 'POST',
            body: POSTbodyinJSON,
            headers:
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+getCurrentToken
            }
        }
        );    

    if(response.status == 400)
    {
        console.log("unknown error - " + response.status);        
    }        
    else if(response.status == 200)
    {
        var responsejson = response.json();
        responsejson.then(
            function(result)
            {
                console.log(result);
                tempbutton.value="";
                tempinputbox1.setAttribute("placeholder",tempenteredvalue1);
                tempinputbox1.value = "";
                tempinputbox2.setAttribute("placeholder",tempenteredvalue2);
                tempinputbox2.value = "";
                tempinputbox3.setAttribute("placeholder",tempenteredvalue3);
                tempinputbox3.value = "";
                tempinputbox4.setAttribute("placeholder",tempenteredvalue4);
                tempinputbox4.value = "";
                tempinputbox5.setAttribute("placeholder",tempenteredvalue5);
                tempinputbox5.value = "";                                                                                          
                tempbutton.innerText = "update other details";
            },
            function(error)
            {
                console.log(error);
                tempbutton.value="";
                tempinputbox1.setAttribute("placeholder",tempenteredvalue1);
                tempinputbox1.value = "";
                tempinputbox2.setAttribute("placeholder",tempenteredvalue2);
                tempinputbox2.value = "";
                tempinputbox3.setAttribute("placeholder",tempenteredvalue3);
                tempinputbox3.value = "";
                tempinputbox4.setAttribute("placeholder",tempenteredvalue4);
                tempinputbox4.value = "";
                tempinputbox5.setAttribute("placeholder",tempenteredvalue5);
                tempinputbox5.value = "";             
                tempbutton.innerText = "try again";
            }
        );
    }
    else
    {
        console.log("unknown error - " + response.status);        
    }

    var logcloser="----leaving apiworkothernoteupdate----";
    console.log(logcloser);
}


async function addothernote()
{
    var logopener="----entering addothernote----";
    console.log(logopener);

    var tempbutton = event.target;

    tempbutton.innerText = "adding..."
    //lets get the entered values.
    var tempinputbox1 = document.getElementById("newitem" + "OtherStuffNotes1");
    var tempenteredvalue1 = tempinputbox1.value;
    var tempinputbox2 = document.getElementById("newitem"+"OtherStuffNotes2");
    var tempenteredvalue2 = tempinputbox2.value;
    var tempinputbox3 = document.getElementById("newitem"+"OtherStuffNotes3");
    var tempenteredvalue3 = tempinputbox3.value;
    var tempinputbox4 = document.getElementById("newitem"+"OtherStuffNotes4");
    var tempenteredvalue4 = tempinputbox4.value;
    var tempinputbox5 = document.getElementById("newitem"+"OtherStuffNotes5");
    var tempenteredvalue5 = tempinputbox5.value;   

    var POSTbody = new Object();
    POSTbody.OtherStuffNotes1 = tempenteredvalue1;
    POSTbody.OtherStuffNotes2 = tempenteredvalue2;
    POSTbody.OtherStuffNotes3 = tempenteredvalue3;
    POSTbody.OtherStuffNotes4 = tempenteredvalue4;
    POSTbody.OtherStuffNotes5 = tempenteredvalue5;
    POSTbody.UniqueGuid = "emptyonpurpose";

    var POSTbodyinJSON = JSON.stringify(POSTbody);   

    var baseUrl = returnCurrentBaseURL();
    var endPoint = "api/UserandResume/AddOtherStuff";
    var fullUrl = baseUrl + endPoint;
    var getCurrentToken = getToken();

    const response = await fetch(fullUrl,
        {
            method: 'POST',
            body: POSTbodyinJSON,
            headers:
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+getCurrentToken
            }
        }
        );    

    if(response.status == 400)
    {
        console.log("unknown error - " + response.status);        
    }        
    else if(response.status == 200)
    {
        var responsejson = response.json();
        responsejson.then(
            function(result)
            {
                console.log(result);
                //TODO011 - I am doing a full page reload here.
                //we should reload just the section in question.
                location.reload();
            },
            function(error)
            {
                console.log(error);
                tempbutton.innerText = "try again";
            }
        );
    }
    else
    {
        console.log("unknown error - " + response.status);        
    }

    var logcloser="----leaving addothernote----";
    console.log(logcloser);
}