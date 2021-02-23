let tim = 1;
let selected = 'MCQ'
let current_container = "1"
let imagelocation=''
let currentImagestatue='none'
let mainImage=''

function submit_main(){
    const list_flow = []
    const temp = document.querySelectorAll('.question');
    for (let i = 1; i < temp.length; i++) {
        list_flow.push(temp[i].id.slice(3, temp[i].id.length));
    }
    console.log(list_flow)
    document.getElementById("flow").value = list_flow
    document.getElementById('submitbutton').disabled = true;
    document.getElementById("form").submit()

}

async function submit() {
    takeshot(addition_data,submit_main);
   
    
}
function additem(even, div_id) {
    const question_id = div_id[div_id.length - 1];
    console.log(question_id)
    if (selected == even.path[0].value) {
        console.log("same")
    }
    else {
        const temp = document.querySelectorAll(`#${div_id}`)
        // console.log(temp[0].innerHTML)
        if (even.path[0].value == "MCQ") {
            temp[0].innerHTML = `
            <div class="form-check" style="display: flex; align-items: center;" >
            <input class="input_check" type="radio" name="Answ-${question_id}" id="exampleRadios2" value="1" checked>
            <input class="" type="text" name="option-${question_id}" value="option">
            </div>`;
            document.getElementById(`double_item-${question_id}`).style.display = "Block";


        }
        else if (even.path[0].value == "Paragraph") {
            temp[0].innerHTML = `<textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>`
            document.getElementById(`double_item-${question_id}`).style.display = "none";

        }
        else if (even.path[0].value == "short_answ") {
            temp[0].innerHTML = `<input type="text" class="form-control" id="formGroupExampleInput" placeholder="Your Answer">`
            document.getElementById(`double_item-${question_id}`).style.display = "none";

        }
        else if (even.path[0].value == "date") {
            temp[0].innerHTML = `
  <input type="date" id="birthday" name="date-${current_container}">
            `
            document.getElementById(`double_item-${question_id}`).style.display = "none";
        }
        else if (even.path[0].value == "checkbox") {
            temp[0].innerHTML = `
            <div class="form-check" style="display: flex; align-items: center;" >
            <input class="input_check" type="checkbox" name="Answ-${question_id}" id="inlineCheckbox1" value="1" checked>
            <input class="" type="text" name="option-${question_id}" value="option">
            </div>`
            document.getElementById(`double_item-${question_id}`).style.display = "Block";
        }
        else if (even.path[0].value == "Time") {
            temp[0].innerHTML = `<input type="time" id="appt" name="time-${question_id}">`
            document.getElementById(`double_item-${question_id}`).style.display = "none";
        }
        else if (even.path[0].value == "Email") {
            temp[0].innerHTML = `
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">`
            document.getElementById(`double_item-${question_id}`).style.display = "none";
            document.querySelectorAll(`#Answ-${question_id}`)[0].value = "0"
            document.getElementById(`Answ-${question_id}`).style.display = "none";
        }

        selected = even.path[0].value;
    }

}
function addCode() {
    tim = tim + 1;
    // .insertAdjacentHTML('beforeend', `<input type="text" name="option-${current_container}" value="option one">`);
    console.log(document.querySelectorAll('form')[0])
    console.log(document.querySelectorAll('form')[0].childNodes[1])
    document.querySelectorAll('form')[1].childNodes[1].insertAdjacentHTML('beforeend',
        `<div class="question" id="id_${tim}" onmouseup="addprop(event,${tim})">
        <div class="first">
            <input type="text" style="width: 60%;" name="questions_${tim}" value="Question-${tim}">
            <button type="button" class="btn imagebutton" data-toggle="modal" data-target="#exampleModalLong" onclick="selectedbody('id_${tim}')" >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
              </svg>
            </button>

            <button class="btn videobut" type="button" onclick="addvideo(${tim})" >
            <img class="videoicon" src="/video.svg" alt="">
            </button>
            <select class="form-control" name="Type_1" onclick="additem(event,'div_option-${tim}')">
                <option value="MCQ">Multiple Choice</option>
                <option value="checkbox">Checkbox</option>
                <option value="Paragraph">Paragraph</option>
                <option value="short_answ">Short answer</option>
                <option value="Email">Email</option>
                <option value="date">Date</option>
                <option value="Time">Time</option>
            </select>


        </div>

        <div class="image_container">
          
        </div>
        <div class="video_container">
          
        </div>

        <div class="options" id="div_option-${tim}">
            <div class="form-check" style="display: flex; align-items: center;">
                <input class="input_check" type="radio" name="Answ-${tim}" id="exampleRadios2" value="1" checked>
                <input class="" type="text" name="option-${tim}" value="option one">
            </div>
        </div>
        <a class="double_item" id="double_item-${tim}" style="color: #5a5acc;
        cursor: pointer;" onclick="doubleItem(event,'text','div_option-${tim}')">Add one
            more</a>


        <div class="answer_key" id="answer_key-${tim}">
            <!-- <input type="number" id="Answ-1" name="Answ-1" value="1"> -->
            <label for="Marks-1">Points :-</label>
            <input type="number" id="Marks-${tim}" name="Marks-${tim}" value="20">

        </div>
        <div id='required'>
        

          <label class="switch">
              <input class="isquiz" id="isquiz" name="required_${tim}" type="checkbox">
              <span class="slider round"></span>
            </label>
            <label for="isquiz" style="margin-right: 4px;">Reqiured </label>
      
            <button type="button" class="btn btn-outline-info"
                onclick='delete_this(event,"id_${tim}")'>Delete</button>
            <button type="button" class="btn btn-outline-info" onclick='add_afterend("id_${tim}")'>Add</button>
        </div>

    </div>`);
check()
}

