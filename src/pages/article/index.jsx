import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"

export const Article = () => {
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()

    const {articles} = useSelector(({ articles }) => articles)

    let articleList = articles
    if(searchParams.get('category')) {
        articleList = articles.filter(
            ({category}) => category === searchParams.get('category'),
        )
    }

    useEffect(() => {
        dispatch(/*articlesAction*/)
    }, [dispatch])

    return (
        [/*Layout */],
        [/*articleList articles={articleList}*/]
    )
}