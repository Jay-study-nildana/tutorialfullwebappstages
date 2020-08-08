function pagehasloaded()
{
    var logopener="----entering pagehasloaded----";
    console.log(logopener);

    hidetheloading();

    checkforsigninpageload();

    loadfullresume();

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

                //display things.
                displaytheresume(result);
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

function displaytheresume(result)
{
    var logopener="----entering loadfullresume----";
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
            var tempp = document.createElement("p"); 
            tempp.innerText = tempitem.PhoneNumber;
            currentDiv.appendChild(tempp);
            //add a divider line
            var temphr = document.createElement("hr");
            currentDiv.appendChild(temphr);
        }
    }

    if(result.Address == true)
    {
        //if this is true, then items related to this topic are available
        //try and display them.
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
            var tempp = document.createElement("p"); 
            tempp.innerText = tempitem.AddressLineOne;
            currentDiv.appendChild(tempp);
            var tempp = document.createElement("p"); 
            tempp.innerText = tempitem.AddressLineTwo;
            currentDiv.appendChild(tempp);
            var tempp = document.createElement("p"); 
            tempp.innerText = tempitem.City;
            currentDiv.appendChild(tempp);
            var tempp = document.createElement("p"); 
            tempp.innerText = tempitem.State;
            currentDiv.appendChild(tempp);
            var tempp = document.createElement("p"); 
            tempp.innerText = tempitem.Pincode;
            currentDiv.appendChild(tempp);
            var tempp = document.createElement("p"); 
            tempp.innerText = tempitem.Landmark;
            currentDiv.appendChild(tempp);
            var tempp = document.createElement("p"); 
            tempp.innerText = tempitem.AddressExtraNotes;
            currentDiv.appendChild(tempp);                                                                                  
            //add a divider line
            var temphr = document.createElement("hr");
            currentDiv.appendChild(temphr);
        }
    }

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
            var tempp = document.createElement("p"); 
            tempp.innerText = tempitem.EducationTitle;
            currentDiv.appendChild(tempp);
            var tempp = document.createElement("p"); 
            tempp.innerText = tempitem.InstituationName;
            currentDiv.appendChild(tempp);
            var tempp = document.createElement("p"); 
            tempp.innerText = tempitem.YearOfGraduation;
            currentDiv.appendChild(tempp);
            var tempp = document.createElement("p"); 
            tempp.innerText = tempitem.PassGrade;
            currentDiv.appendChild(tempp);
            var tempp = document.createElement("p"); 
            tempp.innerText = tempitem.EducationOtherNotes1;
            currentDiv.appendChild(tempp);
            var tempp = document.createElement("p"); 
            tempp.innerText = tempitem.EducationOtherNotes2;
            currentDiv.appendChild(tempp);                                                            
            //add a divider line
            var temphr = document.createElement("hr");
            currentDiv.appendChild(temphr);
        }
    } 
    
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
            var tempp = document.createElement("p"); 
            tempp.innerText = tempitem.SkillTitle;
            currentDiv.appendChild(tempp);
            var tempp = document.createElement("p"); 
            tempp.innerText = tempitem.SkillDescription;
            currentDiv.appendChild(tempp);
            var tempp = document.createElement("p"); 
            tempp.innerText = tempitem.SkillExperience;
            currentDiv.appendChild(tempp);
            var tempp = document.createElement("p"); 
            tempp.innerText = tempitem.SkillOtherNotes1;
            currentDiv.appendChild(tempp);
            var tempp = document.createElement("p"); 
            tempp.innerText = tempitem.SkillOtherNotes2;
            currentDiv.appendChild(tempp);                                                
            //add a divider line
            var temphr = document.createElement("hr");
            currentDiv.appendChild(temphr);
        }
    }    

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
            var tempp = document.createElement("p"); 
            tempp.innerText = tempitem.ProjectTitle;
            currentDiv.appendChild(tempp);
            var tempp = document.createElement("p"); 
            tempp.innerText = tempitem.ProjectDescription;
            currentDiv.appendChild(tempp);
            var tempp = document.createElement("p"); 
            tempp.innerText = tempitem.YearOfProject;
            currentDiv.appendChild(tempp);
            var tempp = document.createElement("p"); 
            tempp.innerText = tempitem.ProjectNotes1;
            currentDiv.appendChild(tempp);
            var tempp = document.createElement("p"); 
            tempp.innerText = tempitem.ProjectNotes2;
            currentDiv.appendChild(tempp);                                                
            //add a divider line
            var temphr = document.createElement("hr");
            currentDiv.appendChild(temphr);
        }
    }  
    
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
            var tempp = document.createElement("p"); 
            tempp.innerText = tempitem.ExtraCurricularOtherNotes1;
            currentDiv.appendChild(tempp);
            var tempp = document.createElement("p"); 
            tempp.innerText = tempitem.ExtraCurricularNotes2;
            currentDiv.appendChild(tempp);            
            //add a divider line
            var temphr = document.createElement("hr");
            currentDiv.appendChild(temphr);
        }
    }    

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
            var tempp = document.createElement("p"); 
            tempp.innerText = tempitem.OtherStuffNotes1;
            currentDiv.appendChild(tempp);
            var tempp = document.createElement("p"); 
            tempp.innerText = tempitem.OtherStuffNotes2;
            currentDiv.appendChild(tempp);
            var tempp = document.createElement("p"); 
            tempp.innerText = tempitem.OtherStuffNotes3;
            currentDiv.appendChild(tempp);
            var tempp = document.createElement("p"); 
            tempp.innerText = tempitem.OtherStuffNotes4;
            currentDiv.appendChild(tempp);
            var tempp = document.createElement("p"); 
            tempp.innerText = tempitem.OtherStuffNotes5;
            currentDiv.appendChild(tempp);                                                

            //add a divider line
            var temphr = document.createElement("hr");
            currentDiv.appendChild(temphr);
        }

    }        
    
    hidetheloading();
    var logcloser="----leaving loadfullresume----";
    console.log(logcloser);
}