function add_afterend(div_id) {
    tim = tim + 1;
    document.querySelectorAll(`#${div_id}`)[0].insertAdjacentHTML('afterend',
        `<div class="question" id="id_${tim}" onmouseup="addprop(event,${tim})">
        <div class="first">
            <input type="text" style="width: 60%;" name="questions_${tim}" value="Question-${tim}">
            <button type="button" class="btn imagebutton" data-toggle="modal" data-target="#exampleModalLong" onclick="selectedbody('id_${tim}')" >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
              </svg>
            </button>

            <button class="btn videobut" type="button" onclick="addvideo(${tim})" >
            <img class="videoicon" src="/video.svg" alt="">
            </button>
            <select class="form-control" name="Type_${tim}" onclick="additem(event,'div_option-${tim}')">
                <option value="MCQ">Multiple Choice</option>
                <option value="checkbox">Checkbox</option>
                <option value="Paragraph">Paragraph</option>
                <option value="short_answ">Short answer</option>
                <option value="Email">Email</option>
                <option value="date">Date</option>
                <option value="Time">Time</option>
            </select>


        </div>

        <div class="image_container">
          
        </div>
        <div class="video_container">
          
        </div>

        <div class="options" id="div_option-${tim}">
            <div class="form-check" style="display: flex; align-items: center;">
                <input class="input_check" type="radio" name="Answ-${tim}" id="exampleRadios2" value="1" checked>
                <input class="" type="text" name="option-${tim}" value="option one">
            </div>
        </div>
        <a class="double_item" id="double_item-${tim}" style="color: #5a5acc;
        cursor: pointer;" onclick="doubleItem(event,'text','div_option-${tim}')">Add one
            more</a>


        <div class="answer_key" id="answer_key-${tim}">
            <!-- <input type="number" id="Answ-1" name="Answ-1" value="1"> -->
            <label for="Marks-1">Points :-</label>
            <input type="number" id="Marks-${tim}" name="Marks-${tim}" value="20">

        </div>
        <div id='required'>
        

          <label class="switch">
              <input class="isquiz" id="isquiz" name="required_${tim}" type="checkbox">
              <span class="slider round"></span>
            </label>
            <label for="isquiz" style="margin-right: 4px;">Reqiured </label>
      
            <button type="button" class="btn btn-outline-info"
                onclick='delete_this(event,"id_${tim}")'>Delete</button>
            <button type="button" class="btn btn-outline-info" onclick='add_afterend("id_${tim}")'>Add</button>
        </div>

    </div>`
    );
    check();
}

function addprop(item, div_id) {
    if (div_id != current_container) {
        removeprp();

        // item.target.classList.add('question_option-prop');
        document.querySelectorAll(`#id_${div_id}`)[0].classList.add('question_option-prop');
        current_container = div_id;
    }
    else {
        // console.log("already in that")
    }


}

function removeprp() {
    const selected = document.querySelectorAll('.question');
    selected.forEach(function (el) {
        el.classList.remove('question_option-prop');
    });
}
function putansw(item) {
    const item1 = item;
    let divcount = 0;
    for (let i = 0; i < item.path[1].children.length; i++) {
        if (item.path[1].children[i].tagName == "INPUT") {
            divcount += 1;
        }
    }
    console.log(divcount)
}
function choose(action, data) {

    // console.log(action)
    // console.log(data.path[2].children[0].id)
    // console.log(document.getElementById(data.path[2].children[0].id).innerHTML=action)
}


function doubleItem(eve, type, div_id) {
    console.log(eve)
    if (type == "text") {
        console.log('done')
        const temp = document.querySelectorAll(`#${div_id}`)
        let mcq_count = document.querySelectorAll(`#${div_id}`)[0].children.length + 1;
        let type_ = document.querySelectorAll(`#${div_id}`)[0].children[0].children[0].type;
        if (type_ == "radio") {

            temp[0].insertAdjacentHTML('beforeend',
                `<div class="form-check" style="display: flex; align-items: center;" >
                <input class="input_check" type="radio" name="Answ-${current_container}" id="exampleRadios2" value="${mcq_count}">
                <input class="" type="text" name="option-${current_container}" value="option-${mcq_count}">
                </div>`);
        }
        else {
            temp[0].insertAdjacentHTML('beforeend',
                `<div class="form-check" style="display: flex; align-items: center;" >
                <input class="input_check" type="checkbox" name="Answ-${current_container}" id="inlineCheckbox1" value="${mcq_count}" checked>
                <input class="" type="text" name="option-${current_container}" value="option-${mcq_count}">
                </div>
                `
            )


        }
    }
}

