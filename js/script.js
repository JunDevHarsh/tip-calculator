// variable decalarations
let bill_amount = document.getElementById('bill-amount');
let tip_btns = document.getElementsByClassName('btn');
let custom_tip = document.getElementById('custom-tip');
let people_count = document.getElementById('people-count');
let tip_amount = document.getElementById('tip-amount');
let tip_total = document.getElementById('tip-total');
let reset_btn = document.getElementById('reset-btn');
let amount_num = people_num = custom_tip_val = 0;

for(let btn of tip_btns){
    btn.addEventListener('click', function(){
        let inc = 0;
        // using while loop to show current selected tip value or button
        while(inc < tip_btns.length){
            (btn == tip_btns[inc]) ? tip_btns[inc].classList.add('active') : tip_btns[inc].classList.remove('active');
            inc++;
        }
        custom_tip.classList.remove('active');
        custom_tip_val = parseInt(btn.innerText);
        calculations(custom_tip_val);
        custom_tip.value = '';
    })
}

bill_amount.addEventListener('keyup', () => main_function(bill_amount));
people_count.addEventListener('keyup', () => main_function(people_count));
custom_tip.addEventListener('keyup', () => main_function(custom_tip));
reset_btn.addEventListener('click', reset_all);

function main_function(item){
    let temp_item = item.value.trim(); //removes extra spaces if entered by the user
    if(temp_item == 0 && item.classList.contains('custom_id')){
        return item.classList.add('active');
    }else if(temp_item == 0){
        item.classList.add('active');
        return item.previousElementSibling.classList.add('active');
    }else{
        item.classList.remove('active');
        item.previousElementSibling.classList.remove('active');
    }
    if(temp_item == '' || isNaN(temp_item)){
        return item.classList.add('active');
    }else{
        item.classList.remove('active');
    }
    item.style.outline = 'var(--cyan) auto';
    if(item.classList.contains('bill_amount')){
        amount_num = parseFloat(temp_item);
        calculations(custom_tip_val);
    }else if(item.classList.contains('people_count')){
        people_num = parseFloat(temp_item);
        calculations(custom_tip_val);
    }else{
        custom_tip_val = parseFloat(temp_item);
        console.log(custom_tip);
        for(let i of tip_btns){
            i.classList.remove('active');
        }
        calculations(custom_tip_val);
    }
}

function calculations(num){
    if(amount_num == 0 || people_num == 0) return;
    if(isNaN(bill_amount.value.trim()) || isNaN(people_count.value.trim()) || isNaN(custom_tip.value.trim())) return;
    let tip_result = tip_per_result = 0;
    tip_result = (amount_num * num / 100) / people_num;
    tip_per_result = ((amount_num * num / 100) + amount_num) / people_num;
    tip_amount.innerText = "$" + tip_result.toFixed(2);
    tip_total.innerText = "$" + tip_per_result.toFixed(2);
}

function reset_all(){
    amount_num = people_num = custom_tip_val = 0;
    bill_amount.value = '';
    bill_amount.style.outline = '';
    custom_tip.value = '';
    custom_tip.style.ou
    people_count.value = '';
    tip_amount.innerText = '';
    tip_total.innerText = '';
    for(let j of tip_btns){
        j.classList.remove('active');
    }
}