import getCategory from "@/lib/getCategory"
import getSubcategory from "@/lib/getSubcategory"
import { fetchSubcategories } from "@/lib/fetchParamSub"
import fetchSubByParent from "@/lib/fetchSubByParent"

import { notFound } from "next/navigation"
import Link from "next/link"

const slugify = require('slugify');
const unslug = (word: string) => word.split('-').join(' ')


export default async function SubPage({
    params,
}: {
    params: { category: string; subcategory: string }
}) {

    const categoryDetails = await getCategory(unslug(params.category))
    const catObject = categoryDetails.data[0]

    if (!catObject) return notFound()

    let subList = await Promise.all(catObject.Sub_Categories.map(async (sub: string) => {
        const getSub = await getSubcategory(sub.toString())
        return getSub.data
    }))

    const subLists = subList.map(sub => sub.Subcategory.toLowerCase())

    if (!subLists.includes(unslug(params.subcategory))) {
        return notFound()
    }

    const findParentId = (subList: any) => {
        const product = subList.find((prod: any) => prod.Subcategory.toLowerCase() === unslug(params.subcategory));
        return product ? product.id : null;
    };

    const parentId = findParentId(subList);
    const products = await fetchSubByParent(parentId)

    return (
        <div className="flex flex-col">
            {
                products.data.map((prod: any) => (
                    <Link
                        key={prod.id}
                        href={`/links/${params.category}/${params.subcategory}/${slugify(prod.Name, { lower: true })}`}
                    >
                        {prod.Name}
                    </Link>
                ))
            }
        </div>
    )
}


