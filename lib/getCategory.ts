export default async function getCategory(categoryName:string){
    const result = await fetch(`http://cms.zanda.info//items/Categories?filter={"Name":{"_eq":"${categoryName}"}}`,
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