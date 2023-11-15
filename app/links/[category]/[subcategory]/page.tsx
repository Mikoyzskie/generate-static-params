import getCategory from "@/lib/getCategory"
import getCategories from "@/lib/getCategories"
import getSubcategories from "@/lib/getSubcategories"
import getSubcategory from "@/lib/getSubcategory"
import { notFound } from "next/navigation"


const slugify = require('slugify');

const fetchSubcategories = async (category: string) => {
    const singleCategory = await getCategory(category.split('-').join(" "));
    const subs = singleCategory.data[0].Sub_Categories

    const subsList = await Promise.all(subs.map(async (sub: string) => {

        const getSub = await getSubcategory(sub.toString())

        return getSub.data.Subcategory
    }))

    return subsList
}


export default async function SubPage({
    params,
}: {
    params: { category: string; subcategory: string }
}) {

    const categoryDetails = await getCategory(params.category.split('-').join(' '))
    const catObject = categoryDetails.data[0]

    if (!catObject) return notFound()

    let subList = await Promise.all(catObject.Sub_Categories.map(async (sub: string) => {

        const getSub = await getSubcategory(sub.toString())

        return getSub.data.Subcategory
    }))

    subList = subList.map(sub => sub.toLowerCase())

    if (subList.includes(params.subcategory)) {
        console.log(`NOTHING HERE`);
    } else {
        return notFound()
    }


    return (
        <div>
            <h1>{params.category}</h1>
            <h1>{params.subcategory}</h1>
        </div>
    )
}

export async function generateStaticParams({
    params: { category },
}: {
    params: { category: string }
}) {

    const subtest = await fetchSubcategories(category);
    // console.log(subtest);

    return subtest.map((item) => ({
        subcategory: slugify(item, { lower: true })
    }))
}

