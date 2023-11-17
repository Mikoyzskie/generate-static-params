import {getCategory} from "@/lib/getCategories"

export const getSubcategories = async (categoryId:string)=>{
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

export const getSubcategory = async (subcategory:string)=>{
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

export const fetchSubcategories = async (category: string) => {
    const singleCategory = await getCategory(category.split('-').join(" "));
    const subs = singleCategory.data[0].Sub_Categories

    const subsList = await Promise.all(subs.map(async (sub: string) => {

        const getSub = await getSubcategory(sub.toString())

        return getSub.data.Subcategory
    }))

    return subsList
}


export const fetchSubByName = async (subcategory:string) =>{
    const result = await fetch(`http://cms.zanda.info/items/SubCategories?filter={"Subcategory":{"_eq":"${subcategory}"}}`,
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

export const fetchSubByParent =  async (parent_id: string)=> {
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