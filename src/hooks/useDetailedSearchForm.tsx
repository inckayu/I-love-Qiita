import { useRecoilState } from "recoil"

import { isOpenDetailedSearchModalState } from "@/state/isOpenDetailedSearchModalState"


const useDetailedSearchForm = () => {
  const [, setIsOpenDetailedSearchModal] = useRecoilState(isOpenDetailedSearchModalState)
  const handleDetailedSearchModalClose = () => {
    setIsOpenDetailedSearchModal(false)
  }
  const handleDetailedSearchButton = () => {
    setIsOpenDetailedSearchModal(true)
  }
  const handleCancelButtonClick = () => {
    setIsOpenDetailedSearchModal(false)
  }
  const handleOKButtonClick = () => {
    // フォームの内容を基にクエリを作成してarticleTitle(変数名はいずれ変更)にセットする
    // その後、記事検索を実行する
  }
  return {
    handleDetailedSearchModalClose,
    handleDetailedSearchButton,
    handleCancelButtonClick,
    handleOKButtonClick,
  }
}

export default useDetailedSearchForm
