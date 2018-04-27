
function select_checked(target) {
    console.log('ponta select_checked');
    select = document.getElementById('edit_priority').options;
    for(let i = 0; i < select.length; i++ ){
        console.log(i, 'ponta select_checked');
        if(select[i].value === target){
            select[i].selected = true;
            break;
        }
    }
}
