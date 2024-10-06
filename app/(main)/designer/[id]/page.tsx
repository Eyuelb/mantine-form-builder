import FormDesigner from "@/components/form-designer/designer.core";

export default function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return (
    <div className="">
      <FormDesigner id={params.id} />
    </div>
  );
}
