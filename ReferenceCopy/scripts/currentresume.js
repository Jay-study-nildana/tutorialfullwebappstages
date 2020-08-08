//TODO - current resume is only available if the user has the following.

// College - BE/Degree 
// College - PUC 
// High School - SSLC 
// Primary School - 7th Standard. 

// Projects - 2 items

// Extra Curricurals - 2 items 

// Skills - (leave it empty for now)

// Address - 1 item. 

// phone number - 1 item 

// email - already present 

//other notes - 2 items. 

//TODO004 - eventually we need to generate this entire resume dynamically. right now, 
//it is heavily based on fixed values. 

function pagehasloaded()
{
    var logopener="----entering pagehasloaded----";
    console.log(logopener);

    //hidetheloading();

    checkforsigninpageloadcurrentresume();

    //loadfullresume();

    var logcloser="----leaving pagehasloaded----";
    console.log(logcloser);
}

function checkforsigninpageloadcurrentresume()
{
    var logopener="----entering checkforsigninpageloadcurrentresume----";
    console.log(logopener);
    var getCurrentToken = getToken();

    if(getCurrentToken!=null)
    {
        console.log("You are already signed in");
        // //send token and try to get the basic resume information.
        // //hide the login page.
        // // hidethelogin();
        // // GetResumeSummary();
        loadfullresume();
    }
    else
    {
        console.log("You need to sign in.");
        //lets auto redirect to the sign page.
        //in the same directory, I want to find the view signin.html 
        window.location.href = '../signin.html'; 

    }

    var logcloser="----leaving checkforsigninpageloadcurrentresume----";
    console.log(logcloser);
}

