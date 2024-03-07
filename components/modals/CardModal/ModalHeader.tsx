"use client";
import FormInput from "@/components/form/FormInput";
import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/lib/types";
import { useQueryClient } from "@tanstack/react-query";
import { LayoutIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";

const ModalHeader = ({ data }: { data: CardWithList }) => {
  const queryClient = useQueryClient();
  const params = useParams();

  const inputRef = useRef<ElementRef<"input">>(null);

  const [title, setTitle] = useState(data.title);

  const onBlurHandler = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const onSubmitHandler = (formData: FormData) => {};

  return (
    <div className="flex justify-center items-start gap-x-3 mb-6 w-full">
      <LayoutIcon className="h-5 w-5 mt-1 text-neutral-700" />
      <div className="w-full">
        <form>
          <FormInput
            id="title"
            defaultValue={title}
            className="font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate"
          />
        </form>
        <p className="text-sm text-muted-foreground ">
          in list <span className="underline">{data.list.title}</span>
        </p>
      </div>
    </div>
  );
};

ModalHeader.Skeleton = function ModalHeaderSkeleton() {
  return (
    <div className="flex gap-x-3 mb-6 w-full">
      <Skeleton className="h-5 w-5 mt-1" />
      <div>
        <Skeleton className="w-24 h-6 mb-1 bg-neutral-200" />
        <Skeleton className="w-12 h-6 bg-neutral-200" />
      </div>
    </div>
  );
};

export default ModalHeader;
