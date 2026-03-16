import Image from "next/image"

export default function Logo() {
  return (
    <div className="w-48 h-32 flex items-center justify-center">
      <Image src="/logo.png" alt="Elite Pro Gym Logo" width={200} height={100} className="object-contain" priority />
    </div>
  )
}
