function select_checked(target) {
  select = document.getElementById('edit_priority').options
  for (let i = 0; i < select.length; i++) {
    if (select[i].value === target) {
      select[i].selected = true
      break
    }
  }
}

// window.onload = function() {
//     select_checked();  // I wanna use '<%= task.priority %>', but i can't. Need to fix it
// };
