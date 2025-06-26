// 
export async function getDescription(planetName) {
    try 
    {
        const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${planetName}`);
        const data = await response.json();
        return data.extract;
    
}
catch(error) {

    console.warn(error)
}

}