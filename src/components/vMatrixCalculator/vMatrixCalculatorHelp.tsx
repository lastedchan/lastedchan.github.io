import Image from "next/image";
import Link from "next/link";

export default function VMatrixCalculatorHelp() {
  return (
    <Link href={"/v_matrix_calculator/guide.png"} target={"_blank"}>
      <Image
        src={"/v_matrix_calculator/guide.png"}
        alt={""}
        width={1134}
        height={758}
      />
    </Link>
  );
}
