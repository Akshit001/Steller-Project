/*Diego Poblete #301158204, COMP 229, Section 008*/

(function(){

    function Start()
    {
        console.log("App Started...");
    
    }

    window.addEventListener("load",Start);

})();

if(getTitle == "Survey List")
{
    let deleteButtons = document.querySelectorAll('.btn-danger');
        
    for(button of deleteButtons)
    {
        button.addEventListener('click', (event)=>{
            if(!confirm("Are you sure?")) 
            {
                event.preventDefault();
            }
        });
    }
}
