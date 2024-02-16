import { createBoard } from "@/actions/createBoard";
import FormInput from "@/components/form/FormInput";
import FormSubmit from "@/components/form/FormSubmit";

export default function OrgPage() {
  return (
    <div>
      <form action={createBoard}>
        <FormInput id="title" label="Board Title" />
        <FormSubmit type="submit">Submit</FormSubmit>
      </form>
    </div>
  );
}
