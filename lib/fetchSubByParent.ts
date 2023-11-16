export default async function fetchSubByParent(parent_id: string) {
    const result = await fetch(`http://cms.zanda.info/items/Products?filter={"Product_Category":{"_eq":"${parent_id}"}}`,
        {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + process.env.DIRECTUS_API_TOKEN
            },
            next: { revalidate: 60 }
        })

    if (!result.ok) return undefined

    return result.json()
}