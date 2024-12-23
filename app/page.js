import Addredisdata from "@/components/Main/AddtoRedis/Addredisdata";
import Link from "next/link";

export default function Home() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
    <Addredisdata />
    <Link className='btn btn-primary' href={"/participant/availability"}>Check Available Time Slots</Link>
</div>
  );
}
