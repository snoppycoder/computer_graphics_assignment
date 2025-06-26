// 
export function getDescription(planetName) {
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${planetName}`)
    .then(res => res.json())
    .then(data => {
        return data.extract
    })
    .catch((error) => {
        console.log(error)
    })
}