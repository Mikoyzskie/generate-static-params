export default function Page() {
    return (
        <div>
            <h1>Products</h1>
        </div>
    )
}

// export async function generateStaticParams({
//     params: { subcategory },
// }: {
//     params: { subcategory: string }
// }) {

//     const subtest = await fetchSubcategories(category);
//     // console.log(subtest);

//     return subtest.map((item) => ({
//         subcategory: slugify(item, { lower: true })
//     }))
// }
