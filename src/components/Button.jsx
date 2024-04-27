export default function Button(props) {
  return <button
  onClick={props.onClick}
  className="text-xl m-auto border-2 rounded-lg p-2 border-black bg-orange-500 hover:bg-orange-400 disabled:bg-gray-300 disabled:border-gray-500 disabled:text-gray-500"
>
  {props.text}
</button>
}