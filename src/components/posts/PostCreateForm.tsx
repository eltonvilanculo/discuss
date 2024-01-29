"use client";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@nextui-org/react";
import FormButton from "../common/FormButton";
import { createPost } from "@/actions";
import { useFormState } from "react-dom";

export default function PostCreateForm({ slug }: { slug: string }) {
  const binded = createPost.bind(null, slug);
  console.log("🚀 ~ PostCreateForm ~ binded:", binded);
  const [formData, createPostAction] = useFormState(
    createPost.bind(null, slug),
    { errors: {} }
  );
  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Button className="bg-primary-500 text-white">Create Post</Button>
      </PopoverTrigger>

      <PopoverContent>
        <form
          className="flex flex-col gap-4 justify-center items-center px-6 py-4"
          action={createPostAction}
        >
          <h1 className="font-bold text-md ml-1/2">Submit Post </h1>
          <Input
            placeholder="Title"
            name="title"
            label="Title"
            labelPlacement="outside"
            isInvalid={!!formData?.errors?.title?.join(", ")}
            errorMessage={formData?.errors?.title?.join(", ")}
          />

          <Textarea
            placeholder="Content"
            name="content"
            label="Content"
            labelPlacement="outside"
            isInvalid={!!formData?.errors?.content?.join(", ")}
            errorMessage={formData?.errors?.content?.join(", ")}
          />

          {!!formData?.errors?.formCustomErrors?.join(", ") ? (
            <span className="text-danger">
              {formData?.errors?.formCustomErrors?.join(", ")}
            </span>
          ) : null}

          <FormButton>Submit </FormButton>
        </form>
      </PopoverContent>
    </Popover>
  );
}
