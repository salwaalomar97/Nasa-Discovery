const apiKey = "BemaBGYeqa2Nq3HmfISvTNJ3xVwAQxRecS789peR";
const apodUrl = "https://api.nasa.gov/planetary/apod";
const afeedUrl = "https://api.nasa.gov/neo/rest/v1/feed";


function handleAFeedData({element_count, near_earth_objects}, afeedElement, afeedTable){
    

    afeedElement.innerHTML = Object.keys(near_earth_objects).map(date=>{
        return near_earth_objects[date].map(asteroid=>{
            const id        = asteroid.id;
            const name      = asteroid.name;
            const dangerous = asteroid.is_potentially_hazardous_asteroid;
            const magnitude = asteroid.absolute_magnitude_h;
            const min       = asteroid.estimated_diameter.meters.estimated_diameter_min;
            const max       = asteroid.estimated_diameter.meters.estimated_diameter_max;
            const close_approach_data = asteroid.close_approach_data.shift();
            const miss_distance = close_approach_data.miss_distance.kilometers;

            return `<tr>
                <td>${id}</td>
                <td>${name}</td>
                <td>${dangerous ? "YES" : "NO"}</td>
                <td>${magnitude}</td>
                <td>${min}</td>
                <td>${max}</td>
                <td>${miss_distance}</td>
                <td>${date}</td>
            </tr>`

        }).join("");

    }).join("");

    if(afeedElement.innerHTML === ""){
        afeedTable.className = "striped hide"
    } else{
        afeedTable.className = "striped";
    }


}

function contentLoaded(){
    const apodElement = document.getElementById("apod");
    const startElement = document.getElementById("start");
    const afeedElement = document.getElementById("afeed");
    const afeedTable   = document.getElementById("afeedTable");

    /** Asteroid Feed */
    const elems = document.querySelectorAll('.datepicker');
    const instances = M.Datepicker.init(elems, {
        autoClose: true,
        defaultDate: new Date(),
        format: 'yyyy-mm-dd'
    });

    start.addEventListener("change", function(){

        fetch(`${afeedUrl}?start_date=${this.value}&api_key=${apiKey}`)
        .then(res=>res.json())
        .then(data=>handleAFeedData(data, afeedElement, afeedTable))
        .catch(handleError);

        console.log(this.value);
    })

}


function handleError(error){
    console.warn(error.message);
}





window.addEventListener("DOMContentLoaded", contentLoaded)