function delete_this(event, delete_id) {
    document.getElementById(delete_id).remove();
}




// Setting  *************

function setting() {
    console.log('done')
    document.querySelector(".setting_menu").setAttribute("style", "display : block")
    document.querySelector("#form").setAttribute("style", "display: none;")

}

function check() {
    if (document.getElementById('tisquiz').checked) {
        console.log("true")
        // 
        console.log(tim)
        for (let k = 1; k <= tim; k++) {
            document.getElementById(`answer_key-${k}`).style.display = "block";
            var nodes = document.getElementById(`answer_key-${k}`).getElementsByTagName('*');
            for (var i = 0; i < nodes.length; i++) {
                nodes[i].disabled = false;
            }
        }

    }
    else {
        console.log("false")
        for (let k = 1; k <= tim; k++) {
            document.getElementById(`answer_key-${k}`).style.display = "none";
            var nodes = document.getElementById(`answer_key-${k}`).getElementsByTagName('*');
            for (var i = 0; i < nodes.length; i++) {
                nodes[i].disabled = true;
            }
        }
    }
    document.querySelector(".setting_menu").setAttribute("style", "display : none")
    document.querySelector("#form").setAttribute("style", "display: block;")

}


function addition_data(second) {
    
    
    const background_c=savetheme()[0]
    const foreground_c=savetheme()[1]
    const themeImage=savetheme()[2]
    const isquiz = document.getElementById('isquiz').checked;
    const release_grade=document.getElementsByClassName("form-check-input")[0].checked
    const conformation_message = document.getElementById('conformation_message').value;
    const response_reciept =document.getElementById('response_reciept').checked;
    const limit =document.getElementById('limit').checked;

    const return_data={"idquiz":isquiz, "release_grade":release_grade , 'conformation_message':conformation_message , 'response_reciept':response_reciept , 'limit':limit , 'background_color':background_c , 'foreground_color':foreground_c , 'themeImage':themeImage , 'mainImage': mainImage}
    console.log(return_data)
    document.getElementById("additional_data").value =JSON.stringify( return_data);
    second()
}




function takeshot(calbckfirst,second) { 
    // let div = 
    //     document.getElementById('screenshot')

    // html2canvas(div, {height: 700}).then( 
    //     function (canvas) { 
             
    //         var dataURL = canvas.toDataURL('image/jpeg');
            
    //         $.ajax({ 
    //             type: "POST", 
    //             url: "/canvas", 
    //             data: { 
    //                 imgBase64: dataURL 
    //             } 
    //         }).done(function(o) { 
    //             console.log(o); 
    //             mainImage=o;
    //             calbckfirst(second)
                
    //         } ).fail(function(err){
    //         })
            
            
            
    //     }) 
        
        
        calbckfirst(second)
} 



function selectedbody(temp){
    imagelocation=temp
}

async function  savechanges(){
    

    let image_size=document.getElementById('imagerange').value;
    if(currentImagestatue!='none'){
        document.getElementById(imagelocation).childNodes[3].innerHTML=`
    <div class="image" style=" object-fit: contain;">
    <img src="${currentImagestatue}" style="height : ${image_size}px; object-fit: contain;max-height: 100%; max-width: 100%;"><input type="hidden" name='image_${imagelocation.slice(3)}' value="${currentImagestatue}" ><input type="hidden" name='size_height${imagelocation.slice(3,imagelocation.length)}' value="${image_size}px" >
    </div>
    `}
}




function readURL(input) {
    document.getElementById('preview_image').style.display='block'
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#preview_image')
                .attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
    document.getElementById("preview_image").style.display = "none";
    document.getElementById("submit_image").click();
}

function changesize(value,thi){
document.getElementById(value).style.height=`${thi.value}px`;
}

function addvideo(pos){
    document.getElementById(`id_${pos}`).children[2].innerHTML=`<input class='form-control' type='text' name='video_${pos}' placeholder='Video Link'>`
}


function setproperty(){
    document.querySelector(':root').style.setProperty('--background',document.getElementById("background_color").value)
    document.querySelector(':root').style.setProperty('--forground',document.getElementById("foreground_color").value)
}

function savetheme(){

    const background_color=document.getElementById("background_color").value
    const foreground_color=document.getElementById("foreground_color").value
    const themeImage =document.getElementById("themeImage").value
    document.getElementById("themeImageID_").src=themeImage
    if(themeImage!=""){

        document.getElementById("themeimageid").style={'display':'block'}
        document.getElementById("themeImageID_").style.display='none';
        document.getElementById("themeimageid").style.backgroundImage=`url(${themeImage})`;
        document.getElementById("themeimageid").style.height='155px';
        document.getElementById("themeimageid").style.border='none';
    }
    else{
        document.getElementById("themeimageid").style.display='none'

    }

    return [background_color , foreground_color , themeImage]
}

gsap.to("rect", {
    scale: 0.5,
    transformOrigin: "center",
    duration: 1,
    stagger: { yoyo: true, repeat: -1, each: 0.4 }
  });