import getCategory from "@/lib/getCategory"
import getSubcategory from "@/lib/getSubcategory"

export const fetchSubcategories = async (category: string) => {
    const singleCategory = await getCategory(category.split('-').join(" "));
    const subs = singleCategory.data[0].Sub_Categories

    const subsList = await Promise.all(subs.map(async (sub: string) => {

        const getSub = await getSubcategory(sub.toString())

        return getSub.data.Subcategory
    }))

    return subsList
}
