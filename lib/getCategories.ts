export default async function getCategories(){
    const result = await fetch(process.env.DIRECTUS_API_URL + "/items/Categories",
        {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + process.env.DIRECTUS_API_TOKEN
            },
            next: {revalidate: 60}
        })

    if(!result.ok) return undefined

    return result.json()
}