const user_name = prompt("Введіть ім'я");
document.getElementById("user_name").innerHTML = user_name;
if (!user_name || user_name.length > 35){
	document.getElementById("user_name").innerHTML = "Користувач";
}

const btn = document.getElementById("btn");
const col1_HTML = document.getElementById("col1");
const col2_HTML = document.getElementById("col2");
const col3_HTML = document.getElementById("col3");
const attempt = document.getElementById("attempt");
const result = document.getElementById("result");

let iteration = 1;
let is_winner = false;

let col1 = [1,2,3,4];
let col2 = [1,2,3,4];
let col3 = [1,2,3,4];

btn.addEventListener("click", spin);
shuffle_array(col1);
shuffle_array(col2);
shuffle_array(col3);


for(let i = 0; i < 4; i++){
    col1.push(...col1);
    col2.push(...col2);
    col3.push(...col3);
}
add_icons(col1, col1_HTML);
add_icons(col2, col2_HTML);
add_icons(col3, col3_HTML);


function add_icons(col, col_HTML){
    let img;
    for(let i = 0; i < col.length; i++){
        img = document.createElement('img');
        img.src = `slot_machine icon_${col[i]}.png`;
        img.alt = "Slot machine icon";
        img.className = "item";
        col_HTML.appendChild(img);
    }
}

function shuffle_array(col){
    let random_num1;
    let random_num2;
    let temp;
    for (let i = 0; i < 10; i++){
        // find random elements to swap
        random_num1 = Math.floor((Math.random() * 4));
        random_num2 = Math.floor((Math.random() * 4));
        // swap two elements in array
        temp = col[random_num1];
        col[random_num1] = col[random_num2];
        col[random_num2] = temp;
    }
}

function spin(){
    btn.disabled = true;
    const images = document.querySelectorAll(".item");
    for (let image of images) {
        image.classList.add(`animate${iteration}`);
    }
   
    attempt.innerHTML = `Спроба (${iteration}/3)`
    iteration++;

    setTimeout(check_if_win, 2000); 
}

function check_if_win(){
    btn.disabled = false;
    if(iteration == 4 && is_winner == false){
        result.innerHTML = "Ви програли!"
        btn.removeEventListener("click", spin);
    }

    if(iteration == 2 && col1[3] == col2[3] && col3[3] == col1[3]){      
        result.innerHTML = "Ви перемогли!"
        is_winner = true;
        btn.removeEventListener("click", spin);
    }

    if(iteration == 3 && col1[2] == col2[2]&& col3[2] == col1[2]){
        result.innerHTML = "Ви перемогли!"
        is_winner = true;
        btn.removeEventListener("click", spin);
    }

    if(iteration == 4 && col1[0] == col2[0] && col3[0] == col1[0]){
        result.innerHTML = "Ви перемогли!"
        is_winner = true;
        btn.removeEventListener("click", spin);
    }
}