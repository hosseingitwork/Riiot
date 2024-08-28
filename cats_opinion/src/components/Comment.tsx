import { Card_info } from "../types";

const Comment = (props:Card_info) => {

    const card_info = props

    return (
        <div className="text-center m-3">
            <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col items-center pb-10">
                    <img className="w-24 h-24 mb-3 rounded-full shadow-lg mt-2" src={card_info.img} alt={card_info.name.first + "image"} />
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{card_info.name.first}</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{card_info.comment}</span>
                </div>
            </div>
        </div>
    )
}

export default Comment;