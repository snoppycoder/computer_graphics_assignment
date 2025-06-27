// 
export async function getDescription(planetName) {
    try 
    {
        if (planetName.toLowerCase() != 'mercury'){
            const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${planetName}`);
            const data = await response.json();
            return data.extract;
        }
        else {
            return 'Mercury is the smallest planet in the Solar System and the closest to the Sun. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the planets in the Solar System. Mercury is one of the four terrestrial planets in the Solar System and is a rocky body like Earth. It has a heavily cratered surface, similar in appearance to the Moon, indicating that it has been geologically inactive for billions of years. Mercury has no atmosphere to retain heat, resulting in extreme temperature variations between its day and night sides. Despite its proximity to the Sun, Mercury is not the hottest planet in the Solar System; that title belongs to Venus due to its thick atmosphere.'
        }
       
    
}
catch(error) {

    console.warn(error)
}

}