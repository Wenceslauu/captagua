import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex items-center justify-center w-full h-24 border-t">
      <a
        className="flex items-center justify-center"
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} style={{ marginLeft: 4 }}/>
      </a>
    </footer>
  );
}
