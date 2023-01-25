import Link from "next/link";
import kebabCase from "../../lib/utils/kebabCase";

interface Props {
  text: string;
}

const Tag = ({ text }: Props) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <span className="mr-3 rounded bg-indigo-500 p-1 text-xs font-medium uppercase text-white hover:bg-indigo-600">
        {text.split(" ").join("-")}
      </span>
    </Link>
  );
};

export default Tag;
