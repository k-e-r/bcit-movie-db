import { ImgPlaceholderIcon } from '../icons/ImgPlaceholderIcon'

export const ImgPlaceholder = ({ className }) => {
  return (
    <div className={`w-fit bg-gray-200 ${className}`}>
      <ImgPlaceholderIcon className="w-[60%] max-w-[300px] h-full mx-auto" />
    </div>
  )
}
