import { OrganizationList } from "@clerk/nextjs";

export default function CreateOrgPage() {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl={"/org/:id"}
      afterCreateOrganizationUrl={"/org/:id"}
    />
  );
}
