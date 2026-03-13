document.querySelectorAll(".allPaths").forEach(e=>{
    e.addEventListener("mouseover",function(){
        window.onmousemove=function(j){
            x=j.clientX
            y=j.clientY
            document.getElementById("name").style.top=y+10+"px"
            document.getElementById("name").style.left=x+10+"px"
        }
})

document.addEventListener('DOMContentLoaded', function () {
    const stateSearchInput = document.getElementById('stateSearch');
    const stateList = document.getElementById('stateList');
    const allPaths = document.querySelectorAll('.allPaths');
  
    stateSearchInput.addEventListener('input', function () {
      const searchText = stateSearchInput.value.toLowerCase();
  
      stateList.innerHTML = '';
  
      allPaths.forEach(path => {
        const stateName = path.getAttribute('name').toLowerCase();
  
        if (stateName.includes(searchText)) {
          path.classList.add('highlight');
  
          const listItem = document.createElement('li');
          listItem.textContent = path.getAttribute('name');
          stateList.appendChild(listItem);
        } else {
          path.classList.remove('highlight');
        }
      });
    });
  
    document.body.addEventListener('click', function (event) {
      if (!event.target.closest('#stateSearch')) {
        stateSearchInput.value = ''; 
        stateList.innerHTML = '';  
        allPaths.forEach(path => path.classList.remove('highlight'));
      }
    });
  });
  document.addEventListener('DOMContentLoaded', () => {
    const stateLinks = {
      punjab: 'states/punjab.html',
      kerala: 'states/kerala.html',
      // Add more state IDs and links here
    };

    Object.entries(stateLinks).forEach(([stateId, link]) => {
      const state = document.getElementById(stateId);
      if (state) {
        state.style.cursor = 'pointer'; // show pointer cursor
        state.addEventListener('click', () => {
          window.open(link, '_blank');
        });
      }
    });
  });
  paths.forEach(path => {
    const bbox = path.getBBox(); // get position
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", bbox.x + bbox.width / 2);
    text.setAttribute("y", bbox.y + bbox.height / 2);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("class", "state-label");
    text.textContent = Rajasthan; // Use path ID or a mapping
    path.parentNode.appendChild(text);
});