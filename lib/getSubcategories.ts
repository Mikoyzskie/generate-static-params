export default async function getSubcategories(categoryId:string){
    const result = await fetch(`${process.env.DIRECTUS_API_URL}/items/SubCategories?filter={"Parent_Category":{"_eq":"${categoryId}"}}`,
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