import PulseLoader from "react-spinners/PulseLoader";

export default function Loading() {
  return (
    <div className="flex h-96 flex-grow items-center justify-center mx-auto my-auto">
      <PulseLoader color="#fff" size={20} />
    </div>
  );
}
