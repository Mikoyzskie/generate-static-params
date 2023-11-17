export const getProduct = async (product: string) => {
    const result = await fetch(`http://cms.zanda.info/items/Products/${product}`,
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

export const getProducts = async (subcategoryId: string) => {
    const result = await fetch(`http://cms.zanda.info/items/Products?filter={"Product_Category":{"_eq":"${subcategoryId}"}}`,
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