async function loadfullresume()
{
    var logopener="----entering loadfullresume----";
    console.log(logopener);  
    
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

//look at code in fullresume.js for more details about this code.

function displaytheresume(result)
{
    var logopener="----entering displaytheresume----";
    console.log(logopener);  

    console.log(result);

    //first the name for intro section
    var tempitem1 = document.getElementById("shownameandwelcome");
    var text1 = getshownameandwelcome(result);
    tempitem1.innerHTML = text1;

    //now the hellostuff section
    var tempitem2 = document.getElementById("hellostuff1");
    var text2 = gethellostuff1(result);
    tempitem2.innerHTML = text2;

    var tempitem3 = document.getElementById("hellostuff2");
    var text3 = gethellostuff2(result);
    tempitem3.innerHTML = text3;    

    //now the educationstuff

    var tempitem4 = document.getElementById("educationyeartitle1");
    var text4 = result.educationalDetailViewModels[0].YearOfGraduation;
    tempitem4.innerHTML = text4;

    var tempitem5 = document.getElementById("educationyeartitle1a");
    var text5 = result.educationalDetailViewModels[0].EducationTitle + 
            " - " + result.educationalDetailViewModels[0].InstituationName;
    tempitem5.innerHTML = text5;

    var tempitem6 = document.getElementById("educationyeartitle1b");
    var text6 = result.educationalDetailViewModels[0].PassGrade + 
    " - " + result.educationalDetailViewModels[0].EducationOtherNotes1 + 
    " - " + result.educationalDetailViewModels[0].EducationOtherNotes2;
    tempitem6.innerHTML = text6;

    var tempitem7 = document.getElementById("educationyeartitle2");
    var text7 = result.educationalDetailViewModels[1].YearOfGraduation;
    tempitem7.innerHTML = text7;

    var tempitem8 = document.getElementById("educationyeartitle2a");
    var text8 = result.educationalDetailViewModels[1].EducationTitle + 
    " - " + result.educationalDetailViewModels[1].InstituationName;
    tempitem8.innerHTML = text8;

    var tempitem9 = document.getElementById("educationyeartitle2b");
    var text9 = result.educationalDetailViewModels[1].PassGrade + 
    " - " + result.educationalDetailViewModels[1].EducationOtherNotes1 + 
    " - " + result.educationalDetailViewModels[1].EducationOtherNotes2;
    tempitem9.innerHTML = text9;

    var tempitem10 = document.getElementById("educationyeartitle3");
    var text10 = result.educationalDetailViewModels[2].YearOfGraduation;
    tempitem10.innerHTML = text10;

    var tempitem11 = document.getElementById("educationyeartitle3a");
    var text11 = result.educationalDetailViewModels[2].EducationTitle + 
    " - " + result.educationalDetailViewModels[2].InstituationName;
    tempitem11.innerHTML = text11;

    var tempitem12 = document.getElementById("educationyeartitle3b");
    var text12 = result.educationalDetailViewModels[2].PassGrade + 
    " - " + result.educationalDetailViewModels[2].EducationOtherNotes1 + 
    " - " + result.educationalDetailViewModels[2].EducationOtherNotes2;
    tempitem12.innerHTML = text12;

    var tempitem13 = document.getElementById("educationyeartitle4");
    var text13 = result.educationalDetailViewModels[3].YearOfGraduation;
    tempitem13.innerHTML = text13;

    var tempitem14 = document.getElementById("educationyeartitle4a");
    var text14 = result.educationalDetailViewModels[3].EducationTitle + 
    " - " + result.educationalDetailViewModels[3].InstituationName;
    tempitem14.innerHTML = text14;

    var tempitem15 = document.getElementById("educationyeartitle4b");
    var text15 = result.educationalDetailViewModels[3].PassGrade + 
    " - " + result.educationalDetailViewModels[3].EducationOtherNotes1 + 
    " - " + result.educationalDetailViewModels[3].EducationOtherNotes2;
    tempitem15.innerHTML = text15;

    //projectstuff

    var tempitem16 = document.getElementById("projecttitle1");
    var text16 = result.projectDetailViewModels[0].ProjectTitle;
    tempitem16.innerHTML = text16;

    var tempitem17 = document.getElementById("projecttitle1a");
    var text17 = result.projectDetailViewModels[0].ProjectDescription + 
    " - " + result.projectDetailViewModels[0].YearOfProject;
    tempitem17.innerHTML = text17;

    var tempitem18 = document.getElementById("projecttitle1b");
    var text18 = result.projectDetailViewModels[0].ProjectNotes1 + 
    " - " + result.projectDetailViewModels[0].ProjectNotes2;
    tempitem18.innerHTML = text18;    

    var tempitem19 = document.getElementById("projecttitle2");
    var text19 = result.projectDetailViewModels[1].ProjectTitle;
    tempitem19.innerHTML = text19;

    var tempitem20 = document.getElementById("projecttitle2a");
    var text20 = result.projectDetailViewModels[1].ProjectDescription + 
    " - " + result.projectDetailViewModels[1].YearOfProject;
    tempitem20.innerHTML = text20;

    var tempitem21 = document.getElementById("projecttitle2b");
    var text21 = result.projectDetailViewModels[1].ProjectNotes1 + 
    " - " + result.projectDetailViewModels[1].ProjectNotes2;
    tempitem21.innerHTML = text21;   
    
    //extracurricularstuff

    var tempitem22 = document.getElementById("extracurriculartitle1");
    var text22 = result.extraCurricularViewModels[0].ExtraCurricularOtherNotes1;
    tempitem22.innerHTML = text22;

    var tempitem23 = document.getElementById("extracurriculartitle1a");
    var text23 = result.extraCurricularViewModels[0].ExtraCurricularNotes2;
    tempitem23.innerHTML = text23;

    var tempitem24 = document.getElementById("extracurriculartitle1b");
    var text24 = "";
    tempitem24.innerHTML = text24;    

    var tempitem25 = document.getElementById("extracurriculartitle2");
    var text25 = result.extraCurricularViewModels[1].ExtraCurricularOtherNotes1;
    tempitem25.innerHTML = text25;

    var tempitem26 = document.getElementById("extracurriculartitle2a");
    var text26 = result.extraCurricularViewModels[1].ExtraCurricularNotes2;
    tempitem26.innerHTML = text26;

    var tempitem27 = document.getElementById("extracurriculartitle2b");
    var text27 = "";
    tempitem27.innerHTML = text27;    

    //skillstuff

    var tempitem28 = document.getElementById("skillstuff1a");
    var text28 = result.skillsTableViewModels[0].SkillTitle;
    tempitem28.innerHTML = text28;

    var tempitem29 = document.getElementById("skillstuff1b");
    var text29 = result.skillsTableViewModels[0].SkillDescription + "-"
    + result.skillsTableViewModels[0].SkillExperience + "-"
    + result.skillsTableViewModels[0].SkillOtherNotes1 + "-" 
    + result.skillsTableViewModels[0].SkillOtherNotes2;
    tempitem29.innerHTML = text29;    

    var tempitem30 = document.getElementById("skillstuff2a");
    var text30 = result.skillsTableViewModels[1].SkillTitle;
    tempitem30.innerHTML = text30;

    var tempitem31 = document.getElementById("skillstuff2b");
    var text31 = result.skillsTableViewModels[1].SkillDescription + "-"
    + result.skillsTableViewModels[1].SkillExperience + "-"
    + result.skillsTableViewModels[1].SkillOtherNotes1 + "-" 
    + result.skillsTableViewModels[1].SkillOtherNotes2;
    tempitem31.innerHTML = text31;
    
    var tempitem32 = document.getElementById("skillstuff3a");
    var text32 = result.skillsTableViewModels[2].SkillTitle;
    tempitem32.innerHTML = text32;

    var tempitem33 = document.getElementById("skillstuff3b");
    var text33 = result.skillsTableViewModels[2].SkillDescription + "-"
    + result.skillsTableViewModels[2].SkillExperience + "-"
    + result.skillsTableViewModels[2].SkillOtherNotes1 + "-" 
    + result.skillsTableViewModels[2].SkillOtherNotes2;
    tempitem33.innerHTML = text33;    

    //contact-info

    var tempitem34 = document.getElementById("addressstuff1");
    var text34 = result.addressViewModels[0].AddressLineOne + "-"
    + result.addressViewModels[0].AddressLineTwo;
    tempitem34.innerHTML = text34;  
    
    var tempitem34b = document.getElementById("addressstuff2");
    var text34b = result.addressViewModels[0].City + "-" 
    + result.addressViewModels[0].State + "-"
    + result.addressViewModels[0].Pincode;
    tempitem34b.innerHTML = text34b;      

    var tempitem35 = document.getElementById("emailstuff");
    var text35 = result.UserEmail;
    tempitem35.innerHTML = text35; 
    
    var tempitem36 = document.getElementById("phonenumberstuff");
    var text36 = result.phoneNumberViewModels[0].PhoneNumber;
    tempitem36.innerHTML = text36;    


    var logcloser="----leaving displaytheresume----";
    console.log(logcloser);
}

function showtheloading()
{
    var logopener="----entering showtheloading----";
    console.log(logopener);

    var divtohide = document.getElementById("shownameandwelcome");
    divtohide.innerHTML = "loading...";
    // divtohide.style.display = 'block';

    var logcloser="----leaving showtheloading----";
    console.log(logcloser); 
}

function getshownameandwelcome(result)
{
    var fullname = result.FirstName + " " + result.LastName;
    var sentence = "Hello, I am "+fullname;
    return sentence;
}

function gethellostuff1(result)
{
    var itemsarray = result.otherStuffViewModels;
    //I only wish to discuss the first item here.
    //TODO005 - when this resume is built dynamically, replace with a function 
    //that will generate the HTML components based on the number of other stuff items
    //in the response object.
    var tempitem = itemsarray[0];
    var sentence=tempitem.OtherStuffNotes1+ "-"+tempitem.OtherStuffNotes2+
    "-"+ tempitem.OtherStuffNotes3+ "-" +
    tempitem.OtherStuffNotes4+"-"+tempitem.OtherStuffNotes5;
    return sentence;
}

function gethellostuff2(result)
{
    var itemsarray = result.otherStuffViewModels;
    var tempitem = itemsarray[1];
    var sentence=tempitem.OtherStuffNotes1+ "-"+tempitem.OtherStuffNotes2+
    "-"+ tempitem.OtherStuffNotes3+ "-" +
    tempitem.OtherStuffNotes4+"-"+tempitem.OtherStuffNotes5;
    return sentence;
}


