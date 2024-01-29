"use client";
import { createTopic } from "@/actions";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@nextui-org/react";
import { useFormState } from "react-dom";
import FormButton from "../common/FormButton";

export default function TopicCreateForm() {
  const [formState, action] = useFormState(createTopic, { errors: {} });
  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Button className="bg-primary px-2 rounded-xl py-1 text-white mb-2">
          Create a Topic
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full">
        <form action={action}>
          <div className="flex flex-col justify-center gap-4 p-4 w-96">
            <h1>Create a Topic</h1>

            <Input
              name="name"
              labelPlacement="outside"
              placeholder="Name"
              label="Name"
              isInvalid={!!formState.errors.name?.join(", ")}
              errorMessage={formState.errors.name?.join(", ")}
            />
            {/* <span>{formState.errors.name?.join(", ")}</span> */}

            <Textarea
              name="description"
              labelPlacement="outside"
              placeholder="Description"
              label="Description"
              isInvalid={!!formState.errors.description?.join(", ")}
              errorMessage={formState.errors.description?.join(", ")}
            />

            <span className=" text-danger-500">
              {!!formState.errors._formErrors?.join(", ")
                ? formState.errors._formErrors.join(", ")
                : null}
            </span>

            {/* <Button
              className="w-full bg-black text-white rounded-sm"
              type="submit"
            >
              Submit
            </Button> */}

            <FormButton>Submit</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
