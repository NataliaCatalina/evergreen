// console.log("hello");

const navIcon = document.getElementById('navIcon');
const navPanel = document.getElementById('navPanel');


navIcon.addEventListener('click', () => {
    if(navPanel.style.display === 'none'){
        navPanel.style.display = 'block';
    } else {
        navPanel.style.display = 'none';
    }
})

// CANCEL BUTTON
function goBack() {
    window.history.back();
  }