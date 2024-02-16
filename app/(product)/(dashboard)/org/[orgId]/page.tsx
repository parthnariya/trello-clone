import { createBoard } from "@/actions/createBoard";
import { Button } from "@/components/ui/button";

export default function OrgPage() {
  return (
    <div>
      <form action={createBoard}>
        <input
          id="title"
          name="title"
          required
          placeholder="Enter board title"
          className="border-black border p-1"
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
