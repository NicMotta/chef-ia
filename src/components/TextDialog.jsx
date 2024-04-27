import { CONTENT } from "../utils/constants"

export default function TextDialog(props) {
  return <div className="flex">
    <p className="text-xl">{CONTENT.dialog}</p>
    <p className="text-xl p-2 border-2 border-black rounded-lg bg-white max-w-sm text-pretty w-full md:w-96">{props.content}</p>
  </div>
}