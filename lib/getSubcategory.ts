export default async function getSubcategory(subcategory:string){
    const result = await fetch(`http://cms.zanda.info/items/SubCategories/${subcategory}`,
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