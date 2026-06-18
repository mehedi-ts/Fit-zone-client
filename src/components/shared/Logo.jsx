import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 w-fit">
      <Image
        src="/images/logo1.png"
        alt="FitZone Logo"
        width={140}
        height={50}
        priority
        className="object-contain "
      />
    </Link>
  );
}
