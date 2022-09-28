import Link from 'next/link';
import { Button } from "ui";

export default function Web() {
  return (
    <div>
      <h1>Web</h1>
      <Button />
      <Link href={`/studio`}>Studio</Link>
    </div>
  );
}
