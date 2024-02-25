import { Input } from "@/components/ui/input";
import { Inter } from "next/font/google";
import Image from 'next/image'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-center p-24 max-w-2xl -translate-y-8 mx-auto gap-y-4 ${inter.className}`}>
      <Image src="/avatar.png" alt="logo" width={100} height={100} />
      <h3 className="text-2xl mt-4">Welcome to Blog management site</h3>
      <form onSubmit={login} className="w-full">
        <Input type="password" placeholder="Access token" name="accessToken" className="w-full" />
      </form>
    </main>
  );
}


function login(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const accessToken = (e.currentTarget.elements.namedItem("accessToken") as HTMLInputElement).value;
  fetch("/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: accessToken }),
  }).then(async (res) => {
    if (res.ok) {
      window.location.href = "/overview";
    } else {
      alert("Invalid token");
    }
  });
}
